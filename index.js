import Keyboard from './src/keyboard.js';

const { body } = document;

const wrapper = document.createElement('div');
wrapper.classList.add('wrapper');

const textarea = document.createElement('textarea');
textarea.classList.add('textarea');
textarea.name = 'textarea';
textarea.id = 'textarea';
textarea.cols = 150;
textarea.rows = 10;
textarea.autofocus = true;

const keyboard = new Keyboard();

const note = document.createElement('div');
note.classList.add('note');
note.innerHTML = 'Keyboard was created in Windows.<br><span class = "note__key">Left Shift</span> + <span class = "note__key">Left Alt</span> to switch layout.';

wrapper.append(textarea, keyboard.component, note);

document.addEventListener('keydown', keyboard.handleKeyDown.bind(keyboard));
document.addEventListener('keyup', keyboard.handleKeyUp.bind(keyboard));
window.addEventListener('blur', keyboard.handleKeyUp.bind(keyboard));

keyboard.keys.forEach((element) => {
  element.keyComponent.addEventListener('mousedown', keyboard.handleMouseDown.bind(keyboard));
  element.keyComponent.addEventListener('mouseup', keyboard.handleMouseUp.bind(keyboard));
});

body.append(wrapper);
