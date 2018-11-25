import BillStorage from '../stores/bill';

export default class ItemBill {
  constructor(parente, data) {
    this.parente = parente;
    this.data = data;
  }

  build() {
    if (!this.root) {
      this.root = document.createElement('li');
      this.root.className = 'item';

      this.render();

      this.parente.appendChild(this.root);

      this.addListener();
    }
  }

  destroy() {
    this.removeListener();

    this.parente.removeChild(this.root);
  }

  addListener() {
    this.root.addEventListener('click', this.onClick.bind(this));

    BillStorage.on(`update:${this.data.id}`, this.update.bind(this));
  }

  removeListener() {
    this.root.removeEventListener('click', this.onClick.bind(this));

    BillStorage.removeListener(`update:${this.data.id}`, this.update.bind(this));
  }

  onClick(e) {
    if (e.target.id === 'decrement') {
      BillStorage.decrement(this.data);
    }

    if (e.target.id === 'increment') {
      BillStorage.increment(this.data);
    }

    if (e.target.id === 'remove') {
      BillStorage.remove(this.data);
    }
  }

  update(data) {
    this.data = data;
    this.render();
  }

  render() {
    this.root.innerHTML = `<div class="item__description">
        <p class="item__description-label">${this.data.name}</p>
        <p class="item__description-price">Unit price: $${this.data.price}</p>
    </div>
    <div class="item__quantity">
        <a href="#" id="decrement" class="item__button">Remove</a>
        <span class="item__quantity-value">${this.data.quantity}</span>
        <a href="#" id="increment" class="item__button">Add</a>
    </div>
    <div class="item__value">$${this.data.total}</div>
    <a href="#" id="remove" class="item__remove">x</a>`;
  }
}
