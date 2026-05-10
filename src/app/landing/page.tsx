"use client";

import React from "react";
import Link from "next/link";

const features = [
  {
    title: "デジタル資産台帳 & QR",
    desc: "機械に貼ったQRを読むだけで、履歴やマニュアルに即アクセス。現場の「探す」をゼロに。",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
      </svg>
    ),
    link: "/"
  },
  {
    title: "インテリジェント在庫管理",
    desc: "スキャンによる入出庫、在庫不足の自動検知、そしてAIによる発注書の自動作成とメール送信。",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    link: "/inventory"
  },
  {
    title: "稼働分析ダッシュボード",
    desc: "OEE（設備総合効率）やMTBFをリアルタイム可視化。データに基づいた保全戦略を支援。",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    link: "/reports"
  },
  {
    title: "自動点検カレンダー",
    desc: "メンテナンスサイクルをAIが計算し、現場のスケジュールを自動生成。抜け漏れのない保全を実現。",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    link: "/schedule"
  },
  {
    title: "保全ヒーローズ（貢献度）",
    desc: "技術者の活躍をポイントとバッジで可視化。現場のモチベーションと報告の質を劇的に向上。",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    link: "/performance"
  },
  {
    title: "IoT リアルタイム予知保全",
    desc: "振動センサーと連動し、故障の兆候をミリ秒単位で検知。大損害に繋がる前に現場へ緊急指示。",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    link: "/iot-demo"
  }
];

export default function LandingPage() {
  return (
    <div className="-mt-6 -mx-4 md:-mx-6">
      {/* Hero Section */}
      <section className="relative bg-slate-950 text-white py-24 px-6 overflow-hidden">
        <div className="container mx-auto relative z-10 text-center">
          <div className="inline-block bg-blue-600/20 border border-blue-500/50 text-blue-400 px-4 py-1.5 rounded-full text-xs font-black tracking-widest mb-6 animate-fade-in">
            NEXT-GEN MANUFACTURING OS
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tighter">
            「止まる」を「動く」へ。<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">AIが変える、工場の未来。</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed">
            MainteHubは、現場の勘と経験をデジタル資産へ変換するインテリジェンス・メンテナンス・ハブです。
            IoT、AI、ゲーミフィケーションを統合し、ダウンタイム・ゼロの世界を実現します。
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link href="/">
              <button className="bg-white text-slate-900 px-10 py-4 rounded-2xl font-black shadow-2xl hover:bg-slate-100 transition text-lg w-full md:w-auto">
                プロトタイプを体験
              </button>
            </Link>
            <button className="bg-white/10 text-white border border-white/20 px-10 py-4 rounded-2xl font-black hover:bg-white/20 transition text-lg w-full md:w-auto">
              資料請求・デモ依頼
            </button>
          </div>
        </div>

        {/* 背景装飾 */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/20 blur-[120px] rounded-full"></div>
          <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-emerald-600/10 blur-[100px] rounded-full"></div>
        </div>
      </section>

      {/* Trust & Metrics */}
      <section className="bg-slate-900 py-12 px-6 border-y border-white/5">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-black text-white">35%</p>
              <p className="text-xs text-slate-500 font-bold uppercase mt-1">ダウンタイム削減</p>
            </div>
            <div>
              <p className="text-3xl font-black text-white">2.4倍</p>
              <p className="text-xs text-slate-500 font-bold uppercase mt-1">現場報告数 増加</p>
            </div>
            <div>
              <p className="text-3xl font-black text-white">100%</p>
              <p className="text-xs text-slate-500 font-bold uppercase mt-1">ペーパーレス化</p>
            </div>
            <div>
              <p className="text-3xl font-black text-white">ROI 400%</p>
              <p className="text-xs text-slate-500 font-bold uppercase mt-1">投資対効果 (1年目)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4">統合された保全エコシステム</h2>
            <p className="text-slate-500 font-medium">現場の末端から経営の最前線までを、一本のデジタルラインで繋ぎます</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <Link href={f.link} key={i}>
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition group cursor-pointer h-full">
                  <div className="mb-6 p-4 bg-slate-50 rounded-2xl inline-block group-hover:scale-110 transition">
                    {f.icon}
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-3">{f.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">
                    {f.desc}
                  </p>
                  <span className="text-blue-600 font-bold text-sm flex items-center">
                    機能を見る <span className="ml-2 group-hover:translate-x-1 transition">&rarr;</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto">
          <div className="bg-blue-600 rounded-[3rem] p-12 text-center text-white shadow-2xl shadow-blue-200 relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-4xl font-black mb-6">今すぐ、保全のDXを始めましょう</h2>
              <p className="text-blue-100 mb-10 max-w-xl mx-auto">
                2週間の無料トライアルで、あなたの工場の1ラインを劇的に変えてみせます。
              </p>
              <div className="flex flex-col md:flex-row justify-center gap-4">
                <button className="bg-white text-blue-600 px-12 py-4 rounded-2xl font-black shadow-lg hover:bg-slate-50 transition">
                  無料で始める
                </button>
                <button className="bg-blue-700 text-white border border-blue-500 px-12 py-4 rounded-2xl font-black hover:bg-blue-800 transition">
                  お問い合わせ
                </button>
              </div>
            </div>
            {/* 装飾 */}
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full -ml-32 -mb-32"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/20 blur-[80px] rounded-full -mr-32 -mt-32"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
