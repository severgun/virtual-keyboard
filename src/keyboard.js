import Key from './key.js';
import * as layouts from './layouts.js';

const KEYS_ID = {
  Backquote: 'backquote',
  Digit1: 'digit1',
  Digit2: 'digit2',
  Digit3: 'digit3',
  Digit4: 'digit4',
  Digit5: 'digit5',
  Digit6: 'digit6',
  Digit7: 'digit7',
  Digit8: 'digit8',
  Digit9: 'digit9',
  Digit0: 'digit0',
  Minus: 'minus',
  Equal: 'equal',
  Backspace: 'backspace',
  Delete: 'delete',
  Tab: 'tab',
  KeyQ: 'key-q',
  KeyW: 'key-w',
  KeyE: 'key-e',
  KeyR: 'key-r',
  KeyT: 'key-t',
  KeyY: 'key-y',
  KeyU: 'key-u',
  KeyI: 'key-i',
  KeyO: 'key-o',
  KeyP: 'key-p',
  BracketLeft: 'bracket-left',
  BracketRight: 'bracket-right',
  Backslash: 'backslash',
  Home: 'key-home',
  CapsLock: 'capslock',
  KeyA: 'key-a',
  KeyS: 'key-s',
  KeyD: 'key-d',
  KeyF: 'key-f',
  KeyG: 'key-g',
  KeyH: 'key-h',
  KeyJ: 'key-j',
  KeyK: 'key-k',
  KeyL: 'key-l',
  Semicolon: 'semicolon',
  Quote: 'quote',
  Enter: 'enter',
  End: 'key-end',
  ShiftLeft: 'shift-left',
  KeyZ: 'key-z',
  KeyX: 'key-x',
  KeyC: 'key-c',
  KeyV: 'key-v',
  KeyB: 'key-b',
  KeyN: 'key-n',
  KeyM: 'key-m',
  Comma: 'comma',
  Period: 'period',
  Slash: 'slash',
  ShiftRight: 'shift-right',
  ArrowUp: 'arrow-up',
  placeholder: 'key-placeholder',
  ControlLeft: 'control-left',
  MetaLeft: 'meta-left',
  AltLeft: 'alt-left',
  Space: 'space',
  AltRight: 'alt-right',
  MetaRight: 'meta-right',
  ControlRight: 'control-right',
  ArrowLeft: 'arrow-left',
  ArrowDown: 'arrow-down',
  ArrowRight: 'arrow-right',
};

export default class Keyboard {
  constructor() {
    this.keys = [];

    this.keyboard = document.createElement('div');
    this.keyboard.classList.add('keyboard');

    Object.entries(KEYS_ID).forEach((element) => {
      const key = new Key(element[0], element[1]);
      this.keyboard.append(key.keyComponent);
      this.keys.push(key);
    });

    this.currentLayout = 'enUS';

    this.switchLayout(this.currentLayout, false, false);
  }

  get component() {
    return this.keyboard;
  }

  switchLayout(layoutName, shift, capslock) {
    if (Object.hasOwn(layouts, layoutName)) {
      this.capslock = capslock;
      layouts[layoutName].forEach(([regular, modified], code) => {
        const keyObj = this.keys.find((element) => element.code === code);
        const key = keyObj.keyComponent;
        key.innerText = '';
        key.setAttribute('data-after', '');
        if (shift) {
          key.innerText = modified || regular.toUpperCase();
        } else {
          key.innerText = regular;
          if (modified) {
            key.setAttribute('data-after', modified);
          }
        }
        if (capslock) {
          key.innerText = key.innerText.toUpperCase();
        }
        keyObj.keyText = key.innerText;
      });
    }
  }

  processKeyDown(code, key) {
    const textarea = document.querySelector('.textarea');
    const cursorPos = textarea.selectionStart;

    const keyComponent = document.getElementById(KEYS_ID[code]);
    keyComponent.classList.add('keyboard__key_pressed');

    function insertChar(char) {
      textarea.value = textarea.value.substring(0, cursorPos)
        .concat(char, textarea.value.substring(cursorPos));
      textarea.selectionStart = cursorPos + 1;
      textarea.selectionEnd = cursorPos + 1;
    }

    switch (code) {
      case 'Backspace':
        textarea.value = textarea.value.substring(0, cursorPos - 1).concat('', textarea.value.substring(cursorPos));
        textarea.selectionStart = cursorPos - 1;
        textarea.selectionEnd = cursorPos - 1;
        break;
      case 'Space':
        insertChar(' ');
        break;
      case 'Delete':
        textarea.value = textarea.value.substring(0, cursorPos).concat('', textarea.value.substring(cursorPos + 1));
        textarea.selectionStart = cursorPos;
        textarea.selectionEnd = cursorPos;
        break;
      case 'ArrowLeft':
        insertChar('←');
        break;
      case 'ArrowRight':
        insertChar('→');
        break;
      case 'ArrowUp':
        insertChar('↑');
        break;
      case 'ArrowDown':
        insertChar('↓');
        break;
      case 'Enter':
        insertChar('\n');
        break;
      case 'Tab':
        insertChar('\t');
        break;
      case 'Home':
        textarea.selectionStart = 0;
        textarea.selectionEnd = 0;
        break;
      case 'End':
        textarea.selectionStart = textarea.textLength;
        textarea.selectionEnd = textarea.textLength;
        break;
      case 'AltLeft':
      case 'AltRight':
        break;
      case 'ShiftLeft':
      case 'ShiftRight':
        this.switchLayout(this.currentLayout, true, this.capslock);
        break;
      case 'ControlLeft':
      case 'ControlRight':
      case 'MetaLeft':
      case 'MetaRight':
        break;

      case 'CapsLock':
        this.switchLayout(this.currentLayout, false, !this.capslock);
        break;

      default:
        insertChar(key);
        break;
    }
  }

  processKeyUp(code) {
    const keyComponent = document.getElementById(KEYS_ID[code]);
    keyComponent.classList.remove('keyboard__key_pressed');

    switch (code) {
      case 'ShiftLeft':
      case 'ShiftRight':
        this.switchLayout(this.currentLayout, false, this.capslock);
        break;
      default:
        break;
    }
  }

  handleMouseDown(event) {
    event.preventDefault();
    const keyObj = this.keys.find((element) => element.id === event.target.id);
    keyObj.keyComponent.addEventListener('mouseout', this.handleMouseUp.bind(this));
    this.processKeyDown(keyObj.code, keyObj.keyText);
    document.getElementById('textarea').focus();
  }

  handleMouseUp(event) {
    event.preventDefault();
    const keyObj = this.keys.find((element) => element.id === event.target.id);
    this.processKeyUp(keyObj.code);
    document.getElementById('textarea').focus();
  }

  handleKeyDown(event) {
    event.preventDefault();

    let { code } = event;
    const { key } = event;

    if (!Object.hasOwn(KEYS_ID, code)) { return; }

    // Firefox fix
    if (code === 'OSLeft') {
      code = 'MetaLeft';
    }
    if (code === 'OSRight') {
      code = 'MetaRight';
    }

    console.log(code, key);
    this.processKeyDown(code, key);
  }

  handleKeyUp(event) {
    event.preventDefault();

    let { code } = event;
    if (!Object.hasOwn(KEYS_ID, code)) { return; }
    // Firefox fix
    if (code === 'OSLeft') {
      code = 'MetaLeft';
    }
    if (code === 'OSRight') {
      code = 'MetaRight';
    }

    this.processKeyUp(code);
  }
}
