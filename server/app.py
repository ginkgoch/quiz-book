from flask import Flask
from routes.english import blueprint_english

PORT = 3000

app = Flask(__name__)
app.register_blueprint(blueprint_english, url_prefix='/english')


@app.route("/version")
def get_version():
    return "Parmeus algorithm server v1.0"


if __name__ == '__main__':
    from waitress import serve

    print('server started at localhost:{}'.format(PORT))
    serve(app, port=PORT)
