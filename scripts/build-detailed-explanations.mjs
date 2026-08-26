import { readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const sourceDirectory = join(projectRoot, "data", "detailed-explanations");
const outputPath = join(projectRoot, "data", "exam-detailed-explanations.js");
const allowPartial = process.argv.includes("--allow-partial");

function parseWindowAssignment(source) {
  const start = source.indexOf("=");
  const end = source.lastIndexOf(";");
  return JSON.parse(source.slice(start + 1, end));
}

const archiveSource = await readFile(join(projectRoot, "data", "exam-archive.js"), "utf8");
const archive = parseWindowAssignment(archiveSource);
const expectedExamIds = Object.keys(archive).filter((examId) => examId !== "15428");
const availableFiles = new Set((await readdir(sourceDirectory)).filter((name) => /^\d+\.json$/.test(name)));
const missingExamIds = expectedExamIds.filter((examId) => !availableFiles.has(`${examId}.json`));

if (missingExamIds.length && !allowPartial) {
  throw new Error(`상세해설 파일이 없는 회차: ${missingExamIds.join(", ")}`);
}

const detailedExplanations = {};
const failures = [];
let explanationCount = 0;

for (const examId of expectedExamIds) {
  if (!availableFiles.has(`${examId}.json`)) continue;
  const filePath = join(sourceDirectory, `${examId}.json`);
  let document;
  try {
    document = JSON.parse(await readFile(filePath, "utf8"));
  } catch (error) {
    failures.push(`${examId}: JSON 파싱 실패 (${error.message})`);
    continue;
  }

  if (String(document.examId) !== examId) failures.push(`${examId}: examId 불일치`);
  if (document.examDate !== archive[examId].date) failures.push(`${examId}: examDate 불일치`);
  if (!document.explanations || typeof document.explanations !== "object") {
    failures.push(`${examId}: explanations 객체 없음`);
    continue;
  }

  const questionCount = archive[examId].questions.length;
  const keys = Object.keys(document.explanations);
  if (keys.length !== questionCount) {
    failures.push(`${examId}: ${questionCount}개 문항 중 ${keys.length}개 해설`);
  }

  for (let number = 1; number <= questionCount; number += 1) {
    const entry = document.explanations[String(number)];
    if (!entry) {
      failures.push(`${examId}#${number}: 해설 누락`);
      continue;
    }
    const explanation = String(entry.explanation || "").trim();
    const takeaway = String(entry.takeaway || "").trim();
    if (explanation.length < 45) failures.push(`${examId}#${number}: 해설이 너무 짧음 (${explanation.length}자)`);
    if (takeaway.length < 8) failures.push(`${examId}#${number}: 한 줄 암기가 너무 짧음 (${takeaway.length}자)`);
    if (/상세 해설은 준비 중|정답 확인용|기출 정답은 \d번입니다|문제 유형을 묻|공통 기준에서 벗어난/.test(explanation)) {
      failures.push(`${examId}#${number}: 일반 안내형 문구가 남아 있음`);
    }
    if (/undefined|\bnull\b/.test(`${explanation} ${takeaway}`)) {
      failures.push(`${examId}#${number}: 잘못된 값 포함`);
    }
    explanationCount += 1;
  }

  detailedExplanations[examId] = document.explanations;
}

if (failures.length) {
  throw new Error(`상세해설 검증 실패:\n${failures.slice(0, 60).join("\n")}`);
}

const output = `// 이 파일은 scripts/build-detailed-explanations.mjs가 생성합니다.\nwindow.URBAN_PLAN_DETAILED_EXPLANATIONS = ${JSON.stringify(detailedExplanations)};\n`;
await writeFile(outputPath, output, "utf8");

console.log(
  `상세해설 ${explanationCount}개를 ${Object.keys(detailedExplanations).length}개 회차에서 빌드했습니다.${
    missingExamIds.length ? ` 미작성 회차 ${missingExamIds.length}개.` : ""
  }`,
);
