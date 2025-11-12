from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import json
import os
from datetime import datetime
import re

app = Flask(__name__)
CORS(app)

# Используйте ключ из Dart кода, который работает!
GEMINI_API_KEY = "YOUR_API_KEY_HERE"
genai.configure(api_key=GEMINI_API_KEY)

working_model = None

# Обновлённый список моделей без префикса models/
MODELS_TO_TRY = [
    'gemini-2.0-flash-exp',
    'gemini-1.5-flash',
    'gemini-1.5-pro-latest',
    'gemini-1.5-pro',
    'gemini-pro',
]

def get_working_model():
    """Находит рабочую модель Gemini"""
    global working_model
    
    if working_model is not None:
        return working_model
    
    for model_name in MODELS_TO_TRY:
        try:
            print(f'🔄 Попытка использовать модель: {model_name}')
            test_model = genai.GenerativeModel(model_name)
            
            # Тестовый запрос
            response = test_model.generate_content("Привет")
            if response.text:
                print(f'✅ Модель {model_name} работает!')
                working_model = test_model
                return working_model
                
        except Exception as e:
            error_msg = str(e)
            # Не показываем полную ошибку для 429 (quota)
            if '429' in error_msg or 'quota' in error_msg.lower():
                print(f'❌ Модель {model_name}: квота исчерпана, пробуем следующую...')
            else:
                print(f'❌ Модель {model_name} не работает: {error_msg[:100]}')
            continue
    
    raise Exception(f"Не удалось найти рабочую модель. Попробованные модели: {', '.join(MODELS_TO_TRY)}")

QUIZZES_FILE = 'quizzes.json'

THEME_STYLES = {
    'математика': {'color': '#3b82f6', 'icon': '🔢', 'pattern': 'numbers'},
    'логика': {'color': '#fbbf24', 'icon': '🧩', 'pattern': 'puzzle'},
    'история': {'color': '#8b5cf6', 'icon': '📜', 'pattern': 'ancient'},
    'география': {'color': '#10b981', 'icon': '🌍', 'pattern': 'map'},
    'физика': {'color': '#ef4444', 'icon': '⚡', 'pattern': 'science'},
    'химия': {'color': '#ec4899', 'icon': '🧪', 'pattern': 'molecules'},
    'биология': {'color': '#22c55e', 'icon': '🧬', 'pattern': 'nature'},
    'литература': {'color': '#f97316', 'icon': '📚', 'pattern': 'books'},
    'английский': {'color': '#06b6d4', 'icon': '🇬🇧', 'pattern': 'language'},
    'программирование': {'color': '#6366f1', 'icon': '💻', 'pattern': 'code'},
    'искусство': {'color': '#d946ef', 'icon': '🎨', 'pattern': 'art'},
    'музыка': {'color': '#84cc16', 'icon': '🎵', 'pattern': 'music'},
}

def detect_theme_category(topic):
    """Определяет категорию темы на основе ключевых слов"""
    topic_lower = topic.lower()
    
    for category, style in THEME_STYLES.items():
        if category in topic_lower:
            return category, style
    
    math_keywords = ['число', 'уравнение', 'формула', 'вычисление', 'алгебра', 'геометрия']
    logic_keywords = ['загадка', 'головоломка', 'мышление', 'рассуждение']
    science_keywords = ['эксперимент', 'закон', 'теория', 'энергия']
    
    if any(kw in topic_lower for kw in math_keywords):
        return 'математика', THEME_STYLES['математика']
    elif any(kw in topic_lower for kw in logic_keywords):
        return 'логика', THEME_STYLES['логика']
    elif any(kw in topic_lower for kw in science_keywords):
        return 'физика', THEME_STYLES['физика']
    
    return 'общая', {'color': '#6b7280', 'icon': '📝', 'pattern': 'default'}

