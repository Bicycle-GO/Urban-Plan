import Script from "next/script";

export default function Home() {
  return (
    <>
      <div className="app-shell">
        <aside className="sidebar" aria-label="학습 메뉴">
          <div className="brand">
            <span className="brand-mark">UP</span>
            <div>
              <strong>도시계획기사</strong>
              <span>기출을 실전처럼</span>
            </div>
          </div>

          <nav className="nav-list" id="navList">
            <button className="nav-item" data-view="dashboard" type="button">
              <span>대시보드</span>
            </button>
            <button className="nav-item" data-view="writtenLecture" type="button">
              <span>1차 필기 기본강의</span>
            </button>
            <button className="nav-item is-active" data-view="writtenQuiz" type="button">
              <span>기출 CBT · 해설</span>
            </button>
            <button className="nav-item" data-view="practicalLecture" type="button">
              <span>3차 실기 기본강의</span>
            </button>
            <button className="nav-item" data-view="practicalQuiz" type="button">
              <span>3차 실기 기출유형</span>
            </button>
            <button className="nav-item" data-view="finalLab" type="button">
              <span>실전 연습실</span>
            </button>
          </nav>

          <div className="sidebar-note">
            <span className="eyebrow">오늘의 기준</span>
            <strong id="todayText"></strong>
            <p>필기는 과목별 과락을 막고, 실기는 도면과 산출 근거를 같이 잡습니다.</p>
          </div>
        </aside>

        <main className="main">
          <header className="topbar">
            <button className="menu-button" id="menuButton" type="button" aria-label="메뉴 열기">
              <span></span>
              <span></span>
              <span></span>
            </button>
            <div>
              <span className="eyebrow">Urban Planning CBT Desk</span>
              <h1 id="pageTitle">도시계획기사 기출 CBT</h1>
            </div>
            <div className="top-actions">
              <button className="ghost-button" id="resetProgress" type="button">진도 초기화</button>
            </div>
          </header>

          <section className="content" id="app" tabIndex={-1}></section>

          <footer className="footer">
<<<<<<< Updated upstream
            <span>2003~2022년 59개 회차, 5,900문항마다 정답 근거·오답 구별·계산과 법규 기준을 담은 상세해설을 제공합니다.</span>
=======
            <span>2003~2022년 59개 회차 문항·정답을 CBT로 구성했습니다. 상세 해설은 이 페이지를 위해 새로 작성했습니다.</span>
>>>>>>> Stashed changes
            <a href="https://www.comcbt.com/xe/dy" target="_blank" rel="noreferrer">COMCBT 도시계획기사 출처</a>
            <a href="https://www.q-net.or.kr/crf005.do?id=crf00503&jmCd=1350" target="_blank" rel="noreferrer">최신 시험정보 확인</a>
          </footer>
        </main>
      </div>
      <Script src="/app-bundle.js" strategy="afterInteractive" />
    </>
  );
}
