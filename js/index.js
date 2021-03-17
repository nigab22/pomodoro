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

//Start, pause, or restart timer
action.addEventListener('click', () => {
  timer.callAction();
});

//Select pomodoro, short break or long break
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
      timer.reset(25, '25:00');
      break;
    case 'short break':
      timer.reset(5, '05:00');
      break;
    case 'long break':
      timer.reset(15, '15:00');
      break;
  }
};

/**Settings**/

//Select font color from settings
fontOptions.forEach((item) => {
  item.addEventListener('click', () => {
    fontOptions.forEach((item) => {
      item.classList.remove('selected-font');
    });
    item.classList.add('selected-font');
  });
});

//Select font color from settings
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

//Apply user selected settings for font and/or color
applyButton.addEventListener('click', (e) => {
  e.preventDefault();

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

// = function (event) {
//   if (event.target == modal) {
//     modal.style.display = 'none';
//   }
// };
