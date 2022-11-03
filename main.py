from flask import Flask, render_template, url_for, redirect, session,flash, request
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv
from util import json_response
import mimetypes
import queries

mimetypes.add_type('application/javascript', '.js')
app = Flask(__name__)
app.secret_key = 'ghbdtn93vbh65bdctv407yfv'
load_dotenv()

MIN_USER_LOGIN_LENGTH = 4
MIN_USER_PASSWORD_LENGTH = 3


def get_logged_user():
    if 'user_name' in session:
        return {'user_name': session['user_name'], 'id': session['id']}
    else:
        return None
@app.route("/")
def index():
    if 'id' in session:
        return render_template('index.html', logged_user=get_logged_user())
    return render_template('index.html')


@app.route("/registration", methods=['GET'])
def registration_page():
    if 'id' in session:
        return render_template('registration.html', logged_user=get_logged_user())
    return render_template('registration.html')

@app.route("/registration", methods=['POST'])
def register_user():
    new_user = {}
    user_name = request.form.get('register_username')
    password = request.form.get('register_password')
    check_username = queries.get_user_name(user_name)
    if check_username['count'] == 0:
        if len(user_name) >= MIN_USER_LOGIN_LENGTH and len(password) >= MIN_USER_PASSWORD_LENGTH:
            hashed_password = generate_password_hash(password)
            new_user['user_name'] = user_name
            new_user['password'] = hashed_password
            queries.add_user(new_user)
            if new_user:
                flash("Successful registration. Log in to continue.", category="success")
                return redirect(url_for('get_login_page'))
        else:
            flash("Please, fill in both fields.", category="error")
    else:
        flash('Username already exists, please choose another one!', category="error")
    return render_template('registration.html')

@app.route("/login", methods=['GET'])
def get_login_page():
    if 'id' in session:
        return render_template('login.html', logged_user=get_logged_user())
    return render_template('login.html')

@app.route("/login", methods=['POST'])
def login_user():
    user_name = request.form.get('login_username')
    password = request.form.get('login_password')
    user_data = queries.get_user_password(user_name)
    if user_data and check_password_hash(user_data['password'], password):
        session['id'] = user_data['id']
        session['user_name'] = user_name
        return redirect(url_for('index'))
    else:
        flash("Wrong username or password.", category="error")
        return render_template('login.html')

@app.route("/logout")
def logout():
    session.pop('id', None)
    session.pop('user_name', None)
    return redirect(url_for("index"))

@app.route("/api/boards")
@json_response
def get_boards():
    return queries.get_boards()

@app.route('/api/boards/add', methods=['POST'])
def save_boards():
    name_new_board = request.get_json()
    print(name_new_board['nameBoard'])
    queries.add_new_board(name_new_board['nameBoard'])
    print("dupa")
    return redirect(url_for('index'))

@app.route("/api/boards/<int:board_id>/cards/")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return queries.get_cards_for_board(board_id)

@app.route('/api/boards/<boardTitleAndId>', methods=['POST'])
@json_response
def update_title_board(boardTitleAndId):
    list_title_id = boardTitleAndId.split(",")
    title = list_title_id[0]
    board_id = list_title_id[1]
    queries.update_title_board(title, int(board_id))

def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
