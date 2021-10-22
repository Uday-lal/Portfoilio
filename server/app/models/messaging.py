from . import MESSAGING


class MessagingModel:
    def __init__(self):
        self.messaging = MESSAGING

    def read(self):
        docs = self.messaging.get()
        result = []
        for doc in docs:
            data = doc.to_dict()
            data["id"] = doc.id
            result.append(data)
        return result

    def create(self, messaging_data: dict):
        self.messaging.add(messaging_data)

    def delete(self, message_id: str):
        document = self.messaging.document(message_id)
        if document:
            document.delete()
        else:
            raise Exception("Document not found")
