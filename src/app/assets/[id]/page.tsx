"use client";

import React from "react";
import { QRCodeSVG } from "qrcode.react";
import Link from "next/link";

// 詳細画面用のモックデータ
const mockAssetDetail = {
  id: "1",
  assetCode: "A-001",
  name: "旋盤機 Alpha-1",
  category: "金属加工機",
  location: "第1工場 Aライン",
  status: "active",
  criticality: 5,
  manufacturer: "Mori Seiki",
  modelNumber: "NLX-2500",
  installDate: "2024-10-15",
  lastMaintenance: "2026-05-01",
  manualUrl: "#",
  history: [
    { id: "101", date: "2026-05-01", type: "定期点検", result: "異常なし", worker: "田中 太郎" },
    { id: "102", date: "2026-04-10", type: "部品交換", result: "ベアリング交換", worker: "佐藤 次郎" },
  ]
};

export default function AssetDetailPage() {
  const asset = mockAssetDetail;
  const qrValue = `https://maintehub.example.com/assets/${asset.assetCode}`;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex items-center space-x-2 text-slate-400 text-sm">
        <a href="/" className="hover:text-blue-600 underline">資産一覧</a>
        <span>&rarr;</span>
        <span>{asset.assetCode}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        {/* Left: QR and Basic Status */}
        <div className="flex flex-col items-center space-y-6 w-full md:w-1/3 border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0 md:pr-6">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <QRCodeSVG value={qrValue} size={160} />
          </div>
          <p className="text-xs text-slate-400 text-center">このQRコードを機械に貼付して管理します</p>
          <div className="w-full space-y-3">
            <div className="text-center">
              <span className={`px-4 py-1.5 rounded-full text-sm font-bold border ${
                asset.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100'
              }`}>
                {asset.status.toUpperCase()}
              </span>
            </div>
            <Link href={`/assets/${asset.id}/report`} className="w-full">
              <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold shadow-lg hover:bg-slate-800 transition">
                報告を作成
              </button>
            </Link>
          </div>
        </div>

        {/* Right: Specifications */}
        <div className="flex-grow space-y-6">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900">{asset.name}</h2>
            <p className="text-blue-600 font-mono font-bold">{asset.assetCode}</p>
          </div>

          <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
            <div>
              <p className="text-slate-400">カテゴリー</p>
              <p className="font-semibold">{asset.category}</p>
            </div>
            <div>
              <p className="text-slate-400">設置場所</p>
              <p className="font-semibold">{asset.location}</p>
            </div>
            <div>
              <p className="text-slate-400">メーカー</p>
              <p className="font-semibold">{asset.manufacturer}</p>
            </div>
            <div>
              <p className="text-slate-400">型番</p>
              <p className="font-semibold">{asset.modelNumber}</p>
            </div>
            <div>
              <p className="text-slate-400">導入日</p>
              <p className="font-semibold">{asset.installDate}</p>
            </div>
            <div>
              <p className="text-slate-400">マニュアル</p>
              <a href={asset.manualUrl} className="text-blue-600 underline font-semibold">PDFを開く</a>
            </div>
          </div>
        </div>
      </div>

      {/* Maintenance History */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold border-l-4 border-blue-600 pl-3">メンテナンス履歴</h3>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden text-sm">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="p-4 font-bold">日付</th>
                <th className="p-4 font-bold">種別</th>
                <th className="p-4 font-bold">内容・結果</th>
                <th className="p-4 font-bold">担当者</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {asset.history.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition">
                  <td className="p-4 whitespace-nowrap">{item.date}</td>
                  <td className="p-4 font-medium">{item.type}</td>
                  <td className="p-4 text-slate-600">{item.result}</td>
                  <td className="p-4 text-slate-500">{item.worker}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
