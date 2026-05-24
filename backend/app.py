from flask import Flask
from flask import render_template
import subprocess

app = Flask(
    
    __name__,
    
    template_folder="../frontend/templates",
    
    static_folder="../frontend/static"
    
)

#====================
# Home
#====================

@app.route('/')
def home():
    
    return render_template(
        'index.html'
        )
    
#====================
# Music
#====================

@app.route('/music')
def music():
    
    return render_template(
        'music.html'
        )
    
#====================
# Weather
#====================

@app.route('/weather')
def weather():
    
    return render_template(
        'weather.html'
        )
    
#====================
# Settings
#====================

@app.route('/settings')
def settings():
    
    return render_template(
        'settings.html'
        )
    
#===================
# Floating Apps
#===================

@app.route('/apps-floating')
def floating_apps():
    
    return render_template(
        'apps_floating.html'
        )
    
#===================
# Floating Settings
#===================

@app.route('/settings-floating')
def settings_floating():
    
    return render_template(
        'settings_floating.html'
        )
    
import subprocess

# =========================
# LAUNCH YOUTUBE
# =========================

@app.route('/launch/youtube', methods=['POST'])
def launch_youtube():

    subprocess.Popen([

        'chromium',

        '--new-window',

        '--start-maximized',

        '--app=https://music.youtube.com'

    ])

    return '', 204

# =========================
# LAUNCH SPOTIFY
# =========================

@app.route('/launch/spotify', methods=['POST'])
def launch_spotify():

    subprocess.Popen([

        'chromium',

        '--new-window',

        '--start-maximized',

        '--app=https://open.spotify.com'

    ])

    return '', 204

#====================
# RADIO
#====================

@app.route('/radio')
def radio():
    
    return render_template(
        'radio.html'
        )
    
#===================
# Run the app
#===================

if __name__ == '__main__':
    
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=True 
    )
    