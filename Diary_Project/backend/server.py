from flask import Flask, jsonify, request, json
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
    get_jwt_identity,
    create_refresh_token,
)
from datetime import timedelta
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text

# Config ---
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = (
    "mysql+pymysql://root:Wkdtldn.mat18!@localhost/diary_db?charset=utf8"
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

app.config["JWT_SECRET_KEY"] = "just_my_own_secret_key"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=1)
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=1)
jwt = JWTManager(app)

CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"


# Model ---
class User(db.Model):
    __tablename__ = "user"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), unique=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)


class Diary(db.Model):
    __tablename__ = "diary"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    title = db.Column(db.String(255), nullable=False)
    detail = db.Column(db.Text(), nullable=False)
    date = db.Column(db.Text(), nullable=False)
    time = db.Column(db.Text(), nullable=False)

    user = db.relationship("User")


class Sentiment_Analysis(db.Model):
    __tablename__ = "Sentiment_Analysis"

    id = db.Column(db.Integer, primary_key=True)
    diary_id = db.Column(db.Integer, db.ForeignKey("diary.id"))
    pos = db.Column(db.Float(), nullable=False)
    neg = db.Column(db.Float(), nullable=False)
    neu = db.Column(db.Float(), nullable=False)

    diary = db.relationship("Diary")


# User ---
@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data["username"]
    email = data["email"]
    password = data["password"]
    user = User.query.filter_by(username=username).first()

    if not user:
        user = User(username=username, email=email, password=password)
        db.session.add(user)
        db.session.commit()
        return jsonify(True)
    return jsonify(False), 401


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data["username"]
    email = data["email"]
    password = data["password"]
    user = User.query.filter_by(username=username).first()

    if user:
        if user.email == email:
            if user.password == password:
                access_token = create_access_token(identity=username)
                refresh_token = create_refresh_token(identity=username)
                return jsonify(
                    {
                        "result": True,
                        "access_token": access_token,
                        "refresh_token": refresh_token,
                    }
                )
            return (
                json.dumps(
                    {
                        "result": False,
                        "msg": "비밀번호가 잘못되었습니다. 다시 시도해주세요.",
                    }
                ),
                401,
            )

        return (
            json.dumps(
                {"result": False, "msg": "이메일이 잘못되었습니다. 다시 시도해주세요."}
            ),
            401,
        )

    return json.dumps({"result": False, "msg": "존재하지 않는 아이디입니다."}), 401


@app.route("/delete_user", methods=["GET"])
def __delete__():
    try:
        deleted_users = db.session.query(User).delete()
        db.session.commit()

        db.session.execute(text("ALTER TABLE user AUTO_INCREMENT = 1"))
        db.session.commit()

        return {"msg": f"{deleted_users} users have been deleted"}
    except Exception as e:
        db.session.rollback()
        return {"error": str(e)}


@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


@app.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    current_user = get_jwt_identity()
    new_access_token = create_access_token(identity=current_user)
    return jsonify(access_token=new_access_token)


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(host="0.0.0.0", port=8080, debug=True)
