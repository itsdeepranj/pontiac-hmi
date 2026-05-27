

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