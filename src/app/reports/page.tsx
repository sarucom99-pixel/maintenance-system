"use client";

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// モックデータ: 製造ライン別の稼働率 (OEE)
const oeeData = {
  labels: ['第1ライン', '第2ライン', '第3ライン', '包装ライン', '出荷ライン'],
  datasets: [
    {
      label: '稼働率 (OEE) %',
      data: [88, 72, 95, 64, 91],
      backgroundColor: [
        'rgba(34, 197, 94, 0.6)',
        'rgba(234, 179, 8, 0.6)',
        'rgba(34, 197, 94, 0.6)',
        'rgba(239, 68, 68, 0.6)',
        'rgba(34, 197, 94, 0.6)',
      ],
      borderColor: [
        'rgb(34, 197, 94)',
        'rgb(234, 179, 8)',
        'rgb(34, 197, 94)',
        'rgb(239, 68, 68)',
        'rgb(34, 197, 94)',
      ],
      borderWidth: 1,
    },
  ],
};

// モックデータ: 月別故障件数の推移
const failureTrendData = {
  labels: ['1月', '2月', '3月', '4月', '5月'],
  datasets: [
    {
      label: '突発故障数',
      data: [12, 19, 8, 15, 6],
      borderColor: 'rgb(239, 68, 68)',
      backgroundColor: 'rgba(239, 68, 68, 0.5)',
      tension: 0.3,
    },
    {
      label: '計画メンテナンス',
      data: [25, 20, 30, 22, 28],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
      tension: 0.3,
    },
  ],
};

export default function AnalyticsDashboard() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">稼働分析ダッシュボード</h2>
        <div className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
          最終更新: 2026-05-11 10:00
        </div>
      </div>

      {/* サマリーカード */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">全体平均 OEE</p>
          <p className="text-3xl font-black text-slate-900 mt-1">82.1%</p>
          <p className="text-xs text-green-600 font-bold mt-2">↑ 3.2% vs 先月</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">ダウンタイム</p>
          <p className="text-3xl font-black text-slate-900 mt-1">14.5h</p>
          <p className="text-xs text-red-600 font-bold mt-2">↓ 2.1h vs 先月</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">MTBF (平均故障間隔)</p>
          <p className="text-3xl font-black text-slate-900 mt-1">214h</p>
          <p className="text-xs text-green-600 font-bold mt-2">↑ 12h 改善</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">保全コスト (月次)</p>
          <p className="text-3xl font-black text-slate-900 mt-1">¥42.5万</p>
          <p className="text-xs text-slate-400 font-bold mt-2">予算内</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ライン別稼働率 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-800 border-l-4 border-blue-500 pl-3">ライン別 OEE 比較</h3>
          <div className="aspect-video">
            <Bar 
              data={oeeData} 
              options={{ 
                responsive: true, 
                maintainAspectRatio: false,
                plugins: { legend: { display: false } }
              }} 
            />
          </div>
          <p className="text-xs text-slate-400">※ 包装ラインの稼働率が目標(80%)を下回っています。</p>
        </div>

        {/* 故障トレンド */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-800 border-l-4 border-red-500 pl-3">故障・保全トレンド</h3>
          <div className="aspect-video">
            <Line 
              data={failureTrendData} 
              options={{ 
                responsive: true, 
                maintainAspectRatio: false 
              }} 
            />
          </div>
          <p className="text-xs text-slate-400">※ 突発故障は減少傾向にありますが、4月に一時的なスパイクが発生しました。</p>
        </div>
      </div>

      {/* 故障原因内訳 */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-8 items-center">
        <div className="w-full md:w-1/3 aspect-square max-w-[250px]">
          <Doughnut 
            data={{
              labels: ['機械疲労', '操作ミス', '部材不良', '電気系統', 'その他'],
              datasets: [{
                data: [45, 15, 10, 20, 10],
                backgroundColor: ['#2563eb', '#f59e0b', '#10b981', '#ef4444', '#94a3b8'],
              }]
            }}
            options={{ cutout: '70%', plugins: { legend: { position: 'bottom' } } }}
          />
        </div>
        <div className="flex-grow space-y-4">
          <h3 className="font-bold text-slate-800">主な故障原因の分析</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium">機械疲労 (ベアリング等)</span>
              <span className="font-black text-blue-600">45%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full w-[45%]"></div>
            </div>
            <p className="text-sm text-slate-500">
              摩耗による故障が依然として最大の要因です。
              <span className="font-bold text-slate-900 underline ml-1 cursor-pointer">予防保全スケジュールの前倒しを推奨します。</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
