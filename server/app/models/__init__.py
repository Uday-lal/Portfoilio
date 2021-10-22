import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import pathlib
import os

cwd = pathlib.Path(
    __file__).parent.resolve()

cred = credentials.Certificate(os.path.join(
    cwd, "FirebaseServiceAccountCred.json"))

firebase_admin.initialize_app(cred)
db = firestore.client()

SKILLS = db.collection("Skills")
ADMIN = db.collection("admins")
TOOL = db.collection("tool")
PROJECTS = db.collection("projects")
MESSAGING = db.collection("messaging")
