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


def create_card(card_title, board_id):
    data_manager.execute_insert(
        """       
    INSERT INTO cards(title, board_id, status_id, card_order)
    VALUES (%(card_title)s, %(board_id)s,
    (SELECT MIN(status_id)
    FROM board_columns
    WHERE board_id = %(board_id)s
    ),
    (CASE
    WHEN (SELECT MAX(card_order)+1
    FROM cards
    WHERE board_id = %(board_id)s) IS NOT NULL
    THEN (SELECT MAX(card_order)+1
    FROM cards
    WHERE board_id = %(board_id)s)
    ELSE 1 END  ))
     """,
        {"card_title": card_title, "board_id": board_id})


def delete_card_from_board(card_id):
    data_manager.execute_query(
        """
        DELETE FROM cards
        WHERE id = %(card_id)s
        """, {"card_id": card_id}
    )
