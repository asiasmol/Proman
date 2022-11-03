import data_manager


def get_card_status(status_id):
    """
    Find the first status matching the given id
    :param status_id:
    :return: str
    """
    status = data_manager.execute_select(
        """
        SELECT * FROM statuses s
        WHERE s.id = %(status_id)s
        ;
        """
        , {"status_id": status_id})

    return status


def get_boards():
    return data_manager.execute_select(
        """
        SELECT * FROM boards
        ;
        """
    )


def get_cards_for_board(board_id):
    matching_cards = data_manager.execute_select(
        """
        SELECT * FROM cards
        WHERE cards.board_id = %(board_id)s
        ;
        """
        , {"board_id": board_id})

    return matching_cards

def add_user(new_user):
    query = """
            INSERT INTO users
            (user_name, password)
            VALUES (%(user_name)s, %(password)s);
                """
    data_manager.execute_insert(query,
                   {'user_name': new_user['user_name'], 'password': new_user['password']})

def get_user_name(user_name):
    return data_manager.execute_select(
        """
        SELECT COUNT(user_name)
        FROM users
        WHERE user_name = %(username)s
        ;
        """
        , {"username": user_name}, False)


def get_user_password(user_name):
    return data_manager.execute_select(
        """
        SELECT id,password
        FROM users
        WHERE user_name = %(username)s
        ;
        """
        , {'username': user_name}, False
    )


def add_new_board(board):
    query = """
                INSERT INTO boards(title)
                VALUES (%(board)s);
                    """
    data_manager.execute_insert(query,
                                {'board': board})

def update_board_title(title, board_id):
    data_manager.execute_update(
        """
        UPDATE boards
        SET title = (%(title)s)
        WHERE id=%(id)s
        """
        , {"title": title, "id": board_id})