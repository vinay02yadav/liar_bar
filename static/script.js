let players = [];

window.onload = () => {
    let numPlayers = 0;
    while (!numPlayers || isNaN(numPlayers) || numPlayers < 1) {
        numPlayers = parseInt(prompt("How many players?"));
        if (numPlayers === null) return;
    }

    for (let i = 1; i <= numPlayers; i++) {
        let name = "";
        while (!name) {
            name = prompt(`Enter name for Player ${i}:`);
            if (name === null) return;
        }
        players.push(name);
    }

    console.log("Players:", players); // You can send this to server if needed

    document.getElementById("canvas").style.display = "block";
    document.getElementById("startBtn").style.display = "inline-block";


};



const sound = new Audio('/static/audio/countdown.m4a');

document.getElementById('startBtn').addEventListener('click', () => {
    sound.play();
});


document.getElementById('startBtn').addEventListener('click', () => {
    let query = players.map((name, i) => `player${i + 1}=${encodeURIComponent(name)}`).join('&');
    window.location.href = `/landing?${query}`;

});