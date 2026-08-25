const STORAGE_KEY = "urban-plan-exam-study-v2";
const EXAM_DURATION_SECONDS = 150 * 60;

const subjects = [
  {
    id: "planning",
    title: "도시계획론",
    exam: "필기 1과목",
    overview:
      "도시계획의 개념, 도시화, 계획이론, 조사분석, 도시기본계획과 도시관리계획의 틀을 잡는 과목입니다.",
    tags: ["계획이론", "생활권", "토지이용", "도시조사"],
    lectures: [
      {
        title: "도시계획의 성격",
        points: [
          "도시문제 해결과 미래 공간질서 형성을 위한 공공적 의사결정 과정",
          "종합성, 장기성, 공공성, 실현가능성을 함께 판단",
          "도시기본계획은 장기 종합계획, 도시관리계획은 집행계획으로 정리",
        ],
      },
      {
        title: "도시화와 도시구조",
        points: [
          "집중, 교외화, 재도시화 흐름을 도시문제와 연결",
          "동심원, 선형, 다핵 구조 모형의 전제와 한계를 비교",
          "생활권은 규모와 기능 단계별로 근린, 지구, 도시권으로 해석",
        ],
      },
      {
        title: "조사분석과 계획지표",
        points: [
          "인구, 산업, 토지이용, 교통, 환경 자료를 계획목표와 연결",
          "계획인구는 추세연장, 사회적 증가, 수용능력 검토를 함께 사용",
          "지표는 현황 설명이 아니라 대안 비교의 근거로 활용",
        ],
      },
      {
        title: "토지이용계획",
        points: [
          "주거, 상업, 공업, 녹지, 기반시설의 상충과 보완 관계를 파악",
          "혼합용도, 압축도시, TOD는 교통과 토지이용의 결합으로 이해",
          "계획도는 색채보다 배치 논리와 면적표의 정합성이 중요",
        ],
      },
    ],
    terms: [
      ["도시기본계획", "장기 발전방향과 공간구조를 제시하는 종합계획"],
      ["도시관리계획", "용도지역, 기반시설, 도시개발사업 등 집행을 위한 계획"],
      ["생활권", "일상생활 서비스 이용권을 기준으로 나눈 계획 단위"],
      ["TOD", "대중교통 결절점을 중심으로 고밀 복합개발을 유도하는 방식"],
    ],
  },
  {
    id: "design",
    title: "도시설계 및 단지계획",
    exam: "필기 2과목",
    overview:
      "가로, 블록, 경관, 주거단지, 공공공간을 실제 공간으로 구성하는 방법을 다룹니다.",
    tags: ["가로망", "근린주구", "경관", "주거단지"],
    lectures: [
      {
        title: "근린주구와 주거단지",
        points: [
          "초등학교와 생활편익시설을 보행권 중심에 배치하는 개념을 이해",
          "간선도로는 주거단지 내부를 관통하지 않도록 경계부에 두는 원칙",
          "주거밀도, 오픈스페이스, 주차, 보행동선을 함께 검토",
        ],
      },
      {
        title: "가로와 블록",
        points: [
          "위계는 간선, 보조간선, 집산, 국지도로로 기능을 구분",
          "보행친화 도시는 짧은 블록, 접지부 활성, 안전한 횡단이 핵심",
          "격자형, 방사환상형, 쿨데삭의 장단점을 비교",
        ],
      },
      {
        title: "경관과 공공공간",
        points: [
          "조망축, 랜드마크, 스카이라인, 녹지축을 도면에 명확히 표현",
          "공원녹지는 잔여지가 아니라 생활권 접근성과 생태축으로 계획",
          "CPTED는 자연감시, 접근통제, 영역성, 유지관리로 정리",
        ],
      },
      {
        title: "단지계획 실무",
        points: [
          "대지 조건, 법적 기준, 동선, 시설 배치를 순서대로 결정",
          "학교, 공원, 커뮤니티 시설은 이용권과 안전한 보행로로 연결",
          "도면에는 방위, 축척, 범례, 면적표, 계획 의도가 빠지지 않아야 함",
        ],
      },
    ],
    terms: [
      ["근린주구", "초등학교와 생활편익시설을 중심으로 한 주거계획 단위"],
      ["가로 위계", "교통 처리 기능에 따라 도로를 단계적으로 조직하는 방식"],
      ["CPTED", "범죄예방 환경설계. 자연감시와 영역성 확보가 핵심"],
      ["오픈스페이스", "공원, 광장, 녹지처럼 공공적 활동과 환경 기능을 갖는 공간"],
    ],
  },
  {
    id: "development",
    title: "도시개발론",
    exam: "필기 3과목",
    overview:
      "개발사업 방식, 환지와 수용, 정비사업, 사업성, 공공성과 민간참여 구조를 공부합니다.",
    tags: ["환지", "수용", "정비사업", "사업성"],
    lectures: [
      {
        title: "도시개발사업의 구조",
        points: [
          "사업 목적, 시행자, 시행방식, 토지확보, 비용부담 구조를 세트로 정리",
          "환지방식은 토지소유권을 이전하지 않고 재배치와 감보로 비용을 부담",
          "수용 또는 사용방식은 공공성, 보상, 사업 속도와 연결",
        ],
      },
      {
        title: "정비사업",
        points: [
          "주거환경개선, 재개발, 재건축의 대상과 시행 구조를 구분",
          "권리관계, 이주대책, 기반시설 확보가 빈출 포인트",
          "사업 추진 단계는 기본계획, 구역지정, 조합, 사업시행, 관리처분 흐름",
        ],
      },
      {
        title: "개발경제와 사업성",
        points: [
          "총사업비, 분양수입, 공공기여, 금융비용, 리스크를 함께 판단",
          "NPV, IRR, B/C는 투자 판단의 기본 지표",
          "공공개발은 수익성만이 아니라 형평성과 장기 편익을 반영",
        ],
      },
      {
        title: "개발관리",
        points: [
          "난개발 방지는 기반시설 연동과 성장관리의 관점에서 접근",
          "개발권양도제, 기반시설부담, 공공기여의 목적을 비교",
          "민관협력은 역할 배분과 위험 배분 구조가 쟁점",
        ],
      },
    ],
    terms: [
      ["환지", "종전 토지 대신 사업 후 토지를 다시 배분하는 방식"],
      ["감보", "공공시설 용지와 사업비 충당을 위해 토지 면적을 줄이는 것"],
      ["관리처분계획", "정비사업에서 권리와 분양, 비용부담을 정하는 계획"],
      ["B/C", "편익을 비용으로 나눈 경제성 판단 지표"],
    ],
  },
  {
    id: "regional",
    title: "국토 및 지역계획",
    exam: "필기 4과목",
    overview:
      "국토계획 체계, 지역경제, 입지론, 성장거점, 광역권, 균형발전 정책을 연결합니다.",
    tags: ["국토계획", "입지론", "균형발전", "광역권"],
    lectures: [
      {
        title: "국토계획 체계",
        points: [
          "상위계획과 하위계획의 위계, 정합성, 환류를 함께 기억",
          "국토종합계획은 장기 국토공간 방향을 제시",
          "도시권과 광역권은 행정구역보다 기능적 연계를 기준으로 판단",
        ],
      },
      {
        title: "입지론과 공간경제",
        points: [
          "베버의 공업입지론은 수송비, 노동비, 집적경제를 중심으로 정리",
          "크리스탈러 중심지이론은 재화 공급과 배후지 계층 구조가 핵심",
          "뢰쉬, 튀넨, 호이트 모형은 전제와 적용 범위를 같이 비교",
        ],
      },
      {
        title: "지역개발이론",
        points: [
          "성장거점, 누적적 인과, 내생적 발전, 클러스터를 구분",
          "불균형 성장 전략은 파급효과와 역류효과를 함께 검토",
          "균형발전 정책은 접근성, 산업기반, 삶의 질 지표로 평가",
        ],
      },
      {
        title: "광역교통과 인프라",
        points: [
          "통근권, 생활권, 물류권 자료로 광역 계획의 범위를 잡음",
          "철도역, 터미널, 환승센터는 토지이용계획과 결합해 판단",
          "환경축과 재해위험도는 개발 가능지 선별의 제한 조건",
        ],
      },
    ],
    terms: [
      ["중심지이론", "재화와 서비스 공급 중심지가 계층적으로 배치된다는 이론"],
      ["성장거점", "특정 거점 개발을 통해 주변 지역으로 파급을 기대하는 전략"],
      ["집적경제", "기업과 활동이 모여 비용 절감과 생산성 향상을 얻는 효과"],
      ["광역권", "통근, 산업, 서비스 이용 등 기능적 연계가 강한 권역"],
    ],
  },
  {
    id: "law",
    title: "도시계획관계법규",
    exam: "필기 5과목",
    overview:
      "국토계획법을 중심으로 도시개발, 정비, 주택, 건축, 보상 관련 법 체계를 정리합니다.",
    tags: ["국토계획법", "용도지역", "기반시설", "개발행위"],
    lectures: [
      {
        title: "국토계획법 체계",
        points: [
          "광역도시계획, 도시기본계획, 도시관리계획의 위계를 구분",
          "용도지역, 용도지구, 용도구역은 지정 목적과 제한 내용이 다름",
          "도시계획시설과 기반시설의 개념 차이를 확인",
        ],
      },
      {
        title: "용도지역과 개발행위",
        points: [
          "건폐율, 용적률, 행위제한은 지역별 숫자보다 체계 이해가 먼저",
          "개발행위허가는 토지형질변경, 건축, 공작물 설치 등을 관리",
          "성장관리계획은 비시가화지역의 계획적 개발 유도와 연결",
        ],
      },
      {
        title: "도시개발과 정비 법령",
        points: [
          "도시개발법은 구역지정, 시행자, 시행방식, 환지계획을 중심으로 학습",
          "도시정비법은 정비구역, 조합, 사업시행계획, 관리처분계획을 구분",
          "주택법과 건축법은 단지계획, 대지, 도로, 건축기준과 연결",
        ],
      },
      {
        title: "법규 문제 풀이법",
        points: [
          "정의, 절차, 권한 주체, 숫자 기준으로 문제를 분해",
          "법령명과 계획명을 혼동하지 않도록 표로 정리",
          "개정 가능성이 있어 접수 회차 전 최신 법령과 Q-Net 공고 확인",
        ],
      },
    ],
    terms: [
      ["용도지역", "토지의 이용과 건축물 용도, 밀도를 포괄적으로 제한"],
      ["용도지구", "용도지역 기능을 보완해 경관, 고도, 방재 등을 세부 제한"],
      ["용도구역", "시가지 확산 방지, 자연 보전 등 특정 목적의 강한 제한"],
      ["개발행위허가", "난개발 방지와 기반시설 적정성을 검토하는 허가 제도"],
    ],
  },
];

