import { Timer } from './timer.js';

const timer = new Timer();
const root = document.documentElement;
const action = document.getElementById('timer-control');
const navItems = document.querySelectorAll('.nav-item');
const fontOptions = document.querySelectorAll('.font');
const colorOptions = document.querySelectorAll('.color');
const ringColorOne = document.getElementById('ring-gradient-one');
const ringColorTwo = document.getElementById('ring-gradient-two');
const timerAction = document.getElementById('timer-control');
const applyButton = document.getElementById('settings-button');
let pomodoro = document.getElementById('pd').value;
let shortBreak = document.getElementById('sb').value;
let longBreak = document.getElementById('lb').value;

/* --------------- Start, pause, or restart timer on user action ---------------- */
action.addEventListener('click', () => {
  timer.userAction();
});

/* -------- Switch to pomodoro, short break or long break on user action -------- */
navItems.forEach((item) => {
  item.addEventListener('click', (e) => {
    navItems.forEach((item) => {
      item.removeAttribute('id', 'nav-item-selected');
    });

    item.setAttribute('id', 'nav-item-selected');
    timer.timerCounter = 0;
    timerType(item.innerHTML);
  });
});

const timerType = (item) => {
  switch (item.toLowerCase()) {
    case 'pomodoro':
      timer.reset(pomodoro, `${pomodoro}:00`);
      break;
    case 'short break':
      timer.reset(shortBreak, `${shortBreak}:00`);
      break;
    case 'long break':
      timer.reset(longBreak, `${longBreak}:00`);
      break;
  }
};

/* ------------------------------- Settings Modal ------------------------------- */

//Increase or decrease minutes in settings modal
const upArrow = document.querySelectorAll('.arrow-up');
const downArrow = document.querySelectorAll('.arrow-down');

upArrow.forEach((item) => {
  item.addEventListener('click', (e) => {
    let inputId = item.id.substr(0, 2);
    document.getElementById(inputId).stepUp();
  });
});

downArrow.forEach((item) => {
  item.addEventListener('click', () => {
    let inputId = item.id.substr(0, 2);
    document.getElementById(inputId).stepDown();
  });
});

//Select font in settings modal
fontOptions.forEach((item) => {
  item.addEventListener('click', () => {
    fontOptions.forEach((item) => {
      item.classList.remove('selected-font');
    });
    item.classList.add('selected-font');
  });
});

//Select color in settings modal
colorOptions.forEach((item) => {
  item.addEventListener('click', () => {
    colorOptions.forEach((item) => {
      item.classList.remove('selected-color');
      item.innerHTML = '';
    });
    item.classList.add('selected-color');
    item.innerHTML = '&#10003;';
  });
});

//Apply user selected settings for time input, font, and color
applyButton.addEventListener('click', (e) => {
  e.preventDefault();

  pomodoro = document.getElementById('pd').value;
  shortBreak = document.getElementById('sb').value;
  longBreak = document.getElementById('lb').value;

  const selectedTimer = document.getElementById('nav-item-selected').innerHTML;
  timerType(selectedTimer);

  fontOptions.forEach((item) => {
    if (item.classList.contains('selected-font')) {
      let fontFamily = item.id.replace('-', ' ');
      root.style.setProperty('--font', fontFamily);
      if (fontFamily === 'space mono') {
        navItems.forEach((item) => {
          item.style.fontSize = '11.7px';
        });
      } else {
        navItems.forEach((item) => {
          item.style.fontSize = '13px';
        });
      }
    }
  });

  const colors = {
    'gradient-one': [
      'linear-gradient(209.21deg, #FF7373 13.57%, #491EB8 98.38%)',
      '#FF7373',
      '#491EB8',
      '#a85aa4fa',
    ],
    'gradient-two': [
      'linear-gradient(209.21deg, #416CE2 13.57%, #56D7DE 98.38%)',
      '#416CE2',
      '#56D7DE',
      '#90f3ff',
    ],
    'gradient-three': [
      'linear-gradient(209.21deg, #311b92 13.57%, #ffee58 98.38%)',
      '#311b92',
      '#ffee58',
      '#ac73ffcf',
    ],
  };

  colorOptions.forEach((item) => {
    if (item.classList.contains('selected-color')) {
      let selectedColor = colors[item.id];

      root.style.setProperty('--gradient', selectedColor[0]);
      ringColorOne.style.stopColor = selectedColor[1];
      ringColorTwo.style.stopColor = selectedColor[2];
      timerAction.style.fill = selectedColor[3];
    }
  });
});

//Open or close settings modal on user interaction
const settingsIcon = document.getElementById('settings-icon');
const settingsContainer = document.getElementById('settings-container');
const closeButton = document.getElementById('close-button');

settingsIcon.addEventListener('click', (e) => {
  e.preventDefault();
  settingsContainer.style.display = 'block';
});

closeButton.addEventListener('click', (e) => {
  e.preventDefault();
  settingsContainer.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target == settingsContainer) settingsContainer.style.display = 'none';
});
