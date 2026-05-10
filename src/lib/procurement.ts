import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function checkStockAndGeneratePO() {
  // 1. 在庫が発注点を下回っている部品を取得
  const lowStockParts = await prisma.part.findMany({
    where: {
      stockQuantity: {
        lt: prisma.part.fields.reorderPoint,
      },
    },
  });

  if (lowStockParts.length === 0) return null;

  // 2. 発注依頼メール（プロフェッショナル・テンプレート）の作成
  const poDate = new Date().toLocaleDateString("ja-JP");
  const poId = `PO-${Date.now().toString().slice(-6)}`;
  
  let poContent = `
    <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
      <div style="text-align: center; border-bottom: 2px solid #2563eb; padding-bottom: 10px; margin-bottom: 20px;">
        <h1 style="color: #2563eb; margin: 0;">MainteHub 発注依頼</h1>
        <p style="font-size: 14px; color: #666;">購買管理システム自動発行</p>
      </div>

      <div style="margin-bottom: 20px;">
        <p><strong>管理番号:</strong> ${poId}</p>
        <p><strong>発行日:</strong> ${poDate}</p>
      </div>

      <p>在庫が発注点を下回ったため、以下の部品の発注を依頼します。</p>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <thead>
          <tr style="background-color: #f8fafc;">
            <th style="border: 1px solid #e2e8f0; padding: 10px; text-align: left;">部品名 / コード</th>
            <th style="border: 1px solid #e2e8f0; padding: 10px; text-align: center;">現在庫</th>
            <th style="border: 1px solid #e2e8f0; padding: 10px; text-align: center;">推奨発注数</th>
          </tr>
        </thead>
        <tbody>
  `;

  lowStockParts.forEach(part => {
    const suggestQty = part.reorderPoint * 2;
    poContent += `
      <tr>
        <td style="border: 1px solid #e2e8f0; padding: 10px;">
          <div style="font-weight: bold;">${part.name}</div>
          <div style="font-size: 12px; color: #666;">${part.partCode}</div>
        </td>
        <td style="border: 1px solid #e2e8f0; padding: 10px; text-align: center; color: #dc2626; font-weight: bold;">${part.stockQuantity}</td>
        <td style="border: 1px solid #e2e8f0; padding: 10px; text-align: center;">${suggestQty}</td>
      </tr>
    `;
  });

  poContent += `
        </tbody>
      </table>

      <div style="background-color: #fefce8; border: 1px solid #fef08a; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
        <p style="margin: 0; font-size: 14px; color: #854d0e;">
          <strong>補足:</strong> 上記数量は過去の使用頻度から算出した推奨値です。承認後、サプライヤーへの発注処理を開始してください。
        </p>
      </div>

      <div style="text-align: center;">
        <a href="http://localhost:3000/procurement/${poId}" style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">詳細を確認・承認する</a>
      </div>

      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #999; text-align: center;">
        本メールはシステムによる自動送信です。返信は受け付けておりません。
      </div>
    </div>
  `;

  return {
    id: poId,
    content: poContent,
    partCount: lowStockParts.length
  };
}