const sampleWrittenQuestions = [
  {
    id: "w01",
    subject: "planning",
    level: "기본",
    question: "도시기본계획의 성격으로 가장 적절한 것은?",
    options: [
      "개별 건축허가 여부를 직접 결정하는 단기 집행계획",
      "장기적인 도시 발전방향과 공간구조를 제시하는 종합계획",
      "정비사업의 분양권 배분만을 정하는 권리계획",
      "도로 폭원과 포장 재료만을 정하는 시설 설계도",
    ],
    answer: 1,
    explanation:
      "도시기본계획은 장기적이고 종합적인 방향계획입니다. 구체적인 집행은 도시관리계획, 사업계획, 실시계획 단계에서 다룹니다.",
    takeaway: "기본계획은 방향, 관리계획은 집행으로 구분합니다.",
  },
  {
    id: "w02",
    subject: "design",
    level: "기본",
    question: "근린주구 이론에서 초등학교와 생활편익시설 배치 원칙으로 적절한 것은?",
    options: [
      "단지 외곽 간선도로 교차부에 집중 배치한다",
      "보행 접근이 쉬운 중심부에 배치하고 통과교통을 줄인다",
      "공업지역과 접한 완충녹지 내부에 배치한다",
      "대중교통 접근성과 무관하게 주차장 규모만 기준으로 배치한다",
    ],
    answer: 1,
    explanation:
      "근린주구는 일상 서비스와 초등학교를 보행권 안에서 이용하도록 계획하는 것이 핵심입니다. 간선도로 통과교통은 주거지 내부에서 배제합니다.",
    takeaway: "근린주구는 보행권, 초등학교, 생활편익시설, 통과교통 배제가 핵심입니다.",
  },
  {
    id: "w03",
    subject: "development",
    level: "중요",
    question: "환지방식 도시개발사업에 대한 설명으로 옳은 것은?",
    options: [
      "모든 토지를 전면 매수해 공공이 새로 분양하는 방식이다",
      "종전 권리를 고려해 사업 후 토지를 다시 배분할 수 있다",
      "토지소유자는 사업비 부담과 무관하게 종전 면적을 반드시 그대로 돌려받는다",
      "기반시설 설치와 토지 재배치는 사업 내용에 포함될 수 없다",
    ],
    answer: 1,
    explanation:
      "환지방식은 종전 토지의 권리관계를 바탕으로 사업 후 토지를 재배치합니다. 공공시설 용지와 사업비 충당을 위해 감보가 발생할 수 있습니다.",
    takeaway: "환지, 감보, 체비지, 권리 재배분을 한 묶음으로 기억합니다.",
  },
  {
    id: "w04",
    subject: "regional",
    level: "기본",
    question: "크리스탈러의 중심지이론과 가장 관련이 깊은 개념은?",
    options: [
      "농업 토지이용의 동심원적 분화",
      "재화와 서비스 공급 중심지의 계층적 배치",
      "공업 입지의 최소수송비 지점 탐색",
      "도시 내부 주거지의 부채꼴 확장",
    ],
    answer: 1,
    explanation:
      "중심지이론은 중심지가 배후지에 재화와 서비스를 공급하며 계층 구조를 형성한다고 봅니다.",
    takeaway: "크리스탈러는 중심지와 배후지, 베버는 공업입지, 튀넨은 농업입지입니다.",
  },
  {
    id: "w05",
    subject: "law",
    level: "중요",
    question: "용도지역, 용도지구, 용도구역의 관계 설명으로 적절한 것은?",
    options: [
      "셋은 모두 같은 제도이며 명칭만 다르다",
      "용도지구는 용도지역의 기능을 보완해 세부 목적의 제한을 더할 수 있다",
      "용도구역은 건축물 색채만 정하는 임의 디자인 지침이다",
      "용도지역은 도시계획과 무관하게 민간 협약으로만 지정된다",
    ],
    answer: 1,
    explanation:
      "용도지역은 기본적인 토지이용과 밀도 제한의 틀이고, 용도지구는 경관, 고도, 방재 등 보완 목적의 제한을 더합니다. 용도구역은 특정 목적의 강한 공간 관리 수단입니다.",
    takeaway: "지역은 기본 틀, 지구는 보완, 구역은 특수 목적 관리로 정리합니다.",
  },
  {
    id: "w06",
    subject: "planning",
    level: "중요",
    question: "계획인구 추정 시 유의할 점으로 가장 적절한 것은?",
    options: [
      "최근 1년 증가율만 사용하면 장기계획에 충분하다",
      "추세연장 결과와 개발수용능력, 정책적 유입 가능성을 함께 검토한다",
      "인구추정은 토지이용계획과 무관하므로 별도로 계산한다",
      "감소도시는 계획인구 검토가 필요 없다",
    ],
    answer: 1,
    explanation:
      "계획인구는 단순 외삽만으로 정하지 않습니다. 과거 추세, 개발사업, 산업 변화, 기반시설 수용능력, 정책 목표를 종합해야 합니다.",
    takeaway: "인구는 토지이용, 시설규모, 교통수요의 출발점입니다.",
  },
  {
    id: "w07",
    subject: "design",
    level: "응용",
    question: "보차분리 계획의 주된 목적과 가장 가까운 것은?",
    options: [
      "차량 통행속도를 모든 도로에서 동일하게 유지",
      "보행 안전성과 생활공간의 쾌적성을 높임",
      "도로 위계를 없애고 모든 교차로를 대형화",
      "공원녹지 면적을 줄여 주차장으로 전환",
    ],
    answer: 1,
    explanation:
      "보차분리는 보행자와 차량의 상충을 줄여 안전, 쾌적성, 생활권 연결성을 높이는 계획 원리입니다.",
    takeaway: "단지계획 문제는 안전, 접근성, 위계, 생활권을 함께 봅니다.",
  },
  {
    id: "w08",
    subject: "development",
    level: "응용",
    question: "도시정비사업 추진 과정에서 관리처분계획이 주로 다루는 내용은?",
    options: [
      "정비구역 안 권리자의 종후 자산 배분과 비용부담",
      "전국 국토축의 장기 발전방향",
      "초등학교 통학구역의 교육과정 편성",
      "공원 식재 수종의 생육 관리만을 위한 계획",
    ],
    answer: 0,
    explanation:
      "관리처분계획은 기존 권리와 종후 자산, 분양, 비용부담 등 권리관계를 정리하는 중요한 단계입니다.",
    takeaway: "정비사업은 구역지정, 조합, 사업시행, 관리처분, 착공 흐름으로 잡습니다.",
  },
  {
    id: "w09",
    subject: "regional",
    level: "중요",
    question: "성장거점전략의 한계로 자주 지적되는 것은?",
    options: [
      "거점 집중 투자가 주변 지역으로 충분히 파급되지 않을 수 있음",
      "어떤 경우에도 지역 간 격차를 즉시 해소함",
      "교통 접근성과 산업 연계성을 전혀 고려하지 않음",
      "소규모 생활권 계획에서만 사용 가능함",
    ],
    answer: 0,
    explanation:
      "성장거점전략은 거점의 성장 효과가 주변으로 확산될 것을 기대하지만, 역류효과나 격차 확대 가능성도 검토해야 합니다.",
    takeaway: "파급효과와 역류효과를 같이 쓰면 서술형에서도 점수를 얻습니다.",
  },
  {
    id: "w10",
    subject: "law",
    level: "기본",
    question: "도시계획시설에 해당하는 기반시설 예시로 가장 적절한 것은?",
    options: [
      "도로, 공원, 학교, 하수도 등 공공적 기능의 시설",
      "개인 취미를 위한 실내 장식품",
      "사업자 내부 회계 장부",
      "건축물의 임대차 계약서 양식",
    ],
    answer: 0,
    explanation:
      "도시계획시설은 도시 기능 유지와 공공복리를 위해 계획적으로 설치되는 기반시설입니다.",
    takeaway: "기반시설 종류는 기능별로 묶어 외우면 법규 점수가 안정됩니다.",
  },
  {
    id: "w11",
    subject: "planning",
    level: "응용",
    question: "압축도시 정책의 기대효과로 보기 어려운 것은?",
    options: [
      "대중교통 이용과 보행 접근성 향상",
      "기반시설의 효율적 이용",
      "무분별한 도시 외연 확산 억제",
      "도시 활동을 전면 저밀 분산해 통행거리를 늘림",
    ],
    answer: 3,
    explanation:
      "압축도시는 고밀 복합, 대중교통 중심, 외연 확산 억제를 추구합니다. 저밀 분산과 장거리 통행 증가는 반대 방향입니다.",
    takeaway: "압축도시, TOD, 혼합용도는 함께 출제되는 경우가 많습니다.",
  },
  {
    id: "w12",
    subject: "law",
    level: "중요",
    question: "법규 과목을 공부할 때 가장 안정적인 접근법은?",
    options: [
      "숫자 기준만 외우고 계획 체계는 보지 않는다",
      "정의, 지정권자, 절차, 행위제한, 예외를 표로 비교한다",
      "기출문제의 보기 순서만 외운다",
      "개정 가능성이 없으므로 오래된 요약본만 사용한다",
    ],
    answer: 1,
    explanation:
      "법규 문제는 정의, 권한 주체, 절차, 제한, 예외가 보기로 바뀌어 나옵니다. 표로 비교하면 혼동을 줄일 수 있습니다.",
    takeaway: "법규는 체계 표와 최신 공고 확인이 점수 방어의 핵심입니다.",
  },
];

const fallbackExam = window.URBAN_PLAN_EXAM_2022_1 || {
  id: "15428",
  title: "도시계획기사 필기 2022년 제1회",
  durationMinutes: 150,
  questions: sampleWrittenQuestions,
};
const examCatalog = window.URBAN_PLAN_EXAM_CATALOG || [];
const examArchive = window.URBAN_PLAN_EXAM_ARCHIVE || { [fallbackExam.id]: fallbackExam };
const examEnhancements = window.URBAN_PLAN_EXPLANATIONS_2022_1 || {};
const detailedExamEnhancements = window.URBAN_PLAN_DETAILED_EXPLANATIONS || {};
const detailedCoverageExams = Object.values(examArchive).filter((exam) => String(exam.id) !== "15428");
const expectedDetailedCount = detailedCoverageExams.reduce(
  (total, exam) => total + exam.questions.length,
  0,
);
const actualDetailedCount = detailedCoverageExams.reduce(
  (total, exam) => total + Object.keys(detailedExamEnhancements[String(exam.id)] || {}).length,
  0,
);
const hasCompleteExplanationCoverage =
  actualDetailedCount === expectedDetailedCount &&
  detailedCoverageExams.every((exam) =>
    exam.questions.every(
      (question, index) =>
        detailedExamEnhancements[String(exam.id)]?.[String(question.number || index + 1)]?.explanation,
    ),
  ) &&
  fallbackExam.questions.every(
    (question, index) => examEnhancements[String(question.number || index + 1)]?.explanation,
  );
const createQuestionExplanation =
  window.URBAN_PLAN_CREATE_EXPLANATION ||
  ((question) => ({
    explanation: `기출 정답은 ${question.answer + 1}번입니다. 정답 보기의 핵심 표현을 문제에서 묻는 기준과 연결해 확인하세요.`,
    takeaway: `정답 ${question.answer + 1}번`,
    explanationKind: "guided",
    explanationType: "principle",
    sourceWarning: false,
    historicalLaw: question.subject === "law",
  }));
const hasSourceCaution =
  window.URBAN_PLAN_HAS_SOURCE_CAUTION ||
  ((question) =>
    /오류 신고|복원 오류|정답과 해설을 확인|문제 오류|관련 규정 개정전|기존 정답|가답안|모두\s*정답|전항\s*정답/.test(
      String(question?.question || ""),
    ));

function normalizeExplanationFingerprint(value) {
  return String(value || "")
    .normalize("NFKC")
    .replace(/\((?:관련 규정|오류 신고|문제 복원|문제 오류)[^)]*\)/g, "")
    .replace(/[ㆍᆞ]/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, "");
}

function getExplanationFingerprint(question) {
  const answerText = question.options?.[question.answer] || `image-option-${question.answer}`;
  return `${normalizeExplanationFingerprint(question.question)}::${normalizeExplanationFingerprint(answerText)}`;
}

const expandedExplanationByFingerprint = new Map();
for (const [index, question] of (fallbackExam.questions || []).entries()) {
  const enhancement = examEnhancements[String(question.number || index + 1)];
  if (!enhancement?.explanation) continue;
  expandedExplanationByFingerprint.set(getExplanationFingerprint(question), {
    explanation: enhancement.explanation,
    takeaway: enhancement.takeaway,
    explanationKind: "expanded-reused",
  });
}

let activeExam = fallbackExam;
let writtenQuestions = buildWrittenQuestions(activeExam);

function buildWrittenQuestions(exam) {
  return exam.questions.map((question, index) => {
    const generatedExplanation = createQuestionExplanation(question, exam);
    const ownEnhancement =
      exam.id === "15428" ? examEnhancements[String(question.number || index + 1)] || null : null;
    const authoredEnhancement =
      detailedExamEnhancements[String(exam.id)]?.[String(question.number || index + 1)] || null;
    const reusedEnhancement =
      exam.id === "15428" ? null : expandedExplanationByFingerprint.get(getExplanationFingerprint(question));
    const enhancement = ownEnhancement
      ? { ...generatedExplanation, ...ownEnhancement, explanationKind: "expanded" }
      : authoredEnhancement
        ? {
            ...generatedExplanation,
            ...authoredEnhancement,
            explanationKind: "detailed",
            sourceWarning: hasSourceCaution(question, authoredEnhancement),
          }
        : reusedEnhancement
          ? { ...generatedExplanation, ...reusedEnhancement }
          : generatedExplanation;
    const accuracy = Number.isFinite(question.accuracy) ? question.accuracy : 65;
    const level = accuracy >= 75 ? "쉬움" : accuracy >= 55 ? "보통" : "어려움";
    const finalOptions = enhancement.options || question.options;
    const answerText =
      finalOptions[question.answer] ||
      (question.optionImageUrls?.[question.answer]?.length
        ? `정답 보기 이미지(${question.answer + 1}번)`
        : `${question.answer + 1}번 보기`);
    return {
      ...question,
      ...enhancement,
      options: finalOptions,
      optionImageUrls: enhancement.options ? [] : question.optionImageUrls,
      questionImageUrls: enhancement.figure ? [] : question.questionImageUrls,
      number: question.number || index + 1,
      level,
      hasDetailedExplanation: Boolean(enhancement.explanation),
      answerDisplay: answerText,
      explanation:
        enhancement.explanation ||
        `기출 정답은 ${question.answer + 1}번입니다. 문제의 핵심 조건과 정답 보기를 연결해 확인하세요.`,
      takeaway: enhancement.takeaway || `정답 보기: ${answerText}`,
    };
  });
}

function activateExam(examId) {
  activeExam = examArchive[String(examId)] || examArchive[examCatalog[0]?.id] || fallbackExam;
  writtenQuestions = buildWrittenQuestions(activeExam);
}

