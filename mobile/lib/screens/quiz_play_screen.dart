import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../models/quiz_models.dart';
import '../services/quiz_service.dart';
import '../services/user_service.dart';
import '../theme/app_theme.dart';
import '../widgets/glossy_container.dart';
import '../widgets/glossy_pill_button.dart';
import 'quiz_result_screen.dart';

class QuizPlayScreen extends StatefulWidget {
  final String categoryId;
  final String categoryTitle;
  final List<Question>? customQuestions;

  const QuizPlayScreen({
    super.key,
    required this.categoryId,
    required this.categoryTitle,
    this.customQuestions,
  });

  @override
  State<QuizPlayScreen> createState() => _QuizPlayScreenState();
}

class _QuizPlayScreenState extends State<QuizPlayScreen>
    with SingleTickerProviderStateMixin {
  late List<Question> _questions;
  int _currentIndex = 0;
  int _score = 0;
  int _timeLeft = 20;
  Timer? _timer;

  int? _selectedOptionIndex;
  bool _isAnswered = false;
  Set<int> _eliminatedIndices = {};
  bool _used5050 = false;
  bool _usedHint = false;
  bool _usedSkip = false;
  String? _hintText;

  @override
  void initState() {
    super.initState();
    if (widget.customQuestions != null && widget.customQuestions!.isNotEmpty) {
      _questions = List.from(widget.customQuestions!);
    } else {
      _questions = QuizService().getQuestionsForCategory(widget.categoryId);
    }
    _startTimer();
  }

  void _startTimer() {
    _timeLeft = 20;
    _timer?.cancel();
    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (!mounted) return;
      if (_timeLeft > 0) {
        setState(() {
          _timeLeft--;
        });
      } else {
        _timer?.cancel();
        _onTimeUp();
      }
    });
  }

  void _onTimeUp() {
    if (_isAnswered) return;
    HapticFeedback.heavyImpact();
    setState(() {
      _isAnswered = true;
      _selectedOptionIndex = -1; // timed out
    });
  }

  void _selectAnswer(int index) {
    if (_isAnswered) return;
    _timer?.cancel();
    final currentQ = _questions[_currentIndex];
    final isCorrect = index == currentQ.correctAnswerIndex;

    if (isCorrect) {
      HapticFeedback.lightImpact();
      _score++;
    } else {
      HapticFeedback.mediumImpact();
    }

    setState(() {
      _selectedOptionIndex = index;
      _isAnswered = true;
    });
  }

  void _use5050() {
    if (_used5050 || _isAnswered) return;
    HapticFeedback.selectionClick();
    final currentQ = _questions[_currentIndex];
    final wrongIndices = <int>[];

    for (int i = 0; i < currentQ.options.length; i++) {
      if (i != currentQ.correctAnswerIndex) {
        wrongIndices.add(i);
      }
    }
    wrongIndices.shuffle();

    setState(() {
      _used5050 = true;
      _eliminatedIndices = wrongIndices.take(2).toSet();
    });
  }

  void _useHint() {
    if (_usedHint || _isAnswered) return;
    HapticFeedback.selectionClick();
    final currentQ = _questions[_currentIndex];
    setState(() {
      _usedHint = true;
      _hintText = "💡 Hint: ${currentQ.explanation}";
    });
  }

  void _useSkip() {
    if (_usedSkip || _isAnswered) return;
    HapticFeedback.selectionClick();
    _timer?.cancel();
    setState(() {
      _usedSkip = true;
    });
    _nextQuestion();
  }

  void _nextQuestion() {
    if (_currentIndex < _questions.length - 1) {
      setState(() {
        _currentIndex++;
        _selectedOptionIndex = null;
        _isAnswered = false;
        _eliminatedIndices.clear();
        _hintText = null;
      });
      _startTimer();
    } else {
      _finishQuiz();
    }
  }

  void _finishQuiz() {
    _timer?.cancel();
    final earnedXp = _score * 25;
    final earnedCoins = _score * 10;

    UserService().addReward(
      score: _score,
      total: _questions.length,
      category: widget.categoryId,
    );

    final result = QuizResult(
      score: _score,
      totalQuestions: _questions.length,
      category: widget.categoryTitle,
      xpEarned: earnedXp,
      coinsEarned: earnedCoins,
      timestamp: DateTime.now(),
    );

    Navigator.of(context).pushReplacement(
      MaterialPageRoute(
        builder: (context) => QuizResultScreen(
          result: result,
          categoryId: widget.categoryId,
        ),
      ),
    );
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final currentQ = _questions[_currentIndex];

    return Scaffold(
      backgroundColor: AppTheme.background,
      appBar: AppBar(
        title: Text(widget.categoryTitle),
        actions: [
          Container(
            margin: const EdgeInsets.only(right: 16),
            child: Center(
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(999),
                  border: Border.all(color: AppTheme.neonCyan.withOpacity(0.4)),
                  color: AppTheme.neonCyan.withOpacity(0.1),
                ),
                child: Text(
                  '${_currentIndex + 1} / ${_questions.length}',
                  style: const TextStyle(
                    color: AppTheme.neonCyan,
                    fontWeight: FontWeight.bold,
                    fontSize: 13,
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Column(
            children: [
              const SizedBox(height: 12),

              // Countdown Timer Ring & Score Header
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  // Timer Capsule
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(999),
                      color: _timeLeft <= 5
                          ? AppTheme.neonRed.withOpacity(0.2)
                          : Colors.white.withOpacity(0.06),
                      border: Border.all(
                        color: _timeLeft <= 5
                            ? AppTheme.neonRed
                            : AppTheme.neonCyan.withOpacity(0.4),
                      ),
                    ),
                    child: Row(
                      children: [
                        Icon(
                          Icons.timer_outlined,
                          size: 16,
                          color: _timeLeft <= 5
                              ? AppTheme.neonRed
                              : AppTheme.neonCyan,
                        ),
                        const SizedBox(width: 6),
                        Text(
                          '${_timeLeft}s',
                          style: TextStyle(
                            color: _timeLeft <= 5
                                ? AppTheme.neonRed
                                : AppTheme.textPrimary,
                            fontWeight: FontWeight.bold,
                            fontSize: 14,
                          ),
                        ),
                      ],
                    ),
                  ),

                  // Score Capsule
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(999),
                      color: Colors.white.withOpacity(0.06),
                      border: Border.all(color: AppTheme.glassBorder),
                    ),
                    child: Row(
                      children: [
                        const Icon(Icons.stars, size: 16, color: AppTheme.neonGold),
                        const SizedBox(width: 6),
                        Text(
                          'Score: $_score',
                          style: const TextStyle(
                            color: AppTheme.neonGold,
                            fontWeight: FontWeight.bold,
                            fontSize: 14,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 20),

              // Question Card (Glossy)
              GlossyContainer(
                width: double.infinity,
                borderRadius: BorderRadius.circular(28),
                borderColor: AppTheme.neonPurple.withOpacity(0.4),
                hasGlow: true,
                glowColor: AppTheme.neonPurple.withOpacity(0.25),
                padding: const EdgeInsets.all(22),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(999),
                        color: AppTheme.neonCyan.withOpacity(0.15),
                      ),
                      child: Text(
                        currentQ.category.toUpperCase(),
                        style: const TextStyle(
                          color: AppTheme.neonCyan,
                          fontSize: 10,
                          fontWeight: FontWeight.bold,
                          letterSpacing: 1,
                        ),
                      ),
                    ),
                    const SizedBox(height: 12),
                    Text(
                      currentQ.question,
                      style: const TextStyle(
                        color: AppTheme.textPrimary,
                        fontSize: 18,
                        fontWeight: FontWeight.w600,
                        height: 1.4,
                      ),
                    ),
                  ],
                ),
              ),

              if (_hintText != null) ...[
                const SizedBox(height: 12),
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(16),
                    color: AppTheme.neonGold.withOpacity(0.12),
                    border: Border.all(color: AppTheme.neonGold.withOpacity(0.4)),
                  ),
                  child: Text(
                    _hintText!,
                    style: const TextStyle(
                      color: AppTheme.neonGold,
                      fontSize: 12,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ),
              ],

              const SizedBox(height: 20),

              // 4 Pill-Shaped Options
              Expanded(
                child: ListView.separated(
                  physics: const BouncingScrollPhysics(),
                  itemCount: currentQ.options.length,
                  separatorBuilder: (_, __) => const SizedBox(height: 12),
                  itemBuilder: (context, index) {
                    final isEliminated = _eliminatedIndices.contains(index);
                    if (isEliminated) {
                      return const SizedBox.shrink();
                    }

                    final isSelected = _selectedOptionIndex == index;
                    final isCorrect = index == currentQ.correctAnswerIndex;

                    Color pillBorderColor = AppTheme.glassBorder;
                    List<Color> gradientColors = [
                      Colors.white.withOpacity(0.08),
                      Colors.white.withOpacity(0.02),
                    ];
                    Color textColor = AppTheme.textPrimary;
                    IconData? statusIcon;

                    if (_isAnswered) {
                      if (isCorrect) {
                        pillBorderColor = AppTheme.neonGreen;
                        gradientColors = [
                          AppTheme.neonGreen.withOpacity(0.3),
                          AppTheme.neonGreen.withOpacity(0.1),
                        ];
                        statusIcon = Icons.check_circle;
                      } else if (isSelected) {
                        pillBorderColor = AppTheme.neonRed;
                        gradientColors = [
                          AppTheme.neonRed.withOpacity(0.3),
                          AppTheme.neonRed.withOpacity(0.1),
                        ];
                        statusIcon = Icons.cancel;
                      }
                    }

                    return GestureDetector(
                      onTap: _isAnswered ? null : () => _selectAnswer(index),
                      child: Container(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 20, vertical: 16),
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(999),
                          border: Border.all(color: pillBorderColor, width: 1.4),
                          gradient: LinearGradient(
                            colors: gradientColors,
                            begin: Alignment.topLeft,
                            end: Alignment.bottomRight,
                          ),
                          boxShadow: _isAnswered && (isCorrect || isSelected)
                              ? [
                                  BoxShadow(
                                    color: (isCorrect
                                            ? AppTheme.neonGreen
                                            : AppTheme.neonRed)
                                        .withOpacity(0.3),
                                    blurRadius: 14,
                                  ),
                                ]
                              : null,
                        ),
                        child: Row(
                          children: [
                            Container(
                              width: 30,
                              height: 30,
                              decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                color: Colors.white.withOpacity(0.08),
                              ),
                              child: Center(
                                child: Text(
                                  String.fromCharCode(65 + index),
                                  style: TextStyle(
                                    color: textColor,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ),
                            ),
                            const SizedBox(width: 14),
                            Expanded(
                              child: Text(
                                currentQ.options[index],
                                style: TextStyle(
                                  color: textColor,
                                  fontSize: 15,
                                  fontWeight: FontWeight.w500,
                                ),
                              ),
                            ),
                            if (statusIcon != null)
                              Icon(
                                statusIcon,
                                color: isCorrect
                                    ? AppTheme.neonGreen
                                    : AppTheme.neonRed,
                                size: 22,
                              ),
                          ],
                        ),
                      ),
                    );
                  },
                ),
              ),

              // Lifelines Bar (Pill Container)
              if (!_isAnswered)
                Container(
                  margin: const EdgeInsets.only(bottom: 16),
                  padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(999),
                    color: Colors.white.withOpacity(0.06),
                    border: Border.all(color: AppTheme.glassBorder),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      _buildLifelineItem(
                        icon: Icons.filter_2,
                        label: '50-50',
                        isUsed: _used5050,
                        onTap: _use5050,
                      ),
                      _buildLifelineItem(
                        icon: Icons.lightbulb_outline,
                        label: 'Hint',
                        isUsed: _usedHint,
                        onTap: _useHint,
                      ),
                      _buildLifelineItem(
                        icon: Icons.skip_next,
                        label: 'Skip',
                        isUsed: _usedSkip,
                        onTap: _useSkip,
                      ),
                    ],
                  ),
                ),

              // Continue / Next Button
              if (_isAnswered)
                Padding(
                  padding: const EdgeInsets.only(bottom: 16),
                  child: GlossyPillButton(
                    text: _currentIndex < _questions.length - 1
                        ? 'Next Question'
                        : 'See Results',
                    icon: Icons.arrow_forward,
                    gradient: AppTheme.cyanGradient,
                    textColor: Colors.black,
                    onPressed: _nextQuestion,
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildLifelineItem({
    required IconData icon,
    required String label,
    required bool isUsed,
    required VoidCallback onTap,
  }) {
    return GestureDetector(
      onTap: isUsed ? null : onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(999),
          color: isUsed
              ? Colors.white.withOpacity(0.02)
              : AppTheme.neonCyan.withOpacity(0.12),
          border: Border.all(
            color: isUsed
                ? Colors.transparent
                : AppTheme.neonCyan.withOpacity(0.4),
          ),
        ),
        child: Row(
          children: [
            Icon(
              icon,
              size: 16,
              color: isUsed ? AppTheme.textMuted : AppTheme.neonCyan,
            ),
            const SizedBox(width: 6),
            Text(
              label,
              style: TextStyle(
                color: isUsed ? AppTheme.textMuted : AppTheme.textPrimary,
                fontSize: 12,
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
