class CrazyButton{
    constructor(container = 'body', buttonCount = Math.random()*(5-2) + 2 || 2, extra_actions = []){
        var default_actions = ["disappear", "extra_button", "remove_unused_button", "japanese_weather", "click_counter"];
        var actions = default_actions.concat(extra_actions);
        console.log(actions);
        var url  = "https://api.weatherapi.com/v1/current.json?q=Tokyo&key=f4adfec58394496ea1684801210404"
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, false);
        xhr.onreadystatechange = async () => {
            if(xhr.readyState == "4" || xhr.status == "200"){
                var weatherData = await JSON.parse(xhr.response);
                var receivedTemp = weatherData.current.temp_c;
            }else{
                throw "There was an error " + xhr.readyState + " - " + xhr.status 
            }
            this.renderButtons(receivedTemp, container, parseInt(buttonCount), actions);
        }
        xhr.send();
    }

   renderButtons(tokyoTemp, container, buttonCount, actions){
    console.log(actions)

    var clickedCount = 0;
    var totalCount = buttonCount;
    for(var i = 0; i < buttonCount; i++){
        var newButton = document.createElement("button","button");
        newButton.className = "crazyButton";
        newButton.classList.add("delete");
        newButton.setAttribute("data",0);
        newButton.innerText = tokyoTemp;

        if(actions.indexOf("hover") > -1){
            this.addHoverEffect(newButton);
        }

        if(actions.indexOf("city_name") > -1){
            this.addCityName(newButton);
        }

        newButton.onclick = (event) => {
            clickedCount = clickedCount + 1;
            var thisButtonClickCount = parseInt(event.target.getAttribute("data"));
            event.target.setAttribute("data", thisButtonClickCount + 1);

            event.target.innerText = event.target.innerText.split(" ")[0] + " " + event.target.getAttribute("data");
            event.target.classList.remove("delete");
            if(totalCount - clickedCount == 1){
                this.deleteButton(document.getElementsByClassName("delete")[0])
            }
        }
        var targetElement = document.querySelector(container);
        targetElement.appendChild(newButton);
        if(i > 6){
            break;
        }
    }
   }

   addHoverEffect(button){
    button.onmouseover = (event) => {
        event.target.style.backgroundColor = "red";
    }
    button.onmouseout = (event) => {
        event.target.style.backgroundColor = "white";
    }
   }

   addCityName(button){
    button.innerText = button.innerText + " Tokyo";
   }

   deleteButton(button){
    button.style.transition = "1.2s";
    button.style.transform = "rotateY(90deg)";
    button.style.opacity = "0";
    setTimeout(()=>{button.style.display = "none"}, 1200);

   }
}