const practicalLessons = [
  {
    title: "조건문 해석",
    body: "대상지 면적, 인구, 지형, 접근도로, 보전지역, 주변 시설을 먼저 표시합니다. 조건을 놓치면 도면이 예뻐도 감점이 큽니다.",
    why:
      "실기 문제의 조건문은 채점표와 거의 같은 역할을 합니다. 어디에 무엇을 배치해야 하는지, 어떤 용지는 피해야 하는지, 어떤 계산을 해야 하는지가 모두 조건문 안에 숨어 있습니다.",
    process: [
      "첫 번째 읽기: 면적, 인구, 도로 폭원, 역 위치, 보전녹지처럼 숫자와 위치 조건에 밑줄을 긋습니다.",
      "두 번째 읽기: 주거, 상업, 공공시설, 공원, 도로처럼 도면에 반드시 표현할 항목을 따로 적습니다.",
      "세 번째 읽기: 소음, 경사, 하천, 문화재, 보전지역처럼 개발을 제한하거나 완충이 필요한 조건을 표시합니다.",
      "도면 시작 전: 조건을 토지이용, 교통, 공원녹지, 공공시설 네 묶음으로 재정리합니다.",
    ],
    example:
      "예를 들어 '북측에 보전녹지가 있고 남측에 철도역이 있다'는 조건은 북측은 녹지축으로 보전하고, 남측 역 주변은 상업 또는 업무 중심으로 배치하라는 신호입니다.",
    mistake:
      "조건을 머릿속으로만 기억하면 후반 도면 마감 때 빠뜨리기 쉽습니다. 문제지 여백에 조건표를 만들고, 반영한 항목에는 체크 표시를 남기세요.",
    tags: ["조건표", "제약요소", "주변맥락"],
  },
  {
    title: "계획인구와 수요 산정",
    body: "등차, 등비, 최소자승 추정치를 계산하고, 개발수용능력과 과다계획 여부를 검토합니다. 산식과 단위를 답안에 남깁니다.",
    why:
      "계획인구는 주거용지, 학교, 공원, 도로, 상하수도 규모를 정하는 출발점입니다. 숫자만 맞히는 것이 아니라 그 숫자가 공간계획으로 이어져야 합니다.",
    process: [
      "기준연도와 목표연도를 확인하고, 몇 년 뒤를 추정하는지 먼저 씁니다.",
      "등차급수법은 '매년 몇 명씩 늘었는가'를 보고, 등비급수법은 '매년 몇 퍼센트씩 늘었는가'를 봅니다.",
      "계산 결과가 여러 개 나오면 평균을 무조건 쓰기보다 개발 가능지, 기반시설 수용능력, 최근 인구 추세를 함께 검토합니다.",
      "답안에는 산식, 대입값, 결과, 계획적 판단을 순서대로 씁니다.",
    ],
    example:
      "예: 등차 66,000명, 등비 69,400명이 나오면 '최근 증가세가 지속되고 역세권 개발이 예정되어 있으므로 약 68,000~69,000명을 계획인구로 검토한다'처럼 판단 문장을 붙입니다.",
    mistake:
      "5년 증가량을 연평균 증가량으로 착각하거나, ㎡와 ha 환산을 놓치는 실수가 많습니다. 10,000㎡ = 1ha는 답안지 상단에 미리 적어두면 좋습니다.",
    tags: ["인구추정", "가구수", "원단위"],
  },
  {
    title: "토지이용 배분",
    body: "주거, 상업, 업무, 공업, 녹지, 도로, 공공시설 면적을 합계 100%로 맞춥니다. 계획 의도와 면적표가 일치해야 합니다.",
    why:
      "토지이용 배분은 도면의 뼈대입니다. 면적표와 도면이 서로 다르면 채점자가 계획 의도를 신뢰하기 어렵습니다.",
    process: [
      "전체 면적을 100%로 놓고 주어진 비율이나 원단위를 먼저 계산합니다.",
      "필수 용지를 먼저 배분한 뒤 잔여 면적을 업무, 공공시설, 유보지 등 조건에 맞게 정합니다.",
      "상업은 역, 터미널, 간선도로 결절부와 연결하고, 주거는 생활권 중심과 녹지 접근성을 고려합니다.",
      "녹지와 공공시설은 남는 땅에 넣는 것이 아니라 보행권, 완충, 생태축의 근거로 배치합니다.",
    ],
    example:
      "600ha 중 주거 180ha, 상업 36ha, 녹지 120ha, 도로 108ha를 산정했다면 잔여 156ha를 공공시설, 업무, 유보지로 나누고 합계 600ha를 다시 확인합니다.",
    mistake:
      "면적표에는 공원 120ha라고 쓰고 도면에는 공원이 작은 조각으로만 보이면 감점 위험이 큽니다. 표의 비중이 도면의 면적감으로도 읽혀야 합니다.",
    tags: ["면적표", "용도배치", "밀도"],
  },
  {
    title: "가로망과 동선",
    body: "간선도로는 외부 연결과 통과교통 처리, 집산도로는 생활권 연결, 국지도로는 접근 기능을 맡깁니다.",
    why:
      "가로망은 토지이용을 움직이게 만드는 구조입니다. 도로 위계가 없으면 상업, 학교, 공원 배치가 좋아도 실제 이용 동선이 설득력을 잃습니다.",
    process: [
      "간선도로는 외부 도시와 연결하고, 상업중심이나 환승거점과 만나는 지점을 명확히 합니다.",
      "집산도로는 생활권 중심, 학교, 공원, 주거지를 연결해 내부 이동을 처리합니다.",
      "국지도로는 주거지 접근 기능을 맡기고, 불필요한 통과교통이 주거지 내부로 들어오지 않게 합니다.",
      "보행축은 도로와 별도로 학교, 공원, 상업시설, 정류장을 이어주는 안전한 경로로 그립니다.",
    ],
    example:
      "기존 30m 도로가 중앙을 통과하면 간선 기능은 유지하되, 주요 교차부에는 상업 또는 업무 중심을 두고 보행교차 안전을 함께 표시합니다.",
    mistake:
      "도로를 많이 그리는 것이 좋은 계획은 아닙니다. 위계가 없는 촘촘한 도로망은 도면을 복잡하게 만들고 생활권 구조를 흐립니다.",
    tags: ["도로위계", "보행축", "환승"],
  },
  {
    title: "공공시설과 녹지",
    body: "학교, 공원, 커뮤니티 시설은 보행권과 중심성으로 배치합니다. 녹지는 단절된 조각이 아니라 축으로 연결합니다.",
    why:
      "실기에서 공공시설은 단순한 색칠 항목이 아니라 생활권의 중심을 만드는 장치입니다. 녹지는 환경, 방재, 경관, 보행축을 동시에 설명할 수 있는 고득점 요소입니다.",
    process: [
      "학교는 주거지 보행권 중심에 두고, 간선도로를 무리하게 횡단하지 않도록 배치합니다.",
      "근린공원은 주거지와 가까운 곳에 두되, 보전녹지나 하천과 연결해 녹지축을 만듭니다.",
      "커뮤니티 시설은 생활권 중심이나 상업중심 주변에 배치해 이용성을 높입니다.",
      "소음원이나 공업용지 주변에는 완충녹지를 두어 주거지와의 충돌을 줄입니다.",
    ],
    example:
      "북측 보전녹지가 있는 대상지라면 보전녹지에서 근린공원, 학교, 생활보행축으로 이어지는 녹지 네트워크를 표현하면 계획 의도가 분명해집니다.",
    mistake:
      "공공시설을 대상지 가장자리 남는 공간에만 배치하면 접근성이 떨어져 보입니다. 생활권 중심성과 보행 연결을 꼭 설명하세요.",
    tags: ["생활권시설", "공원녹지", "완충"],
  },
  {
    title: "도면 마감",
    body: "방위, 축척, 범례, 계획표, 면적표, 주요 치수, 도로 폭원, 계획 설명이 한 장에서 읽혀야 합니다.",
    why:
      "실기 답안은 채점자가 짧은 시간 안에 읽습니다. 좋은 계획도 범례, 면적표, 선 굵기, 폭원 표기가 빠지면 의도가 전달되지 않습니다.",
    process: [
      "처음 5분 안에 답안지 배치 계획을 정하고, 표와 범례가 들어갈 공간을 비워둡니다.",
      "도로는 폭원과 위계가 구분되도록 선 굵기 또는 표기를 달리합니다.",
      "토지이용 색상은 한눈에 구분되게 쓰고, 범례의 색과 도면의 색을 반드시 맞춥니다.",
      "마지막 10분은 새 내용을 추가하지 말고 방위, 축척, 면적 합계, 오탈자, 누락 조건만 점검합니다.",
    ],
    example:
      "면적표는 '용도, 면적(ha), 구성비(%), 계획 의도' 네 칸으로 쓰면 계산과 설명을 동시에 보여줄 수 있습니다.",
    mistake:
      "마감 시간이 부족해 범례나 면적 합계를 비워두는 경우가 많습니다. 도면을 완벽하게 꾸미기보다 채점 요소가 보이게 끝내는 것이 우선입니다.",
    tags: ["방위", "축척", "범례"],
  },
];

