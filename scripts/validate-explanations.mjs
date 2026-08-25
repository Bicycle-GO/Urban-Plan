import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const browserWindow = {};

for (const scriptPath of [
  "data/exam-archive.js",
  "data/exam-2022-1.js",
  "data/exam-explanations-2022-1.js",
  "data/explanation-engine.js",
]) {
  const source = await readFile(join(projectRoot, scriptPath), "utf8");
  new Function("window", source)(browserWindow);
}

const archive = browserWindow.URBAN_PLAN_EXAM_ARCHIVE;
const latestExam = browserWindow.URBAN_PLAN_EXAM_2022_1;
const latestEnhancements = browserWindow.URBAN_PLAN_EXPLANATIONS_2022_1;
const createExplanation = browserWindow.URBAN_PLAN_CREATE_EXPLANATION;

function normalizeFingerprint(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function getFingerprint(question) {
  const answerText = question.options?.[question.answer] || `image-option-${question.answer}`;
  return `${normalizeFingerprint(question.question)}::${normalizeFingerprint(answerText)}`;
}

const expandedByFingerprint = new Map();
for (const [index, question] of latestExam.questions.entries()) {
  const enhancement = latestEnhancements[String(question.number || index + 1)];
  if (!enhancement?.explanation) continue;
  expandedByFingerprint.set(getFingerprint(question), {
    explanation: enhancement.explanation,
    takeaway: enhancement.takeaway,
    explanationKind: "expanded-reused",
  });
}

const failures = [];
const counts = {
  total: 0,
  expanded: 0,
  expandedReused: 0,
  guided: 0,
  sourceWarnings: 0,
  historicalLaw: 0,
  imageOnlyAnswers: 0,
};
const types = new Map();
const sampleKeys = new Set([
  "2534#1",
  "2534#69",
  "2534#87",
  "2559#72",
  "2566#71",
  "9791#29",
  "14371#77",
  "15428#1",
]);
const samples = [];

for (const exam of Object.values(archive)) {
  for (const [index, question] of exam.questions.entries()) {
    counts.total += 1;
    const generated = createExplanation(question, exam);
    const own = exam.id === "15428" ? latestEnhancements[String(question.number || index + 1)] : null;
    const reused = exam.id === "15428" ? null : expandedByFingerprint.get(getFingerprint(question));
    const enhancement = own
      ? { ...generated, ...own, explanationKind: "expanded" }
      : reused
        ? { ...generated, ...reused }
        : generated;

    if (enhancement.explanationKind === "expanded") counts.expanded += 1;
    else if (enhancement.explanationKind === "expanded-reused") counts.expandedReused += 1;
    else counts.guided += 1;
    if (enhancement.sourceWarning) counts.sourceWarnings += 1;
    if (enhancement.historicalLaw) counts.historicalLaw += 1;
    if (!question.options?.[question.answer] && question.optionImageUrls?.[question.answer]?.length) {
      counts.imageOnlyAnswers += 1;
    }
    types.set(enhancement.explanationType, (types.get(enhancement.explanationType) || 0) + 1);

    const key = `${exam.id}#${question.number || index + 1}`;
    const explanation = String(enhancement.explanation || "");
    const takeaway = String(enhancement.takeaway || "");
    if (explanation.length < 45) failures.push(`${key}: explanation too short (${explanation.length})`);
    if (takeaway.length < 8) failures.push(`${key}: takeaway too short (${takeaway.length})`);
    if (/상세 해설은 준비 중|정답 확인용|undefined|\bnull\b/.test(`${explanation} ${takeaway}`)) {
      failures.push(`${key}: placeholder or invalid text`);
    }
    if (enhancement.historicalLaw && !String(exam.date || exam.title).slice(0, 4).match(/\d{4}/)) {
      failures.push(`${key}: legal question has no exam year`);
    }

    if (sampleKeys.has(key)) {
      samples.push({
        key,
        subject: question.subject,
        type: enhancement.explanationType,
        kind: enhancement.explanationKind,
        warning: Boolean(enhancement.sourceWarning),
        prompt: question.question,
        answer: question.options?.[question.answer] || `정답 보기 이미지(${question.answer + 1}번)`,
        explanation,
        takeaway,
      });
    }
  }
}

if (counts.total !== 5900) failures.push(`expected 5900 questions, received ${counts.total}`);
if (counts.expanded !== 100) failures.push(`expected 100 expanded explanations, received ${counts.expanded}`);
if (counts.imageOnlyAnswers !== 18) failures.push(`expected 18 image-only answers, received ${counts.imageOnlyAnswers}`);

const result = {
  ok: failures.length === 0,
  counts,
  typeCounts: Object.fromEntries([...types.entries()].sort((a, b) => b[1] - a[1])),
  failures: failures.slice(0, 30),
  samples,
};

console.log(JSON.stringify(result, null, 2));
if (failures.length) process.exitCode = 1;
