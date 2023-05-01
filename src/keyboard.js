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
      this.keyboard.append(key.createComponent());
      this.keys.push(key);
    });

    this.switchLayout('enUS', false, false);
  }

  get component() {
    return this.keyboard;
  }

  switchLayout(layoutName, shift, capslock) {
    if (Object.hasOwn(layouts, layoutName)) {
      layouts[layoutName].forEach(([regular, modified], code) => {
        const key = this.keyboard.querySelector(`#${KEYS_ID[code]}`);
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
      });
    }
  }
}
