import json
import os
from flask import render_template, abort, jsonify
from app import app

def load_disease_data():
    """Load disease data from JSON file"""
    try:
        with open('data/disease_data.json', 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        app.logger.error("Disease data file not found")
        return {}
    except json.JSONDecodeError:
        app.logger.error("Invalid JSON in disease data file")
        return {}

@app.route('/')
def index():
    """Homepage with 12-month calendar"""
    months = [
        {'name': '1月', 'name_en': 'January', 'number': 1},
        {'name': '2月', 'name_en': 'February', 'number': 2},
        {'name': '3月', 'name_en': 'March', 'number': 3},
        {'name': '4月', 'name_en': 'April', 'number': 4},
        {'name': '5月', 'name_en': 'May', 'number': 5},
        {'name': '6月', 'name_en': 'June', 'number': 6},
        {'name': '7月', 'name_en': 'July', 'number': 7},
        {'name': '8月', 'name_en': 'August', 'number': 8},
        {'name': '9月', 'name_en': 'September', 'number': 9},
        {'name': '10月', 'name_en': 'October', 'number': 10},
        {'name': '11月', 'name_en': 'November', 'number': 11},
        {'name': '12月', 'name_en': 'December', 'number': 12}
    ]
    return render_template('index.html', months=months)

@app.route('/month/<month_name>')
def month_page(month_name):
    """Monthly page showing common illnesses"""
    data = load_disease_data()
    
    if month_name not in data:
        abort(404)
    
    month_data = data[month_name]
    
    # Convert month name to Japanese
    month_names_jp = {
        'January': '1月', 'February': '2月', 'March': '3月',
        'April': '4月', 'May': '5月', 'June': '6月',
        'July': '7月', 'August': '8月', 'September': '9月',
        'October': '10月', 'November': '11月', 'December': '12月'
    }
    
    month_jp = month_names_jp.get(month_name, month_name)
    
    return render_template('month.html', 
                         month_name=month_name,
                         month_jp=month_jp,
                         illnesses=month_data.get('illnesses', []))

@app.route('/disease/<month_name>/<disease_name>')
def disease_page(month_name, disease_name):
    """Disease-specific page with herbal medicine recommendations"""
    data = load_disease_data()
    
    if month_name not in data:
        abort(404)
    
    month_data = data[month_name]
    disease_data = None
    
    # Find the specific disease
    for illness in month_data.get('illnesses', []):
        if illness['name'] == disease_name:
            disease_data = illness
            break
    
    if not disease_data:
        abort(404)
    
    # Convert month name to Japanese
    month_names_jp = {
        'January': '1月', 'February': '2月', 'March': '3月',
        'April': '4月', 'May': '5月', 'June': '6月',
        'July': '7月', 'August': '8月', 'September': '9月',
        'October': '10月', 'November': '11月', 'December': '12月'
    }
    
    month_
