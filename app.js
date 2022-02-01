// #########################                ################

const acttemp = document.querySelector(".temp");
const name = document.querySelector("#city");
const desc = document.querySelector("#desc");
const image = document.querySelector("#image");
const content = document.querySelector(".content");
const error = document.querySelector(".show-error");
// input-search
// btn-search

const search = document.querySelector(".input-search");
const btn_search = document.querySelector(".btn-search");

function weather() {
  fetch(
    "api.openweathermap.org/data/2.5/weather?q=London&appid=7994e596d45fee4004bd07f90b53f1ff"
  )
    .then((data) => {
      return data;
    })
    .then((jsondata) => {
      console.log(jsondata);
    });
}

// fetch('api.openweathermap.org/data/2.5/weather?q=Londonappid=7994e596d45fee4004bd07f90b53f1ff')
// .then(res=>res.json())
// .then(json=>console.log(json));

// function getrequest() {
//     fetch("http://api.openweathermap.org/data/2.5/weather?q=Londonappid=7994e596d45fee4004bd07f90b53f1ffs")
//       .then((response) => response.json())
//       .then((json) => {
//         // console.log(json);

//         let li = `<t><th>Name</th> <th>Email</th></t>`;
//         json.forEach((user) => {
//           // console.log(user);

//           li += `<div>${user.name} ${user.email}</div>`;
//           // console.log(user.name);
//           // console.log(user.email);
//         });

//         document.querySelector(".main").innerHTML = li;
//       });
//   }

//   getrequest();

// https://api.openweathermap.org/data/2.5/weather?q=${cityID}&appid={key}

function weatherBalloon(cityID) {
  var key = "69b25b4dadade2ec2d28366d45268e6c";
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityID}&appid=${key}&units=metric`
  )
    .then(function (resp) {
      return resp.json();
    }) // Convert data to json
    .then(function (data) {
      //   console.log(data);
      servingcontent(data);
    })
    .catch(function () {
      // catch any errors
    });
}

function servingcontent(params) {
    removegif();
  if (params.cod && params.cod === "404") {
    console.log("city not exist");

    city_barrier();
  }

  name.textContent = params.name;

  const temp = params.main.temp;
  acttemp.textContent = temp;

  console.log(params.weather[0].main);

  if (params.weather[0].main == "Clouds") {
    // console.log("true");
    image.src = "/imgs/clouds.png";
  } else if (params.weather[0].main == "Clear") {
    image.src = "/imgs/sunny.png";
    
  } else if (params.weather[0].main == "Rainy") {
    image.src = "/imgs/rainy.png";
  } else if (params.weather[0].main == "Mist") {
    image.src = "/imgs/mist.png";
  } else {
    image.src = "/imgs/rainy-sunny.png";
  }
  

  // console.log(params.main.temp);
  // console.log(params.weather[0].main);

  desc.textContent = params.weather[0].description;

  // after adding attributes just showing the content-->
  show_content();

// setting up gifs
  setupgif(params);
}

function city_barrier() {
  content.classList.add("hide");
  error.classList.remove("hide");
  setdefault();
}

function show_content() {
  content.classList.remove("hide");
  error.classList.add("hide");
  setdefault();
}

function setdefault() {
  search.value = "";
}

function setupgif(params) {

    if (params.weather[0].main == "Clouds") {
        // console.log("true");
        // image.src = "/imgs/clouds.png";
        content.classList.add("cloudu");
      } else if (params.weather[0].main == "Clear") {
        // image.src = "/imgs/sunny.png";
        content.classList.add("sunny");
        
      } else if (params.weather[0].main == "Rainy") {
        // image.src = "/imgs/rainy.png";
        content.classList.add("rainu");
      }
      
    
}

//   weatherBalloon(244417)

// items to be added -> eventlistener-->

//   window.onload = function() {
//     weatherBalloon("ontario");
//   }

function removegif() {
    if (content.classList.contains("cloudu")) {
        content.classList.remove("cloudu")
        
    }
    else if (content.classList.contains("sunny")) {
        content.classList.remove("sunny")
        
    }
    else if (content.classList.contains("rainu")) {
        content.classList.remove("rainu")
        
    }
    
}



// driver code-->

btn_search.addEventListener("click", (item) => {
  item.preventDefault();
//   removing previous gifs after search-->

  const cityname = search.value;
  console.log("city name entered :", search.value);

  weatherBalloon(cityname);
});
