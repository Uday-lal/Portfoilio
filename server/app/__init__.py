from flask import Flask
from flask_restful import Api
from .api import register_resource


def start_server():
    app = Flask(__name__)
    api_ = Api(app)
    register_resource(api_)
    return app
