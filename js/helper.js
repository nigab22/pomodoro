const action = document.getElementById('timer-control');
const clock = document.getElementById('timer');

action.addEventListener('click', () => {
  timedCount();
  //timer.callAction();
});

let min = 2;
let sec = 10;

function timedCount() {
  let counter = setInterval(function () {
    document.getElementById('txt').value = `${min - 1}:${sec - 1}`;
    sec--;

    if (sec <= 0) {
      min--;
      min = formatTime(min);

      sec = 10;
    }
    if (min <= 0) {
      clearInterval(counter);
    }
  }, 1000);
}
