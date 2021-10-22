from ..cache import Cache


def authorize_token(auth_token: str):
    cache = Cache(auth_token)
    if auth_token in cache.get_tokens():
        return True
    return False
