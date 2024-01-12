import {
  LitElement,
  html,
} from 'https://cdn.jsdelivr.net/gh/lit/dist@3.1.0/core/lit-core.min.js';

class Sample extends LitElement {
  static properties = {
    count: { type: Number, state: true },
  };

  constructor() {
    super();
    this.count = 0;
  }

  render() {
    return html`
      <section>
        <h1>Sample</h1>
        <p>Count: ${this.count}</p>
        <button @click=${() => this.count++}>+</button>
        <button @click=${() => this.count--}>-</button>
        <button @click=${() => (this.count = 0)}>Reset</button>
      </section>
    `;
  }
}
customElements.define('sample-element', Sample);
