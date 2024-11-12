# from flask import Flask, request, jsonify
# from flask_cors import CORS

# app = Flask(__name__)

# CORS(app, origins=["http://localhost:3000"])

# @app.route('/search', methods=['POST'])
# def search():
#     data = request.get_json()
#     country = data.get('country')
#     job_title = data.get('job_title')
#     return jsonify({"message": "Search successful", "country": country, "job_title": job_title})

# if __name__ == '__main__':
#     app.run(debug=True)



from flask import Flask, request, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
# sdfsdf
CORS(app, origins=["http://localhost:3000"])

@app.route('/search', methods=['POST'])
def search():
    data = request.get_json()
    country = data.get('country')
    job_title = data.get('job_title')
    profile_id = data.get('profile_id') 

    try:
        response = requests.get("https://randomuser.me/api/", params={
            "results": 10,  
            "nat": country,  
            "inc": "name,email,phone,location" 
        })
        response_data = response.json()

        users = response_data['results']
        if job_title:
            for user in users:
                user['job_title'] = job_title  

        return jsonify({
            "message": "Search successful",
            "users": users
        })
    
    except Exception as e:
        return jsonify({"message": "Error fetching data", "error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
