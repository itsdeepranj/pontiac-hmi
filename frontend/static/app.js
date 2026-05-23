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
        document.getElementById("clock");

    if (clock) {

        clock.textContent =
            `${hours}:${minutes}:${seconds}`;
    }
}

setInterval(updateClock, 1000);

updateClock();

/* ===========================
   MAP
=========================== */

const map = L.map(
    'map',
    {
        zoomControl: false
    }
).setView(
    [51.0447, -114.0719],
    10
);

/* ===========================
   DARK MAP
=========================== */

L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    {
        attribution:
            '&copy; OpenStreetMap & CartoDB'
    }
).addTo(map);

/* ===========================
   ZOOM CONTROL
=========================== */

L.control.zoom({

    position: 'bottomright'

}).addTo(map);

/* ===========================
   GPS MARKER
=========================== */

const marker = L.marker(
    [51.0447, -114.0719]
).addTo(map);

/* ===========================
   ROUTING
=========================== */

let routingControl = null;

/* ===========================
   SEARCH ROUTE
=========================== */

async function createRoute() {

    const destination =
        document.getElementById(
            "destination"
        ).value;

    if (!destination) {

        return;
    }

    try {

        const response =
            await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${destination}`
            );

        const data =
            await response.json();

        if (data.length === 0) {

            alert(
                "Location not found"
            );

            return;
        }

        const lat =
            parseFloat(data[0].lat);

        const lon =
            parseFloat(data[0].lon);

        if (routingControl) {

            map.removeControl(
                routingControl
            );
        }

        routingControl =
            L.Routing.control({

                waypoints: [

                    L.latLng(
                        51.0447,
                        -114.0719
                    ),

                    L.latLng(
                        lat,
                        lon
                    )

                ],

                routeWhileDragging: false,

                show: false,

                addWaypoints: false,

                fitSelectedRoutes: true,

                draggableWaypoints: false,

                createMarker: function() {

                    return null;
                }

            }).addTo(map);

    } catch(error) {

        console.error(error);

        alert(
            "Routing failed"
        );
    }
}

/* ===========================
   ENTER SEARCH
=========================== */

document
    .getElementById("destination")
    .addEventListener(

        "keypress",

        function(event) {

            if (event.key === "Enter") {

                createRoute();
            }
        }
);

/* ===========================
   FLOATING WINDOWS
=========================== */

async function loadAppsMenu() {

    const container =
        document.getElementById(
            "overlay-container"
        );

    if (
        container.innerHTML.includes(
            "apps-menu"
        )
    ) {

        container.innerHTML = "";

        return;
    }

    const response =
        await fetch(
            "/apps-floating"
        );

    const html =
        await response.text();

    container.innerHTML =
        html;
}

async function loadSettingsPanel() {

    const container =
        document.getElementById(
            "overlay-container"
        );

    if (
        container.innerHTML.includes(
            "settings-panel"
        )
    ) {

        container.innerHTML = "";

        return;
    }

    const response =
        await fetch(
            "/settings-floating"
        );

    const html =
        await response.text();

    container.innerHTML =
        html;

    setupBrightness();
}

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

appsButton.addEventListener(
    "click",
    loadAppsMenu
);

settingsButton.addEventListener(
    "click",
    loadSettingsPanel
);

/* ===========================
   BRIGHTNESS
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

/* ===========================
   OPEN REAL APPS
=========================== */

async function openInternalApp(appName) {

    try {

        await fetch(

            `/launch/${appName}`,

            {

                method: "POST"

            }
        );

    } catch(error) {

        console.error(
            "Failed to launch app",
            error
        );
    }

    /* CLOSE APPS MENU */

    const container =
        document.getElementById(
            "overlay-container"
        );

    container.innerHTML = "";
}
/* ===========================
   CLOSE APP
=========================== */

const closeAppButton =
    document.getElementById(
        "close-app"
    );

closeAppButton.addEventListener(
    "click",
    () => {

        const appWindow =
            document.getElementById(
                "app-window"
            );

        const appFrame =
            document.getElementById(
                "app-frame"
            );

        appWindow.classList.remove(
            "active"
        );

        appFrame.src = "";
    }
);

/* ===========================
   FAKE GPS
=========================== */

let currentLat = 51.0447;
let currentLon = -114.0719;

setInterval(() => {

    currentLat +=
        (Math.random() - 0.5) * 0.001;

    currentLon +=
        (Math.random() - 0.5) * 0.001;

    marker.setLatLng([
        currentLat,
        currentLon
    ]);

}, 4000);