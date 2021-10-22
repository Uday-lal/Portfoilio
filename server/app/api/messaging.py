from flask_restful import Resource
from flask_restful import reqparse
from ..models.messaging import MessagingModel
from .redis_config import authorize_token


class MessagingApi(Resource):
    def __init__(self, **kwargs):
        super(MessagingApi, self).__init__(**kwargs)
        self.parser = reqparse.RequestParser()
        self.messaging_model = MessagingModel()
        self.parser.add_argument(
            "name", type=str, help="Name is required", required=True)
        self.parser.add_argument(
            "email", type=str, help="email is required", required=True)
        self.parser.add_argument(
            "message", type=str, help="message is required", required=True)
        self.parser.add_argument("auth_token", type=str)
        self.parser.add_argument("id", type=str)

    def get(self):
        args = self.parser.parse_args()
        if "auth_token" in args:
            if authorize_token(args["auth_token"]):
                return self.messaging_model.read()
            else:
                return {"message": "Unautherized token"}, 401
        else:
            return {"message": "Auth token is required"}, 422

    def post(self):
        args = self.parser.parse_args()
        data = {
            "name": args["name"],
            "email": args["email"],
            "message": args["message"]
        }
        self.messaging_model.create(data)
        return {"message": "Message sended"}, 200

    def delete(self):
        args = self.parser.parse_args()
        if "id" in args and "auth_token":
            if authorize_token(args["auth_token"]):
                self.messaging_model.delete(args["id"])
                return {"message": "Message delted"}, 200
            else:
                return {"message": "Unautherized token"}, 401
        else:
            return {"message": "Id and auth_token in required"}, 422
