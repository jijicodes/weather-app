export const getWeather = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=fb5d14b0bb5a4a76c83f7d881bf9f172`;
  const resopnse = await fetch(url);
  const weatherData = await resopnse.json();
  return weatherData;
};
