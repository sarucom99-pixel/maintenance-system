import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "製造所メンテナンス管理システム",
  description: "次世代設備保全プラットフォーム",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.className} bg-slate-50 text-slate-900`}>
        <div className="min-h-screen flex flex-col">
          <header className="bg-slate-900 text-white p-4 shadow-md sticky top-0 z-10">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-xl font-bold tracking-tight">MainteHub</h1>
              <nav className="hidden md:flex space-x-4 text-sm font-medium">
                <Link href="/landing" className="hover:text-blue-400 transition">製品紹介</Link>
                <Link href="/" className="hover:text-blue-400 transition">資産一覧</Link>
                <Link href="/inventory" className="hover:text-blue-400 transition">在庫管理</Link>
                <Link href="/procurement" className="hover:text-blue-400 transition">発注履歴</Link>
                <Link href="/reports" className="hover:text-blue-400 transition">稼働分析</Link>
                <Link href="/schedule" className="hover:text-blue-400 transition">点検予定</Link>
                <Link href="/performance" className="hover:text-blue-400 transition">貢献度</Link>
                <Link href="/iot-demo" className="hover:text-blue-400 transition">IoT監視</Link>
              </nav>
              <div className="md:hidden">
                {/* Mobile Menu Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </div>
            </div>
          </header>
          <main className="flex-grow container mx-auto p-4 md:p-6">
            {children}
          </main>
          <footer className="bg-slate-200 text-slate-600 p-4 text-center text-sm">
            &copy; 2026 製造所メンテナンス管理システム 開発チーム
          </footer>
        </div>
      </body>
    </html>
  );
}
