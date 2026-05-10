"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BarcodeScanner } from "@/components/BarcodeScanner";
import { PONotifier } from "@/components/PONotifier";

// モックデータ (在庫用)
const mockInventory = [
  { id: "p1", partCode: "BRG-001", name: "高精度ベアリング", stock: 12, reorder: 5, location: "棚 A-1" },
  { id: "p2", partCode: "BELT-V", name: "Vベルト (Type B)", stock: 3, reorder: 5, location: "棚 B-4" },
  { id: "p3", partCode: "OIL-HYD", name: "作動油 20L", stock: 8, reorder: 2, location: "油脂庫" },
];

export default function InventoryPage() {
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = (result: string) => {
    alert(`スキャン成功: ${result}`);
    setIsScanning(false);
  };

  return (
    <div className="space-y-6">
      {isScanning && (
        <BarcodeScanner onScan={handleScan} onClose={() => setIsScanning(false)} />
      )}

      <PONotifier />

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">交換部品・在庫管理</h2>
        <div className="flex space-x-2">
          <Link href="/inventory/arrival">
            <button 
              className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium shadow flex items-center space-x-2 hover:bg-green-700 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 012 2v0z" />
              </svg>
              <span>入荷処理</span>
            </button>
          </Link>
          <button 
            onClick={() => setIsScanning(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium shadow flex items-center space-x-2 hover:bg-blue-700 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
            <span>スキャン</span>
          </button>
          <button className="bg-slate-900 text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-slate-800 transition">
            + 部品登録
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-bold">
            <tr>
              <th className="p-4">コード</th>
              <th className="p-4">部品名</th>
              <th className="p-4 text-center">現在庫</th>
              <th className="p-4">保管場所</th>
              <th className="p-4 text-center">ステータス</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {mockInventory.map((part) => (
              <tr key={part.id} className="hover:bg-slate-50 transition cursor-pointer">
                <td className="p-4 font-mono text-blue-600">{part.partCode}</td>
                <td className="p-4 font-bold">{part.name}</td>
                <td className="p-4 text-center">
                  <span className={`text-lg ${part.stock < part.reorder ? 'text-red-600 font-black' : 'text-slate-900 font-medium'}`}>
                    {part.stock}
                  </span>
                  <span className="text-slate-400 ml-1 text-xs">/ 発注点 {part.reorder}</span>
                </td>
                <td className="p-4 text-slate-500">{part.location}</td>
                <td className="p-4 text-center">
                  {part.stock < part.reorder ? (
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold">要発注</span>
                  ) : (
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">適正</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