const practicalProblems = [
  {
    id: "p01",
    kind: "계산형",
    title: "계획인구 추정",
    prompt:
      "2010년 42,000명, 2015년 47,000명, 2020년 54,000명인 도시의 2030년 계획인구를 등차급수법과 등비급수법으로 검토하시오.",
    answer:
      "등차급수법은 2010~2020년 10년간 12,000명 증가, 연평균 1,200명 증가로 보아 2030년 66,000명입니다. 등비급수법은 연평균 증가율 약 2.54%를 적용해 2030년 약 69,400명입니다. 실기 답안에서는 두 결과의 차이와 개발수용능력 검토를 함께 적습니다.",
    solutionSteps: [
      {
        label: "1단계: 증가 기간 확인",
        text: "2010년 42,000명에서 2020년 54,000명이 되었으므로 10년 동안 12,000명이 증가했습니다. 2030년은 2020년 기준으로 다시 10년 뒤입니다.",
      },
      {
        label: "2단계: 등차급수법",
        text: "연평균 증가수는 12,000명 ÷ 10년 = 1,200명/년입니다. 2030년 인구는 54,000명 + 1,200명 x 10년 = 66,000명입니다.",
      },
      {
        label: "3단계: 등비급수법",
        text: "10년 성장배율은 54,000 ÷ 42,000 = 1.2857입니다. 이를 연평균 증가율로 바꾸면 약 2.54%이고, 54,000명 x (1.0254)^10 = 약 69,400명입니다.",
      },
      {
        label: "4단계: 계획적 판단",
        text: "두 방법의 차이가 약 3,400명이므로 개발사업, 역세권 형성, 기반시설 수용능력 같은 조건을 보고 최종 계획인구를 정합니다.",
      },
    ],
    sampleAnswer:
      "2030년 계획인구는 등차급수법 기준 66,000명, 등비급수법 기준 약 69,400명으로 산정된다. 최근 증가세와 개발 여건을 고려하면 약 68,000~69,000명을 계획인구 검토 범위로 설정하고, 주거용지와 기반시설 수요 산정에 반영한다.",
    commonMistakes: [
      "2010~2020년 증가량 12,000명을 5년 증가량으로 착각하는 실수",
      "등비급수법에서 연평균 증가율을 구하지 않고 10년 증가율 28.57%를 그대로 매년 적용하는 실수",
      "계산 결과만 쓰고 계획인구가 토지이용이나 시설수요에 어떻게 연결되는지 쓰지 않는 실수",
    ],
    rubric: [
      "연도 간격과 단위를 명확히 썼는가",
      "등차와 등비 산식을 구분했는가",
      "계획인구를 시설규모와 토지이용계획으로 연결했는가",
    ],
  },
  {
    id: "p02",
    kind: "면적배분",
    title: "토지이용 면적표 작성",
    prompt:
      "목표인구 60,000명, 1인당 주거용지 30㎡를 기준으로 주거용지 면적을 산정하고, 전체 계획구역 600ha에서 상업 6%, 녹지 20%, 도로 18%를 배분하시오.",
    answer:
      "주거용지는 60,000명 x 30㎡ = 1,800,000㎡ = 180ha입니다. 전체 600ha 기준 상업용지는 36ha, 녹지는 120ha, 도로는 108ha입니다. 나머지 156ha는 공공시설, 업무, 산업, 유보지 등 조건에 맞게 배분하고 합계가 600ha인지 확인합니다.",
    solutionSteps: [
      {
        label: "1단계: 주거용지 산정",
        text: "목표인구 60,000명에 1인당 주거용지 30㎡를 곱합니다. 60,000 x 30㎡ = 1,800,000㎡입니다.",
      },
      {
        label: "2단계: 단위 환산",
        text: "실기 면적표는 ha를 많이 사용합니다. 1ha = 10,000㎡이므로 1,800,000㎡ ÷ 10,000 = 180ha입니다.",
      },
      {
        label: "3단계: 비율 배분",
        text: "상업 6%는 600ha x 0.06 = 36ha, 녹지 20%는 120ha, 도로 18%는 108ha입니다.",
      },
      {
        label: "4단계: 잔여 면적 검토",
        text: "600ha - 180ha - 36ha - 120ha - 108ha = 156ha가 남습니다. 문제 조건에 따라 공공시설, 업무, 산업, 유보지 등으로 배분합니다.",
      },
    ],
    sampleAnswer:
      "주거용지는 180ha, 상업용지는 36ha, 녹지는 120ha, 도로는 108ha로 산정된다. 잔여 156ha는 생활권 공공시설, 업무용지, 유보지 등으로 배분하되 전체 합계가 600ha가 되도록 면적표를 작성한다.",
    commonMistakes: [
      "1,800,000㎡를 18ha로 잘못 환산하는 실수",
      "비율 배분의 기준을 전체 600ha가 아니라 잔여 면적으로 착각하는 실수",
      "잔여 면적을 설명하지 않아 면적표 합계가 비어 보이는 실수",
    ],
    rubric: [
      "㎡와 ha 환산을 정확히 했는가",
      "면적 합계가 전체 구역과 일치하는가",
      "잔여 면적의 용도를 합리적으로 설명했는가",
    ],
  },
  {
    id: "p03",
    kind: "도면형",
    title: "생활권 중심 배치",
    prompt:
      "철도역이 남측에 있고 북측에 보전녹지가 있는 신시가지에서 상업중심, 주거지, 학교, 공원을 배치하는 계획안을 설명하시오.",
    answer:
      "상업중심은 철도역과 간선도로 결절부에 배치해 환승과 보행 접근성을 높입니다. 주거지는 보전녹지와 소음원 사이 완충을 고려해 중밀 주거와 저밀 주거를 단계적으로 배치합니다. 학교와 근린공원은 주거지 보행권 중심에 두고, 북측 보전녹지는 녹지축으로 연결합니다.",
    solutionSteps: [
      {
        label: "1단계: 강한 조건부터 배치",
        text: "남측 철도역은 유동인구와 접근성이 가장 큰 조건이므로 상업중심이나 업무기능을 우선 배치합니다.",
      },
      {
        label: "2단계: 보전녹지 처리",
        text: "북측 보전녹지는 개발용지가 아니라 보전축입니다. 근린공원, 완충녹지, 보행축과 연결해 녹지 네트워크로 표현합니다.",
      },
      {
        label: "3단계: 주거지 위계",
        text: "역과 간선도로에 가까운 곳은 중밀 주거, 보전녹지와 가까운 조용한 곳은 저밀 주거로 두면 밀도 변화가 자연스럽습니다.",
      },
      {
        label: "4단계: 학교와 공원",
        text: "학교는 주거지 중심의 안전한 보행권 안에 두고, 공원은 학교와 주거지를 연결하는 생활권 중심 또는 녹지축 위에 배치합니다.",
      },
    ],
    sampleAnswer:
      "남측 철도역 주변에는 상업중심을 배치하여 환승과 보행 접근성을 높이고, 역에서 생활권 중심으로 이어지는 보행축을 계획한다. 북측 보전녹지는 훼손하지 않고 근린공원과 연결해 녹지축으로 활용한다. 주거지는 역세권에서 멀어질수록 중밀에서 저밀로 전환하고, 학교는 주거지 중심부 보행권에 배치한다.",
    commonMistakes: [
      "철도역 주변을 저밀 주거로만 채워 중심성이 약해지는 실수",
      "보전녹지를 단순 공터처럼 개발용지로 사용하는 실수",
      "학교를 간선도로 건너편이나 대상지 모서리에 두어 보행 안전성이 떨어지는 실수",
    ],
    rubric: [
      "역세권과 상업중심의 관계가 명확한가",
      "보전녹지와 완충녹지의 역할을 구분했는가",
      "학교와 공원이 보행권 안에서 설명되었는가",
    ],
  },
  {
    id: "p04",
    kind: "서술형",
    title: "도로망 위계 검토",
    prompt:
      "대상지 중앙을 관통하는 기존 30m 도로가 있고, 동서 방향 보행축을 계획해야 한다. 도로망과 보행축 계획 원칙을 쓰시오.",
    answer:
      "기존 30m 도로는 간선 기능을 유지하되 주요 교차부를 계획 중심과 연계합니다. 집산도로는 생활권 중심과 주거지를 연결하고, 국지도로는 통과교통을 줄이는 구조로 둡니다. 동서 보행축은 학교, 공원, 상업시설, 대중교통 정류장을 연결하고 차량 교차부에는 안전한 횡단 처리를 계획합니다.",
    solutionSteps: [
      {
        label: "1단계: 기존 30m 도로의 역할",
        text: "30m 도로는 대상지의 중심 간선축입니다. 없애거나 약화하기보다 외부 연결, 대중교통, 상업중심 접근을 담당하게 합니다.",
      },
      {
        label: "2단계: 내부 도로 위계",
        text: "간선도로에서 바로 주거지 깊숙이 차량이 들어오지 않도록 집산도로와 국지도로를 단계적으로 둡니다.",
      },
      {
        label: "3단계: 동서 보행축",
        text: "보행축은 단순 선이 아니라 목적지를 연결해야 합니다. 학교, 근린공원, 상업시설, 정류장을 이어야 계획 의도가 분명합니다.",
      },
      {
        label: "4단계: 교차부 안전",
        text: "보행축이 30m 도로를 만나는 지점에는 횡단보도, 보행광장, 신호처리, 속도저감 등 안전 처리 원칙을 씁니다.",
      },
    ],
    sampleAnswer:
      "기존 30m 도로는 대상지의 간선도로로 유지하여 외부 접근과 대중교통 기능을 담당하게 한다. 내부에는 집산도로와 국지도로를 단계적으로 배치해 주거지 통과교통을 억제한다. 동서 보행축은 학교, 공원, 상업중심, 정류장을 연결하도록 계획하고, 30m 도로와 만나는 지점에는 안전한 횡단체계와 보행공간을 확보한다.",
    commonMistakes: [
      "30m 도로를 단순 경계선처럼 취급하고 계획 중심과 연결하지 않는 실수",
      "보행축을 그렸지만 학교, 공원, 상업시설 같은 목적지와 연결하지 않는 실수",
      "차량 동선과 보행 동선이 만나는 교차부 안전대책을 쓰지 않는 실수",
    ],
    rubric: [
      "간선, 집산, 국지도로 기능을 구분했는가",
      "보행축이 주요 시설과 연결되는가",
      "교차부 안전과 통과교통 억제를 언급했는가",
    ],
  },
];

const planner = [
  ["1주차", "도시계획론과 도시설계 기본개념을 정리하고 과목별 오답노트를 시작"],
  ["2주차", "도시개발론, 국토 및 지역계획, 법규를 표로 정리하고 매일 20문제 풀이"],
  ["3주차", "필기 전 과목 혼합 풀이와 실기 계산형, 면적표, 법규 검토 훈련"],
  ["4주차", "실기 도면 작성 루틴, 시간 배분, 답안 마감 체크리스트 반복"],
];

const practicalChecklist = [
  "문제 조건을 도면 여백에 먼저 표시했다",
  "방위, 축척, 범례, 계획명, 면적표를 빠짐없이 넣었다",
  "계획인구, 가구수, 시설수요 산식과 단위를 적었다",
  "간선, 집산, 국지도로 위계와 폭원을 구분했다",
  "학교, 공원, 상업중심을 생활권과 보행축으로 연결했다",
  "보전지역, 완충녹지, 위험요소를 계획에 반영했다",
  "합계 면적과 비율이 전체 면적과 일치한다",
  "마지막 10분에 법정 기준, 색상, 선 굵기, 오탈자를 점검했다",
];

const viewTitles = {
  dashboard: "도시계획기사 학습실",
  writtenLecture: "1차 필기 기본강의",
  writtenQuiz: "도시계획기사 기출 CBT",
  practicalLecture: "3차 실기 기본강의",
  practicalQuiz: "3차 실기 기출유형",
  finalLab: "실전 연습실",
};

const defaultState = {
  view: "writtenQuiz",
  selectedExamId: "15428",
  selectedSubject: "planning",
  quizSubject: "all",
  quizIndex: 0,
  answers: {},
  revealed: {},
  bookmarks: [],
  examSubmitted: false,
  timerEnd: null,
  timerRemaining: EXAM_DURATION_SECONDS,
  practicalRevealed: {},
  lectureDone: [],
  plannerDone: [],
  checklistDone: [],
  practicalNote: "",
};

let state = loadState();
activateExam(state.selectedExamId);
state.selectedExamId = activeExam.id;
let quizTimerIntervalId = null;
let compactViewport = window.matchMedia("(max-width: 780px)").matches;

const app = document.querySelector("#app");
const pageTitle = document.querySelector("#pageTitle");
const navList = document.querySelector("#navList");
const menuButton = document.querySelector("#menuButton");
const resetProgress = document.querySelector("#resetProgress");

document.querySelector("#todayText").textContent = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "short",
}).format(new Date());

navList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-view]");
  if (!button) return;
  setView(button.dataset.view);
});

menuButton.addEventListener("click", () => {
  document.body.classList.toggle("sidebar-open");
});

resetProgress.addEventListener("click", () => {
  const confirmed = window.confirm("저장된 진도와 풀이 기록을 모두 초기화할까요?");
  if (!confirmed) return;
  state = createDefaultState();
  saveState();
  render();
});

window.addEventListener("resize", debounce(() => {
  const nextCompactViewport = window.matchMedia("(max-width: 780px)").matches;
  if (nextCompactViewport !== compactViewport) {
    compactViewport = nextCompactViewport;
    render();
    return;
  }
  drawCityCanvas();
  drawPlanCanvas("planCanvas");
}, 120));

render();

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return { ...createDefaultState(), ...saved };
  } catch {
    return createDefaultState();
  }
}

function createDefaultState() {
  return JSON.parse(JSON.stringify(defaultState));
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function setView(view) {
  state.view = view;
  saveState();
  document.body.classList.remove("sidebar-open");
  render();
  app.focus({ preventScroll: true });
}

function render() {
  window.clearInterval(quizTimerIntervalId);
  quizTimerIntervalId = null;
  if (!hasCompleteExplanationCoverage) {
    pageTitle.textContent = "해설 데이터 확인 필요";
    app.innerHTML = `
      <section class="surface padded hero-copy" role="alert">
        <span class="eyebrow">Explanation data check</span>
        <h2>문항별 상세해설을 모두 불러오지 못했습니다.</h2>
        <p>불완전한 공통 해설을 대신 표시하지 않도록 학습 화면을 잠시 중지했습니다. 페이지를 새로고침해 주세요. 계속되면 배포 상태를 확인해야 합니다.</p>
        <div class="hero-meta">
          <span>불러온 과거 해설 <strong>${actualDetailedCount.toLocaleString("ko-KR")}</strong>개</span>
          <span>필요한 과거 해설 <strong>${expectedDetailedCount.toLocaleString("ko-KR")}</strong>개</span>
        </div>
      </section>
    `;
    return;
  }
  pageTitle.textContent = viewTitles[state.view] || viewTitles.dashboard;
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.toggle("is-active", item.dataset.view === state.view);
  });

  const renderers = {
    dashboard: renderDashboard,
    writtenLecture: renderWrittenLecture,
    writtenQuiz: renderCbtQuiz,
    practicalLecture: renderPracticalLecture,
    practicalQuiz: renderPracticalQuiz,
    finalLab: renderFinalLab,
  };

  app.innerHTML = (renderers[state.view] || renderDashboard)();
  bindCurrentView();
  requestAnimationFrame(() => {
    drawCityCanvas();
    drawPlanCanvas("planCanvas");
  });
}

function bindCurrentView() {
  app.onkeydown = null;
  if (state.view === "dashboard") bindDashboard();
  if (state.view === "writtenLecture") bindWrittenLecture();
  if (state.view === "writtenQuiz") bindCbtQuiz();
  if (state.view === "practicalLecture") bindPracticalLecture();
  if (state.view === "practicalQuiz") bindPracticalQuiz();
  if (state.view === "finalLab") bindFinalLab();
}

