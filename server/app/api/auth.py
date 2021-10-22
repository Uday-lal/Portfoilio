from flask_restful import Resource
from flask_restful import reqparse
from ..models.admins import AdminModel
from ..cache import Cache
import secrets


class Auth(Resource):
    def __init__(self, **kwargs):
        super(Auth, self).__init__(**kwargs)
        self.admin_model = AdminModel()
        self.parser = reqparse.RequestParser()
        self.parser.add_argument(
            "email", type=str, help="Email is required", required=True)
        self.parser.add_argument("password", type=str,
                                 help="Password is required", required=True)

    def post(self):
        args = self.parser.parse_args()
        email = args["email"]
        try:
            admin_document = self.admin_model.qurey(email)
        except Exception:
            return {"message": "Invalid email"}, 401
        admin_password = admin_document["password"]
        if args["password"] == admin_password:
            token = self.generate_auth_token()
            responce = {"auth_token": token, "role": admin_document["role"]}
            cache = Cache(token)
            cache.store_token(admin_document["id"])
            return responce, 201
        else:
            return {"message": "Authentication failed"}, 401

    @staticmethod
    def generate_auth_token() -> str:
        cache = Cache("none")
        tokens = cache.get_tokens()
        while True:
            token = secrets.token_hex(28)
            if token not in tokens:
                return token
