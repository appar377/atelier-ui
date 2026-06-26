# 06. Rails Integration

## 結論

Railsでも利用可能。実用上は以下の2段階が良い。

1. `@appar/atelier-css` をRailsで使う
2. Reactが必要な画面だけ `@appar/atelier-react` を使う

ReactコンポーネントをRailsのERBに直接書くことはできない。Rails側でReactを使うには、Vite Ruby / jsbundling-rails / Webpacker相当の仕組みが必要。

## 方式A: CSSだけ使う

最も堅実。

```bash
npm install @appar/atelier-css
```

application.css or entrypoint:

```css
@import "@appar/atelier-css";
```

ERB:

```erb
<button class="au-btn au-btn--solid au-btn--primary au-btn--md">
  保存する
</button>
```

メリット:

- Railsと相性が良い
- React不要
- ViewComponent / partial / helperと組み合わせやすい
- 本番運用がシンプル

デメリット:

- Select, Dialog, Tabsなどのinteractive UIは自前JSが必要
- propsによる型安全はない

## 方式B: Rails + Reactで使う

Vite Rubyなどを使う。

```bash
npm install @appar/atelier-css @appar/atelier-react react react-dom
```

entrypoint:

```tsx
import '@appar/atelier-css'
import { Button } from '@appar/atelier-react'
```

メリット:

- Next.jsとほぼ同じコンポーネントを使える
- 型安全
- 複雑なinteractive UIを作りやすい

デメリット:

- Rails側にReact runtimeが必要
- hydration / bundle size / mount管理が必要

## 方式C: ViewComponentでラップする

Railsらしく使うなら、CSS packageをViewComponentでラップする。

```ruby
class ButtonComponent < ViewComponent::Base
  def initialize(variant: :solid, intent: :primary, size: :md, type: :button)
    @variant = variant
    @intent = intent
    @size = size
    @type = type
  end

  def classes
    [
      'au-btn',
      "au-btn--#{@variant}",
      "au-btn--#{@intent}",
      "au-btn--#{@size}",
    ].join(' ')
  end
end
```

ERB:

```erb
<%= render ButtonComponent.new(intent: :danger) do %>
  削除する
<% end %>
```

メリット:

- Railsでの再利用性が高い
- ERBが整理される
- Reactなしで運用できる

デメリット:

- React componentとは別実装になる
- API整合性を保つルールが必要

## Rails利用時の推奨

```txt
基本UI: @appar/atelier-css + ViewComponent
複雑UI: @appar/atelier-react
```

## Rails helper命名例

```ruby
atelier_button
atelier_card
atelier_badge
atelier_select
```

ただしGem化は後回しで良い。最初は各Railsアプリ内にViewComponentを置く。

## CSS class安定性

Railsで使うため、CSS classはpublic APIとして扱う。

破壊的変更例:

```txt
au-btn--primary を au-button--primary に変更する
```

これはmajor version変更対象。

## JSが必要なコンポーネント

Rails/ERBでCSSだけ使う場合、以下はStimulus Controllerで補助する。

- Dialog
- Drawer
- Popover
- Tooltip
- Tabs
- Select custom UI
- Toast

初期はnative HTMLで代替できるものはnativeを優先する。

```erb
<select class="au-select au-select--md">
```

custom selectは後から作る。