function renderDashboard() {
  const progress = getProgress();
  return `
    <div class="stack">
      <section class="hero-grid">
        <div class="surface padded hero-copy">
          <span class="eyebrow">합격 흐름 설계</span>
          <h2>59개 회차를 실전처럼 풀고, 정답까지 바로 확인하는 학습실</h2>
          <p>COMCBT 도시계획기사 자료의 2003년부터 2022년까지 59개 회차를 회차 선택형 CBT로 구성했습니다. 전체 5,900문항마다 정답 근거와 핵심 개념을 독립적으로 작성하고, 계산·법규·오답 구별이 필요한 부분을 문항별로 풀어 설명했습니다.</p>
          <div class="hero-meta">
            <div class="metric">
              <span>필기 구조</span>
              <strong>5과목</strong>
            </div>
            <div class="metric">
              <span>문제 풀이</span>
              <strong>${writtenQuestions.length}문항</strong>
            </div>
            <div class="metric">
              <span>현재 진도</span>
              <strong>${progress.percent}%</strong>
            </div>
          </div>
          <div class="progress-shell" aria-label="전체 학습 진도">
            <div class="progress-line"><div class="progress-bar" style="width:${progress.percent}%"></div></div>
            <div class="progress-label">
              <span>${progress.done}개 완료</span>
              <span>총 ${progress.total}개 학습 행동</span>
            </div>
          </div>
          <div class="button-row" style="margin-top:22px">
            <button class="primary-button" data-go="writtenQuiz" type="button">2022년 기출 CBT 시작</button>
            <button class="secondary-button" data-go="writtenLecture" type="button">필기 기본강의 보기</button>
            <button class="ghost-button" data-go="practicalQuiz" type="button">실기 문제 확인</button>
          </div>
        </div>

        <div class="surface visual-panel">
          <div class="visual-heading">
            <span class="eyebrow">도면 감각</span>
            <h3>토지이용과 가로망을 같이 보는 미니맵</h3>
            <p>실기는 계산이 도면으로 이어지는 시험입니다.</p>
          </div>
          <canvas id="cityCanvas" aria-label="도시계획 토지이용 미니맵"></canvas>
        </div>
      </section>

      <section>
        <div class="section-heading">
          <div>
            <span class="eyebrow">시험 흐름</span>
            <h2>필기와 실기를 분리해서 외우지 않기</h2>
            <p>필기에서 배운 계획체계, 법규, 단지계획은 실기 도면과 산출근거에 그대로 다시 등장합니다.</p>
          </div>
        </div>
        <div class="grid-3">
          <article class="info-tile">
            <h3>1차 필기 기본강의</h3>
            <p>도시계획론부터 법규까지 과목별 핵심 개념과 자주 헷갈리는 용어를 정리합니다.</p>
            <div class="tag-row">
              <span class="tag">개념</span>
              <span class="tag blue">용어</span>
              <span class="tag green">표 정리</span>
            </div>
          </article>
          <article class="info-tile">
            <h3>1차 필기 기출풀이</h3>
            <p>객관식 보기에서 자주 바뀌는 말장난을 해설 중심으로 연습합니다.</p>
            <div class="tag-row">
              <span class="tag amber">4지선다</span>
              <span class="tag">오답노트</span>
              <span class="tag coral">약점 확인</span>
            </div>
          </article>
          <article class="info-tile">
            <h3>3차 실기</h3>
            <p>계획인구, 면적배분, 도로망, 시설배치, 도면 마감 체크를 단계별로 훈련합니다.</p>
            <div class="tag-row">
              <span class="tag green">계산</span>
              <span class="tag blue">도면</span>
              <span class="tag amber">서술</span>
            </div>
          </article>
        </div>
      </section>

      <section>
        <div class="section-heading">
          <div>
            <span class="eyebrow">4주 압축 루틴</span>
            <h2>오늘 무엇을 할지 바로 보이게</h2>
          </div>
          <button class="secondary-button" data-go="finalLab" type="button">체크리스트 열기</button>
        </div>
        ${renderPlannerTable(false)}
      </section>
    </div>
  `;
}

function bindDashboard() {
  app.querySelectorAll("[data-go]").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.go));
  });
}

function renderWrittenLecture() {
  const selected = getSelectedSubject();
  return `
    <div class="stack">
      <section class="section-heading">
        <div>
          <span class="eyebrow">기본강의</span>
          <h2>과목별 핵심을 먼저 잡기</h2>
          <p>각 과목은 “시험에 나오는 정의 → 비교표 → 실기 연결” 순서로 읽으면 기억이 오래 갑니다.</p>
        </div>
      </section>

      <section class="subject-layout">
        <div class="subject-list">
          ${subjects
            .map(
              (subject) => `
                <button class="subject-button ${subject.id === selected.id ? "is-selected" : ""}" data-subject="${subject.id}" type="button">
                  ${subject.title}
                  <span>${subject.exam} · ${state.lectureDone.includes("written:" + subject.id) ? "완료" : "진행 전"}</span>
                </button>
              `,
            )
            .join("")}
        </div>

        <article class="surface padded module-detail">
          <span class="eyebrow">${selected.exam}</span>
          <h2>${selected.title}</h2>
          <p>${selected.overview}</p>
          <div class="tag-row">
            ${selected.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
          </div>

          <div class="lesson-grid">
            ${selected.lectures
              .map(
                (lesson) => `
                  <div class="lesson-card">
                    <h3>${lesson.title}</h3>
                    <ul>${lesson.points.map((point) => `<li>${point}</li>`).join("")}</ul>
                  </div>
                `,
              )
              .join("")}
          </div>

          <div class="term-list">
            ${selected.terms
              .map(
                ([term, description]) => `
                  <div class="term">
                    <strong>${term}</strong>
                    <span>${description}</span>
                  </div>
                `,
              )
              .join("")}
          </div>

          <div class="button-row" style="margin-top:22px">
            <button class="primary-button" id="completeLecture" type="button">
              ${state.lectureDone.includes("written:" + selected.id) ? "완료 취소" : "이 과목 학습 완료"}
            </button>
            <button class="secondary-button" data-go="writtenQuiz" type="button">이어서 문제 풀기</button>
          </div>
        </article>
      </section>
    </div>
  `;
}

function bindWrittenLecture() {
  app.querySelectorAll("[data-subject]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedSubject = button.dataset.subject;
      saveState();
      render();
    });
  });

  app.querySelector("#completeLecture").addEventListener("click", () => {
    toggleArrayValue(state.lectureDone, "written:" + state.selectedSubject);
    saveState();
    render();
  });

  app.querySelectorAll("[data-go]").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.go));
  });
}

function renderWrittenQuiz() {
  const filtered = getFilteredQuestions();
  const question = filtered[state.quizIndex] || filtered[0];
  const selectedAnswer = question ? state.answers[question.id] : undefined;
  const revealed = question ? Boolean(state.revealed[question.id]) : false;
  const stats = getQuizStats(filtered);

  if (!question) {
    return `<div class="empty">선택한 과목의 문제가 없습니다.</div>`;
  }

  return `
    <div class="stack">
      <section class="section-heading">
        <div>
          <span class="eyebrow">필기 기출유형</span>
          <h2>객관식은 보기의 함정을 읽는 시험</h2>
          <p>실제 기출 원문을 그대로 복제한 문항이 아니라, 공개 출제범위와 빈출 개념을 바탕으로 만든 대표 풀이 문제입니다.</p>
        </div>
      </section>

      <div class="button-row" aria-label="과목 필터">
        <button class="chip-button ${state.quizSubject === "all" ? "is-selected" : ""}" data-filter="all" type="button">전체</button>
        ${subjects
          .map(
            (subject) => `
              <button class="chip-button ${state.quizSubject === subject.id ? "is-selected" : ""}" data-filter="${subject.id}" type="button">${subject.title}</button>
            `,
          )
          .join("")}
      </div>

      <section class="quiz-layout">
        <article class="surface padded quiz-box">
          <div class="quiz-meta">
            <span class="tag">${getSubjectTitle(question.subject)}</span>
            <span class="tag amber">${question.level}</span>
            <span class="tag blue">${state.quizIndex + 1} / ${filtered.length}</span>
          </div>
          <h2 class="question-title">${question.question}</h2>
          <div class="option-list">
            ${question.options
              .map((option, index) => {
                const classes = ["option-button"];
                if (selectedAnswer === index) classes.push("is-picked");
                if (revealed && index === question.answer) classes.push("is-correct");
                if (revealed && selectedAnswer === index && selectedAnswer !== question.answer) classes.push("is-wrong");
                return `<button class="${classes.join(" ")}" data-option="${index}" type="button">${index + 1}. ${option}</button>`;
              })
              .join("")}
          </div>

          <div class="answer-box ${revealed ? "is-visible" : ""}">
            <strong>${selectedAnswer === question.answer ? "정답입니다." : "정답: " + (question.answer + 1) + "번"}</strong>
            <p>${question.explanation}</p>
            <p style="margin-top:8px"><strong>암기 포인트</strong> ${question.takeaway}</p>
          </div>

          <div class="button-row" style="margin-top:20px">
            <button class="primary-button" id="revealAnswer" type="button">정답 확인</button>
            <button class="secondary-button" id="prevQuestion" type="button">이전 문제</button>
            <button class="secondary-button" id="nextQuestion" type="button">다음 문제</button>
          </div>
        </article>

        <aside class="side-panel">
          <div class="stat-card">
            <h3>풀이 현황</h3>
            <div class="mini-list">
              <div class="mini-item"><span>풀이 문항</span><strong>${stats.answered}/${stats.total}</strong></div>
              <div class="mini-item"><span>정답</span><strong>${stats.correct}</strong></div>
              <div class="mini-item"><span>정답률</span><strong>${stats.accuracy}%</strong></div>
            </div>
          </div>
          <div class="stat-card">
            <h3>오답 처리법</h3>
            <p>틀린 문제는 보기에서 틀린 단어를 하나 찾아 표시하세요. 법규는 정의, 절차, 권한 주체가 자주 바뀝니다.</p>
          </div>
          <div class="stat-card">
            <h3>과락 방어</h3>
            <p>한 과목만 깊게 파기보다 모든 과목 기본문제를 먼저 맞히는 전략이 안정적입니다.</p>
          </div>
        </aside>
      </section>
    </div>
  `;
}

function bindWrittenQuiz() {
  app.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.quizSubject = button.dataset.filter;
      state.quizIndex = 0;
      saveState();
      render();
    });
  });

  app.querySelectorAll("[data-option]").forEach((button) => {
    button.addEventListener("click", () => {
      const question = getFilteredQuestions()[state.quizIndex];
      state.answers[question.id] = Number(button.dataset.option);
      saveState();
      render();
    });
  });

  app.querySelector("#revealAnswer").addEventListener("click", () => {
    const question = getFilteredQuestions()[state.quizIndex];
    state.revealed[question.id] = true;
    saveState();
    render();
  });

  app.querySelector("#prevQuestion").addEventListener("click", () => {
    const total = getFilteredQuestions().length;
    state.quizIndex = (state.quizIndex - 1 + total) % total;
    saveState();
    render();
  });

  app.querySelector("#nextQuestion").addEventListener("click", () => {
    const total = getFilteredQuestions().length;
    state.quizIndex = (state.quizIndex + 1) % total;
    saveState();
    render();
  });
}

