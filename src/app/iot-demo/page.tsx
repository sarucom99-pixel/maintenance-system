"use client";

import React, { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function IoTSimulatorPage() {
  const [vibrationData, setVibrationData] = useState<number[]>(new Array(20).fill(2.5));
  const [isAnomaly, setIsAnomaly] = useState(false);
  const [alertFixed, setAlertFixed] = useState(false);
  const [pointsAwarded, setPointsAwarded] = useState(0);

  // リアルタイムデータの更新シミュレーション
  useEffect(() => {
    const interval = setInterval(() => {
      setVibrationData(prev => {
        const newData = [...prev.slice(1)];
        // 異常発生時は高い値を出す
        const baseValue = isAnomaly ? 8.0 : 2.5;
        const randomNoise = (Math.random() - 0.5) * 1.5;
        newData.push(Math.max(0, baseValue + randomNoise));
        return newData;
      });
    }, 500);
    return () => clearInterval(interval);
  }, [isAnomaly]);

  const triggerAnomaly = () => {
    setIsAnomaly(true);
    setAlertFixed(false);
  };

  const handleFix = () => {
    setIsAnomaly(false);
    setAlertFixed(true);
    setPointsAwarded(20); // 早期発見ボーナス
    setTimeout(() => setAlertFixed(false), 3000);
  };

  const chartData = {
    labels: new Array(20).fill(''),
    datasets: [
      {
        label: '振動レベル (mm/s)',
        data: vibrationData,
        borderColor: isAnomaly ? 'rgb(239, 68, 68)' : 'rgb(34, 197, 94)',
        backgroundColor: isAnomaly ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { min: 0, max: 12, grid: { color: '#f1f5f9' } },
      x: { display: false }
    },
    animation: { duration: 0 },
    plugins: { legend: { display: false } }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">IoT リアルタイム監視 (シミュレーター)</h2>
        <div className="flex items-center space-x-2">
            <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm font-bold text-slate-500">LIVE CONNECTED</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* モニター画面 */}
        <div className="lg:col-span-2 bg-slate-950 p-6 rounded-3xl shadow-2xl border-4 border-slate-800 relative overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-blue-400 text-xs font-mono font-bold tracking-widest">DEVICE_ID: MC-ALPHA-01</p>
              <h3 className="text-white text-xl font-black">旋盤機 Alpha-1 振動モニター</h3>
            </div>
            {isAnomaly && (
              <div className="bg-red-600 text-white px-4 py-1 rounded-full text-xs font-black animate-pulse">
                CRITICAL ALERT
              </div>
            )}
          </div>

          <div className="h-64">
            <Line data={chartData} options={chartOptions} />
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            <div className="bg-white/5 p-3 rounded-xl">
              <p className="text-slate-500 text-[10px] font-bold">CURRENT</p>
              <p className={`text-xl font-black ${isAnomaly ? 'text-red-500' : 'text-white'}`}>
                {vibrationData[vibrationData.length-1].toFixed(2)}
              </p>
            </div>
            <div className="bg-white/5 p-3 rounded-xl">
              <p className="text-slate-500 text-[10px] font-bold">THRESHOLD</p>
              <p className="text-xl font-black text-yellow-500">5.00</p>
            </div>
            <div className="bg-white/5 p-3 rounded-xl">
              <p className="text-slate-500 text-[10px] font-bold">STATUS</p>
              <p className={`text-xl font-black ${isAnomaly ? 'text-red-500' : 'text-green-500'}`}>
                {isAnomaly ? 'ABNORMAL' : 'NORMAL'}
              </p>
            </div>
          </div>

          {/* グリッド線の装飾 */}
          <div className="absolute inset-0 pointer-events-none opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
        </div>

        {/* コントロールパネル */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="text-xl font-black text-slate-900 underline decoration-blue-500 underline-offset-8">シミュレーション制御</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              下のボタンを押すと、機械に意図的な異常（振動のスパイク）を発生させます。
            </p>
            
            {!isAnomaly ? (
              <button 
                onClick={triggerAnomaly}
                className="w-full bg-red-600 text-white py-4 rounded-2xl font-black shadow-xl shadow-red-100 hover:bg-red-700 transition active:scale-95">
                異常振動を発生させる
              </button>
            ) : (
              <div className="space-y-4">
                <div className="bg-red-50 p-4 rounded-xl border border-red-100 text-red-700 text-xs font-bold animate-bounce">
                  緊急！現場へ急行し「処置」を行ってください
                </div>
                <button 
                  onClick={handleFix}
                  className="w-full bg-green-600 text-white py-4 rounded-2xl font-black shadow-xl shadow-green-100 hover:bg-green-700 transition active:scale-95">
                  現場で処置を完了
                </button>
              </div>
            )}

            {pointsAwarded > 0 && (
                <div className="bg-yellow-50 p-4 rounded-2xl border-2 border-yellow-200 text-center animate-in zoom-in-50">
                    <p className="text-yellow-700 text-xs font-bold uppercase tracking-widest">Bonus Unlocked!</p>
                    <p className="text-2xl font-black text-yellow-800">+{pointsAwarded} PTS</p>
                    <p className="text-[10px] text-yellow-600 font-medium">早期発見ボーナスが「田中 太郎」に付与されました</p>
                </div>
            )}
          </div>

          <div className="pt-8 border-t border-slate-100">
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-400">?</div>
                <div className="text-xs">
                    <p className="font-bold text-slate-900">このデモの仕組み</p>
                    <p className="text-slate-400">センサーが閾値を超えると自動で「緊急作業指示」を発行。処置が早いほど貢献ポイントが高くなります。</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
