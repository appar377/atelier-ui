# 08. Release Rules

## Versioning

Semantic Versioningを採用する。

```txt
MAJOR.MINOR.PATCH
```

## Patch

- bug fix
- CSSの軽微な調整
- documentation修正
- 型定義の非破壊的修正

## Minor

- 新component追加
- 新variant追加
- 新token追加
- 新theme追加
- 既存componentの後方互換props追加

## Major

- component名変更
- class名変更
- token名変更
- props削除
- propsの意味変更
- CSS class APIの破壊的変更

## Public API

以下はpublic APIとして扱う。

- package exports
- TypeScript props
- CSS custom properties
- CSS component classes
- theme names
- variant names
- intent names
- size names

## 非Public API

以下は変更してよい。

- internal helper
- private CSS class
- build scripts
- docs内部実装

private classは `_` prefixを付ける。

```css
.au-_internal-wrapper {}
```

## Changeset

changesets導入推奨。

```bash
pnpm changeset
pnpm version-packages
pnpm release
```

## CI

最低限以下を行う。

```txt
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## npm publish

初期はprivateでもよい。公開する場合:

```bash
npm publish --access public
```

scope packageの場合、public指定が必要。

## Documentation rule

新componentを追加する場合は以下を同時に追加する。

```txt
[ ] component source
[ ] CSS
[ ] tests
[ ] story
[ ] docs
[ ] usage example
```
