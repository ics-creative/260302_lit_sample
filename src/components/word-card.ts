import { LitElement, css, html } from "lit";
import type { CardClickDetail, DictionaryEntry } from "../shared/types";

/**
 * 単語データを表示する Web Components 本体。
 * React / Vue.js / Svelte から共通で利用される。
 */
class WordCard extends LitElement {
  static properties = {
    entry: { attribute: false }, // オブジェクトは属性ではなくプロパティで受け取る
  };

  static styles = css`
    :host {
      display: block;
    }

    .card {
      border: 1px solid var(--color-border);
      border-radius: 8px;
      background: white;
      padding: 16px;
      cursor: pointer;
      width: 100%;
      text-align: left;
      transition:
        border-color 0.2s,
        background-color 0.2s,
        scale 0.2s;

      &:hover {
        border-color: var(--color-primary);
        background: rgb(0 0 0 / 2%);
      }

      &:focus-visible {
        outline: 2px solid var(--color-primary);
        outline-offset: 2px;
      }

      &:active {
        scale: 0.99;
        background: rgb(0 0 0 / 4%);
      }
    }

    .meta {
      margin: 0 0 8px;
      display: flex;
      justify-content: flex-end;
    }

    .hint {
      margin: 0;
      font-size: var(--font-size-small);
      font-weight: bold;
      color: var(--color-secondary);
    }

    .japanese {
      font-size: var(--font-size-large);
      font-weight: bold;
      margin: 0 0 8px;
    }

    .latin {
      font-size: var(--font-size-medium);
      font-weight: normal;
      color: var(--color-primary);
      margin: 0 0 8px;
    }

    .meaning {
      font-size: var(--font-size-small);
      font-weight: normal;
      color: var(--color-secondary);
      margin: 0;
    }
  `;

  declare entry: DictionaryEntry; // 親から渡される単語データ

  constructor() {
    super();
    // 初回レンダリング時のundefined参照を避ける
    this.entry = {
      japanese: "",
      latin: "",
      meaning: "",
    };
  }

  private onCardClick = (): void => {
    // クリックした単語データを親コンポーネントへ通知
    this.dispatchEvent(
      new CustomEvent<CardClickDetail>("card-click", {
        // 親側が扱いやすいよう detail に entry をまとめる
        detail: { entry: this.entry },
      }),
    );
  };

  render() {
    // クリック可能な単語カードUIを描画
    return html`
      <button class="card" type="button" @click=${this.onCardClick}>
        <div class="meta">
          <p class="hint">クリックできます</p>
        </div>
        <p class="japanese">${this.entry.japanese}</p>
        <p class="latin">${this.entry.latin}</p>
        <p class="meaning">${this.entry.meaning}</p>
      </button>
    `;
  }
}

// 既に定義済みなら再登録しない（重複読み込み対策）
if (!customElements.get("word-card")) {
  customElements.define("word-card", WordCard);
}
