"use client";

import React, { useState } from "react";
import { BarcodeScanner } from "@/components/BarcodeScanner";

// モックデータ (スキャン後の表示用)
const mockPartsDatabase: Record<string, {name: string, currentStock: number, location: string}> = {
  "BRG-001": { name: "高精度ベアリング", currentStock: 12, location: "棚 A-1" },
  "BELT-V": { name: "Vベルト (Type B)", currentStock: 3, location: "棚 B-4" },
  "OIL-HYD": { name: "作動油 20L", currentStock: 8, location: "油脂庫" },
};

export default function ArrivalPage() {
  const [isScanning, setIsScanning] = useState(true);
  const [scannedPart, setScannedPart] = useState<{code: string, name: string, current: number, location: string} | null>(null);
  const [arrivalQty, setArrivalQty] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleScan = (code: string) => {
    const part = mockPartsDatabase[code];
    if (part) {
      setScannedPart({ code, ...part });
      setIsScanning(false);
    } else {
      alert(`部品コード ${code} はデータベースに見つかりません。`);
    }
  };

  const handleArrival = () => {
    // 本来はここでPrismaを使用してデータベースを更新する
    setIsCompleted(true);
  };

  if (isCompleted) {
    return (
      <div className="max-w-md mx-auto mt-12 text-center space-y-6 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-900">入荷処理完了</h2>
          <p className="text-slate-500">{scannedPart?.name} を {arrivalQty} 点入荷しました。</p>
        </div>
        <div className="pt-4 space-y-3">
          <button 
            onClick={() => { setScannedPart(null); setIsScanning(true); setIsCompleted(false); }}
            className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold shadow-lg">
            続けてスキャンする
          </button>
          <a href="/inventory" className="block w-full text-slate-400 font-bold hover:text-slate-600">在庫一覧に戻る</a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto space-y-6 pb-12">
      <div className="flex items-center space-x-2 text-slate-400 text-sm">
        <a href="/inventory" className="hover:text-blue-600 underline">在庫管理</a>
        <span>&rarr;</span>
        <span>入荷スキャン</span>
      </div>

      <h2 className="text-2xl font-bold">部品の入荷処理</h2>

      {isScanning ? (
        <div className="bg-slate-100 aspect-square rounded-3xl flex flex-col items-center justify-center border-2 border-dashed border-slate-300 space-y-4">
            <div className="p-4 bg-white rounded-2xl shadow-sm animate-pulse">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
            </div>
            <p className="text-slate-500 font-bold">バーコードを読み取ってください</p>
            <BarcodeScanner onScan={handleScan} onClose={() => setIsScanning(false)} />
        </div>
      ) : scannedPart && (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-mono text-blue-600 font-bold">{scannedPart.code}</p>
              <h3 className="text-xl font-black text-slate-900">{scannedPart.name}</h3>
            </div>
            <div className="text-right text-xs">
              <p className="text-slate-400">現在庫</p>
              <p className="font-bold text-slate-900">{scannedPart.current}</p>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex justify-between items-center">
            <span className="text-sm font-bold text-slate-600">保管場所</span>
            <span className="text-sm font-black text-slate-900">{scannedPart.location}</span>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700">入荷数量</label>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setArrivalQty(Math.max(1, arrivalQty - 1))}
                className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-xl font-bold hover:bg-slate-200">-</button>
              <input 
                type="number" 
                value={arrivalQty}
                onChange={(e) => setArrivalQty(parseInt(e.target.value) || 0)}
                className="flex-grow text-center text-2xl font-black p-3 bg-slate-50 rounded-2xl border-2 border-blue-500 outline-none" 
              />
              <button 
                onClick={() => setArrivalQty(arrivalQty + 1)}
                className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center text-xl font-bold hover:bg-blue-700">+</button>
            </div>
          </div>

          <button 
            onClick={handleArrival}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 transition active:scale-95">
            入荷を確定する
          </button>
          
          <button 
            onClick={() => setIsScanning(true)}
            className="w-full text-slate-400 text-sm font-bold">
            スキャンし直す
          </button>
        </div>
      )}
    </div>
  );
}
