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