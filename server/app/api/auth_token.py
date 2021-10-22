from flask_restful import Resource
from flask_restful import reqparse
from ..cache import Cache


class AuthToken(Resource):
    def __init__(self):
        super(AuthToken, self).__init__()
        self.parser = reqparse.RequestParser()
        self.parser.add_argument(
            "auth_token", type=str, help="Auth token is required")

    def post(self):
        args = self.parser.parse_args()
        auth_token = str(args["auth_token"])
        cache = Cache(auth_token)
        if cache.check_token():
            return {"auth_token": auth_token, "authenticated": True}, 201
        else:
            return {"auth_token": auth_token, "authenticated": False}, 403
