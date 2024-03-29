let locationName = document.querySelector(".js-locatonName");
let degrees = document.querySelector(".js-degrees");
let title = document.querySelector(".js-title");
let humidity = document.querySelector(".js-humadity"); // Fixed typo: "humadity" to "humidity"
let windSpeed = document.querySelector(".js-windSpeed");
let icon = document.querySelector(".icon");

let Image = document.querySelector(".bigImage");
const APIkey = "0c0d68833ac82be68e6f0c20288b44a5";
const para = document.createElement("input");
let spanElement = null;
function clickHandle() {
  locationName.remove();
  const inputElement = icon.appendChild(para);
  inputElement.classList.add("input");

  inputElement.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      // Do something when Enter key is pressed
      console.log("Enter key pressed. Value:", event.target.value);
      // Replace this with your desired action
      queryHandle();
      inputElement.remove();
      spanElement = icon.appendChild(locationName);
      spanElement.innerHTML = event.target.value;
      spanElement.style.textTransform = "uppercase";
    }
  });
}

function queryHandle() {
  const city = document.querySelector("input").value;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.cod === "404") {
        title.innerHTML("Error");
        humidity.style.display = "none";
        windSpeed.style.display = "none";
        document.querySelector("img").src = "404.png";
      }
      if (city === "") {
        humidity.style.display = "none";
        windSpeed.style.display = "none";
        Image.src = "Images/404.png";
        degrees.style.display = "none";
        title.style.display = "none";
        document.querySelector("img").src = "404.png";
      }

      const check = data.weather[0].main;
      console.log(`this something i want ${check}`);
      switch (data.weather[0].main) {
        case "Clear":
          document.querySelector("img").src = "clear.png";
          break;
        case "Clouds":
          document.querySelector("img").src = "cloud.png";
          break;
        case "Mist":
          document.querySelector("img").src = "mist.png";
          break;
        case "Snow":
          document.querySelector("img").src = "snow.png";
          break;
        case "Rain":
          document.querySelector("img").src = "rain.png";
          break;
        default:
          document.querySelector("img").src = "404.png";
      }

      console.log(data);

      windSpeed.innerHTML = `${parseInt(data.wind.speed)}'Km/h'`;
      degrees.innerHTML = `${data.main.temp} <sup>&degF</sup> `;
      title.innerHTML = `${data.weather[0].description}`;
      humidity.innerHTML = `${parseInt(data.main.humidity)}%`;
    });
}
