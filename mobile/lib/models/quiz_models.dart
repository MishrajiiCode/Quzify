import 'package:flutter/material.dart';

class Question {
  final String id;
  final String question;
  final List<String> options;
  final int correctAnswerIndex;
  final String explanation;
  final String category;
  final String difficulty;

  const Question({
    required this.id,
    required this.question,
    required this.options,
    required this.correctAnswerIndex,
    required this.explanation,
    required this.category,
    this.difficulty = 'Medium',
  });
}

class QuizCategory {
  final String id;
  final String title;
  final IconData icon;
  final LinearGradient gradient;
  final String description;
  final int questionCount;

  const QuizCategory({
    required this.id,
    required this.title,
    required this.icon,
    required this.gradient,
    required this.description,
    required this.questionCount,
  });
}

class QuizResult {
  final int score;
  final int totalQuestions;
  final String category;
  final int xpEarned;
  final int coinsEarned;
  final DateTime timestamp;

  double get percentage =>
      totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;

  const QuizResult({
    required this.score,
    required this.totalQuestions,
    required this.category,
    required this.xpEarned,
    required this.coinsEarned,
    required this.timestamp,
  });
}

class StoreItem {
  final String id;
  final String name;
  final String type; // 'avatar', 'badge', 'booster'
  final String icon;
  final int cost;
  final String description;
  bool isPurchased;

  StoreItem({
    required this.id,
    required this.name,
    required this.type,
    required this.icon,
    required this.cost,
    required this.description,
    this.isPurchased = false,
  });
}

class WeaknessData {
  final String category;
  final int attempted;
  final int correct;

  double get accuracy => attempted > 0 ? (correct / attempted) * 100 : 0.0;

  const WeaknessData({
    required this.category,
    required this.attempted,
    required this.correct,
  });
}
