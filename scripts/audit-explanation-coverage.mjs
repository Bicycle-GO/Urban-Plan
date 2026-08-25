import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));

function parseWindowAssignment(source) {
  const start = source.indexOf("=");
  const end = source.lastIndexOf(";");
  return JSON.parse(source.slice(start + 1, end));
}

function classifyQuestion(question) {
  const prompt = question.question || "";
  const answer = question.options?.[question.answer] || "";

  if (/순서|절차|단계|배열|선후|진행과정/.test(prompt)) return "sequence";
  if (/계산|산정|구하|값은|얼마|면적은|인구는|비율은|지수는|공식|수식|추정치/.test(prompt)) {
    return "calculation";
  }
  if (/인물|누구|학자|주장|제안|저서|헌장|최초|연도|시대|설계한 사람/.test(prompt)) {
    return "history";
  }
  if (/옳지 않|틀린|아닌 것|거리가 먼|적절하지|해당하지|잘못|보기 어려운|관련이 없는/.test(prompt)) {
    return "exception";
  }
  if (/용어|명칭|무엇|개념|정의|의미|설명한 것은|해당하는 것은/.test(prompt)) return "definition";
  if (/^[\d\s.,%㎡㎢ha년월일~\-+/=()]+$/.test(answer)) return "numeric-answer";
  return "principle";
}

const archiveSource = await readFile(join(projectRoot, "data/exam-archive.js"), "utf8");
const archive = parseWindowAssignment(archiveSource);
const subjectCounts = new Map();
const typeCounts = new Map();
const answerCounts = new Map();
const crossCounts = new Map();
let total = 0;

for (const exam of Object.values(archive)) {
  for (const question of exam.questions) {
    total += 1;
    const subject = question.subject || "unknown";
    const type = classifyQuestion(question);
    const answer = question.options?.[question.answer] || "";
    subjectCounts.set(subject, (subjectCounts.get(subject) || 0) + 1);
    typeCounts.set(type, (typeCounts.get(type) || 0) + 1);
    crossCounts.set(`${subject}/${type}`, (crossCounts.get(`${subject}/${type}`) || 0) + 1);
    if (answer.length >= 2 && answer.length <= 80) {
      answerCounts.set(answer, (answerCounts.get(answer) || 0) + 1);
    }
  }
}

const sortCounts = (map) => [...map.entries()].sort((a, b) => b[1] - a[1]);

console.log(JSON.stringify({
  exams: Object.keys(archive).length,
  total,
  subjectCounts: Object.fromEntries(sortCounts(subjectCounts)),
  typeCounts: Object.fromEntries(sortCounts(typeCounts)),
  crossCounts: Object.fromEntries(sortCounts(crossCounts)),
  topAnswers: sortCounts(answerCounts).slice(0, 80),
}, null, 2));
