import { Timer } from './timer.js';

const timer = new Timer();
const action = document.getElementById('timer-control');
const navItems = document.querySelectorAll('nav > ul > li');

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
