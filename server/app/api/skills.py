from flask_restful import Resource
from flask_restful import reqparse
from ..models.skills import SkillsModel
from .redis_config import authorize_token


class Skills(Resource):
    def __init__(self, **kwargs):
        super(Skills, self).__init__(**kwargs)
        self.skills_model = SkillsModel()
        self.parser = reqparse.RequestParser()
        self.parser.add_argument("skill_id", type=str)
        self.parser.add_argument(
            "skill_name", type=str)
        self.parser.add_argument(
            "auth_token", type=str, help="Auth token is required",  required=True)
        self.parser.add_argument("updated_data", type=dict)

    def get(self):
        return self.skills_model.read()

    def post(self):
        args = self.parser.parse_args()
        if authorize_token(args["auth_token"]):
            if "skill_name" in args:
                skill_name = args["skill_name"]
                skill_data = {"skill_name": skill_name}
                self.skills_model.create(skill_data)
                return skill_data, 200
            else:
                return {"message": "Skill name is required"}, 422
        else:
            return {"message": "Unautherized token"}, 401

    def put(self):
        args = self.parser.parse_args()
        if authorize_token(args["auth_token"]):
            if "updated_data" in args and "skill_id" in args:
                skill_id = args["skill_id"]
                update_data = args["updated_data"]
                self.skills_model.update(
                    skill_id=skill_id, updated_data=update_data)
                return {"message": "Data updated"}, 200
            else:
                return {"message": "Not have enough data to update the skills"}, 422
        else:
            return {"message": "Unautherized token"}, 401

    def delete(self):
        args = self.parser.parse_args()
        if authorize_token(args["auth_token"]):
            if "skill_id" in args:
                skill_id = args["skill_id"]
                self.skills_model.delete(skill_id)
                return {"message": "Skill deleted"}, 200
            else:
                return {"message": "Tool id is required"}, 422
        else:
            return {"message": "Unautherized token"}, 401
