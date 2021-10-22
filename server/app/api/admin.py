from flask_restful import Resource
from ..models.admins import AdminModel
from ..cache import Cache


class Admin(Resource):
    def __init__(self):
        super(Admin, self).__init__()
        self.admin_model = AdminModel()

    def get(self, auth_token):
        cache = Cache(auth_token)
        if cache.check_token():
            admin_id = cache.get_data()["admin_id"]
            admin_data = self.admin_model.read(admin_id)
            return admin_data, 200
        else:
            return {"message": "Unauthorized token"}, 401
