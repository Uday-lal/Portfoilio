from config import Config
import smtplib


class Messaging:
    def __init__(self):
        email = Config.EMAIL
        password = Config.PASSWORD
        self.smpt_server = smtplib.SMTP(Config.MAIL_CLIENT, Config.PORT)
        self.smpt_server.ehlo()
        self.smpt_server.starttls()
        self.smpt_server.login(email, password)

    def send(self, name: str, email: str, message: str):
        msg = f"Subject: Got a message from the website\n\nFrom: {name}\nEmail: {email}\n{message}"
        self.smpt_server.sendmail(Config.EMAIL, Config.RECIVER_ADDR, msg)
        self.smpt_server.quit()
