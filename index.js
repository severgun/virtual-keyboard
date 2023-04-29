import Keyboard from './src/keyboard.js';

const { body } = document;

const wrapper = document.createElement('div');
wrapper.classList.add('wrapper');

const textarea = document.createElement('textarea');
textarea.classList.add('textarea');
textarea.name = 'textarea';
textarea.id = 'textarea';
textarea.cols = 50;
textarea.rows = 10;

const keyboard = new Keyboard();
wrapper.append(textarea, keyboard.component);

body.append(wrapper);
