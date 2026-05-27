/* ===========================
   CLOCK
=========================== */

function updateClock() {

    const now = new Date();

    const hours =
        String(now.getHours())
        .padStart(2, '0');

    const minutes =
        String(now.getMinutes())
        .padStart(2, '0');

    const seconds =
        String(now.getSeconds())
        .padStart(2, '0');

    const clock =
        document.getElementById(
            "clock"
        );

    if (clock) {

        clock.textContent =
            `${hours}:${minutes}:${seconds}`;
    }
}

setInterval(
    updateClock,
    1000
);

updateClock();

/* ===========================
   BUTTONS
=========================== */

const appsButton =
    document.getElementById(
        "apps-button"
    );

const settingsButton =
    document.getElementById(
        "settings-button"
    );

/* APPS BUTTON */

if (appsButton) {

    appsButton.addEventListener(

        "click",

        () => {

            console.log(
                "Apps button clicked"
            );

            loadAppsMenu();
        }
    );
}

/* SETTINGS BUTTON */

if (settingsButton) {

    settingsButton.addEventListener(

        "click",

        () => {

            console.log(
                "Settings button clicked"
            );

            loadSettingsPanel();
        }
    );
}

/* GLOBAL EVENT LISTENERS */

/* GLOBAL UI HELPERS */

/* INACTIVITY TIMER */

/* GLOBAL AUDIO STATE */