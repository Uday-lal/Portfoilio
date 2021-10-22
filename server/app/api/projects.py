from flask_restful import Resource
from flask_restful import reqparse
from ..models.projects import ProjectsModel
from .redis_config import authorize_token


class Projects(Resource):
    def __init__(self, **kwargs):
        super(Projects, self).__init__(**kwargs)
        self.parser = reqparse.RequestParser()
        self.project_model = ProjectsModel()
        self.parser.add_argument(
            "auth_token", type=str, help="Auth token is required", required=True)
        self.parser.add_argument("project_name", type=str)
        self.parser.add_argument("discryption", type=str)
        self.parser.add_argument("languages", type=dict, action="append")
        self.parser.add_argument("github_url", type=str)
        self.parser.add_argument("live_link", type=str)
        self.parser.add_argument("primary_language", type=str)
        self.parser.add_argument("updated_data", type=str)
        self.parser.add_argument("id", type=str)

    def get(self):
        return self.project_model.read()

    def post(self):
        args = self.parser.parse_args()
        if authorize_token(args["auth_token"]):
            if "project_name" in args and "id" in args and \
                "discryption" in args and "languages" in args and \
                    "primary_language" in args and "github_url" in args and "live_link" in args:
                project_data = {
                    "project_name": args["project_name"],
                    "discryption": args["discryption"],
                    "languages": args["languages"],
                    "github_url": args["github_url"],
                    "primary_language": args["primary_language"],
                    "live_link": args["live_link"]
                }
                project_id = args["id"]
                self.project_model.create(data=project_data, id=project_id)
            else:

                return {"message": "Not have enough data tok create project"}, 422
        else:
            return {"message": "Unautherised token"}, 401

    def put(self):
        args = self.parser.parse_args()
        if authorize_token(args["auth_token"]):
            if "id" in args and "updated_data" in args:
                self.project_model.update(args["id"], args["updated_data"])
            else:
                return {"message": "Not have enough data tok create project"}
        else:
            return {"message": "Unautherised token"}, 401

    def delete(self):
        args = self.parser.parse_args()
        if authorize_token(args["auth_token"]):
            if "id" in args:
                self.project_model.delete(args["id"])
            else:
                return {"message": "Not have enough data tok create project"}
        else:
            return {"message": "Unautherised token"}, 401