function renderCbtQuiz() {
  const filtered = getFilteredQuestions();
  const question = filtered[state.quizIndex] || filtered[0];
  const totalStats = getQuizStats(writtenQuestions);
  const filteredStats = getQuizStats(filtered);
  const examResult = getExamResult();

  if (!question) {
    return `<div class="empty">시험 데이터를 불러오지 못했습니다. 페이지를 새로고침해 주세요.</div>`;
  }

  const selectedAnswer = state.answers[question.id];
  const revealed = state.examSubmitted || Boolean(state.revealed[question.id]);
  const isBookmarked = state.bookmarks.includes(question.id);
  const remaining = getTimerRemainingSeconds();
  const answeredPercent = Math.round((totalStats.answered / writtenQuestions.length) * 100);
  const archiveCount = examCatalog.length || 59;
  const currentBookmarks = writtenQuestions.filter((item) => state.bookmarks.includes(item.id)).length;
  const isCompactLayout = compactViewport;
  const examYear = String(activeExam.date || activeExam.title || "출제 당시").match(/\d{4}/)?.[0] || "출제 당시";

  return `
    <div class="stack cbt-page">
      <section class="surface cbt-hero">
        <div class="cbt-hero-copy">
          <div class="exam-picker-row">
            <label for="examSelect">
              <span>기출 회차 선택</span>
              <select id="examSelect" aria-label="도시계획기사 기출 회차">
                ${examCatalog
                  .map(
                    (exam) => `<option value="${exam.id}" ${exam.id === activeExam.id ? "selected" : ""}>${escapeHtml(exam.title)} · ${exam.date}</option>`,
                  )
                  .join("")}
              </select>
            </label>
            <a href="${activeExam.sourceArticleUrl || activeExam.sourceIndexUrl || "https://www.comcbt.com/xe/dy"}" target="_blank" rel="noreferrer">COMCBT 회차 원문 ↗</a>
          </div>
          <span class="eyebrow">${escapeHtml(activeExam.date || "2022-03-05")} · 실제 기출</span>
          <h2>${escapeHtml(activeExam.title)}</h2>
          <p>한 화면에 한 문제씩 풀고, 미풀이·오답·북마크 상태를 바로 확인하세요. 모든 문항에 원 사이트 이용자 해설을 옮기지 않고 이 학습실에서 독립 작성한 정답 근거·오답 구별·공식과 법규 기준을 담은 상세해설과 한 줄 암기를 연결했습니다.</p>
          <div class="exam-facts" aria-label="시험 정보">
            <span><strong>${writtenQuestions.length}</strong>문항</span>
            <span><strong>${subjects.length}</strong>과목</span>
            <span><strong>${activeExam.durationMinutes || 150}</strong>분</span>
            <span>해설 <strong>${writtenQuestions.length}</strong>개</span>
            <span>출처 목록 <strong>${archiveCount}</strong>회</span>
          </div>
        </div>
        <div class="cbt-session-panel">
          <span class="session-label">남은 시간</span>
          <strong class="timer-display" id="examTimer" aria-live="polite">${formatTimer(remaining)}</strong>
          <div class="button-row compact-buttons">
            <button class="secondary-button" id="timerToggle" type="button" ${remaining <= 0 || state.examSubmitted ? "disabled" : ""}>
              ${state.timerEnd ? "일시정지" : remaining === EXAM_DURATION_SECONDS ? "타이머 시작" : "계속"}
            </button>
            <button class="ghost-button" id="timerReset" type="button" ${state.examSubmitted ? "disabled" : ""}>시간 초기화</button>
          </div>
          <button class="primary-button submit-exam-button" id="submitExam" type="button" ${state.examSubmitted ? "disabled" : ""}>시험 채점하기</button>
        </div>
      </section>

      ${state.examSubmitted ? renderExamResult(examResult) : ""}

      <section class="surface quiz-toolbar">
        <div>
          <span class="eyebrow">과목 바로가기</span>
          <div class="button-row filter-row" aria-label="과목 필터">
            <button class="chip-button ${state.quizSubject === "all" ? "is-selected" : ""}" data-filter="all" type="button">전체 100</button>
            ${subjects
              .map(
                (subject) => `
                  <button class="chip-button ${state.quizSubject === subject.id ? "is-selected" : ""}" data-filter="${subject.id}" type="button">${subject.title}</button>
                `,
              )
              .join("")}
          </div>
        </div>
        <div class="toolbar-progress" aria-label="전체 풀이 진도 ${totalStats.answered}문항">
          <div class="progress-label">
            <span>전체 풀이</span>
            <strong>${totalStats.answered} / ${writtenQuestions.length}</strong>
          </div>
          <div class="progress-line"><div class="progress-bar" style="width:${answeredPercent}%"></div></div>
        </div>
      </section>

      <section class="cbt-layout">
        <article class="surface question-panel">
          <div class="question-topline">
            <div class="quiz-meta">
              <span class="tag">${escapeHtml(getSubjectTitle(question.subject))}</span>
              <span class="tag ${question.level === "어려움" ? "coral" : "amber"}">${question.level}</span>
              ${Number.isFinite(question.accuracy) ? `<span class="tag blue">당시 정답률 ${question.accuracy}%</span>` : ""}
            </div>
            <button class="bookmark-button ${isBookmarked ? "is-active" : ""}" id="toggleBookmark" type="button" aria-pressed="${isBookmarked}">
              <span aria-hidden="true">${isBookmarked ? "★" : "☆"}</span>
              <span class="bookmark-text">${isBookmarked ? "북마크됨" : "북마크"}</span>
            </button>
          </div>

          <div class="question-heading">
            <span class="question-number">Q${String(question.number).padStart(2, "0")}</span>
            <h2 class="question-title">${escapeHtml(question.question)}</h2>
          </div>

          ${renderQuestionFigure(question)}

          <div class="option-list" role="group" aria-label="${question.number}번 문제 보기">
            ${question.options
              .map((option, index) => {
                const classes = ["option-button"];
                if (selectedAnswer === index) classes.push("is-picked");
                if (revealed && index === question.answer) classes.push("is-correct");
                if (revealed && selectedAnswer === index && selectedAnswer !== question.answer) classes.push("is-wrong");
                return `
                  <button class="${classes.join(" ")}" data-option="${index}" type="button" aria-pressed="${selectedAnswer === index}" ${state.examSubmitted ? "disabled" : ""}>
                    <span class="option-index" aria-hidden="true">${index + 1}</span>
                    <span class="option-content">
                      <span>${escapeHtml(option || (question.optionImageUrls?.[index]?.length ? `그림 ${index + 1}` : `선택지 ${index + 1}`))}</span>
                      ${renderOptionImages(question, index)}
                    </span>
                  </button>
                `;
              })
              .join("")}
          </div>

          <section class="answer-box answer-explanation ${revealed ? "is-visible" : ""}" aria-live="polite">
            <div class="answer-heading">
              <span class="answer-status ${selectedAnswer === question.answer ? "is-correct" : ""}">
                ${
                  selectedAnswer === undefined
                    ? `정답 ${question.answer + 1}번`
                    : selectedAnswer === question.answer
                      ? "정답입니다"
                      : `오답 · 정답 ${question.answer + 1}번`
                }
              </span>
              <strong>${escapeHtml(question.answerDisplay || `${question.answer + 1}번 보기`)}</strong>
            </div>
            ${
              question.sourceWarning
                ? `<p class="source-warning"><strong>원문·출제 기준 주의</strong><span>원문 복원, 저장 정답 또는 출제 당시 기준에 주의가 필요한 문항입니다. 아래 해설의 계산·개념 기준과 원문을 함께 확인하세요.</span></p>`
                : ""
            }
            <div class="explanation-grid">
              <div>
                <span class="explanation-label">${question.sourceWarning ? "참고 해설" : ["expanded", "detailed"].includes(question.explanationKind) ? "왜 정답일까요?" : "핵심 풀이"}</span>
                <p>${escapeHtml(question.explanation)}</p>
              </div>
              <div class="takeaway-card">
                <span class="explanation-label">한 줄 암기</span>
                <p>${escapeHtml(question.takeaway)}</p>
              </div>
            </div>
            ${question.historicalLaw ? `<p class="law-note">이 법규 관련 문항은 ${examYear}년 출제 당시 기준입니다. 현재 조문과 다를 수 있으므로 최신 법령을 함께 확인하세요.</p>` : ""}
            <div class="source-links">
              <a class="source-link" href="${question.sourceUrl || activeExam.sourceUrl}" target="_blank" rel="noreferrer">COMCBT 원문 문항 확인</a>
              <a class="source-link" href="${activeExam.sourceArticleUrl || activeExam.sourceIndexUrl || "https://www.comcbt.com/xe/dy"}" target="_blank" rel="noreferrer">회차 자료 페이지 확인</a>
            </div>
          </section>

          <div class="question-actions">
            <div class="button-row">
              <button class="secondary-button" id="prevQuestion" type="button">← 이전</button>
              <button class="secondary-button" id="nextQuestion" type="button">다음 →</button>
            </div>
            ${state.examSubmitted ? "" : `<button class="primary-button" id="revealAnswer" type="button">${revealed ? "해설 펼쳐짐" : "정답 · 해설 확인"}</button>`}
          </div>
        </article>

        <aside class="cbt-sidebar">
          <div class="surface stat-card compact-stat-card">
            <div class="stat-card-heading">
              <div>
                <span class="eyebrow">현재 과목</span>
                <h3>${state.quizSubject === "all" ? "전체 문항" : getSubjectTitle(state.quizSubject)}</h3>
              </div>
              <span class="current-position">${state.quizIndex + 1}/${filtered.length}</span>
            </div>
            <div class="mini-list">
              <div class="mini-item"><span>푼 문제</span><strong>${filteredStats.answered}/${filteredStats.total}</strong></div>
              <div class="mini-item"><span>현재 정답</span><strong>${filteredStats.correct}</strong></div>
              <div class="mini-item"><span>북마크</span><strong>${currentBookmarks}</strong></div>
            </div>
          </div>

          <details class="surface palette-panel" ${isCompactLayout ? "" : "open"}>
            <summary>
              <span>문항 번호판</span>
              <small>${isCompactLayout ? "펼쳐서 이동" : "클릭해서 이동"}</small>
            </summary>
            <div class="palette-legend" aria-label="번호판 범례">
              <span><i class="legend-dot answered"></i>풀이</span>
              <span><i class="legend-dot current"></i>현재</span>
              <span><i class="legend-dot bookmarked"></i>북마크</span>
            </div>
            <div class="palette-groups">
              ${subjects
                .map((subject, subjectIndex) => {
                  const groupQuestions = writtenQuestions.filter((item) => item.subject === subject.id);
                  return `
                    <div class="palette-group">
                      <div class="palette-group-title"><span>${subjectIndex + 1}과목</span><strong>${subject.title}</strong></div>
                      <div class="question-palette">
                        ${groupQuestions
                          .map((item) => {
                            const selected = state.answers[item.id];
                            const itemRevealed = state.examSubmitted || Boolean(state.revealed[item.id]);
                            const classes = ["palette-number"];
                            if (selected !== undefined) classes.push("is-answered");
                            if (item.id === question.id) classes.push("is-current");
                            if (state.bookmarks.includes(item.id)) classes.push("is-bookmarked");
                            if (itemRevealed && selected === item.answer) classes.push("is-correct");
                            if (itemRevealed && selected !== undefined && selected !== item.answer) classes.push("is-wrong");
                            return `<button class="${classes.join(" ")}" data-jump-question="${item.number}" type="button" ${item.id === question.id ? 'aria-current="true"' : ""} title="${item.number}번${state.bookmarks.includes(item.id) ? " · 북마크" : ""}">${item.number}${state.bookmarks.includes(item.id) ? '<span aria-hidden="true">★</span>' : ""}</button>`;
                          })
                          .join("")}
                      </div>
                    </div>
                  `;
                })
                .join("")}
            </div>
          </details>

          <div class="surface keyboard-card">
            <strong>키보드로 빠르게</strong>
            <p><kbd>1</kbd>–<kbd>4</kbd> 답 선택 · <kbd>←</kbd><kbd>→</kbd> 이동 · <kbd>B</kbd> 북마크</p>
          </div>
        </aside>
      </section>
    </div>
  `;
}

