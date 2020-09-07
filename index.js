const gameTitleInput = document.getElementById("gameTitle");
const searchBtn = document.getElementById("searchBtn");
const verdict = document.getElementById("verdict");
const name = document.getElementById("gameName");
const gameImage = document.getElementById("gameImage");
const url = "https://rawg.io/api/games?search=";


gameForm.addEventListener("submit", (e) => {
    e.preventDefault();
    getGame()
})


async function getGame(){
    const gameTitle = gameTitleInput.value;
    console.log(gameTitle)
    fetch(`${url}${gameTitle}`)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data.results[0])
        name.innerHTML = data.results[0].name;
        gameImage.src=data.results[0].background_image;
        evaluateGame(data);
    })
}

function evaluateGame(gameData) {
    const noData = "We couldn't find a rating for this game."
    const bad = "This game is bad.";
    const ok = "This game might be bad.";
    const good = "This game is good.";
    const great = "This game is great!";

    const score = gameData.results[0].metacritic;

    if (score > 90) {
        verdict.innerHTML = great
        verdict.style.color = "aqua";
    }

    else if (score > 70) {
        verdict.innerHTML = good
        verdict.style.color = "green";
    }

    else if (score > 50) {
        verdict.innerHTML = ok
        verdict.style.color = "DarkOrange";
    }

    else if (score > 40) {
        verdict.innerHTML = bad
        verdict.style.color = "red";
    }

    else if (score === null) {
        verdict.innerHTML = noData
        verdict.style.color = "white";
    }
}