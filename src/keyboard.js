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
    this.shiftLeft = false;
    this.altLeft = false;
    this.capslock = false;

    this.keyboard = document.createElement('div');
    this.keyboard.classList.add('keyboard');

    Object.entries(KEYS_ID).forEach((element) => {
      const key = new Key(element[0], element[1]);
      this.keyboard.append(key.keyComponent);
      this.keys.push(key);
    });

    this.handleMouseUp = this.handleMouseUp.bind(this);


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
        if (shift && !capslock) {
          key.innerText = modified || regular.toUpperCase();
        } else if (shift && capslock) {
          key.innerText = modified || regular.toLowerCase();
        } else if (!shift && capslock) {
          key.innerText = regular;
          if (modified) {
            key.setAttribute('data-after', modified);
          }
        }
        if (capslock) {
          key.innerText = key.innerText.toUpperCase();
        } else {
          key.innerText = regular;
          if (modified) {
            key.setAttribute('data-after', modified);
        }
        }

        keyObj.keyText = key.innerText;
      });
    }
  }

  processKeyDown(code) {
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
        break;
      case 'MetaLeft':
      case 'MetaRight':
        break;

      case 'CapsLock':
        this.switchLayout(this.currentLayout, false, !this.capslock);
        break;

      default:
        insertChar(keyComponent.innerText);
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
    keyObj.keyComponent.addEventListener('mouseout', this.handleMouseUp);
    if (keyObj.code === 'ShiftLeft') {
      this.shiftLeft = !this.shiftLeft;
    }
    if (keyObj.code === 'AltLeft') {
      this.altLeft = !this.altLeft;
    }
    this.processKeyDown(keyObj.code);
    document.getElementById('textarea').focus();
  }

  handleMouseUp(event) {
    event.preventDefault();
    const keyObj = this.keys.find((element) => element.id === event.target.id);
    keyObj.keyComponent.removeEventListener('mouseout', this.handleMouseUp);

    if (keyObj.code === 'ShiftLeft' && this.shiftLeft && !this.altLeft) {
      // hold key
    } else if (keyObj.code === 'AltLeft' && this.altLeft && !this.shiftLeft) {
      // hold alt
    } else if ((keyObj.code === 'AltLeft' && this.shiftLeft && this.altLeft) || (keyObj.code === 'ShiftLeft' && this.shiftLeft && this.altLeft)) {
      const availLayouts = Object.keys(layouts);
      const layoutIndex = availLayouts.indexOf(this.currentLayout) + 1 > availLayouts.length - 1 ? 0
        : availLayouts.indexOf(this.currentLayout) + 1;
      this.currentLayout = availLayouts[layoutIndex];

      this.processKeyUp(keyObj.code);
      this.shiftLeft = false;
      this.altLeft = false;
      this.processKeyUp('ShiftLeft');
      this.processKeyUp('AltLeft');
    } else {
    this.processKeyUp(keyObj.code);
      this.shiftLeft = false;
      this.altLeft = false;
      this.processKeyUp('ShiftLeft');
      this.processKeyUp('AltLeft');
    }
    document.getElementById('textarea').focus();
  }

  handleKeyDown(event) {
    event.preventDefault();

    let { code } = event;
    const { key } = event;

    if (!Object.hasOwn(KEYS_ID, code)) { return; }
    event.preventDefault();

    // Firefox fix
    if (code === 'OSLeft') {
      code = 'MetaLeft';
    }
    if (code === 'OSRight') {
      code = 'MetaRight';
    }

    if (code === 'ShiftLeft' && !event.repeat) {
      this.shiftLeft = true;
    }
    if (code === 'AltLeft' && !event.repeat) {
      this.altLeft = true;
    }

    if (this.shiftLeft && this.altLeft && !event.repeat) {
      const availLayouts = Object.keys(layouts);
      const layoutIndex = availLayouts.indexOf(this.currentLayout) + 1 > availLayouts.length - 1 ? 0
        : availLayouts.indexOf(this.currentLayout) + 1;
      this.currentLayout = availLayouts[layoutIndex];
    }
    this.processKeyDown(code);
  }

  handleKeyUp(event) {
    // handle Alt+Tab. Prevent Alt from sticking visually pressed.
    if (event.type === 'blur') {
      this.processKeyUp('AltLeft');
      this.processKeyUp('AltRight');
      return;
    }

    let { code } = event;
    if (!Object.hasOwn(KEYS_ID, code)) { return; }
    event.preventDefault();

    // Firefox fix
    if (code === 'OSLeft') {
      code = 'MetaLeft';
    }
    if (code === 'OSRight') {
      code = 'MetaRight';
    }

    if (code === 'ShiftLeft') {
      this.shiftLeft = false;
    }
    if (code === 'AltLeft') {
      this.altLeft = false;
    }

    this.processKeyUp(code);
  }
}
