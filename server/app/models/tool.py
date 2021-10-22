from . import TOOL


class ToolModel:
    def __init__(self):
        self.tool = TOOL

    def read(self):
        docs = self.tool.get()
        result = []
        for doc in docs:
            data = doc.to_dict()
            data["id"] = doc.id
            result.append(data)
        return result

    def create(self, data: dict):
        if "tool_name" in data and "percent" in data and "img_url" in data and "admin_id" in data:
            tool_data = {"tool_name": data["tool_name"],
                         "percent": data["percent"], "img_url": data["img_url"]}
            self.tool.add(tool_data)
        else:
            raise Exception("Not have enough data to create the tool")

    def update(self, tool_id: str, updated_data: dict):
        document = self.tool.document(tool_id)
        if document:
            document.update(updated_data)
        else:
            raise Exception("Document not found")

    def delete(self, tool_id: str):
        document = self.tool.document(tool_id)
        if document:
            document.delete()
        else:
            raise Exception("Document not found")
