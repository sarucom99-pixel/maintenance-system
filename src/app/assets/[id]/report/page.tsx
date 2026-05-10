"use client";

import React, { useState } from "react";

export default function MaintenanceReportPage() {
  const [status, setStatus] = useState("normal");

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-12">
      <div className="flex items-center space-x-2 text-slate-400 text-sm">
        <a href="/" className="hover:text-blue-600 underline">資産一覧</a>
        <span>&rarr;</span>
        <a href="/assets/1" className="hover:text-blue-600 underline">A-001</a>
        <span>&rarr;</span>
        <span>報告作成</span>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
        <h2 className="text-2xl font-bold">メンテナンス報告作成</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">設備状態</label>
            <div className="grid grid-cols-3 gap-3">
              <button 
                onClick={() => setStatus("normal")}
                className={`py-3 rounded-xl font-bold border-2 transition ${
                  status === 'normal' ? 'border-green-500 bg-green-50 text-green-700' : 'border-slate-100 bg-slate-50 text-slate-400'
                }`}>
                正常
              </button>
              <button 
                onClick={() => setStatus("warning")}
                className={`py-3 rounded-xl font-bold border-2 transition ${
                  status === 'warning' ? 'border-yellow-500 bg-yellow-50 text-yellow-700' : 'border-slate-100 bg-slate-50 text-slate-400'
                }`}>
                注意
              </button>
              <button 
                onClick={() => setStatus("error")}
                className={`py-3 rounded-xl font-bold border-2 transition ${
                  status === 'error' ? 'border-red-500 bg-red-50 text-red-700' : 'border-slate-100 bg-slate-50 text-slate-400'
                }`}>
                異常
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">使用部品</label>
            <div className="space-y-2">
              <div className="flex space-x-2">
                <select className="flex-grow p-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none text-sm">
                  <option value="">部品を選択（任意）</option>
                  <option>BRG-001: 高精度ベアリング</option>
                  <option>BELT-V: Vベルト (Type B)</option>
                  <option>OIL-HYD: 作動油 20L</option>
                </select>
                <input type="number" placeholder="数量" className="w-20 p-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
              </div>
              <p className="text-xs text-slate-400 italic">※ここで使用した部品は自動的に在庫から引き落とされます</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1 text-right">作業種別</label>
            <select className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none">
              <option>定期点検</option>
              <option>事後修理</option>
              <option>部品交換</option>
              <option>清掃・給油</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">作業内容・所感</label>
            <textarea 
              rows={4}
              placeholder="作業の詳細や気づいた点を入力してください..."
              className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">写真添付</label>
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 transition cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm">カメラを起動 / 写真を選択</span>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-xl hover:bg-blue-700 transition">
            報告を送信する
          </button>
        </div>
      </div>
    </div>
  );
}
