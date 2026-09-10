import 'package:flutter/material.dart';
import '../models/quiz_models.dart';

class QuizService {
  static final QuizService _instance = QuizService._internal();
  factory QuizService() => _instance;
  QuizService._internal();

  final List<QuizCategory> categories = [
    const QuizCategory(
      id: 'science',
      title: 'General Science',
      icon: Icons.biotech,
      gradient: LinearGradient(
        colors: [Color(0xFF00F5D4), Color(0xFF00BBF9)],
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
      ),
      description: 'Physics, Chemistry, Biology & Astronomy',
      questionCount: 8,
    ),
    const QuizCategory(
      id: 'coding',
      title: 'Coding & AI',
      icon: Icons.terminal,
      gradient: LinearGradient(
        colors: [Color(0xFF7B2CBF), Color(0xFF3A86FF)],
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
      ),
      description: 'Algorithms, Python, Flutter & Modern Tech',
      questionCount: 8,
    ),
    const QuizCategory(
      id: 'math',
      title: 'Quantitative Math',
      icon: Icons.calculate,
      gradient: LinearGradient(
        colors: [Color(0xFFFFBE0B), Color(0xFFFB5607)],
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
      ),
      description: 'Algebra, Geometry, Arithmetic & Logic',
      questionCount: 8,
    ),
    const QuizCategory(
      id: 'reasoning',
      title: 'Logical Reasoning',
      icon: Icons.psychology,
      gradient: LinearGradient(
        colors: [Color(0xFFFF007F), Color(0xFF7B2CBF)],
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
      ),
      description: 'Puzzles, Analogies & Critical Thinking',
      questionCount: 8,
    ),
    const QuizCategory(
      id: 'history',
      title: 'World History',
      icon: Icons.public,
      gradient: LinearGradient(
        colors: [Color(0xFF00B4D8), Color(0xFF0077B6)],
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
      ),
      description: 'Civilizations, World Wars & Inventions',
      questionCount: 8,
    ),
  ];

