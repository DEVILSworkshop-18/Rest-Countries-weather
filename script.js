   let parentContainer = document.body;
   var container_div = document.createElement("div");
    container_div.setAttribute("class", "container");

    var h=document.createElement("h1");
    h.id="title";
    h.classList.add("text-center");
    h.innerText="Weather Forecast🌦️";

    // Create the new div with rows class
    var row = document.createElement("div");
    row.setAttribute("class", "row");

    fetch("https://restcountries.com/v3.1/all")
        .then((response) => {
            return response.json();
        })
        .catch(() => {
            console.log("not fetched");
        })
        .then((data) => {
            // Sort the data array based on country names
            data.sort((a, b) => a.name.common.localeCompare(b.name.common));

            data.forEach(ele => {
                var name = ele.name.common;
                var capital = ele.capital;
                var flag = ele.flags.png;
                var region = ele.region;
                var lat = ele.latlng[0];
                var lng = ele.latlng[1];
                var country_code = ele.cca3;

                var cols = document.createElement("div");
                cols.setAttribute("class", "col-lg-4  col-sm-12");

                // Create the card div with Bootstrap classes
                var card = document.createElement("div");

                // card.setAttribute("class","card mt-2"); either
                card.classList.add("card", "col-mt-2", "bg-transparent");

                //  Create the card header div
                var card_header = document.createElement("div");
                card_header.classList.add(
                    "card-header",
                    "d-flex",
                    "justify-content-center",
                );
                card_header.setAttribute("style","background-color: #0cc5f8");
                card_header.textContent = name;

                // To create the Card body
                var card_body = document.createElement("div");
                card_body.setAttribute("class", "card-body");

                // Card title with inside image tag to center the image
                var card_title = document.createElement("h5");
                card_title.setAttribute("class", "card-title");

                var image = document.createElement("img");
                image.src = flag;
                image.alt = "flag";
                image.setAttribute("class", "image");
                card_title.appendChild(image);

                // Create the paragraph tag
                var p = document.createElement("p");
                p.setAttribute("class", "card-text");
                p.innerHTML = `<b>Capital: ${capital}<br>Region: ${region}<br>Country Code: ${country_code}<br>Latitude: ${lat}<br>Longitude: ${lng}</b>`;

                // Create the button div with a link button
                var button_cont=document.createElement("div");
                button_cont.setAttribute("class","btn_cont");
                var button_div = document.createElement("button");
                button_div.id = "button";
                button_div.innerText = "Check Today's Weather";
                button_div.classList.add("btn", "btn-outline-secondary");
                button_cont.appendChild(button_div);
                button_div.addEventListener("click", function() {
                    fetch_data(lat, lng);
                });

                // Appending Nested elements from inside to outside (or) Append elements to build the hierarchy
                container_div.append(h);
                card_body.appendChild(card_title);
                card_body.appendChild(p);
                card_body.appendChild(button_cont);

                card.appendChild(card_header);
                card.appendChild(card_body);

                cols.appendChild(card);
                row.appendChild(cols);
                container_div.append(row);

                document.body.append(container_div);
                parentContainer = container_div;
            });

            // Add the footer
            var footer = document.createElement("footer");
            footer.textContent = "Designed by VIGNESHA";
            footer.setAttribute("class", "text-center col-mt-4");
            document.body.appendChild(footer);
        });

    function fetch_data(lat,lng)
    {
        // Weather API fetch
        var api_key = "dd233cc1d3570bad7488dadc51d7e682";
        var base_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}`;

        fetch(base_url)
            .then((response) => response.json())
            .then((weather_data) => {
                var image = `https://openweathermap.org/img/w/${weather_data.weather[0].icon}.png`;
                console.log(image);
                document.getElementById('infoModalLabel').innerHTML=`Weather is <img src=${image}>`;
                document.getElementById("infoModalBody").innerHTML =`<p><b>City: </b>${weather_data.name}<br>
                <b>weather: </b>${weather_data.weather[0].main}<br>
                <b>description: </b>${weather_data.weather[0].description}<br>
                <b>temp: </b>${weather_data.main.temp}<br>
                <b>humidity: </b>${weather_data.main.humidity}<br>
                <b>wind speed: </b>${weather_data.wind.speed}<br>
                </p>`;
                $('#infoModal').modal('show');
            })
            .catch((error) => console.log("Error:", error));
    }