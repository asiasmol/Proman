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
        ORDER BY cards.card_order
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


def update_title_board(title, id):
    query = """
                UPDATE boards 
                SET title = %(title)s
                WHERE id = %(id)s
                        """
    data_manager.execute_insert(query,
                                {'title': title, 'id': id})



def get_columns_by_board_id(board_id):
    return data_manager.execute_select(
        """
        SELECT * FROM statuses
        WHERE statuses.board_id = %(board_id)s
        ORDER BY statuses.id
        ;
        """
        , {'board_id': board_id}
    )

def add_new_column(title, board_id):
    query = """
                INSERT INTO statuses(title, board_id)
                VALUES (%(title)s, %(board_id)s)
                        """
    data_manager.execute_insert(query,
                                {'title': title, 'board_id': board_id})

def update_title_column(title, id):
    query = """
               UPDATE statuses 
               SET title = %(title)s
               WHERE id = %(id)s
                            """
    data_manager.execute_insert(query,
                                {'title': title, 'id': id})



def add_new_card(board_id, status_id, title):
    query = """
                INSERT INTO cards(board_id, status_id, title, card_order)
                VALUES (%(board_id)s, %(status_id)s, %(title)s, 1) ;
                        """
    data_manager.execute_insert(query,
                                {'board_id': board_id, 'status_id': status_id, 'title': title})