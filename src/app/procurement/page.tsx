import React from "react";

// モックデータ (発注履歴用)
const mockOrders = [
  { 
    id: "po1", 
    poNumber: "PO-20260511-001", 
    date: "2026-05-11", 
    items: "高精度ベアリング 他1点", 
    status: "approved",
    statusText: "承認済",
    color: "bg-blue-100 text-blue-700"
  },
  { 
    id: "po2", 
    poNumber: "PO-20260501-088", 
    date: "2026-05-01", 
    items: "作動油 20L", 
    status: "received",
    statusText: "入荷済",
    color: "bg-green-100 text-green-700"
  },
  { 
    id: "po3", 
    poNumber: "PO-20260425-012", 
    date: "2026-04-25", 
    items: "Vベルト (Type B)", 
    status: "ordered",
    statusText: "発注中",
    color: "bg-yellow-100 text-yellow-700"
  },
];

export default function ProcurementHistoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 text-slate-400 text-sm">
        <a href="/inventory" className="hover:text-blue-600 underline">在庫管理</a>
        <span>&rarr;</span>
        <span>発注履歴</span>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">発注履歴・状況一覧</h2>
        <div className="flex space-x-2">
           <input type="text" placeholder="PO番号で検索..." className="p-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-bold">
            <tr>
              <th className="p-4">発注番号 / 日付</th>
              <th className="p-4">内容</th>
              <th className="p-4 text-center">ステータス</th>
              <th className="p-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {mockOrders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50 transition">
                <td className="p-4">
                  <div className="font-bold text-slate-900">{order.poNumber}</div>
                  <div className="text-xs text-slate-400">{order.date}</div>
                </td>
                <td className="p-4 text-slate-600 font-medium">{order.items}</td>
                <td className="p-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.color}`}>
                    {order.statusText}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="text-blue-600 font-bold hover:underline">詳細</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
