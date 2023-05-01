export default class Key {
  constructor(code, id) {
    this.id = id;
    this.code = code;

    switch (this.code) {
      case 'ControlLeft':
      case 'ControlRight':
        this.keyText = 'Ctrl';
        break;
      case 'OSLeft':
      case 'OSRight':
        this.keyText = 'Win';
        break;
      case 'AltLeft':
      case 'AltRight':
        this.keyText = 'Alt';
        break;
      case 'ShiftLeft':
      case 'ShiftRight':
        this.keyText = 'Shift';
        break;
      case 'Backspace':
        this.keyText = 'Backspace';
        break;
      case 'Tab':
        this.keyText = 'Tab';
        break;
      case 'CapsLock':
        this.keyText = 'CapsLock';
        break;
      case 'Enter':
        this.keyText = 'Enter';
        break;
      case 'Delete':
        this.keyText = 'Del';
        break;
      case 'Home':
        this.keyText = 'Home';
        break;
      case 'End':
        this.keyText = 'End';
        break;
      case 'ArrowUp':
        this.keyText = '↑';
        break;
      case 'ArrowDown':
        this.keyText = '↓';
        break;
      case 'ArrowLeft':
        this.keyText = '←';
        break;
      case 'ArrowRight':
        this.keyText = '→';
        break;
      default:
        this.keyText = null;
        break;
    }

    if (this.code === 'placeholder') {
      this.keyComponent = document.createElement('div');
      this.keyComponent.id = this.id;
      this.keyComponent.classList.add('keyboard__placeholder');
    } else {
      this.keyComponent = document.createElement('button');
      this.keyComponent.id = this.id;
      this.keyComponent.classList.add('keyboard__key');
      this.keyComponent.type = 'button';

      switch (this.code) {
        case 'Backspace':
          this.keyComponent.classList.add('keyboard__backspace');
          break;
        case 'Tab':
          this.keyComponent.classList.add('keyboard__tab');
          break;
        case 'Backslash':
          this.keyComponent.classList.add('keyboard__backslash');
          break;
        case 'CapsLock':
          this.keyComponent.classList.add('keyboard__capslock');
          break;
        case 'Enter':
          this.keyComponent.classList.add('keyboard__enter');
          break;
        case 'ShiftLeft':
          this.keyComponent.classList.add('keyboard__shift-left');
          break;
        case 'ShiftRight':
          this.keyComponent.classList.add('keyboard__shift-right');
          break;
        case 'Space':
          this.keyComponent.classList.add('keyboard__space');
          break;
        case 'ControlLeft':
        case 'OSLeft':
        case 'AltLeft':
          this.keyComponent.classList.add('keyboard__ctrl-alt-shift-left');
          break;
        default:
          break;
      }
      this.keyComponent.innerText = this.keyText;
    }
  }
}
