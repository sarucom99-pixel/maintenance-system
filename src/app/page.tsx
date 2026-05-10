import { AssetCard } from "@/components/AssetCard";

// モックデータ (初期表示用)
const mockAssets = [
  {
    id: "1",
    assetCode: "A-001",
    name: "旋盤機 Alpha-1",
    location: "第1工場 Aライン",
    status: "active",
    criticality: 5,
    lastMaintenance: "2026-05-01",
  },
  {
    id: "2",
    assetCode: "C-005",
    name: "コンプレッサー Beta",
    location: "第2工場 動力棟",
    status: "maintenance",
    criticality: 4,
    lastMaintenance: "2026-04-15",
  },
  {
    id: "3",
    assetCode: "V-012",
    name: "搬送用コンベア",
    location: "第1工場 Bライン",
    status: "broken",
    criticality: 3,
    lastMaintenance: "2026-03-20",
  },
];

export default function AssetListPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">設備・資産一覧</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-blue-700 transition">
          + 新規登録
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockAssets.map((asset) => (
          <AssetCard key={asset.id} asset={asset} />
        ))}
      </div>

      <div className="md:hidden sticky bottom-6 flex justify-center">
        <button className="bg-slate-900 text-white p-4 rounded-full shadow-2xl flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
          </svg>
          <span className="font-bold">QRスキャン</span>
        </button>
      </div>
    </div>
  );
}
