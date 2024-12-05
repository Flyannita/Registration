import redis
from flask import Flask, request, jsonify
from flask_cors import CORS
RedisURL = "rediss://red-csr1i4dsvqrc73bahi20:vgexliA2zGrRt44O5qr2Opnm1u1ivAH5@oregon-redis.render.com:6379"
Connection = redis.Redis.from_url(RedisURL, decode_responses=True) # Connrction - соединение с базой данных
app = Flask(__name__) # flask - приложение или в нашем случае сервер
CORS(app)
@app.route("/registration", methods=["POST"])
def registration():
    Data = request.get_json() # reguest - запрос с сайта,
    email = Data.get("key")
    password = Data.get("value")
    if not(email) or not(password):
        return jsonify({"error": "no key or value"}), 400
    else:
        DataConnect = Connection.get(email)
        if DataConnect:
            return jsonify({"error":"email exists", "message":"enter"}), 200
        else:
            Connection.set(email, password) # set - установить, writing
            return jsonify({"message": "registration successfull", "success": True}), 200

@app.route("/enter", methods=["GET"])
def enter():
    Data = request.args.get("email")
    print(Data)
    if not(Data):
        return jsonify({"error":"no email"}), 400
    elif Data not in Connection:
        return jsonify({"error": "no email in data base", "message": Data}), 400
    else:
        Password = Connection.get(Data)
        return jsonify({"message": "all OK", "password":Password}), 200

@app.route("/forgot", methods=["POST"])
def ForgotPassword():
    Data = request.get_json()  # reguest - запрос с сайта, meow
    email = Data.get("key")
    password = Data.get("value")
    if not(email) or not(password):
        return jsonify({"error": "no email or no password"}), 400
    elif email not in Connection:
        return jsonify({"error": "no email in data base"}), 400
    else:
        LastPassword = Connection.get(email)
        if LastPassword==password:
            return jsonify({"error": "your password can't be the same"}), 400
        else:
            Connection.set(email, password)
            return jsonify({"message": "all OK"}), 200




if __name__=="__main__":
    app.run()
