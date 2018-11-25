import './css/app.scss';
import Main from './js/main';

const billElemt = document.querySelector('.bill');
const main = new Main(billElemt);

main.populate();
