"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from api.utils import APIException, generate_sitemap
from api.models import db, User, RoleEnum
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands

# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False
bcrypt = Bcrypt(app)

# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
jwt = JWTManager(app)


# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response


# user registration endpoint
@app.route("/register", methods=["POST"])
def register_user():
    """
    Example of body request:
    {
        "email": "string",
        "username": "string",
        "password": "string", 
        "role": "user",
        "is_active": true
    }

    Constraints:
    - email: string, required, unique
    - username: string, required, unique
    - password: string, required, at least 8 characters long
    - role: string, optional, default "user", must be one of the following: "admin", "user"
    - is_active: boolean, optional, default true

    """
    body = request.get_json()
    if not body:
        return jsonify({"msg": "Missing data"}), 400
    if "email" not in body:
        return jsonify({"msg": "Missing email"}), 400
    if "username" not in body:
        return jsonify({"msg": "Missing username"}), 400
    if "password" not in body:
        return jsonify({"msg": "Missing password"}), 400
    
    # verify if the password is at least 8 characters long
    if len(body["password"]) < 8:
        return jsonify({"msg": "Password must be at least 8 characters long"}), 400
    # verify if the role is a valid role
    if "role" in body and body["role"] not in RoleEnum.get_choices():
        return jsonify({"msg": "Invalid role"}), 400
    
    # verify if the email is already in use
    existing_user = User.query.filter_by(email=body["email"]).first()
    if existing_user:
        return jsonify({"msg": "Email already in use"}), 400
    # verify if the username is already in use
    existing_user = User.query.filter_by(username=body["username"]).first()
    if existing_user:
        return jsonify({"msg": "Username already in use"}), 400

    email = body["email"]
    username = body["username"]
    password = body["password"]
    role = body.get("role", "user")
    is_active = body.get("is_active", True)

    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

    new_user = User(
        email=email,
        username=username,
        password=hashed_password,
        role=role,
        is_active=is_active
    )

    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"msg": "User created successfully"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Error creating user", "error": str(e)}), 500
    finally:
        db.session.close()
    

# user login endpoint
@app.route("/login", methods=["POST"])
def login_user():
    """
    Example of body request:
    {
        "email": "string",
        "password": "string"
    }
    """
    body = request.get_json()
    if not body:
        return jsonify({"msg": "Missing data"}), 400
    if "email" not in body:
        return jsonify({"msg": "Missing email"}), 400
    if "password" not in body:
        return jsonify({"msg": "Missing password"}), 400

    email = body["email"]
    password = body["password"]

    user = User.query.filter_by(email=email).first()

    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity=str(user.id))
        return jsonify({
            "access_token": access_token,
            "user": {
                "id": str(user.id),
                "email": user.email,
                "username": user.username,
                "role": user.role,
                "is_active": user.is_active
            }
        }), 200
    else:
        return jsonify({"msg": "Invalid email or password"}), 401
    

# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
