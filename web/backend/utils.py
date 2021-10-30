from flask_login import login_required, current_user


def staff_required(fun):
    @login_required
    def wrapper(*args, **kwargs):
        if current_user.is_staff:
            return fun(*args, **kwargs)
        else:
            return {'message': "Access denied"}, 403

    return wrapper
