from flask import Flask,  request, jsonify
from flask_cors import CORS
import json
import os
import webbrowser
from pathlib import Path

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


@app.route('/remover-user/<int:id_user>', methods=['DELETE'])
def remover_user(id_user):

    try:
        with open(JSON_FILE, 'r', encoding='utf-8') as f:
            dados = json.load(f)
        
        usuario_a_ser_deletado = next((u for u in dados["usuarios"] if u.get("id") == id_user), None)

        dados["usuarios"].remove(usuario_a_ser_deletado)

        with open(JSON_FILE, 'w', encoding='utf-8') as f:
            json.dump(dados, f, indent=4, ensure_ascii=False)

        return jsonify({"mensagem": "Usuário removido com sucesso!", "dados": dados["usuarios"]}), 200

    except Exception as e:
        return jsonify({"erro": f"Erro ao processar: {str(e)}"}), 500


@app.route('/dados-usuarios/<int:id_autor>', methods=['GET'])
def autor_completo(id_autor):
    if not os.path.exists(JSON_FILE):
        return jsonify({"erro": "Arquivo não encontrado"}), 404

    with open(JSON_FILE, 'r', encoding='utf-8') as f:
        dados = json.load(f)

    autor = next((u for u in dados["usuarios"] if u.get("id") == id_autor), None)

    if not autor:
        return jsonify({"erro": "Autor não encontrado"}), 404

    return jsonify(autor)

@app.route('/dados-login', methods=['GET'])
def login_usuario():
    if not os.path.exists(JSON_FILE):
        return jsonify({"erro": "Arquivo não encontrado"}), 404

    with open(JSON_FILE, 'r', encoding='utf-8') as f:
        dados = json.load(f)

    autor = dados["usuarios"][-1]

    return jsonify(autor)


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

    novo_post = request.get_json()
    if not novo_post:
        return jsonify({"erro": "Nenhum dado fornecido"}), 400

    try:
        with open(JSON_FILE, 'r', encoding='utf-8') as f:
            dados = json.load(f)

        if dados["posts"]:
            novo_id = max(com.get("id", 0) for com in dados["posts"]) + 1
        else:
            novo_id = 1

        novo_post["id"] = novo_id

        dados["posts"].append(novo_post)

        with open(JSON_FILE, 'w', encoding='utf-8') as f:
            json.dump(dados, f, indent=4, ensure_ascii=False)

        return jsonify({"mensagem": "post adicionado com sucesso!", "dados": dados["posts"]}), 200

    except Exception as e:
        return jsonify({"erro": f"Erro ao processar: {str(e)}"}), 500


@app.route('/dados-posts/<int:id_post>', methods=['GET'])
def post_completo(id_post):
    if not os.path.exists(JSON_FILE):
        return jsonify({"erro": "Arquivo não encontrado"}), 404

    with open(JSON_FILE, 'r', encoding='utf-8') as f:
        dados = json.load(f)

    post = next((p for p in dados["posts"] if p.get("id") == id_post), None)

    if not post:
        return jsonify({"erro": "Post não encontrado"}), 404

    return jsonify(post)


@app.route('/posts-autor/<int:id_autor>', methods=['GET'])
def post_autor_id(id_autor):
    if not os.path.exists(JSON_FILE):
        return jsonify({"erro": "Arquivo não encontrado"}), 404

    with open(JSON_FILE, 'r', encoding='utf-8') as f:
        dados = json.load(f)

    post = [
        p for p in dados["posts"] 
        if str(p.get("autor_id")) == str(id_autor)
    ]

    return jsonify(post)


@app.route('/adicionar-post/<int:id_post>', methods=['POST'])
def adicionar_comentario(id_post):

    novo_comen = request.get_json()
    if not novo_comen:
        return jsonify({"erro": "Nenhum dado fornecido"}), 400

    try:
        with open(JSON_FILE, 'r', encoding='utf-8') as f:
            dados = json.load(f)

        pots_espec = next((p for p in dados["posts"] if p.get("id") == id_post), None)
        
        if "comentarios" not in pots_espec:
            pots_espec["comentarios"] = []

        
        if pots_espec["comentarios"]:
            novo_id = max(com.get("id", 0) for com in pots_espec["comentarios"]) + 1
        else:
            novo_id = 1

        novo_comen["id"] = novo_id

        pots_espec["comentarios"].append(novo_comen)

        with open(JSON_FILE, 'w', encoding='utf-8') as f:
            json.dump(dados, f, indent=4, ensure_ascii=False)

        return jsonify({"mensagem": "post adicionado com sucesso!", "dados": dados["posts"]}), 200

    except Exception as e:
        return jsonify({"erro": f"Erro ao processar: {str(e)}"}), 500


# start
if __name__ == "__main__":
    if os.environ.get("WERKZEUG_RUN_MAIN") == "true":
        diretorio_do_servidor = os.path.dirname(os.path.abspath(__file__))
        arquivo_alvo = os.path.normpath(os.path.join(diretorio_do_servidor, "..", "cliente", "index.html"))

        url_do_arquivo = Path(arquivo_alvo).as_uri()
        caminho_chrome = "C:/Program Files/Google/Chrome/Application/chrome.exe %s"

        try:
            webbrowser.get(caminho_chrome).open(url_do_arquivo)
        except Exception:
            print(Exception) 

    app.run(debug=True)