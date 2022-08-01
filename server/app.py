from flask import Flask
from flask_cors import CORS
from routes.english import blueprint_english

PORT = 3300

app = Flask(__name__)
CORS(app);
app.register_blueprint(blueprint_english, url_prefix='/english')


@app.route("/version")
def get_version():
    return "Parmeus algorithm server v1.0"


if __name__ == '__main__':
    from waitress import serve

    print('server started at localhost:{}'.format(PORT))
    serve(app, port=PORT)