  final Map<String, List<Question>> _questionBank = {
    'science': [
      const Question(
        id: 'sci_1',
        category: 'Science',
        question: 'What is the powerhouse of the eukaryotic cell?',
        options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Endoplasmic Reticulum'],
        correctAnswerIndex: 1,
        explanation: 'Mitochondria generate most of the chemical energy needed to power biochemical reactions via ATP.',
      ),
      const Question(
        id: 'sci_2',
        category: 'Science',
        question: 'What subatomic particle carries a negative electric charge?',
        options: ['Proton', 'Neutron', 'Electron', 'Positron'],
        correctAnswerIndex: 2,
        explanation: 'Electrons are subatomic particles with an elementary electric charge of -1.',
      ),
      const Question(
        id: 'sci_3',
        category: 'Science',
        question: 'What gas is most abundant in Earth’s atmosphere?',
        options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Argon'],
        correctAnswerIndex: 1,
        explanation: 'Nitrogen makes up roughly 78% of Earth’s atmosphere, followed by oxygen at approximately 21%.',
      ),
      const Question(
        id: 'sci_4',
        category: 'Science',
        question: 'At what Celsius temperature does pure water freeze at standard pressure?',
        options: ['0°C', '-4°C', '32°C', '100°C'],
        correctAnswerIndex: 0,
        explanation: 'Pure water freezes at 0°C (32°F) under 1 atm of atmospheric pressure.',
      ),
      const Question(
        id: 'sci_5',
        category: 'Science',
        question: 'Which planet in our solar system has the most prominent ring system?',
        options: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'],
        correctAnswerIndex: 1,
        explanation: 'Saturn has the most extensive planetary ring system of any planet in our Solar System.',
      ),
    ],
    'coding': [
      const Question(
        id: 'cod_1',
        category: 'Coding',
        question: 'Which programming language is primarily used to build Flutter apps?',
        options: ['Kotlin', 'Swift', 'Dart', 'JavaScript'],
        correctAnswerIndex: 2,
        explanation: 'Flutter applications are written using Dart, created by Google for multi-platform client apps.',
      ),
      const Question(
        id: 'cod_2',
        category: 'Coding',
        question: 'What is the time complexity of searching a value in a balanced Binary Search Tree?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
        correctAnswerIndex: 2,
        explanation: 'In a balanced BST, half of the search space is eliminated at each step, yielding O(log n) time.',
      ),
      const Question(
        id: 'cod_3',
        category: 'Coding',
        question: 'Which HTTP status code signifies "Not Found"?',
        options: ['200', '401', '404', '500'],
        correctAnswerIndex: 2,
        explanation: 'HTTP 404 indicates that the origin server did not find a current representation for the target resource.',
      ),
      const Question(
        id: 'cod_4',
        category: 'Coding',
        question: 'In Git, which command creates a new local branch and switches to it?',
        options: ['git branch', 'git checkout -b', 'git commit', 'git merge'],
        correctAnswerIndex: 1,
        explanation: '`git checkout -b <name>` (or `git switch -c <name>`) creates a new branch and checks it out immediately.',
      ),
      const Question(
        id: 'cod_5',
        category: 'Coding',
        question: 'Which database type is Google Firebase Firestore classified as?',
        options: ['Relational SQL', 'Document NoSQL', 'Graph DB', 'Key-Value Memory Cache'],
        correctAnswerIndex: 1,
        explanation: 'Cloud Firestore is a flexible, scalable NoSQL cloud document database for mobile and web development.',
      ),
    ],
    'math': [
      const Question(
        id: 'mat_1',
        category: 'Math',
        question: 'What is the square root of 256?',
        options: ['14', '16', '18', '24'],
        correctAnswerIndex: 1,
        explanation: '16 multiplied by 16 equals 256.',
      ),
      const Question(
        id: 'mat_2',
        category: 'Math',
        question: 'If a triangle has angles measuring 50° and 60°, what is the third angle?',
        options: ['60°', '70°', '80°', '90°'],
        correctAnswerIndex: 1,
        explanation: 'The sum of internal angles in a triangle is 180°. 180 - (50 + 60) = 70°.',
      ),
      const Question(
        id: 'mat_3',
        category: 'Math',
        question: 'What is the value of 7! (7 factorial)?',
        options: ['720', '2520', '5040', '40320'],
        correctAnswerIndex: 2,
        explanation: '7! = 7 × 6 × 5 × 4 × 3 × 2 × 1 = 5040.',
      ),
      const Question(
        id: 'mat_4',
        category: 'Math',
        question: 'What is the slope of the line given by y = 4x - 7?',
        options: ['4', '-7', '7', '-4'],
        correctAnswerIndex: 0,
        explanation: 'In the slope-intercept form y = mx + b, m represents the slope (here m = 4).',
      ),
      const Question(
        id: 'mat_5',
        category: 'Math',
        question: 'What is 15% of 200?',
        options: ['20', '25', '30', '35'],
        correctAnswerIndex: 2,
        explanation: '15% of 200 = (15 / 100) × 200 = 30.',
      ),
    ],
    'reasoning': [
      const Question(
        id: 'rea_1',
        category: 'Reasoning',
        question: 'Book is to Reading as Fork is to:',
        options: ['Kitchen', 'Eating', 'Spoon', 'Cooking'],
        correctAnswerIndex: 1,
        explanation: 'A book is a tool used for reading; a fork is a tool used for eating.',
      ),
      const Question(
        id: 'rea_2',
        category: 'Reasoning',
        question: 'Find the next number in the series: 3, 6, 12, 24, 48, ...',
        options: ['72', '84', '96', '108'],
        correctAnswerIndex: 2,
        explanation: 'Each number is multiplied by 2: 48 × 2 = 96.',
      ),
      const Question(
        id: 'rea_3',
        category: 'Reasoning',
        question: 'Which word does NOT belong with the others?',
        options: ['Apple', 'Carrot', 'Banana', 'Orange'],
        correctAnswerIndex: 1,
        explanation: 'Carrot is a root vegetable, whereas the rest are fruits.',
      ),
      const Question(
        id: 'rea_4',
        category: 'Reasoning',
        question: 'If all bloops are razzies and all razzies are lazzies, all bloops are definitely:',
        options: ['Lazzies', 'Neither', 'Some are', 'Unknown'],
        correctAnswerIndex: 0,
        explanation: 'Transitive syllogism: If A ⊆ B and B ⊆ C, then A ⊆ C.',
      ),
    ],
    'history': [
      const Question(
        id: 'his_1',
        category: 'History',
        question: 'In which year did the Apollo 11 mission land humans on the Moon?',
        options: ['1965', '1969', '1972', '1975'],
        correctAnswerIndex: 1,
        explanation: 'Neil Armstrong and Buzz Aldrin landed the Apollo 11 Lunar Module on July 20, 1969.',
      ),
      const Question(
        id: 'his_2',
        category: 'History',
        question: 'Who painted the Mona Lisa?',
        options: ['Michelangelo', 'Leonardo da Vinci', 'Raphael', 'Donatello'],
        correctAnswerIndex: 1,
        explanation: 'Leonardo da Vinci painted the Mona Lisa in the early 16th century.',
      ),
      const Question(
        id: 'his_3',
        category: 'History',
        question: 'What empire constructed the ancient city of Machu Picchu?',
        options: ['Aztec', 'Maya', 'Inca', 'Roman'],
        correctAnswerIndex: 2,
        explanation: 'Machu Picchu was built by the Inca Empire in the 15th century in modern-day Peru.',
      ),
    ],
  };

  List<Question> getQuestionsForCategory(String categoryId) {
    return _questionBank[categoryId] ?? _questionBank['science']!;
  }

  List<Question> getMockTestQuestions() {
    final List<Question> combined = [];
    _questionBank.forEach((key, list) {
      combined.addAll(list.take(2));
    });
    combined.shuffle();
    return combined;
  }

  List<Question> getDrillQuestions(String category) {
    final catKey = category.toLowerCase();
    return _questionBank[catKey] ?? _questionBank['science']!;
  }
}
