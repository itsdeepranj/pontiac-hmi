const player =
    document.getElementById(
        "radio-player"
    );

let currentStation = "";

function playStation(
    url,
    name
) {

    currentStation = url;

    player.src = url;

    player.load();

    player.play()
        .then(() => {

            document.getElementById(
                "now-playing"
            ).innerText =
                "Now Playing: " + name;

        })
        .catch(error => {

            console.log(
                error
            );

            alert(
                "Stream failed."
            );
        });
}

function playRadio() {

    if(currentStation !== "") {

        player.play();
    }
}

function pauseRadio() {

    player.pause();
}