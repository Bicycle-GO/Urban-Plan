import type { Metadata } from "next";
import "../styles.css";

export const metadata: Metadata = {
  title: "도시계획기사 기출 CBT · 2022년 1회 해설",
  description:
    "도시계획기사 2022년 1회 100문항을 CBT 방식으로 풀고, 독립 작성 해설과 오답 현황을 확인하는 학습 페이지입니다.",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    title: "도시계획기사 기출 CBT",
    description: "2022년 1회 · 100문항 · 독립 해설",
  },
  twitter: {
    card: "summary_large_image",
    title: "도시계획기사 기출 CBT",
    description: "2022년 1회 · 100문항 · 독립 해설",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
