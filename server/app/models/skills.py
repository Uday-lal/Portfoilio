from . import SKILLS


class SkillsModel:
    def __init__(self):
        self.skills = SKILLS

    def read(self):
        docs = self.skills.get()
        result = []
        for doc in docs:
            data = doc.to_dict()
            data["id"] = doc.id
            result.append(data)
        return result

    def create(self, data: dict):
        if "skill_name" in data:
            self.skills.add(data)
        else:
            raise Exception("Not have enough data to create the skill")

    def update(self, skill_id: str, updated_data: dict):
        document = self.skills.document(skill_id)
        if document:
            document.update(updated_data)
        else:
            raise Exception("Document not found")

    def delete(self, skils_id: str):
        document = self.skills.document(skils_id)
        if document:
            document.delete()
        else:
            raise Exception("Document not found")
