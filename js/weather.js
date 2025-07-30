const apiKey = "6215e823481b660e0cba462747d778b1";
const weatherLocation = "Tippecanoe,US";

// 🌦️ Current Weather
fetch(`https://corsproxy.io/?https://api.openweathermap.org/data/2.5/weather?q=${weatherLocation}&units=imperial&appid=${apiKey}`)
  .then(res => res.json())
  .then(data => {
    const temp = Math.round(data.main.temp);
    const condition = data.weather[0].main;
    const emoji = {
      Rain: "🌧️", Clear: "☀️", Clouds: "☁️", Snow: "❄️",
      Thunderstorm: "⛈️", Drizzle: "🌦️"
    }[condition] || "🌈";

    document.getElementById("weather").innerText =
      `🌦️ ${emoji} ${temp}°F – ${condition}`;
  })
  .catch(() => {
    document.getElementById("weather").innerText = "Weather fetch failed ❌";
  });

// 🌤️ 5-Day Forecast (High Temps)
fetch(`https://corsproxy.io/?https://api.openweathermap.org/data/2.5/forecast?q=${weatherLocation}&units=imperial&appid=${apiKey}`)
  .then(res => res.json())
  .then(data => {
    const forecastByDay = {};
    data.list.forEach(item => {
      const date = new Date(item.dt_txt);
      const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
      const temp = item.main.temp;
      const condition = item.weather[0].main;

      if (!forecastByDay[weekday] || temp > forecastByDay[weekday].temp) {
        forecastByDay[weekday] = { temp, condition };
      }
    });

    const emojiMap = {
      Rain: "🌧️", Clear: "☀️", Clouds: "☁️",
      Snow: "❄️", Thunderstorm: "⛈️", Drizzle: "🌦️"
    };

    document.getElementById("forecast-display").innerHTML = Object.entries(forecastByDay)
      .map(([day, info]) => {
        const emoji = emojiMap[info.condition] || "🌈";
        const temp = Math.round(info.temp);
        return `<div class="forecast-item">${day}: ${emoji} ${temp}°F – ${info.condition}</div>`;
      })
      .join('');
 })
  .catch(() => {
    document.getElementById("forecast-display").innerText = "Forecast fetch failed ❌";
  });