def load_quizzes():
    """Загрузка сохраненных викторин"""
    if os.path.exists(QUIZZES_FILE):
        try:
            with open(QUIZZES_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        except:
            return []
    return []

def save_quiz(quiz_data):
    """Сохранение викторины"""
    quizzes = load_quizzes()
    quizzes.append(quiz_data)
    with open(QUIZZES_FILE, 'w', encoding='utf-8') as f:
        json.dump(quizzes, f, ensure_ascii=False, indent=2)

@app.route('/api/generate-quiz', methods=['POST'])
def generate_quiz():
    """Генерация викторины с помощью Gemini AI"""
    try:
        data = request.json
        topic = data.get('topic')
        num_questions = data.get('numQuestions', 5)
        
        if not topic:
            return jsonify({'error': 'Topic is required'}), 400
        
        category, style = detect_theme_category(topic)
        
        # Получаем рабочую модель
        model = get_working_model()
        
        prompt = f"""Создай викторину на тему "{topic}" с {num_questions} вопросами.

Требования:
- Каждый вопрос должен иметь ровно 4 варианта ответа
- Только один вариант должен быть правильным
- Вопросы должны быть на русском языке
- Вопросы должны быть интересными и образовательными

Формат ответа СТРОГО JSON (без markdown, без дополнительного текста):
{{
  "questions": [
    {{
      "question": "Текст вопроса?",
      "options": ["Вариант 1", "Вариант 2", "Вариант 3", "Вариант 4"],
      "correct": 0
    }}
  ]
}}

где "correct" - это индекс правильного ответа (0-3).
Верни ТОЛЬКО валидный JSON, ничего больше."""

        # Генерация викторины
        response = model.generate_content(prompt)
        response_text = response.text.strip()
        
        # Убираем markdown если есть
        response_text = response_text.replace('```json', '').replace('```', '').strip()
        
        # Ищем JSON в ответе
        json_match = re.search(r'\{.*\}', response_text, re.DOTALL)
        if json_match:
            quiz_data = json.loads(json_match.group())
        else:
            quiz_data = json.loads(response_text)
        
        # Проверяем что questions существует
        if 'questions' not in quiz_data or not quiz_data['questions']:
            return jsonify({'error': 'Invalid quiz format from AI'}), 500
        
        quiz_result = {
            'id': datetime.now().strftime('%Y%m%d%H%M%S%f'),
            'topic': topic,
            'category': category,
            'style': style,
            'numQuestions': num_questions,
            'questions': quiz_data['questions'],
            'createdAt': datetime.now().isoformat()
        }
        
        return jsonify(quiz_result)
        
    except json.JSONDecodeError as e:
        print(f"JSON Error: {str(e)}")
        print(f"Response was: {response_text if 'response_text' in locals() else 'No response'}")
        return jsonify({'error': 'Invalid JSON from AI. Please try again.'}), 500
    except Exception as e:
        print(f"Error: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/api/check-quiz', methods=['POST'])
def check_quiz():
    """Проверка ответов и сохранение результатов"""
    try:
        data = request.json
        quiz_id = data.get('id')
        topic = data.get('topic')
        category = data.get('category')
        questions = data.get('questions')
        user_answers = data.get('answers')
        
        correct_count = 0
        total = len(questions)
        results = []
        
        for i, (question, user_answer) in enumerate(zip(questions, user_answers)):
            is_correct = user_answer == question['correct']
            if is_correct:
                correct_count += 1
            
            results.append({
                'question': question['question'],
                'userAnswer': user_answer,
                'correctAnswer': question['correct'],
                'isCorrect': is_correct,
                'options': question['options']
            })
        
        quiz_result = {
            'id': quiz_id,
            'topic': topic,
            'category': category,
            'totalQuestions': total,
            'correctAnswers': correct_count,
            'incorrectAnswers': total - correct_count,
            'score': round((correct_count / total) * 100, 1),
            'completedAt': datetime.now().isoformat(),
            'results': results
        }
        
        save_quiz(quiz_result)
        
        return jsonify(quiz_result)
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/quizzes', methods=['GET'])
def get_quizzes():
    """Получение всех сохраненных викторин"""
    try:
        quizzes = load_quizzes()
        return jsonify(quizzes)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/quiz/<quiz_id>', methods=['GET'])
def get_quiz(quiz_id):
    """Получение конкретной викторины по ID"""
    try:
        quizzes = load_quizzes()
        quiz = next((q for q in quizzes if q['id'] == quiz_id), None)
        if quiz:
            return jsonify(quiz)
        return jsonify({'error': 'Quiz not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    print("🚀 Запуск сервера QuizGrad...")
    print(f"🔑 Используется API ключ: {GEMINI_API_KEY[:20]}...")
    print("🔍 Поиск рабочей модели Gemini...")
    try:
        get_working_model()
        print("✅ Рабочая модель найдена и готова к использованию!")
    except Exception as e:
        print(f"⚠️ Предупреждение: {e}")
        print("Модель будет найдена при первом запросе")
    
    app.run(debug=True, port=5000)