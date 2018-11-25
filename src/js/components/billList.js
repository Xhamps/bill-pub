import ItemBill from './itemBill';
import BillStorrage from '../stores/bill';

export default class BillList {
  constructor(parente) {
    this.parente = parente;
    this.items = [];
    this.addListeners();
  }

  addListeners() {
    BillStorrage.on('add', this.addItem.bind(this));
    BillStorrage.on('remove', this.removeItem.bind(this));
  }

  addItem(data) {
    const newItem = new ItemBill(this.parente, data);

    this.items.push(newItem);

    newItem.build();
  }

  removeItem(index) {
    this.items[index].destroy();

    this.items = [
      ...this.items.slice(0, index),
      ...this.items.slice(index + 1),
    ];
  }
}
