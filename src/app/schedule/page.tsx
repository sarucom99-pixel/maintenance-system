"use client";

import React, { useState } from "react";
import Link from "next/link";

// モックデータ: スケジュールされた作業
const mockSchedules = [
  { id: "s1", date: 11, title: "旋盤機 A-001 定期点検", asset: "A-001", type: "preventative", priority: "high" },
  { id: "s2", date: 13, title: "コンプレッサー フィルタ交換", asset: "C-005", type: "preventative", priority: "medium" },
  { id: "s3", date: 15, title: "第3ライン ベルト点検", asset: "V-012", type: "inspection", priority: "low" },
  { id: "s4", date: 11, title: "作動油 補充", asset: "A-002", type: "preventative", priority: "medium" },
];

export default function SchedulePage() {
  const [currentMonth, setCurrentMonth] = useState("2026年5月");

  // カレンダーのグリッド生成 (簡易版)
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="space-y-6 pb-12">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">点検・保全スケジュール</h2>
        <div className="flex items-center space-x-4">
          <button className="p-2 bg-white rounded-lg border border-slate-200 hover:bg-slate-50">&larr;</button>
          <span className="font-black text-lg">{currentMonth}</span>
          <button className="p-2 bg-white rounded-lg border border-slate-200 hover:bg-slate-50">&rarr;</button>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        {/* カレンダーヘッダー */}
        <div className="grid grid-cols-7 border-b border-slate-100">
          {['日', '月', '火', '水', '木', '金', '土'].map(d => (
            <div key={d} className="p-4 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">{d}</div>
          ))}
        </div>

        {/* カレンダーグリッド */}
        <div className="grid grid-cols-7 auto-rows-[minmax(120px,auto)] divide-x divide-y divide-slate-100">
          {/* 月初の空きマス (5月1日は金曜日とするシミュレーション) */}
          {[...Array(5)].map((_, i) => (
            <div key={`empty-${i}`} className="bg-slate-50/50 p-2"></div>
          ))}

          {days.map(day => {
            const daySchedules = mockSchedules.filter(s => s.date === day);
            const isToday = day === 11;

            return (
              <div key={day} className={`p-2 transition hover:bg-slate-50/80 ${isToday ? 'bg-blue-50/30' : ''}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-sm font-bold h-7 w-7 flex items-center justify-center rounded-full ${isToday ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-slate-900'}`}>
                    {day}
                  </span>
                </div>
                
                <div className="space-y-1">
                  {daySchedules.map(schedule => (
                    <div 
                      key={schedule.id} 
                      className={`p-1.5 rounded-lg text-[10px] font-bold leading-tight border shadow-sm truncate ${
                        schedule.priority === 'high' ? 'bg-red-50 text-red-700 border-red-100' : 
                        schedule.priority === 'medium' ? 'bg-blue-50 text-blue-700 border-blue-100' : 
                        'bg-slate-50 text-slate-700 border-slate-100'
                      }`}>
                      {schedule.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 本日のタスク詳細 (モバイルで見やすい形式) */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold flex items-center space-x-2">
          <span className="w-3 h-3 bg-blue-600 rounded-full animate-ping"></span>
          <span>本日の予定タスク</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockSchedules.filter(s => s.date === 11).map(task => (
            <div key={task.id} className="bg-white p-5 rounded-2xl border-l-8 border-l-blue-600 border border-slate-200 shadow-sm flex justify-between items-center">
              <div>
                <p className="text-xs font-bold text-blue-600 mb-1">{task.asset}</p>
                <h4 className="font-black text-slate-900">{task.title}</h4>
              </div>
              <Link href={`/assets/${task.asset}/report`}>
                <button className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md hover:bg-slate-800 transition">
                  作業開始
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
