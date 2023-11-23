import './global.css';
import {BaseElement} from "./components/BaseElement";

function main() {
  new BaseElement('span')
    .addClass('greet')
    .text('Hello, World!')
    .appendTo(document.body);
}

main();