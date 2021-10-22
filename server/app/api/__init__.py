from .skills import Skills
from .auth import Auth
from .auth_token import AuthToken
from .admin import Admin
from .tool import Tool
from .projects import Projects
from .messaging import MessagingApi
from flask_restful import Api


def register_resource(api: Api):
    api.add_resource(Skills, "/api/skills")
    api.add_resource(Auth, "/api/admin-auth")
    api.add_resource(AuthToken, "/api/authenticate-token")
    api.add_resource(Admin, "/api/admin/<string:auth_token>")
    api.add_resource(Tool, "/api/tool")
    api.add_resource(Projects, "/api/projects")
    api.add_resource(MessagingApi, "/api/messaging")
