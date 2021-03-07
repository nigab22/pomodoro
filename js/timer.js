export class Timer {
  constructor(time = 25) {
    this.navItems = document.querySelectorAll('nav > ul > li');
    this.action = document.getElementById('timer-control');
    this.clock = document.getElementById('timer');
    this.ring = document.getElementById('ring');
    this.ringStroke = 0;
    this.strokeDashoffset = this.ringStroke;
    this.timeText = '25:00';
    this.amountOfTime = time - 1;
    this.min = time - 1;
    this.sec = 60;
    this.timerCounter = 0;
  }

  start() {
    const ringCalculation = 1045 / ((this.amountOfTime + 1) * 60);
    console.log(this.timerCounter);
    const timer = () => {
      this.counter = setInterval(() => {
        animateRing();
        this.sec--;

        let min = formatTime(this.min);
        let sec = formatTime(this.sec);
        this.clock.textContent = `${min}:${sec}`;

        if (this.min === 0 && this.sec === 0) {
          //this.action.textContent = 'restart';
          this.ring.style.strokeDashoffset = this.ringStroke;
          this.strokeDashoffset = this.ringStroke;
          this.min = this.amountOfTime;
          this.sec = 60;
          clearInterval(this.counter);
          switchTimer();
        }

        if (this.sec === 0) {
          this.min--;
          this.sec = 60;
        }
      }, 10);
    };

    const formatTime = (x) => {
      if (x < 10) return '0' + x;
      return x;
    };

    const animateRing = () => {
      this.strokeDashoffset += ringCalculation;
      this.ring.style.strokeDashoffset = this.strokeDashoffset;
    };

    //Switch between pomodoro, short timer, and long timer
    const switchTimer = () => {
      this.navItems.forEach((item) =>
        item.removeAttribute('id', 'nav-item-selected')
      );

      console.log('ehh');
      console.log(this.timerCounter, 'ee');

      switch (this.timerCounter) {
        case 0:
        case 2:
        case 4:
        case 6:
          this.reset(25, '25:00');
          this.navItems[0].setAttribute('id', 'nav-item-selected');
          break;
        case 1:
          console.log(this.timerCounter);

        case 3:
        case 5:
          this.reset(5, '05:00');
          this.navItems[1].setAttribute('id', 'nav-item-selected');
          break;
        case 7:
          this.reset(15, '15:00');
          this.navItems[2].setAttribute('id', 'nav-item-selected');
          break;
        case 8:
          this.reset(25, '25:00');
          this.navItems[0].setAttribute('id', 'nav-item-selected');
          this.timerCounter = 0;
      }
      this.timerCounter++;
    };

    timer();
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
    this.strokeDashoffset = this.ringStroke;
    this.ring.style.strokeDashoffset = 0;
    this.clock.textContent = timeText;
    this.amountOfTime = time - 1;
    this.min = time - 1;
    this.sec = 60;
  }

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
}
