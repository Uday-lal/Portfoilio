from app import start_server
from flask_cors import CORS
from config import Config


app = start_server()
cors = CORS(app=app, resources={r"/api/*": {"origins": "*"}})
debug = Config.DEBUG

if __name__ == "__main__":
    app.run(debug=debug)
