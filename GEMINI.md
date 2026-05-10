# 製造設備・メンテナンス管理システム (Maintenance System)

## プロジェクト概要
製造所の生産ラインおよび機械のメンテナンス、保全業務を効率化するためのインテリジェンス・プラットフォーム。

## 技術スタック
- **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js Server Actions
- **Database**: PostgreSQL (Prisma ORM)
- **Visuals**: QRコード連携, PWA対応

## 開発ガイドライン (Step 1)
1. **モバイル優先**: 現場の作業員がスマホで片手で操作できるUIを追求する。
2. **オフライン対応**: PWA機能を活用し、電波の弱い場所での作業記録を可能にする。
3. **データ駆動**: すべての保全活動を客観的なデータ（pips、時間、温度等）で記録する。

## ディレクトリ構造
- `src/app`: 画面（一覧、詳細、報告フォーム）
- `src/components`: UI部品（shadcn/ui）
- `src/lib`: 共通ロジック、データベース接続
- `prisma`: データベーススキーマ
