from flask import Flask,  request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
JSON_FILE = 'server/banco/banco.json'
CORS(app)


# Usuários
@app.route('/dados-usuarios', methods=['GET'])
def dados_usuarios():
    if not os.path.exists(JSON_FILE):
        return jsonify({"erro": "Arquivo não encontrado"}), 404
        
    with open(JSON_FILE, 'r', encoding='utf-8') as f:
        dados = json.load(f)
        usuarios = dados["usuarios"]
    return jsonify(usuarios)


@app.route('/adicionar-user', methods=['POST'])
def adicionar_user():

    novo_usuario = request.get_json()
    if not novo_usuario:
        return jsonify({"erro": "Nenhum dado fornecido"}), 400

    try:
        with open(JSON_FILE, 'r', encoding='utf-8') as f:
            dados = json.load(f)
        
        if dados["usuarios"]:
            novo_id = max(user.get("id", 0) for user in dados["usuarios"]) + 1
        else:
            novo_id = 1

        novo_usuario["id"] = novo_id
        
        dados["usuarios"].append(novo_usuario)

        with open(JSON_FILE, 'w', encoding='utf-8') as f:
            json.dump(dados, f, indent=4, ensure_ascii=False)

        return jsonify({"mensagem": "Usuário adicionado com sucesso!", "dados": dados["usuarios"]}), 200

    except Exception as e:
        return jsonify({"erro": f"Erro ao processar: {str(e)}"}), 500

# Posts
@app.route('/dados-posts', methods=['GET'])
def dados_posts():
    if not os.path.exists(JSON_FILE):
        return jsonify({"erro": "Arquivo não encontrado"}), 404

    with open(JSON_FILE, 'r', encoding='utf-8') as f:
        dados = json.load(f)
        posts = dados["posts"]
    return jsonify(posts)


@app.route('/adicionar-post', methods=['POST'])
def adicionar_post():

    json_teste = request.get_json()
    if not json_teste:
        return jsonify({"erro": "Nenhum dado fornecido"}), 400

    try:
        with open(JSON_FILE, 'r', encoding='utf-8') as f:
            dados = json.load(f)

        dados["posts"].append(json_teste)

        with open(JSON_FILE, 'w', encoding='utf-8') as f:
            json.dump(dados, f, indent=4, ensure_ascii=False)

        return jsonify({"mensagem": "post adicionado com sucesso!", "dados": dados["posts"]}), 200

    except Exception as e:
        return jsonify({"erro": f"Erro ao processar: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)