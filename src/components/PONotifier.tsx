"use client";

import React, { useState } from "react";

export function PONotifier() {
  const [isProcessing, setIsScanning] = useState(false);
  const [poResult, setPoResult] = useState<{id: string, count: number} | null>(null);

  const generateAndSendPO = async () => {
    setIsScanning(true);
    // 本来はサーバーサイドのcheckStockAndGeneratePOを呼び出す
    // デモ用に2秒待機
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setPoResult({ id: "PO-20260511-001", count: 2 });
    setIsScanning(false);
  };

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center space-x-4">
        <div className="bg-blue-600 p-3 rounded-xl shadow-lg animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 012 2v0z" />
          </svg>
        </div>
        <div>
          <h3 className="font-bold text-blue-900">スマート発注アシスタント</h3>
          <p className="text-sm text-blue-700">在庫不足を検知し、自動で発注書を作成・送信します。</p>
        </div>
      </div>

      <div className="w-full md:w-auto">
        {!poResult ? (
          <button 
            onClick={generateAndSendPO}
            disabled={isProcessing}
            className={`w-full bg-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg transition flex items-center justify-center space-x-2 ${isProcessing ? 'opacity-50' : 'hover:bg-blue-700'}`}>
            {isProcessing ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>作成中...</span>
              </>
            ) : (
              <span>発注書を作成して送信</span>
            )}
          </button>
        ) : (
          <div className="bg-green-100 text-green-800 px-6 py-3 rounded-xl font-bold border border-green-200 flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>{poResult.id} をメール送信しました ({poResult.count}点)</span>
          </div>
        )}
      </div>
    </div>
  );
}
