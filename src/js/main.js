import uuid from 'uuid/v1';
import BillStore from './stores/bill';
import BillList from './components/billList';
import table from './provider/table';

export default class Main {
  constructor(parent) {
    this.parent = parent;

    this.$total = this.parent.querySelector('.bill__footer-total');

    const billList = this.parent.querySelector('.bill__list');
    this.list = new BillList(billList);

    this.addListeners();
  }

  populate() {
    for (const item of table.items) {
      BillStore.add(item);
    }
  }

  addListeners() {
    this.parent.addEventListener('submit', this.onSubmit.bind(this));
    BillStore.on('total', this.onChangeTotal.bind(this));
  }

  onChangeTotal(value) {
    this.$total.innerText = `$${value}`;
  }

  onSubmit(evt) {
    evt.preventDefault();
    if (evt.target.id === 'addItem') {
      const newItem = this.getValues(evt.target.elements);

      newItem.id = uuid();
      newItem.quantity = 0;

      BillStore.add(newItem);

      evt.target.reset();
    }
  }

  getValues(form) {
    const newItem = {};
    for (const input of form) {
      if (input.name) newItem[input.name] = input.value;
    }
    return newItem;
  }
}
