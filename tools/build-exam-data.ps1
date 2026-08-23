param(
  [string]$OutputDirectory = (Join-Path $PSScriptRoot "..\data")
)

$ErrorActionPreference = "Stop"

$catalogUrl = "https://www.comcbt.com/xe/webhaesul/10056270"
$examId = "15428"
$examUrl = "https://www.comcbt.com/cbt/exam/$examId/"

function ConvertFrom-ExamHtml {
  param([AllowEmptyString()][string]$Value)

  if ([string]::IsNullOrWhiteSpace($Value)) {
    return ""
  }

  $text = $Value
  $text = [regex]::Replace($text, "(?is)<br\s*/?>", "`n")
  $text = [regex]::Replace($text, "(?is)<sup>(.*?)</sup>", "^(`$1)")
  $text = [regex]::Replace($text, "(?is)<sub>(.*?)</sub>", "_(`$1)")
  $text = [regex]::Replace($text, "(?is)<[^>]+>", "")
  $text = [System.Net.WebUtility]::HtmlDecode($text)
  $text = $text.Replace([char]0x00A0, " ")
  $text = [regex]::Replace($text, "[ \t]+", " ")
  $text = [regex]::Replace($text, "\s*`r?`n\s*", "`n")
  return $text.Trim()
}

function Get-SubjectInfo {
  param([int]$QuestionNumber)

  if ($QuestionNumber -le 20) {
    return [ordered]@{ id = "planning"; label = "도시계획론" }
  }
  if ($QuestionNumber -le 40) {
    return [ordered]@{ id = "design"; label = "도시설계 및 단지계획" }
  }
  if ($QuestionNumber -le 60) {
    return [ordered]@{ id = "development"; label = "도시개발론" }
  }
  if ($QuestionNumber -le 80) {
    return [ordered]@{ id = "regional"; label = "국토 및 지역계획" }
  }
  return [ordered]@{ id = "law"; label = "도시계획관계법규" }
}

$catalogHtml = (Invoke-WebRequest -Uri $catalogUrl -UseBasicParsing).Content
$catalogBody = [regex]::Match(
  $catalogHtml,
  '(?s)<div class="document_10056270_4 xe_content">(.*?)</div><!--AfterDocument'
).Groups[1].Value

$catalogMatches = [regex]::Matches(
  $catalogBody,
  "도시계획기사 필기 기출문제\s*(\d{4})년(\d{2})월(\d{2})일\s*\(([^)]+)\)\s*CBT 포함\s*:\s*<a href='https://www\.comcbt\.com/cbt/exam/(\d+)/'"
)

$catalog = foreach ($match in $catalogMatches) {
  $id = $match.Groups[5].Value
  [ordered]@{
    id = $id
    date = "$($match.Groups[1].Value)-$($match.Groups[2].Value)-$($match.Groups[3].Value)"
    round = $match.Groups[4].Value
    title = "$($match.Groups[1].Value)년 $($match.Groups[4].Value)"
    sourceUrl = "https://www.comcbt.com/cbt/exam/$id/"
    available = ($id -eq $examId)
  }
}

$examHtml = (Invoke-WebRequest -Uri $examUrl -UseBasicParsing).Content
$blocks = [regex]::Matches(
  $examHtml,
  '(?s)<div class="grid-box(?:-red)?">(.*?)(?=<br><div class="grid-box(?:-red)?">|<br><center>|</body>)'
)

if ($blocks.Count -ne 100) {
  throw "Expected 100 questions, found $($blocks.Count)."
}

$questions = foreach ($blockMatch in $blocks) {
  $block = $blockMatch.Value
  $numberMatch = [regex]::Match($block, "class='no-wrap'><b>(\d+)\. </b>")
  $questionMatch = [regex]::Match(
    $block,
    "(?s)class='no-wrap'><b>\d+\. </b></td><td valign='top'><b>(.*?)</b></td></tr></table>"
  )
  $answerMatch = [regex]::Match(
    $block,
    "id='jungdabcolor\d+'[^>]*>([1-4])</div>"
  )
  $accuracyMatch = [regex]::Match($block, "정답률\s*:\s*(\d+)%")
  $optionMatches = [regex]::Matches(
    $block,
    "(?s)<table><tr><td valign='top'>&nbsp;&nbsp;&nbsp;([1-4])\. </td><td valign='top'>(.*?)</td></tr></table>"
  )
  $imageMatches = [regex]::Matches($block, '<img[^>]+src=[''"]([^''"]+)[''"]')

  if (-not $numberMatch.Success -or -not $questionMatch.Success -or -not $answerMatch.Success) {
    throw "Could not parse a question block."
  }
  if ($optionMatches.Count -ne 4) {
    throw "Question $($numberMatch.Groups[1].Value) does not have four parsed choices."
  }

  $number = [int]$numberMatch.Groups[1].Value
  $subject = Get-SubjectInfo -QuestionNumber $number
  $options = foreach ($optionMatch in $optionMatches) {
    ConvertFrom-ExamHtml -Value $optionMatch.Groups[2].Value
  }

  [ordered]@{
    id = "2022-1-q$($number.ToString('000'))"
    number = $number
    subject = $subject.id
    subjectLabel = $subject.label
    question = ConvertFrom-ExamHtml -Value $questionMatch.Groups[1].Value
    options = @($options)
    answer = ([int]$answerMatch.Groups[1].Value) - 1
    accuracy = if ($accuracyMatch.Success) { [int]$accuracyMatch.Groups[1].Value } else { $null }
    hasFigure = ($imageMatches.Count -gt 0)
    sourceUrl = "https://www.comcbt.com/cbt/problem/$examId/$number/"
  }
}

$exam = [ordered]@{
  id = $examId
  title = "도시계획기사 필기 2022년 제1회"
  date = "2022-03-05"
  round = "1회"
  durationMinutes = 150
  questionCount = 100
  subjectCount = 5
  sourceUrl = $examUrl
  sourceIndexUrl = $catalogUrl
  questions = @($questions)
}

New-Item -ItemType Directory -Path $OutputDirectory -Force | Out-Null

$catalogJson = $catalog | ConvertTo-Json -Depth 6 -Compress
$examJson = $exam | ConvertTo-Json -Depth 8 -Compress

Set-Content -LiteralPath (Join-Path $OutputDirectory "exam-catalog.js") -Encoding utf8 -Value (
  "window.URBAN_PLAN_EXAM_CATALOG = $catalogJson;"
)
Set-Content -LiteralPath (Join-Path $OutputDirectory "exam-2022-1.js") -Encoding utf8 -Value (
  "window.URBAN_PLAN_EXAM_2022_1 = $examJson;"
)

Write-Output "Generated $($questions.Count) questions and $($catalog.Count) catalog entries."
