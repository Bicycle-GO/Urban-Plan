import type { Metadata } from "next";
import "../styles.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://urban-plan.vercel.app"),
  title: "도시계획기사 기출 CBT · 59개 회차",
  description:
    "도시계획기사 2003~2022년 59개 회차를 CBT 방식으로 풀고, 정답과 오답 현황을 확인하는 학습 페이지입니다.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/og.png",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/",
    title: "도시계획기사 기출 CBT",
    description: "2003~2022년 · 59개 회차 · 회차 선택형 CBT",
    images: [
      {
        url: "/og.png",
        width: 1731,
        height: 909,
        alt: "도시계획기사 기출 CBT · 59개 회차",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "도시계획기사 기출 CBT",
    description: "2003~2022년 · 59개 회차 · 회차 선택형 CBT",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
