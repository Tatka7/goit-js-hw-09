// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

import { Notify } from 'notiflix/build/notiflix-notify-aio';

let selectedDate = null;
const elems = {
    startBtn: document.querySelector('button[data-start]'),
    daysEl: document.querySelector('span[data-days]'),
    hoursEl: document.querySelector('span[data-hours]'),
    minutesEl: document.querySelector('span[data-minutes]'),
    secondsEl: document.querySelector('span[data-seconds]'),
};

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if (selectedDates[0] <= Date.now()) {
        Notify.warning('Please choose a date in the future!');
        elems.startBtn.setAttribute('disabled', '');
        return;
      }
      elems.startBtn.removeAttribute('disabled');
      selectedDate = selectedDates[0];
    },
};

elems.startBtn.addEventListener('click', onClick, { once: true });

flatpickr('#datetime-picker', options);

function onClick() {
  const timerId = setInterval(() => {
   const counter = selectedDate - Date.now();
    resetTimer(convertMs(counter));

    if (counter < 1000) {
            clearInterval(timerId);
    }
  }, 1000);
}

function formatTimeValue(value) { 
  return value.toString().padStart(2, "0");
}

function resetTimer(value) {
  const { days, hours, minutes, seconds } = value;

  elems.daysEl.textContent = formatTimeValue(days);
  elems.hoursEl.textContent = formatTimeValue(hours);
  elems.minutesEl.textContent = formatTimeValue(minutes);
  elems.secondsEl.textContent = formatTimeValue(seconds);
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
}