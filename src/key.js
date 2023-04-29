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
  }

  createComponent() {
    let keyComponent = null;
    if (this.code === 'placeholder') {
      keyComponent = document.createElement('div');
      keyComponent.id = this.id;
      keyComponent.classList.add('keyboard__placeholder');
    } else {
      keyComponent = document.createElement('button');
      keyComponent.id = this.id;
      keyComponent.classList.add('keyboard__key');
      keyComponent.type = 'button';

      switch (this.code) {
        case 'Backspace':
          keyComponent.classList.add('keyboard__backspace');
          break;
        case 'Tab':
          keyComponent.classList.add('keyboard__tab');
          break;
        case 'Backslash':
          keyComponent.classList.add('keyboard__backslash');
          break;
        case 'CapsLock':
          keyComponent.classList.add('keyboard__capslock');
          break;
        case 'Enter':
          keyComponent.classList.add('keyboard__enter');
          break;
        case 'ShiftLeft':
          keyComponent.classList.add('keyboard__shift-left');
          break;
        case 'ShiftRight':
          keyComponent.classList.add('keyboard__shift-right');
          break;
        case 'Space':
          keyComponent.classList.add('keyboard__space');
          break;
        case 'ControlLeft':
        case 'OSLeft':
        case 'AltLeft':
          keyComponent.classList.add('keyboard__ctrl-alt-shift-left');
          break;
        default:
          break;
      }
      keyComponent.innerText = this.keyText;
    }

    return keyComponent;
  }
}
