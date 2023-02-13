import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector('#datetime-picker');
const value = document.querySelectorAll('.value');

const startBtn = document.querySelector('[data-start]');

let deltaTime;
let selectedDay;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDay = selectedDates[0];
    if (selectedDay < new Date()) {
      Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

const addLeadingZero = value => {
  return String(value).padStart(2, 0);
};

function handleClickOnStart() {
  let intervalID = null;
  intervalID = setInterval(() => {
    deltaTime = selectedDay - new Date();
    startBtn.disabled = true;
    if (deltaTime < 1000) {
      clearInterval(intervalID);
      Notify.success('Hell yeah! Timer is over!');
      startBtn.disabled = false;
    }
    updateTime(convertMs(deltaTime));
  }, 1000);
}
function updateTime({ days, hours, minutes, seconds }) {
  value[0].textContent = days;
  value[1].textContent = hours;
  value[2].textContent = minutes;
  value[3].textContent = seconds;
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

flatpickr(input, options);
startBtn.addEventListener('click', handleClickOnStart);
