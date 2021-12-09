from flask_login import login_required, current_user


def staff_required(fun):
    @login_required
    def wrapper(*args, **kwargs):
        if current_user.is_staff:
            return fun(*args, **kwargs)
        else:
            return {'message': "Only for staff users"}, 403

    return wrapper


def remove_none_filters(filters, params=None):
    if params:
        return {k: v for k, v in filters.items() if k in params and v is not None}
    return {k: v for k, v in filters.items() if v is not None}


from imgurpython import ImgurClient

client_id = 'f4e61d1c1368f4c'
client_secret = 'c0c376801c48063f33226bac3b68386ca41e4e81'

client = ImgurClient(client_id, client_secret)


def save_photo(byte: bytes) -> str:
    with open('temp', 'wb') as file:
        file.write(byte)
    url = client.upload_from_path('temp', config=None, anon=True)
    return url['link']