import React from "react";
import Link from "next/link";

interface AssetCardProps {
  asset: {
    id: string;
    assetCode: string;
    name: string;
    location: string;
    status: string;
    criticality: number;
    lastMaintenance: string;
  };
}

export function AssetCard({ asset }: AssetCardProps) {
  const statusColors = {
    active: "bg-green-100 text-green-800 border-green-200",
    maintenance: "bg-yellow-100 text-yellow-800 border-yellow-200",
    broken: "bg-red-100 text-red-800 border-red-200",
  }[asset.status] || "bg-slate-100 text-slate-800";

  const criticalityColors = [
    "", "text-slate-400", "text-blue-500", "text-yellow-500", "text-orange-500", "text-red-600"
  ];

  return (
    <Link href={`/assets/${asset.id}`}>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition cursor-pointer p-5 space-y-4 h-full flex flex-col">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-xs font-mono text-slate-400">{asset.assetCode}</p>
            <h3 className="text-lg font-bold">{asset.name}</h3>
          </div>
          <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${statusColors}`}>
            {asset.status.toUpperCase()}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm text-slate-600 flex-grow">
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider">場所</p>
            <p className="font-medium">{asset.location}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider">重要度</p>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" 
                     className={`h-4 w-4 ${star <= asset.criticality ? criticalityColors[asset.criticality] : 'text-slate-200'}`}>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
          <span className="text-slate-400 italic">最終点検: {asset.lastMaintenance}</span>
          <span className="text-blue-600 font-bold hover:underline">詳細を表示 &rarr;</span>
        </div>
      </div>
    </Link>
  );
}
