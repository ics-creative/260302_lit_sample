# 260302_lit_sample

Lit で作成した `word-card` を、素のHTML・React・Vue・Svelte から利用するデモです。

## セットアップ

```bash
npm install
```

## 開発

```bash
npm run dev
```

`http://localhost:5173` を開くと、以下4つのセクションを確認できます。

- メイン（素のHTML）
- React
- Vue
- Svelte

各カードをクリックすると、セクション内のテキストが `クリック: ...` に更新されます。

## 主要ファイル

- `src/components/word-card.ts`: Lit の Web Component 本体
- `src/main.ts`: 各フレームワークデモのマウント処理
- `src/react/ReactDemo.tsx`: React デモ
- `src/vue/VueDemo.vue`: Vue デモ
- `src/svelte/SvelteDemo.svelte`: Svelte デモ
- `src/styles.css`: 共通スタイル

## そのほかのコマンド

```bash
npm run format
npm run build
```

## License

- This project: `MIT` (`LICENSE`)
- Third party notices: `THIRD_PARTY_NOTICES.md`
