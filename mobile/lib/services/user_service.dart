import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/quiz_models.dart';

class UserService extends ChangeNotifier {
  static final UserService _instance = UserService._internal();
  factory UserService() => _instance;
  UserService._internal();

  int _coins = 250;
  int _xp = 450;
  int _streak = 4;
  String _userName = "Learner";
  String _avatar = "⚡";
  Set<String> _purchasedItems = {'avatar_1', 'theme_dark'};

  // Category -> {attempted: int, correct: int}
  Map<String, Map<String, int>> _categoryStats = {
    'science': {'attempted': 15, 'correct': 12},
    'coding': {'attempted': 20, 'correct': 18},
    'math': {'attempted': 12, 'correct': 6},
    'reasoning': {'attempted': 14, 'correct': 10},
    'history': {'attempted': 10, 'correct': 5},
  };

  int get coins => _coins;
  int get xp => _xp;
  int get streak => _streak;
  int get level => (_xp ~/ 200) + 1;
  int get currentLevelXp => _xp % 200;
  double get levelProgress => currentLevelXp / 200.0;
  String get userName => _userName;
  String get avatar => _avatar;
  Set<String> get purchasedItems => _purchasedItems;
  Map<String, Map<String, int>> get categoryStats => _categoryStats;

  Future<void> init() async {
    final prefs = await SharedPreferences.getInstance();
    _coins = prefs.getInt('quiz_coins') ?? 250;
    _xp = prefs.getInt('quiz_xp') ?? 450;
    _streak = prefs.getInt('quiz_streak') ?? 4;
    _userName = prefs.getString('quiz_username') ?? "Learner";
    _avatar = prefs.getString('quiz_avatar') ?? "⚡";

    final items = prefs.getStringList('purchased_items');
    if (items != null) {
      _purchasedItems = items.toSet();
    }

    final statsJson = prefs.getString('category_stats');
    if (statsJson != null) {
      try {
        final decoded = json.decode(statsJson) as Map<String, dynamic>;
        _categoryStats = decoded.map((key, value) => MapEntry(
            key,
            (value as Map<String, dynamic>)
                .map((k, v) => MapEntry(k, v as int))));
      } catch (_) {}
    }
    notifyListeners();
  }

  Future<void> _save() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setInt('quiz_coins', _coins);
    await prefs.setInt('quiz_xp', _xp);
    await prefs.setInt('quiz_streak', _streak);
    await prefs.setString('quiz_username', _userName);
    await prefs.setString('quiz_avatar', _avatar);
    await prefs.setStringList('purchased_items', _purchasedItems.toList());
    await prefs.setString('category_stats', json.encode(_categoryStats));
  }

  Future<void> addReward({
    required int score,
    required int total,
    required String category,
  }) async {
    final earnedCoins = score * 10;
    final earnedXp = score * 25;

    _coins += earnedCoins;
    _xp += earnedXp;

    final cat = category.toLowerCase();
    final stats = _categoryStats[cat] ?? {'attempted': 0, 'correct': 0};
    stats['attempted'] = (stats['attempted'] ?? 0) + total;
    stats['correct'] = (stats['correct'] ?? 0) + score;
    _categoryStats[cat] = stats;

    await _save();
    notifyListeners();
  }

  bool canAfford(int cost) => _coins >= cost;

  Future<bool> purchaseItem(StoreItem item) async {
    if (!canAfford(item.cost)) return false;

    _coins -= item.cost;
    _purchasedItems.add(item.id);
    if (item.type == 'avatar') {
      _avatar = item.icon;
    }
    await _save();
    notifyListeners();
    return true;
  }

  List<WeaknessData> getWeaknessList() {
    return _categoryStats.entries.map((e) {
      final name = e.key;
      final att = e.value['attempted'] ?? 0;
      final cor = e.value['correct'] ?? 0;
      return WeaknessData(
        category: name[0].toUpperCase() + name.substring(1),
        attempted: att,
        correct: cor,
      );
    }).toList();
  }
}
