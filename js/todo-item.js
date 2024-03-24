import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export class TodoItem extends LitElement {
  static styles = css`
    :host {
      /* --todoColor: hsl(240, 40%, 40%);
      --todoColorFade: hsl(240, 10%, 50%); */
    }
    .todo {
      width: clamp(400px, 60vw, 800px);
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0.5rem 0;
      padding: 0.5rem;
      border: 1px solid hsl(var(--todoHue), 40%, 40%);
      box-shadow: 2px 2px 8px hsla(0, 0%, 0%, 0.32);
    }

    .todo input[type='checkbox'] {
      height: 2rem;
      width: 2rem;
      margin-inline-start: 1rem;
      font-weight: 300;
      accent-color: hsl(var(--todoHue), 40%, 40%);
    }

    .todo p {
      font-size: 2rem;
      font-weight: 300;
      padding: 0 1rem;
      margin: 0;
      flex-basis: 80%;
      flex-grow: 1;
      flex-shrink: 1;
      color: hsl(var(--todoHue), 40%, 40%);
      transition: color 0.6s ease-in-out;
    }

    .todo p.complete {
      text-decoration: line-through;
      color: hsl(var(--todoHue), 10%, 70%);
    }

    .todo span {
      width: 1rem;
      height: 1rem;
      position: relative;
      padding: 0.5rem;
      margin-inline-end: 1rem;
      border-radius: 50%;
      background-color: hsl(var(--todoHue), 40%, 40%);
      cursor: pointer;
      transition: all 0.4s ease-in-out;
    }
    .todo span i {
      display: inline-block;
      width: 1rem;
      height: 1rem;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z'%3E%3C/path%3E%3C/svg%3E");
    }
    .todo span:hover {
      transform: scale(1.4);
      background-color: hsl(var(--todoHue), 40%, 60%);
    }
  `;

  static properties = {
    text: { type: String },
    complete: { type: Boolean },
  };

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    //once the HTML is ready and added
    if (this.hasAttribute('complete')) {
      this.complete = this.getAttribute('complete') === 'true';
    }
  }

  _onCompleteToggle() {
    this.complete = !this.complete;
    this.requestUpdate();
  }
  _removeTodo(ev) {
    let removeEvent = new CustomEvent('removedtodo', { detail: { text: this.text } });
    this.dispatchEvent(removeEvent);
    ev.target.closest('.todo').remove();
  }

  render() {
    return html`
      <div class="todo">
        <input type="checkbox" @change="${this._onCompleteToggle}" ?checked=${this.complete} />
        <p class="${this.complete ? 'complete' : ''}" @click="${this._onCompleteToggle}">&nbsp;${this.text}&nbsp;</p>
        <span @click="${this._removeTodo}"><i></i></span>
      </div>
    `;
  }
}

customElements.define('todo-item', TodoItem);
