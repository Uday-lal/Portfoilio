from time import gmtime
import json


class Cache:
    def __init__(self, token: str):
        self.token = token
        self.current_date = gmtime().tm_mday

    def store_token(self, admin_id: str):
        token_data = {
            self.token: {
                "admin_id": admin_id,
                "date_of_expire": self.current_date + 2
            }
        }
        json_obj = json.dumps(token_data)
        with open("store.json", "w") as store_file:
            store_file.write(json_obj)

    def check_token(self):
        try:
            store_file = open("store.json", "r")
            json_obj = json.load(store_file)
            if self.token in json_obj:
                date_of_creation = json_obj[self.token]["date_of_expire"]
                if self.current_date <= date_of_creation:
                    store_file.close()
                    return True
                else:
                    store_file.close()
                    json_obj.pop(self.token)
                    data = json.dumps(json_obj)
                    with open("store.json", "w") as store_file:
                        store_file.write(data)
                    return False
            else:
                store_file.close()
                return False
        except FileNotFoundError:
            return False

    def get_tokens(self):
        try:
            store_file = open("store.json", "r")
            json_obj = json.load(store_file)
            return list(json_obj.keys())
        except FileNotFoundError:
            return []

    def get_data(self):
        store_file = open("store.json", "r")
        json_obj = json.load(store_file)
        return json_obj[self.token]
