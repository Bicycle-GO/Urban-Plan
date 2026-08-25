(function createUrbanPlanExplanationEngine() {
  "use strict";

  const NEGATIVE_PATTERN =
    /옳지\s*않|틀린|아닌\s*것|없는\s*것|볼\s*수\s*없|거리가\s*먼|적절하지|적당하지|적합하지|해당하지|일치하지|바르지|타당하지|잘못|오류|보기\s*어려운|관련이\s*없는|관계가\s*없는|속하지\s*않|제외되는|옳지\s*못/;
  const SEQUENCE_PATTERN = /순서|절차|단계|배열|선후|진행\s*과정|우선순위/;
  const CALCULATION_PATTERN =
    /계산|산정|구하|값은|얼마|면적은|인구는|비율은|지수는|공식|수식|추정치|사업비|용량은|규모는/;
  const FORMULA_PATTERN =
    /경제기반승수|기반승수|입지계수|입지상|순위규모|지니계수|로렌츠|용적률|건폐율|순현재가치|내부수익률|편익.?비용비|주택보급률|경제활동참가율|표준편차|분산/;
  const HISTORY_PATTERN = /인물|누구|학자|주장|제안|저서|헌장|최초|연도|시대|설계한\s*사람|창안/;
  const MATCHING_PATTERN = /연결|짝지|조합|모두\s*옳|모두\s*바르|관계가\s*옳|일치하는/;
  const DEFINITION_PATTERN = /용어|명칭|무엇|개념|정의|의미|설명한\s*것|해당하는\s*것/;
  const SOURCE_WARNING_PATTERN =
    /오류 신고|복원 오류|그림파일이 없습니다|정답과 해설을 확인|문제 오류|복원중|관련 규정 개정전|개정 전 문제|기존 정답|가답안|모두\s*정답|전항\s*정답/;
  const AUTHORED_WARNING_CONTEXT_PATTERN =
    /원문|복원|저장\s*(?:정답|답안)|정답표|가답안|전사|데이터/;
  const AUTHORED_WARNING_ISSUE_PATTERN =
    /오류|오기|손상|누락|충돌|불일치|맞지|틀렸|주의|확정하기 어렵|가능성|모호|불완전|복수\s*정답|모두\s*정답|전항\s*정답/;
  const DOUBLE_NEGATIVE_PATTERN =
    /허용되지\s*않.{0,45}속하지\s*않|받지\s*않아도.{0,45}아닌|필요하지\s*않.{0,35}아닌|해당하지\s*않.{0,35}아닌|제외.{0,35}제외|금지.{0,35}아닌/;
  const LEGAL_PATTERN =
    /법률|법령|시행령|시행규칙|조례|법상|법에\s*따라|규정에\s*의한|건축법|도시개발법|주차장법|택지개발촉진법|국토교통부|국토해양부|건설교통부|국토정책위원회/;

  const SUBJECT_GUIDES = {
    planning:
      "도시계획론은 개념의 목적, 대표 학자·제도, 적용 대상을 한 묶음으로 정리하면 비슷한 보기를 구분하기 쉽습니다.",
    design:
      "도시설계 문제는 형태만 보지 말고 동선, 접근성, 밀도, 시설 배치 중 어떤 기준을 묻는지 먼저 확인하세요.",
    development:
      "도시개발론은 사업 주체, 토지 확보 방식, 재원, 위험 부담을 서로 연결해 비교하면 정답 근거가 선명해집니다.",
    regional:
      "국토·지역계획은 이론의 가정, 핵심 변수, 적용 범위를 함께 비교하면 이름이 비슷한 모형을 구분할 수 있습니다.",
    law:
      "법규는 권한 주체, 행위, 절차, 기한·수치를 한 세트로 묶어 확인해야 표현이 비슷한 보기에 흔들리지 않습니다.",
  };

  const CONCEPTS = [
    {
      keys: ["델파이법", "델파이기법"],
      detail:
        "델파이법은 여러 전문가에게 익명 설문을 반복하고 앞선 응답의 요약을 다시 제공해 의견을 수렴하는 예측 기법입니다.",
      memory: "델파이법 = 전문가 · 익명 · 반복 설문 · 의견 수렴",
    },
    {
      keys: ["완충녹지"],
      detail:
        "완충녹지는 공해, 소음, 재해 위험이나 서로 충돌하는 토지이용을 공간적으로 분리해 생활환경을 보호하는 녹지입니다.",
      memory: "완충녹지 = 오염·소음·위험을 차단하고 토지이용을 분리",
    },
    {
      keys: ["개발밀도관리구역"],
      detail:
        "개발밀도관리구역은 개발 때문에 기반시설의 처리·수용 능력이 부족해질 우려가 있는 곳에서 개발밀도를 관리하는 제도입니다.",
      memory: "개발밀도관리구역 = 기반시설 용량에 맞춰 개발밀도 관리",
    },
    {
      keys: ["개발진흥지구"],
      detail:
        "개발진흥지구는 주거·산업·유통·관광 등의 기능을 집중적으로 개발하고 정비할 필요가 있는 지역에 지정하는 용도지구입니다.",
      memory: "개발진흥지구 = 특정 기능의 개발·정비를 촉진",
    },
    {
      keys: ["계획단위개발(PUD)", "계획단위개발", "PUD"],
      detail:
        "계획단위개발은 필지별 획일 규제보다 넓은 구역을 하나의 단위로 보고 용도·밀도·오픈스페이스를 종합 설계하는 방식입니다.",
      memory: "PUD = 넓은 구역을 하나로 묶어 유연하게 종합 설계",
    },
    {
      keys: ["Huff모형", "허프모형", "Huff 모형"],
      detail:
        "허프 모형은 소비자가 어떤 상업시설을 선택할 확률을 시설의 매력도에는 비례하고 거리 저항에는 반비례하도록 추정합니다.",
      memory: "Huff = 매력도는 +, 거리 저항은 −인 상권 선택확률",
    },
    {
      keys: ["입체환지"],
      detail:
        "입체환지는 토지 권리를 정리한 뒤 토지만 돌려주는 대신 건축물의 일부와 그 대지 지분 같은 입체적 권리로 환지하는 방식입니다.",
      memory: "입체환지 = 토지 권리를 건축물·대지지분으로 전환",
    },
    {
      keys: ["워터프론트"],
      detail:
        "워터프론트는 바다·하천·호수와 육지가 맞닿는 수변 공간으로, 친수 접근성·경관·토지이용·환경 보전을 함께 다룹니다.",
      memory: "워터프론트 = 수변 접근·경관·이용·환경의 통합",
    },
    {
      keys: ["중심지이론"],
      detail:
        "크리스탈러의 중심지이론은 재화와 서비스의 최소요구치와 도달범위에 따라 중심지가 계층적으로 배치된다고 설명합니다.",
      memory: "중심지이론 = 크리스탈러 · 최소요구치 · 재화의 도달범위",
    },
    {
      keys: ["우연오차"],
      detail:
        "우연오차는 일정한 방향 없이 불규칙하게 생기는 오차로, 반복 관측과 표본 확대를 통해 영향이 줄어들 수 있습니다.",
      memory: "우연오차 = 방향 없는 변동, 반복 측정으로 감소",
    },
    {
      keys: ["연령 계층별 생존모형", "집단생잔법", "코호트생존법", "코호트 생존법"],
      detail:
        "코호트 생존 방식은 연령·성별 집단마다 생존율과 출생·이동을 적용해 다음 시점의 인구구조를 추계합니다.",
      memory: "코호트 생존 = 연령·성별 집단에 생존·출생·이동 적용",
    },
    {
      keys: ["투입산출모형", "산업연관분석"],
      detail:
        "투입산출모형은 산업 사이의 중간재 거래 관계를 행렬로 나타내 최종수요 변화가 각 산업 생산에 미치는 파급효과를 분석합니다.",
      memory: "투입산출 = 산업 간 거래행렬로 생산 파급효과 분석",
    },
    {
      keys: ["체비지"],
      detail:
        "체비지는 환지방식 사업에서 사업비를 충당하기 위해 시행자가 처분할 수 있도록 환지계획에서 따로 확보한 토지입니다.",
      memory: "체비지 = 환지사업 비용 충당용 처분 토지",
    },
    {
      keys: ["시가화조정구역"],
      detail:
        "시가화조정구역은 무질서한 시가화를 막고 계획적인 개발 시기를 조정하기 위해 일정 기간 시가화를 유보하는 구역입니다.",
      memory: "시가화조정구역 = 시가화의 시기와 속도를 조정",
    },
    {
      keys: ["동심원이론", "동심원 이론"],
      detail:
        "버제스의 동심원이론은 도시가 중심업무지구에서 바깥쪽으로 천이지대·근로자주거지·중산층주거지·통근자지대처럼 확장된다고 봅니다.",
      memory: "동심원이론 = 버제스 · 중심에서 외곽으로 지대 확장",
    },
    {
      keys: ["가도시화"],
      detail:
        "가도시화는 산업과 고용 기반이 충분히 성장하기 전에 인구가 도시로 빠르게 집중되어 도시화의 외형과 경제 기반이 어긋난 상태입니다.",
      memory: "가도시화 = 산업화보다 앞선 인구의 도시 집중",
    },
    {
      keys: ["역도시화"],
      detail:
        "역도시화는 대도시권의 인구와 활동이 소도시나 비대도시 지역으로 이동하면서 대도시 집중이 완화되는 현상입니다.",
      memory: "역도시화 = 대도시에서 소도시·비대도시 지역으로 분산",
    },
    {
      keys: ["메갈로폴리스"],
      detail:
        "메갈로폴리스는 여러 대도시권이 교통·경제·생활권으로 이어져 거대한 연속 도시지역을 이루는 현상으로 고트만이 체계화했습니다.",
      memory: "메갈로폴리스 = 고트만 · 대도시권의 연속적 결합",
    },
    {
      keys: ["광역도시계획"],
      detail:
        "광역도시계획은 둘 이상의 인접한 특별시·광역시·시·군에 걸친 장기 발전방향과 공간구조를 함께 조정하는 계획입니다.",
      memory: "광역도시계획 = 둘 이상 인접 도시·군의 장기 공간구조 조정",
    },
    {
      keys: ["보차공존도로"],
      detail:
        "보차공존도로는 보행자와 자동차를 완전히 분리하기보다 자동차 속도를 낮추고 공간을 함께 사용하도록 설계해 보행 안전과 생활 기능을 높입니다.",
      memory: "보차공존 = 저속 차량과 보행자가 안전하게 공간 공유",
    },
    {
      keys: ["쿨데삭형 도로", "쿨데삭", "Cul-de-sac"],
      detail:
        "쿨데삭은 끝이 막힌 막다른 도로로 통과교통을 줄여 주거환경을 안정시키지만 우회 동선과 비상 접근도 함께 검토해야 합니다.",
      memory: "쿨데삭 = 통과교통 억제 · 주거 안전 · 막다른 도로",
    },
    {
      keys: ["격자형 가로망"],
      detail:
        "격자형 가로망은 연결성과 경로 선택성이 높고 토지 분할이 쉽지만 교차로가 많아지고 통과교통이 주거지 안으로 들어올 수 있습니다.",
      memory: "격자형 = 연결·경로 선택은 좋고 교차로·통과교통은 증가",
    },
    {
      keys: ["대상형"],
      detail:
        "공원·녹지체계에서 대상형은 녹지가 띠처럼 길게 이어지는 형태로 연결성과 완충 기능에 유리하지만 같은 면적이면 폭이 좁아질 수 있습니다.",
      memory: "대상형 녹지 = 띠 모양 · 연결성 · 완충 기능",
    },
    {
      keys: ["근린주구"],
      detail:
        "페리의 근린주구는 초등학교의 통학권을 기본 단위로 삼고 간선도로를 경계에, 공공시설과 근린상업을 적절한 중심·접점에 배치합니다.",
      memory: "근린주구 = 페리 · 초등학교 · 간선도로 경계 · 내부 생활권",
    },
    {
      keys: ["래드번", "Radburn"],
      detail:
        "래드번 계획은 슈퍼블록, 쿨데삭, 보행자와 차량 동선의 분리, 연속 녹지체계를 결합한 주거지 설계 사례입니다.",
      memory: "래드번 = 슈퍼블록 · 쿨데삭 · 보차분리 · 연속녹지",
    },
    {
      keys: ["벽면한계선"],
      detail:
        "벽면한계선은 건축물의 벽면이 그 선을 넘어 돌출하지 못하도록 정한 한계선으로, 보행공간·경관·공동통로 확보 등에 활용됩니다.",
      memory: "벽면한계선 = 벽면이 넘어설 수 없는 외곽 한계",
    },
    {
      keys: ["Buchanan Report", "뷰캐넌 보고서"],
      detail:
        "뷰캐넌 보고서는 자동차 교통을 처리하는 도로체계와 생활환경을 보호하는 환경구역을 함께 계획해야 한다고 강조했습니다.",
      memory: "뷰캐넌 = 교통체계와 환경구역의 균형",
    },
    {
      keys: ["성과규제지역제", "성과규제지역제도"],
      detail:
        "성과규제지역제는 용도를 일률적으로 열거하기보다 소음·교통·환경영향처럼 실제 개발 결과가 충족해야 할 성과기준을 규제합니다.",
      memory: "성과규제 = 용도명보다 실제 영향과 결과를 기준으로 관리",
    },
    {
      keys: ["대중교통지향형개발(TOD)", "대중교통지향형개발", "TOD"],
      detail:
        "TOD는 대중교통 결절점 주변에 주거·상업·업무를 고밀·복합 배치하고 걷기 좋은 환경을 만들어 승용차 의존을 줄이는 개발입니다.",
      memory: "TOD = 역세권 · 고밀복합 · 보행친화 · 승용차 의존 감소",
    },
    {
      keys: ["뉴어바니즘", "New Urbanism"],
      detail:
        "뉴어바니즘은 보행 가능한 압축적 근린, 용도 혼합, 다양한 주택, 사람 중심 가로와 전통적 도시 형태를 중시합니다.",
      memory: "뉴어바니즘 = 보행 · 압축 · 혼합용도 · 사람 중심 가로",
    },
    {
      keys: ["전원도시"],
      detail:
        "하워드의 전원도시는 도시의 일자리·편의와 농촌의 쾌적성을 결합하고 녹지대로 둘러싼 자족적 계획도시를 지향합니다.",
      memory: "전원도시 = 하워드 · 도시와 농촌의 장점 · 녹지대 · 자족성",
    },
    {
      keys: ["아테네 헌장", "Athens Charter"],
      detail:
        "아테네 헌장은 CIAM의 논의를 바탕으로 주거·근로·여가·교통을 근대 도시의 핵심 기능으로 보고 기능적 배치를 강조했습니다.",
      memory: "아테네 헌장 = CIAM · 주거·근로·여가·교통",
    },
    {
      keys: ["케빈 린치", "Kevin Lynch"],
      detail:
        "케빈 린치는 도시 이미지를 통로(Path), 경계(Edge), 지구(District), 결절점(Node), 랜드마크(Landmark)의 다섯 요소로 설명했습니다.",
      memory: "린치 5요소 = Path · Edge · District · Node · Landmark",
    },
    {
      keys: ["교류적 계획", "교류적계획"],
      detail:
        "프리드만의 교류적 계획은 계획가와 주민이 대화하고 서로의 경험지식을 배우는 과정에서 계획지식을 함께 형성합니다.",
      memory: "교류적 계획 = 프리드만 · 대화 · 상호학습",
    },
    {
      keys: ["옹호적 계획", "옹호계획"],
      detail:
        "다비도프의 옹호적 계획은 하나의 중립적 계획만을 전제하지 않고 계획가가 소외되거나 대표되지 못한 집단의 대안을 대변하도록 합니다.",
      memory: "옹호적 계획 = 다비도프 · 복수 대안 · 약자 이익 대변",
    },
    {
      keys: ["다이나폴리스", "Dynapolis"],
      detail:
        "독시아디스의 다이나폴리스는 도시를 고정된 형태가 아니라 시간에 따라 특정 방향으로 계속 성장하는 동적 체계로 봅니다.",
      memory: "다이나폴리스 = 독시아디스 · 시간축 · 동적 성장",
    },
    {
      keys: ["연속시각", "Serial Vision"],
      detail:
        "고든 컬런의 연속시각은 사람이 이동하면서 차례로 마주치는 장면의 변화와 대비를 통해 도시경관을 경험한다고 설명합니다.",
      memory: "연속시각 = 고든 컬런 · 이동에 따른 장면의 연속",
    },
    {
      keys: ["GIS", "지리정보시스템"],
      detail:
        "GIS는 위치정보와 속성정보를 함께 저장·관리하고 중첩·거리·네트워크 같은 공간분석 결과를 지도 형태로 표현하는 체계입니다.",
      memory: "GIS = 위치+속성 데이터의 입력·관리·공간분석·표현",
    },
    {
      keys: ["입지계수", "LQ", "입지상"],
      detail:
        "입지계수는 한 지역의 특정 산업 비중을 전국의 같은 산업 비중과 비교해 지역의 상대적 특화 정도를 나타냅니다.",
      memory: "LQ = 지역 산업비중 ÷ 전국 산업비중, 1 초과면 상대적 특화",
    },
    {
      keys: ["변이할당분석", "Shift-Share 분석", "Shift Share 분석"],
      detail:
        "변이할당분석은 지역의 성장 변화를 국가 전체 성장효과, 산업구조효과, 지역경쟁효과로 나누어 설명합니다.",
      memory: "변이할당 = 국가성장 + 산업구조 + 지역경쟁 효과",
    },
    {
      keys: ["성장극이론", "성장거점이론"],
      detail:
        "성장극이론은 성장이 모든 곳에서 동시에 일어나지 않고 선도산업과 그 연계효과를 가진 거점에서 시작해 주변으로 파급된다고 봅니다.",
      memory: "성장극 = 선도산업이 있는 거점에서 성장과 파급 발생",
    },
    {
      keys: ["누적적 인과관계이론", "누적적인과관계론"],
      detail:
        "뮈르달의 누적적 인과관계는 한 지역의 우위나 열위가 순환적으로 강화되며 파급효과와 역류효과를 낳는다고 설명합니다.",
      memory: "누적적 인과 = 뮈르달 · 파급효과와 역류효과의 순환",
    },
    {
      keys: ["수출기반이론", "경제기반이론"],
      detail:
        "수출기반이론은 지역 밖의 수요를 얻는 기반산업의 성장이 소득과 고용을 만들고 비기반산업에 승수효과를 준다고 봅니다.",
      memory: "수출기반 = 기반산업의 외부수요가 지역 승수를 만듦",
    },
    {
      keys: ["중력모형", "중력모델"],
      detail:
        "중력모형은 두 지역 사이의 상호작용이 인구·경제규모 같은 질량에는 비례하고 거리나 이동저항에는 반비례한다고 봅니다.",
      memory: "중력모형 = 규모에는 비례, 거리저항에는 반비례",
    },
    {
      keys: ["내부수익률", "IRR"],
      detail:
        "내부수익률은 사업의 순현재가치를 0으로 만드는 할인율이며 요구수익률과 비교해 투자 타당성을 판단합니다.",
      memory: "IRR = NPV를 0으로 만드는 할인율",
    },
    {
      keys: ["순현재가치", "NPV"],
      detail:
        "순현재가치는 미래 편익과 비용을 같은 시점의 현재가치로 할인한 뒤 편익 현재가치에서 비용 현재가치를 뺀 값입니다.",
      memory: "NPV = 편익 현재가치 − 비용 현재가치",
    },
    {
      keys: ["편익비용비", "편익·비용비", "B/C"],
      detail:
        "편익·비용비는 편익의 현재가치를 비용의 현재가치로 나눈 값으로, 다른 조건이 같다면 1을 넘을 때 경제성이 있다고 봅니다.",
      memory: "B/C = 편익 현재가치 ÷ 비용 현재가치",
    },
    {
      keys: ["프로젝트 파이낸싱", "Project Financing", "PF"],
      detail:
        "프로젝트 파이낸싱은 사업주의 일반 신용보다 해당 사업에서 생길 미래 현금흐름과 자산을 중심으로 자금을 조달하는 방식입니다.",
      memory: "PF = 사업 자체의 현금흐름과 자산을 중심으로 금융",
    },
    {
      keys: ["레버리지", "지렛대효과"],
      detail:
        "레버리지는 차입금을 사용해 자기자본수익률을 확대하는 효과입니다. 사업수익률이 차입비용보다 낮으면 손실도 함께 확대됩니다.",
      memory: "레버리지 = 차입으로 자기자본 수익과 위험을 함께 확대",
    },
    {
      keys: ["REITs", "리츠", "부동산투자회사"],
      detail:
        "리츠는 여러 투자자의 자금을 모아 부동산이나 관련 증권에 투자하고 임대·매각 수익을 투자자에게 배분하는 투자회사입니다.",
      memory: "REITs = 다수 자금으로 부동산 투자 후 수익 배분",
    },
    {
      keys: ["상업용저당채권", "CMBS"],
      detail:
        "상업용저당채권은 상업용 부동산 담보대출을 묶고 그 현금흐름을 기초로 발행하는 증권입니다.",
      memory: "CMBS = 상업용 부동산 담보대출을 기초로 한 증권",
    },
    {
      keys: ["환지방식", "환지"],
      detail:
        "환지방식은 토지를 전면 매수하지 않고 정리 전 토지 권리를 사업 뒤의 정리된 토지에 다시 배분하면서 공공시설과 사업비용을 확보합니다.",
      memory: "환지 = 기존 권리를 정리 후 토지에 재배분",
    },
    {
      keys: ["BTO 방식", "BTO"],
      detail:
        "BTO는 민간이 시설을 건설한 뒤 소유권을 공공에 이전하고 일정 기간 운영권을 받아 투자비를 회수하는 방식입니다.",
      memory: "BTO = 건설(Build) → 이전(Transfer) → 운영(Operate)",
    },
    {
      keys: ["BOT 방식", "BOT"],
      detail:
        "BOT는 민간이 시설을 건설·운영한 뒤 약정 기간이 끝나면 소유권을 공공에 이전하는 방식입니다.",
      memory: "BOT = 건설 → 운영 → 이전",
    },
    {
      keys: ["BOO 방식", "BOO"],
      detail:
        "BOO는 민간이 시설을 건설하고 소유권을 유지한 채 운영하는 방식으로, 약정 뒤 공공 이전을 전제로 하지 않습니다.",
      memory: "BOO = 건설 → 민간 소유 → 민간 운영",
    },
    {
      keys: ["BTL 방식", "BTL"],
      detail:
        "BTL은 민간이 시설을 건설해 공공에 소유권을 이전한 뒤 공공이 지급하는 임대료를 통해 투자비를 회수하는 방식입니다.",
      memory: "BTL = 건설 → 이전 → 공공이 임차료 지급",
    },
    {
      keys: ["도시재생"],
      detail:
        "도시재생은 쇠퇴한 지역의 물리적 환경만 정비하는 데 그치지 않고 경제·사회·공동체 기능을 함께 회복하는 접근입니다.",
      memory: "도시재생 = 물리·경제·사회·공동체의 통합 회복",
    },
    {
      keys: ["혁신도시개발사업", "혁신도시"],
      detail:
        "혁신도시는 공공기관 지방이전과 산·학·연 연계를 통해 지역 혁신거점과 균형발전을 만들려는 개발입니다.",
      memory: "혁신도시 = 공공기관 이전 · 산학연 · 지역혁신",
    },
    {
      keys: ["기업도시"],
      detail:
        "기업도시는 민간기업이 산업·연구·관광 같은 주된 기능과 주거·교육·문화 기능을 함께 개발하는 자족적 도시입니다.",
      memory: "기업도시 = 민간 주도 · 산업과 생활기능의 복합 자족도시",
    },
    {
      keys: ["지하공간"],
      detail:
        "지하공간은 지상 토지를 절약하고 기능을 입체적으로 배치할 수 있지만 공사비, 방재, 환기, 피난과 이용 쾌적성을 함께 검토해야 합니다.",
      memory: "지하공간 = 토지 절약과 입체 이용, 방재·환기·피난 검토",
    },
    {
      keys: ["개발권양도제", "TDR"],
      detail:
        "개발권양도제는 보전이 필요한 지역의 미사용 개발권을 개발을 수용할 지역으로 이전해 보전과 재산권 보상을 함께 도모합니다.",
      memory: "TDR = 보전지역의 개발권을 수용지역으로 이전",
    },
    {
      keys: ["지구단위계획"],
      detail:
        "지구단위계획은 일정 구역의 토지이용을 합리화하고 기능·미관을 높이기 위해 건축물, 가로, 기반시설 등을 구체적으로 정하는 계획입니다.",
      memory: "지구단위계획 = 구역 단위의 토지이용·건축·가로 세부계획",
    },
    {
      keys: ["용도지역"],
      detail:
        "용도지역은 토지의 이용과 건축물의 용도·건폐율·용적률 등을 기본적으로 관리하기 위해 전 국토를 구분하는 틀입니다.",
      memory: "용도지역 = 토지이용과 밀도를 관리하는 기본 구분",
    },
    {
      keys: ["용도지구"],
      detail:
        "용도지구는 용도지역의 제한을 강화하거나 완화해 경관·안전·개발진흥 같은 특정 목적을 보완하는 제도입니다.",
      memory: "용도지구 = 용도지역 규제를 특정 목적에 맞게 보완",
    },
    {
      keys: ["용도구역"],
      detail:
        "용도구역은 시가지의 무질서한 확산 방지나 계획적 토지이용처럼 특별한 정책 목적을 위해 별도의 이용 제한을 두는 공간 범위입니다.",
      memory: "용도구역 = 특별한 정책 목적을 위한 별도 이용 제한",
    },
    {
      keys: ["군집분석(Cluster Analysis)", "군집분석"],
      detail:
        "군집분석은 여러 관측대상을 특성의 유사성에 따라 같은 집단으로 묶고 집단 사이의 차이를 파악하는 다변량 분석입니다.",
      memory: "군집분석 = 유사한 대상을 같은 집단으로 묶기",
    },
    {
      keys: ["경사향(Aspect)", "경사향"],
      detail:
        "경사향은 경사면이 향하는 방위로, 경사의 가파른 정도를 뜻하는 경사도와 구별해야 합니다.",
      memory: "경사향 = 비탈면의 방위, 경사도 = 비탈의 가파름",
    },
    {
      keys: ["Product, Price, Place, Promotion", "4P"],
      detail:
        "마케팅 믹스의 4P는 제품(Product), 가격(Price), 유통·장소(Place), 촉진(Promotion)입니다.",
      memory: "4P = Product · Price · Place · Promotion",
    },
  ];

  const CALCULATION_RULES = [
    {
      pattern: /용적률/,
      detail: "용적률은 연면적을 대지면적으로 나누고 100을 곱합니다.",
      memory: "용적률(%) = 연면적 ÷ 대지면적 × 100",
    },
    {
      pattern: /건폐율/,
      detail: "건폐율은 건축면적을 대지면적으로 나누고 100을 곱합니다.",
      memory: "건폐율(%) = 건축면적 ÷ 대지면적 × 100",
    },
    {
      pattern: /인구밀도|밀도별|토지수요|주거용지.*면적|소요면적/,
      detail: "용지면적은 해당 용지에 배분된 인구를 계획인구밀도로 나누어 구합니다.",
      memory: "용지면적 = 배분인구 ÷ 계획인구밀도",
    },
    {
      pattern: /입지계수|입지상|\bLQ\b/i,
      detail: "입지계수는 지역의 해당 산업 구성비를 전국의 해당 산업 구성비로 나누어 구합니다.",
      memory: "LQ = 지역 산업구성비 ÷ 전국 산업구성비",
    },
    {
      pattern: /순현재가치|\bNPV\b/i,
      detail: "각 시점의 편익과 비용을 기준시점으로 할인한 뒤 편익 현재가치에서 비용 현재가치를 뺍니다.",
      memory: "NPV = 할인 편익의 합 − 할인 비용의 합",
    },
    {
      pattern: /편익.?비용|\bB\/?C\b/i,
      detail: "편익과 비용을 각각 현재가치로 할인한 뒤 편익 현재가치를 비용 현재가치로 나눕니다.",
      memory: "B/C = 편익 현재가치 ÷ 비용 현재가치",
    },
    {
      pattern: /내부수익률|\bIRR\b/i,
      detail: "현금유입과 현금유출의 현재가치가 같아져 순현재가치가 0이 되는 할인율을 찾습니다.",
      memory: "IRR = NPV를 0으로 만드는 할인율",
    },
    {
      pattern: /Huff|허프/,
      detail: "시설 매력도와 거리저항을 계산한 뒤 모든 후보지의 값으로 나누어 선택확률을 구합니다.",
      memory: "허프 확률 = 해당 시설의 매력도·거리저항값 ÷ 전체 합",
    },
    {
      pattern: /중력모형|중력모델/,
      detail: "두 지역의 규모를 곱하고 거리저항 함수로 나누어 상호작용량을 구합니다.",
      memory: "상호작용 = 지역 규모의 곱 ÷ 거리저항",
    },
    {
      pattern: /경제기반승수|기반산업.*승수|기반고용.*총고용|총고용.*기반고용/,
      detail: "경제기반승수는 총고용을 기반고용으로 나눕니다. 기반·비기반 고용이 따로 주어지면 먼저 더해 총고용을 구하고, 기반고용 증가 문제라면 증가분에 승수를 곱한 뒤 기존 총고용에 더합니다.",
      memory: "경제기반승수 = 총고용 ÷ 기반고용",
    },
    {
      pattern: /순위규모|순위.?크기/,
      detail: "순위규모법칙은 제1도시 인구를 순위의 거듭제곱으로 나누는 Pᵣ=P₁/rᵠ 관계를 사용합니다.",
      memory: "순위규모: Pᵣ = P₁ ÷ rᵠ",
    },
    {
      pattern: /지니|로렌츠/,
      detail: "로렌츠곡선과 완전균등선 사이의 면적을 이용해 지니계수를 구하며 0에 가까울수록 균등, 1에 가까울수록 불균등합니다.",
      memory: "지니계수: 0 = 완전균등, 1 = 완전불균등",
    },
    {
      pattern: /등비|기하급수|복리|인구.*증가율/,
      detail: "기준인구에 매 기간의 증가율을 누적해 Pₙ=P₀(1+r)ⁿ 관계로 계산합니다.",
      memory: "등비 인구추계: Pₙ = P₀(1+r)ⁿ",
    },
    {
      pattern: /등차|산술급수/,
      detail: "과거 기간의 평균 증가량을 구한 뒤 목표연도까지의 기간 수만큼 더합니다.",
      memory: "등차 인구추계 = 기준인구 + 평균증가량 × 기간",
    },
    {
      pattern: /경제활동참가율/,
      detail: "경제활동인구를 생산가능인구로 나누고 100을 곱합니다.",
      memory: "경제활동참가율 = 경제활동인구 ÷ 생산가능인구 × 100",
    },
    {
      pattern: /주택보급률/,
      detail: "주택 수를 일반가구 수와 비교해 백분율로 나타냅니다. 문제에서 사용하는 가구·주택 집계 기준도 확인해야 합니다.",
      memory: "주택보급률 = 주택 수 ÷ 일반가구 수 × 100",
    },
    {
      pattern: /평균|표준편차|분산/,
      detail: "먼저 평균을 구하고 각 값의 편차를 확인한 뒤, 분산은 편차 제곱의 평균, 표준편차는 분산의 제곱근으로 계산합니다.",
      memory: "분산 = 편차제곱의 평균, 표준편차 = √분산",
    },
  ];

  const conceptIndex = new Map();

  function normalizeKey(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/[\s()[\]{}ㆍ·,.:;_'“”‘’"-]/g, "");
  }

  for (const concept of CONCEPTS) {
    for (const key of concept.keys) conceptIndex.set(normalizeKey(key), concept);
  }

  function shorten(value, limit) {
    const text = String(value || "").replace(/\s+/g, " ").trim();
    if (text.length <= limit) return text;
    return `${text.slice(0, limit - 1).trim()}…`;
  }

  function getTopic(prompt) {
    const cleaned = String(prompt || "")
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .replace(/[?？]\s*$/, "")
      .trim();
    return shorten(cleaned || "문제에 제시된 개념", 76);
  }

  function getAnswerText(question) {
    const answerNumber = Number(question.answer) + 1;
    const answer = String(question.options?.[question.answer] || "").trim();
    if (answer) return shorten(answer, 150);
    if (question.optionImageUrls?.[question.answer]?.length) return `정답 보기 이미지(${answerNumber}번)`;
    return `${answerNumber}번 보기`;
  }

  function detectType(question) {
    const prompt = String(question.question || "");
    const answer = String(question.options?.[question.answer] || "");
    if (DOUBLE_NEGATIVE_PATTERN.test(prompt)) return "double-negative";
    if (NEGATIVE_PATTERN.test(prompt)) return "exception";
    if (SEQUENCE_PATTERN.test(prompt)) return "sequence";
    if (CALCULATION_PATTERN.test(prompt) || (FORMULA_PATTERN.test(prompt) && (prompt.match(/\d/g) || []).length >= 2)) {
      return "calculation";
    }
    if (MATCHING_PATTERN.test(prompt)) return "matching";
    if (HISTORY_PATTERN.test(prompt)) return "history";
    if (DEFINITION_PATTERN.test(prompt)) return "definition";
    if (/^[\d\s.,%㎡㎢ha년월일~\-+/=()]+$/.test(answer)) return "numeric";
    if (question.optionImageUrls?.[question.answer]?.length) return "visual";
    return "principle";
  }

  function findCalculationRule(question) {
    const source = `${question.question || ""} ${question.options?.[question.answer] || ""}`;
    return CALCULATION_RULES.find((rule) => rule.pattern.test(source));
  }

  function findConcept(answer) {
    return conceptIndex.get(normalizeKey(answer));
  }

  function getDifferenceCue(question, answer) {
    const source = `${question.question || ""} ${answer}`;
    if (/\d|%|년|개월|일|m|ha|㎡|㎢/.test(answer)) return "수치·단위·기간 기준";
    if (question.optionImageUrls?.[question.answer]?.length) return "도형의 배치·동선·공간 관계";
    if (SEQUENCE_PATTERN.test(source)) return "절차의 선후 관계";
    if (question.subject === "law") {
      if (/장관|도지사|시장|군수|구청장|위원회|시행자|지정권자|승인권자/.test(answer)) {
        return "권한을 가진 주체";
      }
      if (/고시|공고|승인|허가|결정|수립|신청|열람/.test(answer)) return "법정 절차와 행위";
      return "법령상 정의와 적용 범위";
    }
    if (/증가|감소|높|낮|비례|반비례|확대|축소/.test(answer)) return "변수 사이의 방향과 인과관계";
    if (HISTORY_PATTERN.test(source)) return "인물·시대·대표 개념의 연결";
    return "핵심 용어와 적용 범위";
  }

  function getYear(exam) {
    const dateMatch = String(exam?.date || "").match(/\d{4}/);
    if (dateMatch) return dateMatch[0];
    const titleMatch = String(exam?.title || "").match(/\d{4}/);
    return titleMatch?.[0] || "출제 당시";
  }

  function isHistoricalLawQuestion(question) {
    return question.subject === "law" || LEGAL_PATTERN.test(String(question.question || ""));
  }

  function hasSourceCaution(question, enhancement) {
    if (SOURCE_WARNING_PATTERN.test(String(question?.question || ""))) return true;
    const authoredText = `${enhancement?.explanation || ""} ${enhancement?.takeaway || ""}`;
    if (/복수\s*정답|모두\s*정답|전항\s*정답/.test(authoredText)) return true;
    return (
      AUTHORED_WARNING_CONTEXT_PATTERN.test(authoredText) &&
      AUTHORED_WARNING_ISSUE_PATTERN.test(authoredText)
    );
  }

  function createExplanation(question, exam) {
    const answerNumber = Number(question.answer) + 1;
    const rawAnswer = String(question.options?.[question.answer] || "").trim();
    const answer = getAnswerText(question);
    const topic = getTopic(question.question);
    const type = detectType(question);
    const guide = SUBJECT_GUIDES[question.subject] || SUBJECT_GUIDES.planning;
    const year = getYear(exam);
    const answerLead = rawAnswer
      ? `기출 정답은 ${answerNumber}번 “${answer}”입니다.`
      : `기출 정답은 ${answer}입니다.`;
    const sourceWarning = hasSourceCaution(question);
    const historicalLaw = isHistoricalLawQuestion(question);
    let explanation = "";
    let takeaway = "";

    if (sourceWarning) {
      explanation = `원문에 오류 신고 또는 복원 문제가 표시된 문항입니다. ${answerLead} 아래 내용은 수록된 기출 답안을 기준으로 한 참고 안내이며, 확정적인 계산·법령 해설로 사용하지 마세요.`;
      takeaway = `원문 오류 주의 · 저장된 답안: ${shorten(answer, 58)}`;
    }

    if (!explanation && type !== "exception" && type !== "double-negative" && rawAnswer) {
      const concept = findConcept(rawAnswer);
      if (concept) {
        explanation = `정답인 ${answerNumber}번 “${answer}”을 이해하는 핵심은 다음과 같습니다. ${concept.detail} 문제의 단서를 이 정의와 연결하면 다른 보기를 구분할 수 있습니다.`;
        takeaway = concept.memory;
      }
    }

    if (!explanation && type === "exception") {
      const cue = getDifferenceCue(question, answer);
      explanation = `이 문항은 “${topic}”에서 예외를 찾는 부정형 문제입니다. ${answerLead} 나머지 보기와 갈리는 지점은 ${cue}입니다. 이 부분이 같은 원칙·범주에 맞지 않으므로 정답이 됩니다. 문제 끝의 ‘옳지 않은 것’을 먼저 표시한 뒤 공통 기준에서 벗어난 보기를 찾으세요.`;
      takeaway = `부정형 핵심: ${shorten(answer, 62)} = 예외 보기`;
    }

    if (!explanation && type === "double-negative") {
      explanation = `이 문항은 부정 표현이 두 번 겹쳐 있습니다. 문장을 긍정형으로 바꾸면 금지·면제 같은 예외의 바깥, 즉 일반 원칙에 다시 들어오는 항목을 찾는 문제입니다. ${answerLead} 부정어를 하나씩 지운 뒤 실제로 묻는 방향을 확인하세요.`;
      takeaway = `이중부정 → 긍정형으로 바꾼 뒤 ${shorten(answer, 54)}`;
    }

    if (!explanation && type === "calculation") {
      const rule = findCalculationRule(question);
      const visualCue = question.questionImageUrls?.length ? " 표·그림의 값까지 빠뜨리지 말고" : "";
      explanation = rule
        ? `이 문항은 계산 과정을 묻습니다. ${rule.detail}${visualCue} 단위를 맞춰 식에 대입한 결과 ${answerLead.replace("기출 정답은", "정답은")}`
        : `이 문항은 계산형입니다.${visualCue} 먼저 요구값과 주어진 값의 단위를 맞추고, 정의에 맞는 관계식을 세운 뒤 대입합니다. 이 순서로 계산하면 ${answerLead.replace("기출 정답은", "정답은")}`;
      takeaway = rule?.memory || `계산 순서: 요구값 확인 → 식 세우기 → 단위 통일 → ${shorten(answer, 38)}`;
    }

    if (!explanation && type === "sequence") {
      explanation = `이 문항은 “${topic}”의 선후 관계를 묻습니다. 선행 조건이 필요한 단계부터 놓고 결정·승인·고시·시행처럼 각 행위의 인과관계를 따라 배열하면 ${answerLead} ${guide}`;
      takeaway = `절차 암기: 시작 조건부터 따라가면 ${shorten(answer, 56)}`;
    }

    if (!explanation && type === "matching") {
      explanation = `이 문항은 여러 개념의 연결 관계를 한꺼번에 확인하는 문제입니다. 각 항목을 따로 판단한 뒤 모두 맞는 조합만 남기면 ${answerLead} ${guide}`;
      takeaway = `연결 정답: ${shorten(answer, 68)}`;
    }

    if (!explanation && type === "history") {
      explanation = `이 문항은 인물·연도·저서·도시 사례와 대표 개념의 연결을 묻습니다. “${topic}”의 단서와 맞는 항목이 ${answerNumber}번 “${answer}”입니다. 이름만 외우기보다 시대와 대표 키워드를 한 세트로 묶어 기억하세요.`;
      takeaway = `역사·이론 연결: ${shorten(topic, 34)} ↔ ${shorten(answer, 42)}`;
    }

    if (!explanation && type === "definition") {
      explanation = `이 문항은 “${topic}”에 해당하는 개념이나 명칭을 찾는 문제입니다. 출제 기준에서 이 정의·조건에 맞는 항목은 ${answerNumber}번 “${answer}”입니다. 용어만 외우지 말고 문제에 나온 목적과 적용 대상을 함께 연결하세요.`;
      takeaway = `개념 연결: ${shorten(topic, 34)} → ${shorten(answer, 42)}`;
    }

    if (!explanation && type === "visual") {
      explanation = `이 문항은 글의 조건을 도형의 배치와 공간 관계로 바꾸어 읽는 문제입니다. 방향, 접속, 동선, 포함 관계를 하나씩 대조하면 ${answerLead} ${SUBJECT_GUIDES.design}`;
      takeaway = `그림 문제: 방향·접속·동선을 확인하면 ${answer}`;
    }

    if (!explanation && type === "numeric") {
      explanation = `이 문항은 “${topic}”에 적용되는 수치·규모 기준을 묻습니다. 단위와 기준시점을 확인하면 ${answerLead} 숫자는 대상과 단위를 떼지 말고 한 묶음으로 암기하세요.`;
      takeaway = `${shorten(topic, 34)} = ${shorten(answer, 36)}`;
    }

    if (!explanation) {
      const cue = getDifferenceCue(question, answer);
      explanation = `문제의 핵심은 “${topic}”입니다. ${answerLead} 이 보기가 질문에서 요구한 ${cue}에 가장 직접적으로 들어맞습니다. ${guide}`;
      takeaway = `정답 연결: ${shorten(topic, 32)} → ${shorten(answer, 44)}`;
    }

    if (historicalLaw) {
      explanation += ` 이 법규 설명은 ${year}년 기출 정답 기준이며, 개정된 현행 조문과 다를 수 있습니다.`;
      if (!takeaway.startsWith(`${year}년`)) takeaway = `${year}년 기출 기준 · ${takeaway}`;
      if (type === "exception") {
        explanation += " 정답 보기는 틀린 문장이므로 그 문장 자체를 올바른 법규 기준으로 외우면 안 됩니다.";
      }
    }

    return {
      explanation,
      takeaway,
      explanationKind: "guided",
      explanationType: type,
      sourceWarning,
      historicalLaw,
    };
  }

  window.URBAN_PLAN_CREATE_EXPLANATION = createExplanation;
  window.URBAN_PLAN_HAS_SOURCE_CAUTION = hasSourceCaution;
  window.URBAN_PLAN_EXPLANATION_ENGINE_VERSION = "2026-08-25";
})();
