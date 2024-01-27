function timer() {

   //Timer

  const deadline = "2024-02-15T18:00";

  function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds;
    const t = Date.parse(endtime) - Date.parse(new Date());

    if (t <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(t / (1000 * 60 * 60 * 24));
      hours = Math.floor((t / (1000 * 60 * 60)) % 24);
      minutes = Math.floor((t / 1000 / 60) % 60);
      seconds = Math.floor((t / 1000) % 60);
    }

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector);
    const days = timer.querySelector("#days");
    const hours = timer.querySelector("#hours");
    const minutes = timer.querySelector("#minutes");
    const seconds = timer.querySelector("#seconds");

    const timeInterval = setInterval(updateClock, 1000);

    updateClock(); // Чтобы при первом запуске страница обновила значение сразу, а не через секунду, как указано в timeInterval

    function updateClock() {
      const k = getTimeRemaining(endtime);
      const { total: t, days: d, hours: h, minutes: m, seconds: s } = k;

      days.innerHTML = d.toString().padStart(2, 0);
      hours.innerHTML = h.toString().padStart(2, 0);
      minutes.innerHTML = m.toString().padStart(2, 0);
      seconds.innerHTML = s.toString().padStart(2, 0);
      if (t <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(".timer", deadline);
}

module.exports = timer;