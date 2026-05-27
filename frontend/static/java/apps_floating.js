/* ===========================
   LOAD APPS MENU
=========================== */

async function loadAppsMenu() {

    const container =
        document.getElementById(
            "overlay-container"
        );

    /* TOGGLE MENU */

    if (
        container.innerHTML.includes(
            "apps-menu"
        )
    ) {

        container.innerHTML = "";

        return;
    }

    try {

        const response =
            await fetch(
                "/apps-floating"
            );

        const html =
            await response.text();

        container.innerHTML =
            html;

    } catch(error) {

        console.error(
            "Failed to load apps menu",
            error
        );
    }
}

/* ===========================
   OPEN INTERNAL APP
=========================== */

function openInternalApp(appUrl) {

    const appWindow =
        document.getElementById(
            "app-window"
        );

    const appFrame =
        document.getElementById(
            "app-frame"
        );

    const container =
        document.getElementById(
            "overlay-container"
        );

    /* LOAD APP */

    appFrame.src = appUrl;

    /* OPEN WINDOW */

    appWindow.classList.add(
        "active"
    );

    /* CLOSE APPS MENU */

    container.innerHTML = "";
}

/* ===========================
   CLOSE APP WINDOW
=========================== */

const closeAppButton =
    document.getElementById(
        "close-app"
    );

if (closeAppButton) {

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
}