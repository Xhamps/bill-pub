import { EventEmitter } from 'events';

class BillStore extends EventEmitter {
  constructor() {
    super();
    this.items = [];
  }

  add(item) {
    const updateItem = this.calculatePriceItem(item);

    this.items.push(updateItem);

    this.emit('add', updateItem);

    this.updateTotal();
  }

  remove(item) {
    const index = this.findIndexById(item.id);

    this.items = [
      ...this.items.slice(0, index),
      ...this.items.slice(index + 1),
    ];

    this.emit('remove', index);

    this.updateTotal();
  }

  increment(item) {
    const index = this.findIndexById(item.id);
    const newItem = this.updateQuantityItem(item, item.quantity + 1);

    this.updateItems(newItem, index);

    this.emit(`update:${newItem.id}`, newItem);

    this.updateTotal();
  }

  decrement(item) {
    if (item.quantity > 0) {
      const index = this.findIndexById(item.id);
      const newItem = this.updateQuantityItem(item, item.quantity - 1);

      this.updateItems(newItem, index);

      this.emit(`update:${newItem.id}`, newItem);

      this.updateTotal();
    }
  }

  updateTotal() {
    const total = this.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    this.emit('total', total.toFixed(2));
  }

  updateQuantityItem(item, quantity) {
    return {
      ...item,
      total: (item.price * quantity).toFixed(2),
      quantity,
    };
  }

  calculatePriceItem(item) {
    return {
      ...item,
      total: (item.price * item.quantity).toFixed(2),
    };
  }

  updateItems(value, index) {
    this.items = [
      ...this.items.slice(0, index),
      value,
      ...this.items.slice(index + 1),
    ];
  }

  findIndexById(id) {
    return this.items.findIndex(item => item.id === id);
  }
}

export default new BillStore();
