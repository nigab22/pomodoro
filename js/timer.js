export class Timer {
  constructor(time = 25) {
    this.navItems = document.querySelectorAll('nav > ul > li');
    this.action = document.getElementById('timer-control');
    this.clock = document.getElementById('timer');
    this.ring = document.getElementById('ring');
    this.strokeDashoffset = 0;
    this.timeText = '25:00';
    this.amountOfTime = time - 1;
    this.min = time - 1;
    this.sec = 60;
    this.timerCounter = 0;
    this.firstTimeRunning = true;
  }

  start() {
    this.counter = setInterval(() => {
      this.animateRing();
      this.sec--;

      let min = this.formatTime(this.min);
      let sec = this.formatTime(this.sec);
      this.clock.textContent = `${min}:${sec}`;

      if (this.min === 0 && this.sec === 0) {
        const timerSound = new Audio('images/timer.m4a');
        timerSound.play();
        this.ring.style.strokeDashoffset = 0;
        this.strokeDashoffset = 0;
        this.min = this.amountOfTime;
        this.sec = 60;
        clearInterval(this.counter);
        this.switchTimer();
      }

      if (this.sec === 0) {
        this.min--;
        this.sec = 60;
      }
    }, 1000);

    this.action.textContent = 'pause';
  }

  pause() {
    this.action.textContent = 'start';
    clearInterval(this.counter);
  }

  restart() {
    this.action.textContent = 'pause';
    this.clock.textContent = this.timeText;
    this.start();
  }

  reset(time = 25, timeText = '25:00') {
    this.pause();
    this.strokeDashoffset = 0;
    this.ring.style.strokeDashoffset = 0;
    this.clock.textContent = timeText;
    this.amountOfTime = time - 1;
    this.min = time - 1;
    this.sec = 60;
  }

  //Automatically switch between pomodoro, short timer, and long timer
  switchTimer = () => {
    this.selectedTimer = document.getElementById('nav-item-selected');

    if (this.firstTimeRunning) {
      if (this.selectedTimer.innerHTML == 'pomodoro') {
        this.timerCounter = 1;
      }
    }
    this.firstTimeRunning = false;

    this.navItems.forEach((item) =>
      item.removeAttribute('id', 'nav-item-selected')
    );

    let pomodoro = document.getElementById('pd').value;
    let shortBreak = document.getElementById('sb').value;
    let longBreak = document.getElementById('lb').value;

    switch (this.timerCounter) {
      case 0:
      case 2:
      case 4:
      case 6:
        this.reset(pomodoro, `${pomodoro}:00`);
        this.navItems[0].setAttribute('id', 'nav-item-selected');
        break;
      case 1:
      case 3:
      case 5:
        this.reset(shortBreak, `${shortBreak}:00`);
        this.navItems[1].setAttribute('id', 'nav-item-selected');
        break;
      case 7:
        this.reset(longBreak, `${longBreak}:00`);
        this.navItems[2].setAttribute('id', 'nav-item-selected');
        break;
      case 8:
        this.reset(pomodoro, `${pomodoro}:00`);
        this.navItems[0].setAttribute('id', 'nav-item-selected');
        this.timerCounter = 0;
    }
    this.timerCounter++;
  };

  callAction() {
    switch (this.action.textContent.toLowerCase()) {
      case 'start':
        this.start();
        break;
      case 'pause':
        this.pause();
        break;
      case 'restart':
        this.restart();
        break;
    }
  }

  /*Helper Methods */
  formatTime = (x) => {
    if (x < 10) return '0' + x;
    return x;
  };

  animateRing = () => {
    const ringCalculation = 1045 / ((this.amountOfTime + 1) * 60);
    this.strokeDashoffset += ringCalculation;
    this.ring.style.strokeDashoffset = this.strokeDashoffset;
  };
}
