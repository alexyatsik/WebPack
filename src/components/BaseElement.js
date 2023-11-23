'use strict';

import {kebabToCamelCase} from "./utils.js";

export class BaseElement {
  #baseElement = document.createElement('div');

  constructor(tag) {
    if (tag)
      this.#baseElement = document.createElement(tag);
  }

  addClass(...value) {
    if (!this.#baseElement)
      return;

    this.#baseElement.classList.add(...value);

    return this;
  }

  removeClass(...value) {
    if (!this.#baseElement)
      return;

    this.#baseElement.classList.remove(...value);

    return this;
  }

  toggleClass(className) {
    if (!this.#baseElement)
      return;

    this.#baseElement.classList.toggle(className);

    return this;
  }

  addAttribute(name, value) {
    if (!this.#baseElement)
      return;

    this.#baseElement.setAttribute(name, value);

    return this;
  }

  setAttributes(attributes = {}) {
    if (!this.#baseElement)
      return;

    Object.entries(attributes).forEach(([name, value]) => {
      this.#baseElement.setAttribute(name, value);
    });

    return this;
  }

  deleteAttribute(name) {
    if (!this.#baseElement)
      return;

    this.#baseElement.removeAttribute(name);

    return this;
  }

  addStyle(style, value) {
    if (!this.#baseElement)
      return;

    this.#baseElement.style[kebabToCamelCase(style)] = value;

    return this;
  }

  removeStyle(style) {
    if (!this.#baseElement)
      return;

    this.#baseElement.style.removeProperty(style);

    return this;
  }

  event(eventType, listenerFunction, options = {}) {
    if (!this.#baseElement)
      return;

    this.#baseElement.addEventListener(eventType, listenerFunction, options);

    return this;
  }

  innerHtml(value) {
    if (!this.#baseElement)
      return;

    this.#baseElement.innerHTML = value;

    return this;
  }

  addInnerHtml(value) {
    if (!this.#baseElement)
      return;

    this.#baseElement.innerHTML += value;

    return this;
  }

  text(content = '') {
    if (!this.#baseElement)
      return;

    this.#baseElement.textContent = content;

    return this;
  }

  appendTo(parentElement, position = null) {
    if (!this.#baseElement)
      return;

    if (!position && parentElement) {
      parentElement.append(this.#baseElement);
    } else if (position && parentElement) {
      parentElement.insertAdjacentElement(position, this.#baseElement);
    }

    return this;
  }

  appendElement(domElement) {
    if (!this.#baseElement)
      return;

    this.#baseElement.append(domElement);

    return this;
  }

  prependElement(domElement) {
    if (!this.#baseElement)
      return;

    this.#baseElement.prepend(domElement);

    return this;
  }

  remove() {
    if (!this.#baseElement)
      return;

    this.#baseElement.remove();
    this.#baseElement = null;
  }

  get DOMElement() {
    if (!this.#baseElement)
      return;

    return this.#baseElement;
  }
}
