# 00. Goal and Scope

## ゴール

`atelier-ui` は、個人で作成する複数サービスに横断して使えるUI基盤にする。

対象サービス例:

- My Obsidian Wiki / Knowledge Graph / Markdown管理
- Coffee Blender / レシピ管理 / 比率計算
- 学習アプリ / 復習スケジューラ / タイムライン
- ゲームアプリ / カジュアルUI / インベントリUI
- 管理画面 / Dashboard / CRUD

## 非ゴール

初期段階では以下をやらない。

- Figma完全同期
- Material UI / Radix UI の全面ラップ
- マイクロフロントエンド化
- 複雑なAnimation Framework化
- すべてのコンポーネントを最初から実装
- Hosted API化

## デザイン原則

```txt
Natural > Flashy
Readable > Decorative
Composable > Feature-rich
Token-based > Hard-coded
Accessible > Custom-only
```

## ライブラリの責務

### tokens

- 色
- typography
- spacing
- radius
- shadow
- z-index
- motion
- theme preset

### css

- HTML / Rails / 静的サイトで使えるCSS class
- utility class
- component class
- data属性による状態表現

### react

- TypeScript React components
- Headlessではなく、軽量なstyled components
- CSS variables / classベース
- Railsと共有できるDOM構造を意識

## 収益化・OSS観点

`atelier-ui` は単体で収益化を狙うより、以下の役割に置く。

- 自作サービス群の開発速度を上げる
- GitHub上で技術力を説明しやすくする
- 将来公開するSaaS / アプリのブランドを統一する
- 必要になった部分だけOSS公開する

## メリット

- サービスを増やすほど再利用価値が上がる
- UIの一貫性が出る
- テストしやすい
- React以外でも使える
- design token中心なので、将来のデザイン変更が楽

## デメリット

- 最初の設計コストは高い
- コンポーネントが増えるほど保守対象が増える
- 自分専用に寄せすぎるとOSSとして使いにくい
- 汎用化しすぎると自作サービスへの最適化が弱くなる

## 判断基準

コンポーネント追加時は以下を満たすこと。

```txt
2つ以上のアプリで使う可能性がある
または
1つのアプリで頻出し、UI品質に影響する
```

一度しか使わない特殊UIは、アプリ側で実装する。
