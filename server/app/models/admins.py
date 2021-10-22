from . import ADMIN


class AdminModel:
    def __init__(self):
        self.admin = ADMIN

    def read_all(self):
        docs = self.admin.get()
        result = []
        for doc in docs:
            result.append(doc)
        return result

    def read(self, admin_id: str):
        document = self.admin.document(admin_id).get().to_dict()
        if document:
            return document
        else:
            raise Exception("Document not found")

    def qurey(self, admin_email: str):
        document = self.admin.where("email", "==", admin_email).get()
        if document != []:
            admin_id = document[0].id
            admin_data = document[0].to_dict()
            admin_data["id"] = admin_id
            return admin_data
        raise Exception("Document not found")

    def create(self, admin_data: dict):
        if "Name" in admin_data and "email" in admin_data and "password" in admin_data:
            admin_data["role"]["is_supreme"] = False
            self.admin.add(admin_data)
        else:
            raise Exception("Not have enough data to create the skill")

    def update(self, admin_id: str, updated_data: dict):
        document = self.admin.document(admin_id)
        if document.exists:
            document.update(updated_data)
        else:
            raise Exception("Document not found")

    def delete(self, admin_id: str):
        document = self.admin.document(admin_id)
        if document.exists:
            document.delete()
        else:
            raise Exception("Document not found")
