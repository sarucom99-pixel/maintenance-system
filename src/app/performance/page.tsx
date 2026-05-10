"use client";

import React from "react";

// モックデータ: スタッフランキング
const mockStaff = [
  { id: "st1", name: "田中 太郎", role: "シニア技術者", tasks: 48, score: 98, points: 1250, badge: "ゴールド保全士" },
  { id: "st2", name: "佐藤 次郎", role: "主任", tasks: 42, score: 95, points: 1100, badge: "精密検査王" },
  { id: "st3", name: "鈴木 花子", role: "技術員", tasks: 38, score: 92, points: 950, badge: "スピード修理" },
  { id: "st4", name: "伊藤 博", role: "見習い", tasks: 15, score: 88, points: 400, badge: "期待の新人" },
];

export default function StaffPerformancePage() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-center text-center md:text-left flex-col md:flex-row gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">保全ヒーローズ</h2>
          <p className="text-slate-500 font-medium">現場を支える技術者たちの活躍を称えます</p>
        </div>
        <div className="bg-blue-600 text-white px-6 py-2 rounded-2xl font-bold shadow-lg shadow-blue-200">
          今月のMVP: 田中 太郎
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {mockStaff.map((staff, index) => (
          <div 
            key={staff.id} 
            className={`bg-white p-6 rounded-3xl border-2 transition hover:scale-[1.02] flex items-center gap-6 shadow-sm ${
              index === 0 ? 'border-yellow-400 ring-4 ring-yellow-50' : 'border-slate-100'
            }`}>
            {/* Rank Number */}
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-xl shadow-inner ${
                index === 0 ? 'bg-yellow-400 text-white' : 
                index === 1 ? 'bg-slate-300 text-slate-600' : 
                index === 2 ? 'bg-orange-300 text-orange-800' : 'bg-slate-100 text-slate-400'
            }`}>
              {index + 1}
            </div>

            {/* Avatar Mock */}
            <div className="w-16 h-16 bg-slate-200 rounded-2xl flex items-center justify-center text-2xl font-bold text-slate-400 border-2 border-white shadow-md">
              {staff.name.charAt(0)}
            </div>

            {/* Name and Role */}
            <div className="flex-grow">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-black text-slate-900">{staff.name}</h3>
                <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter">
                  {staff.role}
                </span>
              </div>
              <div className="flex gap-2">
                <span className="bg-blue-50 text-blue-600 text-xs font-black px-3 py-1 rounded-lg border border-blue-100">
                  {staff.badge}
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="hidden md:flex items-center gap-8">
              <div className="text-center">
                <p className="text-[10px] text-slate-400 font-bold uppercase">完了タスク</p>
                <p className="text-xl font-black text-slate-900">{staff.tasks}</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-slate-400 font-bold uppercase">報告精度</p>
                <p className="text-xl font-black text-blue-600">{staff.score}%</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-slate-400 font-bold uppercase">累計Pts</p>
                <p className="text-xl font-black text-slate-900">{staff.points.toLocaleString()}</p>
              </div>
            </div>

            <div className="md:hidden text-right">
               <p className="text-2xl font-black text-slate-900">{staff.score}%</p>
               <p className="text-[10px] text-slate-400 font-bold">精度</p>
            </div>
          </div>
        ))}
      </div>

      {/* Motivation Tips */}
      <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-xl font-bold mb-4">ポイントの仕組み</h3>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <li className="bg-white/10 p-4 rounded-xl border border-white/20">
              <span className="block font-bold text-yellow-400 mb-1">点検完遂 (+10pts)</span>
              予定通りの点検を実施することで加算されます。
            </li>
            <li className="bg-white/10 p-4 rounded-xl border border-white/20">
              <span className="block font-bold text-green-400 mb-1">写真付き報告 (+5pts)</span>
              現場のエビデンスを残すことでボーナスが発生します。
            </li>
            <li className="bg-white/10 p-4 rounded-xl border border-white/20">
              <span className="block font-bold text-red-400 mb-1">異常の早期発見 (+20pts)</span>
              故障を未然に防ぐ重要な発見には高得点！
            </li>
          </ul>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full -mr-32 -mt-32"></div>
      </div>
    </div>
  );
}
