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
        """, {"status_id": status_id})

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
        """, {"board_id": board_id})

    return matching_cards

def get_columns_by_board_id(board_id):
    columns = data_manager.execute_select(
        """
        SELECT id, title
        FROM board_columns
        WHERE board_id = %(board_id)s
        ORDER BY id
        """
        , {"board_id": board_id})
    return columns

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
        """, {"username": user_name}, False)


def get_user_password(user_name):
    return data_manager.execute_select(
        """
        SELECT id,password
        FROM users
        WHERE user_name = %(username)s
        ;
        """, {'username': user_name}, False
    )

def add_new_board(board):
    query = """
                INSERT INTO boards(title)
                VALUES (%(board)s);
                    """
    data_manager.execute_insert(query,
                                {'board': board})

def add_new_column_to_board(board_id, column_title):
    return data_manager.execute_select(
        """
        INSERT INTO board_columns 
        VALUES(DEFAULT, %(board_id)s , %(column_title)s)
        RETURNING *;
        """, {"board_id": board_id, "column_title": column_title})


def add_new_card(column_id, title):
    return data_manager.execute_select(
        """
        INSERT INTO cards (column_id, title)
        VALUES(%(column_id)s, %(title)s)
        RETURNING *;
        """
        , {"column_id": column_id, "title": title}, False)


def update_card_title(card_id, new_name):
    return data_manager.execute_select(
        """
        UPDATE cards SET title = %(new_name)s
        WHERE id = %(card_id)s
        RETURNING *;
        """
        , {"card_id": card_id, "new_name": new_name}, False)

def delete_card(card_id):
    data_manager.execute_modify(
        """
        DELETE from cards
        WHERE id = %(card_id)s
        """
        , {"card_id": card_id})