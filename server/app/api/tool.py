from flask_restful import Resource
from flask_restful import reqparse
from ..models.tool import ToolModel
from .redis_config import authorize_token
from ..cache import Cache


class Tool(Resource):
    def __init__(self, **kwargs):
        super(Tool, self).__init__(**kwargs)
        self.tool_model = ToolModel()
        self.parser = reqparse.RequestParser()
        self.parser.add_argument("tool_id", type=str)
        self.parser.add_argument("updated_data", type=dict, action="append")
        self.parser.add_argument("auth_token", type=str,
                                 help="Auth token is required", required=True)
        self.parser.add_argument("tool_name", type=str)
        self.parser.add_argument("percent", type=str)
        self.parser.add_argument("img_url", type=str)

    def get(self):
        return self.tool_model.read()

    def post(self):
        args = self.parser.parse_args()
        auth_token = str(args["auth_token"])
        if authorize_token(auth_token):
            cache = Cache(auth_token)
            admin_id = cache.get_data()["admin_id"]
            tool_data = {
                "admin_id": admin_id,
                "tool_name": args["tool_name"],
                "percent": args["percent"],
                "img_url": args["img_url"]
            }
            self.tool_model.create(tool_data)
            return args, 200
        else:
            return {"message": "Unautherized token"}, 401

    def put(self):
        args = self.parser.parse_args()
        if authorize_token(args["auth_token"]):
            if "tool_id" in args and "updated_data" in args:
                tool_id = args["tool_id"]
                updated_data = args["updated_data"]
                for data in updated_data:
                    self.tool_model.update(
                        tool_id=tool_id, updated_data=data)
                return {"message": "Data updated"}, 200
            else:
                return {"message": "Tool id is required"}, 422

    def delete(self):
        args = self.parser.parse_args()
        if authorize_token(args["auth_token"]):
            if "tool_id" in args:
                self.tool_model.delete(args["tool_id"])
                return {"message": "Data deleted"}, 200
            else:
                return {"message": "Tool id is required"}, 422
