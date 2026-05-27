/* ===========================
   LOAD SETTINGS PANEL
=========================== */

async function loadSettingsPanel() {

    const container =
        document.getElementById(
            "overlay-container"
        );

    /* TOGGLE SETTINGS */

    if (
        container.innerHTML.includes(
            "settings-panel"
        )
    ) {

        container.innerHTML = "";

        return;
    }

    try {

        const response =
            await fetch(
                "/settings-floating"
            );

        const html =
            await response.text();

        container.innerHTML =
            html;

        setupBrightness();

    } catch(error) {

        console.error(
            "Failed to load settings",
            error
        );
    }
}

/* ===========================
   BRIGHTNESS CONTROL
=========================== */

function setupBrightness() {

    const brightnessSlider =
        document.getElementById(
            "brightness-slider"
        );

    if (!brightnessSlider) {

        return;
    }

    brightnessSlider.addEventListener(

        "input",

        () => {

            document.body.style.filter =
                `brightness(${brightnessSlider.value}%)`;
        }
    );
}