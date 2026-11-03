export class FormControl extends HTMLElement {
  static formAssociated = true;
  static observedAttributes = ["form", "disabled"];

  constructor() {
    super();
    this.elementInternals = this.attachInternals();
    this.reactions = [];
    this.states = [];
  }

  record(...reaction) {
    this.reactions.push(...reaction);
    this.states.push({
      form: this.elementInternals.form,
      disabled: this.matches(":disabled"),
      connected: this.isConnected
    });
  }

  connectedCallback() { this.record("connected"); }
  disconnectedCallback() { this.record("disconnected"); }
  connectedMoveCallback() { this.record("moved"); }
  attributeChangedCallback(name, oldValue, value) {
    this.record("attribute", name, oldValue, value);
  }
  formAssociatedCallback(form) { this.record("associated", form); }
  formDisabledCallback(disabled) { this.record("disabled", disabled); }

  clear() {
    this.reactions.length = 0;
    this.states.length = 0;
  }
}
customElements.define("test-control", FormControl);

export function fixture(t, connected = true) {
  const root = document.createElement("div");
  if (connected) {
    document.body.append(root);
  }
  t.add_cleanup(() => root.remove());
  return root;
}
