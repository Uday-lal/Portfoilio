from . import PROJECTS


class ProjectsModel:
    def __init__(self):
        self.project = PROJECTS

    def read(self):
        result = {}
        ids = []
        results = []
        docs = self.project.get()
        for doc in docs:
            data = doc.to_dict()
            data["id"] = doc.id
            results.append(data)
            ids.append(doc.id)
        result["ids"] = ids
        result["results"] = results
        return result

    def create(self, data: dict, id: str):
        self.project.document(id).set(data)

    def update(self, project_id, updated_data):
        document = self.project.document(project_id)
        if document:
            document.update(updated_data)
        else:
            raise Exception("Document not found")

    def delete(self, project_id):
        document = self.project.document(project_id)
        if document:
            document.delete()
        else:
            raise Exception("Document not found")
