import { LitElement, css, html } from "lit";
import type { DictionaryEntry, CardClickDetail } from "../shared/types";

class ResultCard extends LitElement {
  static properties = {
    entry: { attribute: false },
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

  declare entry: DictionaryEntry;

  constructor() {
    super();
    this.entry = {
      japanese: "",
      latin: "",
      meaning: "",
    };
  }

  private onCardClick = (): void => {
    this.dispatchEvent(
      new CustomEvent<CardClickDetail>("card-click", {
        detail: { entry: this.entry },
        bubbles: true,
        composed: true,
      }),
    );
  };

  render() {
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

if (!customElements.get("result-card")) {
  customElements.define("result-card", ResultCard);
}
