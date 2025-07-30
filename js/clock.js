// ⏰ Local Time Module
function updateClock() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Indiana/Indianapolis',
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  });
  document.getElementById('clock').innerText =
    `⏰ Tippecanoe County time (ET): ${formatter.format(now)}`;
}

setInterval(updateClock, 1000);
updateClock();