function bindCbtQuiz() {
  app.querySelector("#examSelect")?.addEventListener("change", (event) => {
    pauseQuizTimer();
    state.selectedExamId = event.target.value;
    activateExam(state.selectedExamId);
    state.quizSubject = "all";
    state.quizIndex = 0;
    state.examSubmitted = false;
    state.timerEnd = null;
    state.timerRemaining = EXAM_DURATION_SECONDS;
    saveState();
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  app.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.quizSubject = button.dataset.filter;
      state.quizIndex = 0;
      saveState();
      render();
    });
  });

  app.querySelectorAll("[data-option]").forEach((button) => {
    button.addEventListener("click", () => {
      if (state.examSubmitted) return;
      const question = getFilteredQuestions()[state.quizIndex];
      state.answers[question.id] = Number(button.dataset.option);
      saveState();
      render();
    });
  });

  app.querySelector("#revealAnswer")?.addEventListener("click", () => {
    const question = getFilteredQuestions()[state.quizIndex];
    state.revealed[question.id] = true;
    saveState();
    render();
  });

  app.querySelector("#prevQuestion")?.addEventListener("click", () => moveQuizQuestion(-1));
  app.querySelector("#nextQuestion")?.addEventListener("click", () => moveQuizQuestion(1));

  app.querySelector("#toggleBookmark")?.addEventListener("click", () => {
    const question = getFilteredQuestions()[state.quizIndex];
    toggleArrayValue(state.bookmarks, question.id);
    saveState();
    render();
  });

  app.querySelectorAll("[data-jump-question]").forEach((button) => {
    button.addEventListener("click", () => {
      const number = Number(button.dataset.jumpQuestion);
      state.quizSubject = "all";
      state.quizIndex = Math.max(0, writtenQuestions.findIndex((question) => question.number === number));
      saveState();
      render();
    });
  });

  app.querySelector("#submitExam")?.addEventListener("click", () => {
    const stats = getQuizStats(writtenQuestions);
    const unanswered = writtenQuestions.length - stats.answered;
    if (unanswered > 0 && !window.confirm(`아직 ${unanswered}문항을 풀지 않았습니다. 지금 채점할까요?`)) return;
    pauseQuizTimer();
    state.examSubmitted = true;
    saveState();
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  app.querySelector("#restartExam")?.addEventListener("click", () => {
    if (!window.confirm("현재 답안과 채점 결과를 지우고 처음부터 다시 풀까요?")) return;
    const currentQuestionIds = new Set(writtenQuestions.map((question) => question.id));
    state.answers = Object.fromEntries(
      Object.entries(state.answers).filter(([questionId]) => !currentQuestionIds.has(questionId)),
    );
    state.revealed = Object.fromEntries(
      Object.entries(state.revealed).filter(([questionId]) => !currentQuestionIds.has(questionId)),
    );
    state.bookmarks = state.bookmarks.filter((questionId) => !currentQuestionIds.has(questionId));
    state.examSubmitted = false;
    state.quizSubject = "all";
    state.quizIndex = 0;
    state.timerEnd = null;
    state.timerRemaining = EXAM_DURATION_SECONDS;
    saveState();
    render();
  });

  app.querySelector("#timerToggle")?.addEventListener("click", () => {
    if (state.timerEnd) {
      pauseQuizTimer();
    } else {
      const remaining = getTimerRemainingSeconds();
      if (remaining <= 0) return;
      state.timerEnd = Date.now() + remaining * 1000;
    }
    saveState();
    render();
  });

  app.querySelector("#timerReset")?.addEventListener("click", () => {
    state.timerEnd = null;
    state.timerRemaining = EXAM_DURATION_SECONDS;
    saveState();
    render();
  });

  app.onkeydown = (event) => {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    if (event.target.closest("input, textarea, select")) return;

    if (["1", "2", "3", "4"].includes(event.key) && !state.examSubmitted) {
      event.preventDefault();
      app.querySelector(`[data-option="${Number(event.key) - 1}"]`)?.click();
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveQuizQuestion(-1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      moveQuizQuestion(1);
    }
    if (event.key.toLowerCase() === "b") {
      event.preventDefault();
      app.querySelector("#toggleBookmark")?.click();
    }
  };

  if (state.timerEnd && !state.examSubmitted) startQuizTimerTicker();
}

function moveQuizQuestion(direction) {
  const total = getFilteredQuestions().length;
  state.quizIndex = (state.quizIndex + direction + total) % total;
  saveState();
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderQuestionFigure(question) {
  if (question.figure) {
    return `
      <section class="question-figure" aria-label="문제 자료">
        <span class="explanation-label">문제 자료</span>
        <div class="figure-content">${question.figure}</div>
      </section>
    `;
  }

  const images = Array.isArray(question.questionImageUrls) ? question.questionImageUrls : [];
  if (!images.length) return "";
  return `
    <section class="question-figure" aria-label="문제 자료">
      <span class="explanation-label">문제 자료</span>
      <div class="source-figure-grid">
        ${images
          .map(
            (imageUrl, index) => `<img src="${escapeHtml(imageUrl)}" alt="${question.number}번 문제 자료 ${index + 1}" loading="lazy" referrerpolicy="no-referrer" />`,
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderOptionImages(question, optionIndex) {
  if (question.figure) return "";
  const optionImages = question.optionImageUrls?.[optionIndex];
  const images = Array.isArray(optionImages) ? optionImages : optionImages ? [optionImages] : [];
  if (!images.length) return "";
  return `
    <span class="option-image-grid">
      ${images
        .map(
          (imageUrl, imageIndex) => `<img src="${escapeHtml(imageUrl)}" alt="${question.number}번 ${optionIndex + 1}번 보기 그림 ${imageIndex + 1}" loading="lazy" referrerpolicy="no-referrer" />`,
        )
        .join("")}
    </span>
  `;
}

function getExamResult() {
  const subjectResults = subjects.map((subject) => {
    const questions = writtenQuestions.filter((question) => question.subject === subject.id);
    const stats = getQuizStats(questions);
    return {
      ...stats,
      id: subject.id,
      title: subject.title,
      score: Math.round((stats.correct / questions.length) * 100),
    };
  });
  const totalStats = getQuizStats(writtenQuestions);
  const score = Math.round((totalStats.correct / writtenQuestions.length) * 100);
  return {
    ...totalStats,
    score,
    subjectResults,
    passed: score >= 60 && subjectResults.every((subject) => subject.score >= 40),
  };
}

function renderExamResult(result) {
  return `
    <section class="surface result-panel ${result.passed ? "is-passed" : "is-review"}">
      <div class="result-summary">
        <div>
          <span class="eyebrow">채점 완료</span>
          <h2>${result.passed ? "합격 기준을 충족했습니다" : "오답 복습이 필요합니다"}</h2>
          <p>평균 60점 이상, 모든 과목 40점 이상을 기준으로 계산한 연습 결과입니다.</p>
        </div>
        <div class="score-ring" aria-label="총점 ${result.score}점">
          <strong>${result.score}</strong><span>점</span>
        </div>
      </div>
      <div class="subject-score-grid">
        ${result.subjectResults
          .map(
            (subject, index) => `
              <div class="subject-score ${subject.score < 40 ? "is-fail" : ""}">
                <span>${index + 1}과목</span>
                <strong>${subject.score}점</strong>
                <small>${subject.correct}/${subject.total} 정답</small>
              </div>
            `,
          )
          .join("")}
      </div>
      <div class="button-row result-actions">
        <button class="secondary-button" id="restartExam" type="button">처음부터 다시 풀기</button>
        <button class="ghost-button" data-filter="all" type="button">전체 해설 복습</button>
      </div>
    </section>
  `;
}

function getTimerRemainingSeconds() {
  if (state.timerEnd) {
    return Math.max(0, Math.ceil((Number(state.timerEnd) - Date.now()) / 1000));
  }
  return Number.isFinite(state.timerRemaining) ? state.timerRemaining : EXAM_DURATION_SECONDS;
}

function pauseQuizTimer() {
  state.timerRemaining = getTimerRemainingSeconds();
  state.timerEnd = null;
  window.clearInterval(quizTimerIntervalId);
  quizTimerIntervalId = null;
}

function formatTimer(totalSeconds) {
  const seconds = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainder = seconds % 60;
  return [hours, minutes, remainder].map((value) => String(value).padStart(2, "0")).join(":");
}

function startQuizTimerTicker() {
  const update = () => {
    const remaining = getTimerRemainingSeconds();
    const display = app.querySelector("#examTimer");
    if (display) display.textContent = formatTimer(remaining);
    if (remaining > 0) return;

    state.timerEnd = null;
    state.timerRemaining = 0;
    saveState();
    window.clearInterval(quizTimerIntervalId);
    quizTimerIntervalId = null;
    const toggle = app.querySelector("#timerToggle");
    if (toggle) {
      toggle.textContent = "시간 종료";
      toggle.disabled = true;
    }
  };
  update();
  quizTimerIntervalId = window.setInterval(update, 1000);
}

function renderPracticalLecture() {
  return `
    <div class="stack">
      <section class="hero-grid">
        <div class="surface padded hero-copy">
          <span class="eyebrow">3차 실기 기본강의</span>
          <h2>조건 해석, 계산, 배치, 마감을 하나의 루틴으로</h2>
          <p>실기 시험은 정답 하나를 고르는 시험이 아니라, 조건을 읽고 공간계획의 근거를 도면과 표로 설득하는 시험입니다. 계산 결과가 토지이용계획과 시설배치로 이어져야 합니다.</p>
          <div class="tag-row">
            <span class="tag green">계산형</span>
            <span class="tag blue">도면형</span>
            <span class="tag amber">서술형</span>
            <span class="tag coral">마감체크</span>
          </div>
          <div class="button-row" style="margin-top:22px">
            <button class="primary-button" id="completePracticalLecture" type="button">
              ${state.lectureDone.includes("practical:basic") ? "실기 기본강의 완료 취소" : "실기 기본강의 완료"}
            </button>
            <button class="secondary-button" data-go="practicalQuiz" type="button">실기 기출유형 풀기</button>
          </div>
        </div>
        <div class="surface visual-panel">
          <div class="visual-heading">
            <span class="eyebrow">실기 도면</span>
            <h3>색, 선, 표가 같이 읽혀야 합니다</h3>
            <p>아래 예시는 토지이용과 도로 위계를 같이 표현한 연습 도면입니다.</p>
          </div>
          <canvas id="planCanvas" aria-label="실기 도면 예시"></canvas>
        </div>
      </section>

      <section>
          <div class="section-heading">
            <div>
              <span class="eyebrow">강의 목차</span>
            <h2>기본강의 상세 설명</h2>
            <p>각 단계마다 왜 필요한지, 어떤 순서로 답안을 만들지, 자주 틀리는 지점을 함께 정리했습니다.</p>
            </div>
          </div>
        <div class="grid-2">
          ${practicalLessons
            .map(
              (lesson) => `
                <article class="lecture-step">
                  <h3>${lesson.title}</h3>
                  <p>${lesson.body}</p>
                  <div class="lesson-focus">
                    <strong>왜 중요한가</strong>
                    <p>${lesson.why}</p>
                  </div>
                  <ol class="detail-list">
                    ${lesson.process.map((step) => `<li>${step}</li>`).join("")}
                  </ol>
                  <div class="lesson-example">
                    <strong>답안 예시</strong>
                    <p>${lesson.example}</p>
                  </div>
                  <div class="lesson-warning">
                    <strong>감점 주의</strong>
                    <p>${lesson.mistake}</p>
                  </div>
                  <div class="tag-row">${lesson.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>
                </article>
              `,
            )
            .join("")}
        </div>
      </section>

      <section>
        <div class="section-heading">
          <div>
            <span class="eyebrow">산식 암기</span>
            <h2>계산형에서 자주 쓰는 기본식</h2>
          </div>
        </div>
        <table class="study-table">
          <thead>
            <tr><th>항목</th><th>핵심식</th><th>답안 작성 포인트</th></tr>
          </thead>
          <tbody>
            <tr><td>등차급수법</td><td>장래인구 = 현재인구 + 연평균 증가수 x 기간</td><td>증가수의 기준 기간과 단위를 명확히 씁니다.</td></tr>
            <tr><td>등비급수법</td><td>장래인구 = 현재인구 x (1 + 증가율)<sup>기간</sup></td><td>증가율을 연율로 환산했는지 확인합니다.</td></tr>
            <tr><td>주거용지</td><td>계획인구 x 1인당 주거용지 원단위</td><td>㎡를 ha로 바꿀 때 10,000㎡ = 1ha를 사용합니다.</td></tr>
            <tr><td>시설수요</td><td>계획인구 또는 가구수 x 원단위</td><td>계산 결과를 학교, 공원, 도로 계획에 연결합니다.</td></tr>
          </tbody>
        </table>
      </section>
    </div>
  `;
}

function bindPracticalLecture() {
  app.querySelector("#completePracticalLecture").addEventListener("click", () => {
    toggleArrayValue(state.lectureDone, "practical:basic");
    saveState();
    render();
  });
  app.querySelectorAll("[data-go]").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.go));
  });
}

function renderPracticalQuiz() {
  return `
    <div class="stack">
      <section class="section-heading">
        <div>
          <span class="eyebrow">3차 실기 기출유형</span>
          <h2>계산과 도면을 연결하는 대표 문제</h2>
          <p>실기 답안은 “산식, 판단, 도면 반영” 세 가지가 같이 보여야 점수가 안정됩니다. 풀이 보기를 누르면 단계별 계산, 판단 문장, 자주 하는 실수까지 확인할 수 있습니다.</p>
        </div>
      </section>

      <section class="grid-2">
        ${practicalProblems
          .map(
            (problem) => `
              <article class="problem-card">
                <span class="tag amber">${problem.kind}</span>
                <h3 style="margin-top:12px">${problem.title}</h3>
                <p>${problem.prompt}</p>
                <div class="answer-box ${state.practicalRevealed[problem.id] ? "is-visible" : ""}">
                  <strong>풀이 방향</strong>
                  <p>${problem.answer}</p>
                  <div class="solution-steps">
                    ${problem.solutionSteps
                      .map(
                        (step) => `
                          <div class="solution-step">
                            <strong>${step.label}</strong>
                            <p>${step.text}</p>
                          </div>
                        `,
                      )
                      .join("")}
                  </div>
                  <div class="sample-answer">
                    <strong>답안에 이렇게 쓰기</strong>
                    <p>${problem.sampleAnswer}</p>
                  </div>
                  <div class="lesson-warning">
                    <strong>자주 하는 실수</strong>
                    <ul>${problem.commonMistakes.map((item) => `<li>${item}</li>`).join("")}</ul>
                  </div>
                  <div class="rubric" style="margin-top:12px">
                    <strong>채점 포인트</strong>
                    <ul>${problem.rubric.map((item) => `<li>${item}</li>`).join("")}</ul>
                  </div>
                </div>
                <div class="button-row" style="margin-top:16px">
                  <button class="secondary-button" data-practical="${problem.id}" type="button">
                    ${state.practicalRevealed[problem.id] ? "풀이 닫기" : "풀이 보기"}
                  </button>
                </div>
              </article>
            `,
          )
          .join("")}
      </section>

      <section class="draw-grid">
        <div class="surface padded">
          <span class="eyebrow">도면형 연습</span>
          <h2 style="margin:6px 0 10px">신시가지 배치 예시</h2>
          <p style="color:var(--muted);line-height:1.65">남측 철도역, 북측 보전녹지, 중앙 간선도로 조건을 반영해 상업중심과 생활권을 배치합니다.</p>
          <div class="plan-canvas-wrap" style="margin-top:16px">
            <canvas id="planCanvas" aria-label="실기 신시가지 배치 예시"></canvas>
          </div>
        </div>
        <div class="surface padded">
          <span class="eyebrow">자가 채점</span>
          <h2 style="margin:6px 0 12px">답안에 들어갔는지 확인</h2>
          ${renderChecklist("practical")}
        </div>
      </section>
    </div>
  `;
}

function bindPracticalQuiz() {
  app.querySelectorAll("[data-practical]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.practical;
      state.practicalRevealed[id] = !state.practicalRevealed[id];
      saveState();
      render();
    });
  });

  bindChecklist();
}

function renderFinalLab() {
  const stats = getQuizStats(writtenQuestions);
  return `
    <div class="stack">
      <section class="section-heading">
        <div>
          <span class="eyebrow">실전 연습실</span>
          <h2>진도, 오답, 실기 메모를 한 번에 점검</h2>
          <p>시험 직전에는 새로운 내용을 늘리기보다 틀린 문제와 도면 마감 실수를 줄이는 것이 효율적입니다.</p>
        </div>
      </section>

      <section class="grid-3">
        <article class="stat-card">
          <h3>필기 풀이</h3>
          <div class="mini-list">
            <div class="mini-item"><span>전체</span><strong>${stats.total}</strong></div>
            <div class="mini-item"><span>푼 문제</span><strong>${stats.answered}</strong></div>
            <div class="mini-item"><span>정답률</span><strong>${stats.accuracy}%</strong></div>
          </div>
        </article>
        <article class="stat-card">
          <h3>강의 완료</h3>
          <div class="mini-list">
            <div class="mini-item"><span>필기</span><strong>${state.lectureDone.filter((id) => id.startsWith("written:")).length}/${subjects.length}</strong></div>
            <div class="mini-item"><span>실기</span><strong>${state.lectureDone.includes("practical:basic") ? "완료" : "진행 전"}</strong></div>
          </div>
        </article>
        <article class="stat-card">
          <h3>실기 체크</h3>
          <div class="mini-list">
            <div class="mini-item"><span>체크 항목</span><strong>${state.checklistDone.length}/${practicalChecklist.length}</strong></div>
            <div class="mini-item"><span>목표</span><strong>실수 0개</strong></div>
          </div>
        </article>
      </section>

      <section class="grid-2">
        <article class="surface padded">
          <span class="eyebrow">학습 계획</span>
          <h2 style="margin:6px 0 14px">4주 루틴 체크</h2>
          ${renderPlannerTable(true)}
        </article>
        <article class="surface padded">
          <span class="eyebrow">실기 마감</span>
          <h2 style="margin:6px 0 14px">도면 제출 전 체크리스트</h2>
          ${renderChecklist("final")}
        </article>
      </section>

      <section class="draw-grid">
        <div class="surface padded">
          <span class="eyebrow">답안 메모</span>
          <h2 style="margin:6px 0 12px">실기 서술 연습</h2>
          <textarea class="textarea" id="practicalNote" placeholder="예: 상업중심은 철도역과 간선도로 결절부에 배치하고, 주거지는 보전녹지와 연계한 생활권 단위로 구성한다.">${escapeHtml(state.practicalNote)}</textarea>
          <div class="button-row" style="margin-top:12px">
            <button class="secondary-button" id="saveNote" type="button">메모 저장</button>
            <button class="ghost-button" id="clearNote" type="button">메모 비우기</button>
          </div>
        </div>
        <div class="surface padded">
          <span class="eyebrow">도면 복습</span>
          <h2 style="margin:6px 0 12px">배치 논리 다시 보기</h2>
          <div class="plan-canvas-wrap">
            <canvas id="planCanvas" aria-label="실전 도면 복습 예시"></canvas>
          </div>
        </div>
      </section>
    </div>
  `;
}

function bindFinalLab() {
  app.querySelectorAll("[data-plan]").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      toggleArrayValue(state.plannerDone, checkbox.dataset.plan, checkbox.checked);
      saveState();
      render();
    });
  });

  bindChecklist();

  const note = app.querySelector("#practicalNote");
  app.querySelector("#saveNote").addEventListener("click", () => {
    state.practicalNote = note.value;
    saveState();
  });

  app.querySelector("#clearNote").addEventListener("click", () => {
    state.practicalNote = "";
    saveState();
    render();
  });
}

function renderPlannerTable(interactive) {
  if (!interactive) {
    return `
      <table class="study-table">
        <thead><tr><th>기간</th><th>학습 목표</th><th>핵심 산출물</th></tr></thead>
        <tbody>
          ${planner
            .map(
              ([week, goal], index) => `
                <tr>
                  <td>${week}</td>
                  <td>${goal}</td>
                  <td>${index < 2 ? "개념표와 오답노트" : "실기 답안지와 도면"}</td>
                </tr>
              `,
            )
            .join("")}
        </tbody>
      </table>
    `;
  }

  return `
    <div class="planner">
      ${planner
        .map(
          ([week, goal], index) => `
            <label class="planner-day">
              <strong>${week}</strong>
              <span>${goal}</span>
              <input data-plan="${index}" type="checkbox" ${state.plannerDone.includes(String(index)) ? "checked" : ""} />
            </label>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderChecklist(origin) {
  return practicalChecklist
    .map(
      (item, index) => `
        <label class="check-control">
          <input data-check="${index}" data-origin="${origin}" type="checkbox" ${state.checklistDone.includes(String(index)) ? "checked" : ""} />
          <span>${item}</span>
        </label>
      `,
    )
    .join("");
}

function bindChecklist() {
  app.querySelectorAll("[data-check]").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      toggleArrayValue(state.checklistDone, checkbox.dataset.check, checkbox.checked);
      saveState();
      if (checkbox.dataset.origin === "final") render();
    });
  });
}

function getSelectedSubject() {
  return subjects.find((subject) => subject.id === state.selectedSubject) || subjects[0];
}

function getSubjectTitle(subjectId) {
  return subjects.find((subject) => subject.id === subjectId)?.title || "전체";
}

function getFilteredQuestions() {
  const filtered =
    state.quizSubject === "all"
      ? writtenQuestions
      : writtenQuestions.filter((question) => question.subject === state.quizSubject);

  if (state.quizIndex >= filtered.length) state.quizIndex = 0;
  return filtered;
}

function getQuizStats(questions) {
  const answered = questions.filter((question) => state.answers[question.id] !== undefined);
  const correct = answered.filter((question) => state.answers[question.id] === question.answer);
  return {
    total: questions.length,
    answered: answered.length,
    correct: correct.length,
    accuracy: answered.length ? Math.round((correct.length / answered.length) * 100) : 0,
  };
}

function getProgress() {
  const correctAnswers = writtenQuestions.filter(
    (question) => state.answers[question.id] === question.answer,
  ).length;
  const total = subjects.length + 1 + writtenQuestions.length + practicalChecklist.length + planner.length;
  const done =
    state.lectureDone.filter((id) => id.startsWith("written:")).length +
    (state.lectureDone.includes("practical:basic") ? 1 : 0) +
    correctAnswers +
    state.checklistDone.length +
    state.plannerDone.length;
  return {
    done,
    total,
    percent: Math.min(100, Math.round((done / total) * 100)),
  };
}

function toggleArrayValue(array, value, force) {
  const normalized = String(value);
  const index = array.indexOf(normalized);
  const shouldAdd = force === undefined ? index === -1 : Boolean(force);

  if (shouldAdd && index === -1) {
    array.push(normalized);
  }

  if (!shouldAdd && index !== -1) {
    array.splice(index, 1);
  }
}

function drawCityCanvas() {
  const canvas = document.querySelector("#cityCanvas");
  if (!canvas) return;

  const ctx = setupCanvas(canvas);
  if (!ctx) return;
  const { width, height } = canvas.getBoundingClientRect();

  ctx.fillStyle = "#dfe8e6";
  ctx.fillRect(0, 0, width, height);

  drawParcel(ctx, 22, 24, width * 0.42, height * 0.36, "#f2c9b8", "주거");
  drawParcel(ctx, width * 0.48, 26, width * 0.22, height * 0.25, "#f3d36f", "상업");
  drawParcel(ctx, width * 0.72, 26, width * 0.22, height * 0.33, "#c9d59c", "공공");
  drawParcel(ctx, 24, height * 0.48, width * 0.28, height * 0.3, "#b9d7bb", "공원");
  drawParcel(ctx, width * 0.36, height * 0.52, width * 0.24, height * 0.32, "#d8c4e8", "업무");
  drawParcel(ctx, width * 0.64, height * 0.48, width * 0.3, height * 0.34, "#b7d0e8", "산업");

  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 14;
  ctx.lineCap = "round";
  drawLine(ctx, width * 0.1, height * 0.43, width * 0.92, height * 0.43);
  drawLine(ctx, width * 0.45, height * 0.08, width * 0.45, height * 0.9);
  ctx.strokeStyle = "#6f8580";
  ctx.lineWidth = 3;
  drawLine(ctx, width * 0.1, height * 0.43, width * 0.92, height * 0.43);
  drawLine(ctx, width * 0.45, height * 0.08, width * 0.45, height * 0.9);

  ctx.strokeStyle = "#267c6f";
  ctx.lineWidth = 5;
  ctx.setLineDash([8, 7]);
  drawLine(ctx, width * 0.12, height * 0.76, width * 0.9, height * 0.2);
  ctx.setLineDash([]);

  ctx.fillStyle = "#17211f";
  ctx.font = "700 13px Apple SD Gothic Neo, sans-serif";
  ctx.fillText("녹지축 + 보행축", width * 0.18, height * 0.72);
  ctx.fillText("간선도로", width * 0.68, height * 0.4);
}

function drawPlanCanvas(id) {
  const canvas = document.querySelector(`#${id}`);
  if (!canvas) return;

  const ctx = setupCanvas(canvas);
  if (!ctx) return;
  const { width, height } = canvas.getBoundingClientRect();

  ctx.fillStyle = "#eef3f1";
  ctx.fillRect(0, 0, width, height);

  const margin = 22;
  const mapW = width - margin * 2;
  const mapH = height - margin * 2;

  ctx.fillStyle = "#f8fbfa";
  ctx.strokeStyle = "#6f8580";
  ctx.lineWidth = 2;
  ctx.fillRect(margin, margin, mapW, mapH);
  ctx.strokeRect(margin, margin, mapW, mapH);

  drawParcel(ctx, margin + 12, margin + 12, mapW - 24, mapH * 0.18, "#b9d7bb", "보전녹지");
  drawParcel(ctx, margin + 24, margin + mapH * 0.24, mapW * 0.34, mapH * 0.28, "#f2c9b8", "저밀주거");
  drawParcel(ctx, margin + mapW * 0.42, margin + mapH * 0.24, mapW * 0.28, mapH * 0.28, "#f0bfa7", "중밀주거");
  drawParcel(ctx, margin + mapW * 0.72, margin + mapH * 0.24, mapW * 0.2, mapH * 0.28, "#c9d59c", "학교");
  drawParcel(ctx, margin + mapW * 0.16, margin + mapH * 0.58, mapW * 0.24, mapH * 0.22, "#f3d36f", "상업");
  drawParcel(ctx, margin + mapW * 0.46, margin + mapH * 0.58, mapW * 0.28, mapH * 0.22, "#d8c4e8", "업무");
  drawParcel(ctx, margin + mapW * 0.78, margin + mapH * 0.58, mapW * 0.15, mapH * 0.22, "#b9d7bb", "근린공원");

  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 16;
  drawLine(ctx, margin + 8, margin + mapH * 0.55, margin + mapW - 8, margin + mapH * 0.55);
  ctx.strokeStyle = "#596b67";
  ctx.lineWidth = 3;
  drawLine(ctx, margin + 8, margin + mapH * 0.55, margin + mapW - 8, margin + mapH * 0.55);

  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 11;
  drawLine(ctx, margin + mapW * 0.48, margin + mapH * 0.2, margin + mapW * 0.48, margin + mapH * 0.9);
  ctx.strokeStyle = "#7d8d89";
  ctx.lineWidth = 2;
  drawLine(ctx, margin + mapW * 0.48, margin + mapH * 0.2, margin + mapW * 0.48, margin + mapH * 0.9);

  ctx.strokeStyle = "#117c73";
  ctx.lineWidth = 4;
  ctx.setLineDash([8, 6]);
  drawLine(ctx, margin + mapW * 0.14, margin + mapH * 0.72, margin + mapW * 0.9, margin + mapH * 0.36);
  ctx.setLineDash([]);

  ctx.fillStyle = "#17211f";
  ctx.font = "700 13px Apple SD Gothic Neo, sans-serif";
  ctx.fillText("철도역", margin + mapW * 0.16, margin + mapH - 12);
  ctx.fillText("30m 간선도로", margin + mapW * 0.58, margin + mapH * 0.53);
  ctx.fillText("생활보행축", margin + mapW * 0.52, margin + mapH * 0.74);

  ctx.fillStyle = "#315f9f";
  ctx.beginPath();
  ctx.arc(margin + mapW * 0.22, margin + mapH * 0.92, 8, 0, Math.PI * 2);
  ctx.fill();
}

function drawParcel(ctx, x, y, w, h, color, label) {
  ctx.fillStyle = color;
  ctx.strokeStyle = "rgba(23,33,31,0.2)";
  ctx.lineWidth = 1.5;
  ctx.fillRect(x, y, w, h);
  ctx.strokeRect(x, y, w, h);
  ctx.fillStyle = "#17211f";
  ctx.font = "700 13px Apple SD Gothic Neo, Noto Sans KR, sans-serif";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillText(label, x + w / 2, y + h / 2);
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
}

function drawLine(ctx, x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function setupCanvas(canvas) {
  const rect = canvas.getBoundingClientRect();
  if (!rect.width || !rect.height) return null;
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.round(rect.width * ratio);
  canvas.height = Math.round(rect.height * ratio);
  const ctx = canvas.getContext("2d");
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  return ctx;
}

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => fn(...args), delay);
  };
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
