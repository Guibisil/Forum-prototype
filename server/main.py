from flask import Flask,  request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
JSON_FILE = 'banco/teste.json'
CORS(app)

@app.route('/dados', methods=['GET'])
def obter_dados():
    if not os.path.exists(JSON_FILE):
        return jsonify({"erro": "Arquivo não encontrado"}), 404
        
    with open(JSON_FILE, 'r', encoding='utf-8') as f:
        dados = json.load(f)
    return jsonify(dados)


@app.route('/adicionar-item', methods=['POST'])
def adicionar_item():

    json_teste = request.get_json()
    if not json_teste:
        return jsonify({"erro": "Nenhum dado fornecido"}), 400

    try:
        if os.path.exists(JSON_FILE):
            with open(JSON_FILE, 'r', encoding='utf-8') as f:
                dados = json.load(f)
        else:
            dados = {"novo_teste": []}

        dados["novo_teste"].append(json_teste)

        with open(JSON_FILE, 'w', encoding='utf-8') as f:
            json.dump(dados, f, indent=4, ensure_ascii=False)

        return jsonify({"mensagem": "Item adicionado com sucesso!", "dados": dados}), 200

    except Exception as e:
        return jsonify({"erro": f"Erro ao processar: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)