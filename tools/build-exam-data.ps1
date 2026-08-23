param(
  [string]$OutputDirectory = (Join-Path $PSScriptRoot "..\data")
)

$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

$sourceIndexUrl = "https://www.comcbt.com/xe/dy"
$webCatalogUrl = "https://www.comcbt.com/xe/webhaesul/10056270"
$latestExamId = "15428"

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

function ConvertTo-AbsoluteImageUrl {
  param([string]$Value)

  $decoded = [System.Net.WebUtility]::HtmlDecode($Value)
  if ($decoded.StartsWith("//")) {
    return "https:$decoded"
  }
  if ($decoded.StartsWith("/")) {
    return "https://www.comcbt.com$decoded"
  }
  return $decoded
}

function Get-ImageUrls {
  param([AllowEmptyString()][string]$Html)

  if ([string]::IsNullOrWhiteSpace($Html)) {
    return @()
  }

  return @(
    [regex]::Matches($Html, '<img[^>]+src=[''"]([^''"]+)[''"]') |
      ForEach-Object { ConvertTo-AbsoluteImageUrl -Value $_.Groups[1].Value } |
      Where-Object { $_ -notmatch '/cbt/cbt\.gif' } |
      Select-Object -Unique
  )
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

function Get-SourceArticlesByDate {
  $articles = @{}

  foreach ($page in 1..4) {
    $pageUrl = if ($page -eq 1) {
      $sourceIndexUrl
    } else {
      "https://www.comcbt.com/xe/index.php?mid=dy&page=$page"
    }
    $pageHtml = (Invoke-WebRequest -Uri $pageUrl -UseBasicParsing).Content

    foreach ($linkMatch in [regex]::Matches($pageHtml, '(?is)<a\s+href="([^"]+)"[^>]*>(.*?)</a>')) {
      $linkText = ConvertFrom-ExamHtml -Value $linkMatch.Groups[2].Value
      $titleMatch = [regex]::Match(
        $linkText,
        '도시계획기사 필기 기출문제 및 CBT\s*(\d{4})년\s*(\d{2})월\s*(\d{2})일\(([^)]+)\)'
      )
      if (-not $titleMatch.Success) {
        continue
      }

      $href = [System.Net.WebUtility]::HtmlDecode($linkMatch.Groups[1].Value)
      $documentMatch = [regex]::Match($href, '(?:/xe/dy/|document_srl=)(\d+)')
      if (-not $documentMatch.Success) {
        continue
      }

      $date = "$($titleMatch.Groups[1].Value)-$($titleMatch.Groups[2].Value)-$($titleMatch.Groups[3].Value)"
      $articles[$date] = "https://www.comcbt.com/xe/dy/$($documentMatch.Groups[1].Value)"
    }
  }

  return $articles
}

function Get-ExamQuestions {
  param(
    [string]$ExamId,
    [string]$ExamUrl
  )

  $examHtml = (Invoke-WebRequest -Uri $ExamUrl -UseBasicParsing).Content
  $blocks = [regex]::Matches(
    $examHtml,
    '(?s)<div class="grid-box(?:-red)?">(.*?)(?=<br><div class="grid-box(?:-red)?">|<br><center>|</body>)'
  )

  if ($blocks.Count -ne 100) {
    throw "Expected 100 questions for exam $ExamId, found $($blocks.Count)."
  }

  $questions = foreach ($blockMatch in $blocks) {
    $block = $blockMatch.Value
    $numberMatch = [regex]::Match($block, "class='no-wrap'><b>(\d+)\. </b>")
    $questionMatch = [regex]::Match(
      $block,
      "(?s)class='no-wrap'><b>\d+\. </b></td><td valign='top'><b>(.*?)</b></td></tr></table>"
    )
    $answerMatch = [regex]::Match($block, "id='jungdabcolor\d+'[^>]*>([1-4])</div>")
    $accuracyMatch = [regex]::Match($block, "정답률\s*:\s*(\d+)%")
    $optionMatches = [regex]::Matches(
      $block,
      "(?s)<table><tr><td valign='top'>&nbsp;&nbsp;&nbsp;([1-4])\. </td><td valign='top'>(.*?)</td></tr></table>"
    )

    if (-not $numberMatch.Success -or -not $questionMatch.Success -or -not $answerMatch.Success) {
      throw "Could not parse a question block for exam $ExamId."
    }
    if ($optionMatches.Count -ne 4) {
      throw "Exam $ExamId question $($numberMatch.Groups[1].Value) does not have four parsed choices."
    }

    $number = [int]$numberMatch.Groups[1].Value
    $subject = Get-SubjectInfo -QuestionNumber $number
    $options = @()
    $optionImageUrls = @()
    $optionImagesFlat = @()

    foreach ($optionMatch in $optionMatches) {
      $optionHtml = $optionMatch.Groups[2].Value
      $optionImages = @(Get-ImageUrls -Html $optionHtml)
      $options += ConvertFrom-ExamHtml -Value $optionHtml
      $optionImageUrls += ,$optionImages
      $optionImagesFlat += $optionImages
    }

    $allImages = @(Get-ImageUrls -Html $block)
    $questionImageUrls = @(
      $allImages | Where-Object { $optionImagesFlat -notcontains $_ }
    )

    [ordered]@{
      id = if ($ExamId -eq $latestExamId) {
        "2022-1-q$($number.ToString('000'))"
      } else {
        "$ExamId-q$($number.ToString('000'))"
      }
      number = $number
      subject = $subject.id
      subjectLabel = $subject.label
      question = ConvertFrom-ExamHtml -Value $questionMatch.Groups[1].Value
      options = @($options)
      optionImageUrls = @($optionImageUrls)
      questionImageUrls = @($questionImageUrls)
      answer = ([int]$answerMatch.Groups[1].Value) - 1
      accuracy = if ($accuracyMatch.Success) { [int]$accuracyMatch.Groups[1].Value } else { $null }
      sourceUrl = "https://www.comcbt.com/cbt/problem/$ExamId/$number/"
    }
  }

  return @($questions)
}

$sourceArticles = Get-SourceArticlesByDate
$catalogHtml = (Invoke-WebRequest -Uri $webCatalogUrl -UseBasicParsing).Content
$catalogBody = [regex]::Match(
  $catalogHtml,
  '(?s)<div class="document_10056270_4 xe_content">(.*?)</div><!--AfterDocument'
).Groups[1].Value

$catalogMatches = [regex]::Matches(
  $catalogBody,
  "도시계획기사 필기 기출문제\s*(\d{4})년(\d{2})월(\d{2})일\s*\(([^)]+)\)\s*CBT 포함\s*:\s*<a href='https://www\.comcbt\.com/cbt/exam/(\d+)/'"
)

$catalog = @(
  foreach ($match in $catalogMatches) {
    $id = $match.Groups[5].Value
    $date = "$($match.Groups[1].Value)-$($match.Groups[2].Value)-$($match.Groups[3].Value)"
    [ordered]@{
      id = $id
      date = $date
      round = $match.Groups[4].Value
      title = "$($match.Groups[1].Value)년 $($match.Groups[4].Value)"
      sourceUrl = "https://www.comcbt.com/cbt/exam/$id/"
      articleUrl = if ($sourceArticles.ContainsKey($date)) { $sourceArticles[$date] } else { $sourceIndexUrl }
      available = $true
    }
  }
)

if ($catalog.Count -ne 59) {
  throw "Expected 59 catalog entries, found $($catalog.Count)."
}

$archive = [ordered]@{}
foreach ($entry in $catalog) {
  Write-Output "Fetching $($entry.title) ($($entry.id))..."
  $questions = Get-ExamQuestions -ExamId $entry.id -ExamUrl $entry.sourceUrl
  $archive[$entry.id] = [ordered]@{
    id = $entry.id
    title = "도시계획기사 필기 $($entry.title)"
    date = $entry.date
    round = $entry.round
    durationMinutes = 150
    questionCount = $questions.Count
    subjectCount = 5
    sourceUrl = $entry.sourceUrl
    sourceArticleUrl = $entry.articleUrl
    sourceIndexUrl = $sourceIndexUrl
    questions = @($questions)
  }
}

New-Item -ItemType Directory -Path $OutputDirectory -Force | Out-Null

$catalogJson = $catalog | ConvertTo-Json -Depth 8 -Compress
$archiveJson = $archive | ConvertTo-Json -Depth 12 -Compress
$latestExamJson = $archive[$latestExamId] | ConvertTo-Json -Depth 12 -Compress

Set-Content -LiteralPath (Join-Path $OutputDirectory "exam-catalog.js") -Encoding utf8 -Value (
  "window.URBAN_PLAN_EXAM_CATALOG = $catalogJson;"
)
Set-Content -LiteralPath (Join-Path $OutputDirectory "exam-archive.js") -Encoding utf8 -Value (
  "window.URBAN_PLAN_EXAM_ARCHIVE = $archiveJson;"
)
Set-Content -LiteralPath (Join-Path $OutputDirectory "exam-2022-1.js") -Encoding utf8 -Value (
  "window.URBAN_PLAN_EXAM_2022_1 = $latestExamJson;"
)

$questionTotal = ($archive.Values | ForEach-Object { $_.questions.Count } | Measure-Object -Sum).Sum
Write-Output "Generated $questionTotal questions across $($catalog.Count) exams."
