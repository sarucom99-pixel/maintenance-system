---
title: "Webパフォーマンス & アクセシビリティ監査"
status: "ready"
priority: "high"
assignee: "QA Agent"
---

# Webパフォーマンス & アクセシビリティ監査の実施

## 概要
メンテナンスシステム (Next.js) のMVP基盤がある程度整った段階で、工場のオフライン・低スペック端末でも快適に動作するか、および現場作業員が使いやすいアクセシビリティが確保されているかを監査します。

## 使用するスキル
必ず以下の Gemini CLI グローバルスキルをアクティベートして実行してください。
- `activate_skill("web-performance-audit")`
- `activate_skill("web-accessibility-audit")`

## 監査項目
- [ ] Lighthouse スコアの計測（パフォーマンス 90以上目標）
- [ ] PWA オフライン動作時のキャッシュ検証
- [ ] コントラスト比の確認（現場の強い照明下での視認性）
- [ ] キーボード・スクリーンリーダーの操作性（WCAG 2.1 準拠）
