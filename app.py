import random
from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

total_probability = 4
favourable = {}

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/landing')
def landing():
    players = []
    for key in request.args:
        if key.startswith('player'):
            players.append(request.args[key])
    # print(players)
    for i in players:
        favourable[i] = 0
    # print(favourable)
    return render_template('landing.html', players=players)


@app.route('/killed', methods=['POST'])
def select_player():
    # Get the player's name from the frontend (JavaScript)
    data = request.get_json()
    killed = data.get('killed')
    favourable[killed] += 1
    prob = favourable[killed]/total_probability

    result =  random.choices(['kill', 'not_kill'], weights=[prob, 1 - prob])[0]                                                            
    print(killed,favourable[killed],prob,result)
    

    # Return a success message to the frontend
    return jsonify({'message':result})

if __name__ == '__main__':
    app.run(debug=True)
