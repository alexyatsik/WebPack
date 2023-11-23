import { BaseElement } from './baseElement';

describe('BaseElement', () => {
  let baseElement;

  beforeEach(() => {
    // Create a new instance of the BaseElement class before each test
    baseElement = new BaseElement();
  });
  afterEach(() => {
    // Remove the baseElement instance from the DOM after each test
    baseElement.remove();
  });

  test('constructor', () => {
    // Test that a new BaseElement instance is created with a div tag by default
    expect(baseElement.DOMElement.tagName).toBe('DIV');

    // Test that a new BaseElement instance is created with a specified tag
    baseElement = new BaseElement('span');
    expect(baseElement.DOMElement.tagName).toBe('SPAN');
  });
  test('addClass', () => {
    // Test that the addClass method adds a class to the baseElement
    baseElement.addClass('test-class');
    expect(baseElement.DOMElement.classList.contains('test-class')).toBe(true);

    // Test that the addClass method adds multiple classes to the baseElement
    baseElement.addClass('test-class-2', 'test-class-3');
    expect(baseElement.DOMElement.classList.contains('test-class-2')).toBe(true);
    expect(baseElement.DOMElement.classList.contains('test-class-3')).toBe(true);
  });
  test('removeClass', () => {
    // Add a class to the baseElement
    baseElement.addClass('test-class');

    // Test that the removeClass method removes a class from the baseElement
    baseElement.removeClass('test-class');
    expect(baseElement.DOMElement.classList.contains('test-class')).toBe(false);

    // Add multiple classes to the baseElement
    baseElement.addClass('test-class-2', 'test-class-3');

    // Test that the removeClass method removes multiple classes from the baseElement
    baseElement.removeClass('test-class-2', 'test-class-3');
    expect(baseElement.DOMElement.classList.contains('test-class-2')).toBe(false);
    expect(baseElement.DOMElement.classList.contains('test-class-3')).toBe(false);
  });
  test('toggleClass', () => {
    // Test that the toggleClass method adds a class to the baseElement when it is not already present
    baseElement.toggleClass('test-class');
    expect(baseElement.DOMElement.classList.contains('test-class')).toBe(true);

    // Test that the toggleClass method removes a class from the baseElement when it is already present
    baseElement.toggleClass('test-class');
    expect(baseElement.DOMElement.classList.contains('test-class')).toBe(false);
  });
  test('addAttribute', () => {
    // Test that the addAttribute method adds an attribute to the baseElement
    baseElement.addAttribute('data-test', 'test-value');
    expect(baseElement.DOMElement.getAttribute('data-test')).toBe('test-value');
  });
  test('Set single attribute using setAttribute', () => {
    const element = new BaseElement('div');
    element.setAttributes({ id: 'test-id' });
    expect(element.DOMElement.getAttribute('id')).toBe('test-id');
  });
  test('Set multiple attributes', () => {
    const element = new BaseElement('div');
    element.setAttributes({ id: 'test-id', class: 'test-class' });
    expect(element.DOMElement.getAttribute('id')).toBe('test-id');
    expect(element.DOMElement.getAttribute('class')).toBe('test-class');
  });
  test('deleteAttribute', () => {
    // Add an attribute to the baseElement
    baseElement.addAttribute('data-test', 'test-value');

    // Test that the deleteAttribute method removes an attribute from the baseElement
    baseElement.deleteAttribute('data-test');
    expect(baseElement.DOMElement.getAttribute('data-test')).toBe(null);
  });
  test('addStyle', () => {
    // Test that the addStyle method adds a style to the baseElement
    baseElement.addStyle('color', 'red');
    expect(baseElement.DOMElement.style.color).toBe('red');
  });
  test('Remove single style', () => {
    const element = new BaseElement('div');
    element.addStyle('color', 'red');
    element.removeStyle('color');
    expect(element.DOMElement.style.color).toBe('');
  });
  test('Do nothing when style does not exist', () => {
    const element = new BaseElement('div');
    element.removeStyle('color');
    expect(element.DOMElement.style.color).toBe('');
  });
  test('Add event listener', () => {
    const element = new BaseElement('button');
    const handleClick = jest.fn();
    element.event('click', handleClick);
    element.DOMElement.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  test('innerHtml should set the innerHTML of the element', () => {
    const value = '<p>Some text</p>';
    baseElement.innerHtml(value);
    expect(baseElement.DOMElement.innerHTML).toBe(value);
  });
  test('addInnerHtml should append the innerHTML to the element', () => {
    const value = '<p>Some text</p>';
    const initialContent = '<div>Initial content</div>';
    baseElement.innerHtml(initialContent);
    baseElement.addInnerHtml(value);
    expect(baseElement.DOMElement.innerHTML).toBe(`${initialContent}${value}`);
  });
  test('text should set the text content of the element', () => {
    const content = 'Some text';
    baseElement.text(content);
    expect(baseElement.DOMElement.textContent).toBe(content);
  });

  let parentElement;
  let childElement;
  beforeEach(() => {
    parentElement = document.createElement('div');
    childElement = new BaseElement('span');
  });
  afterEach(() => {
    parentElement.remove();
    parentElement = null;
    childElement = null;
  });
  describe('appendTo', () => {
    test('should append element to parent element', () => {
      childElement.appendTo(parentElement);

      expect(parentElement.children).toHaveLength(1);
      expect(parentElement.children[0]).toBe(childElement.DOMElement);
    });

    test('should insert element at specific position in parent element', () => {
      const divElement = document.createElement('div');
      const spanElement = document.createElement('span');
      parentElement.appendChild(divElement);
      parentElement.appendChild(spanElement);

      childElement.appendTo(parentElement, 'afterbegin');

      expect(parentElement.children).toHaveLength(3);
      expect(parentElement.children[0]).toBe(childElement.DOMElement);
    });

    test('should not append element if parent element is not defined', () => {
      childElement.appendTo(null);

      expect(parentElement.children).toHaveLength(0);
    });
  });
  describe('appendElement', () => {
    test('should append child element to parent element', () => {
      const spanElement = document.createElement('span');
      childElement.appendElement(spanElement);

      expect(childElement.DOMElement.children).toHaveLength(1);
      expect(childElement.DOMElement.children[0]).toBe(spanElement);
    });
  });
  describe('prependElement', () => {
    test('should prepend child element to parent element', () => {
      const spanElement = document.createElement('span');
      const pElement = document.createElement('p');
      childElement.appendElement(spanElement);

      childElement.prependElement(pElement);

      expect(childElement.DOMElement.children).toHaveLength(2);
      expect(childElement.DOMElement.children[0]).toBe(pElement);
      expect(childElement.DOMElement.children[1]).toBe(spanElement);
    });
  });
});