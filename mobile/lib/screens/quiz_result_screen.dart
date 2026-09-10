import 'package:flutter/material.dart';
import '../models/quiz_models.dart';
import '../theme/app_theme.dart';
import '../widgets/glossy_container.dart';
import '../widgets/glossy_pill_button.dart';
import '../widgets/pill_stat_badge.dart';
import 'quiz_play_screen.dart';

class QuizResultScreen extends StatelessWidget {
  final QuizResult result;
  final String categoryId;

  const QuizResultScreen({
    super.key,
    required this.result,
    required this.categoryId,
  });

  @override
  Widget build(BuildContext context) {
    final percentage = result.percentage;
    final isWin = percentage >= 60;

    return Scaffold(
      backgroundColor: AppTheme.background,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 20),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Spacer(),

              // Score Card (Glossy)
              GlossyContainer(
                width: double.infinity,
                borderRadius: BorderRadius.circular(32),
                borderColor: (isWin ? AppTheme.neonCyan : AppTheme.neonPink)
                    .withOpacity(0.5),
                hasGlow: true,
                glowColor: (isWin ? AppTheme.neonCyan : AppTheme.neonPink)
                    .withOpacity(0.3),
                padding: const EdgeInsets.all(28),
                child: Column(
                  children: [
                    // Result Emoji & Title
                    Text(
                      isWin ? '🏆' : '🎯',
                      style: const TextStyle(fontSize: 48),
                    ),
                    const SizedBox(height: 10),
                    Text(
                      isWin ? 'QUIZ COMPLETED!' : 'GOOD EFFORT!',
                      style: const TextStyle(
                        color: AppTheme.textPrimary,
                        fontSize: 22,
                        fontWeight: FontWeight.bold,
                        letterSpacing: 1,
                      ),
                    ),
                    const SizedBox(height: 6),
                    Text(
                      result.category,
                      style: const TextStyle(
                        color: AppTheme.neonCyan,
                        fontSize: 14,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    const SizedBox(height: 24),

                    // Big Percentage Circle
                    Container(
                      width: 120,
                      height: 120,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        gradient: LinearGradient(
                          colors: [
                            (isWin ? AppTheme.neonCyan : AppTheme.neonPink)
                                .withOpacity(0.2),
                            Colors.transparent,
                          ],
                        ),
                        border: Border.all(
                          color: isWin ? AppTheme.neonCyan : AppTheme.neonPink,
                          width: 3,
                        ),
                      ),
                      child: Center(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text(
                              '${percentage.round()}%',
                              style: const TextStyle(
                                color: Colors.white,
                                fontSize: 32,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            Text(
                              '${result.score}/${result.totalQuestions}',
                              style: const TextStyle(
                                color: AppTheme.textMuted,
                                fontSize: 12,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                    const SizedBox(height: 24),

                    // Rewards Pill Bar
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        PillStatBadge(
                          icon: '🪙',
                          value: '+${result.coinsEarned}',
                          label: 'Coins',
                          accentColor: AppTheme.neonGold,
                        ),
                        const SizedBox(width: 12),
                        PillStatBadge(
                          icon: '⚡',
                          value: '+${result.xpEarned}',
                          label: 'XP',
                          accentColor: AppTheme.neonBlue,
                        ),
                      ],
                    ),
                  ],
                ),
              ),

              const Spacer(),

              // Action Buttons (Pill)
              GlossyPillButton(
                text: 'Play Again',
                icon: Icons.replay,
                gradient: AppTheme.cyanGradient,
                textColor: Colors.black,
                onPressed: () {
                  Navigator.of(context).pushReplacement(
                    MaterialPageRoute(
                      builder: (context) => QuizPlayScreen(
                        categoryId: categoryId,
                        categoryTitle: result.category,
                      ),
                    ),
                  );
                },
              ),
              const SizedBox(height: 12),
              GlossyPillButton(
                text: 'Return to Home',
                icon: Icons.home,
                isSecondary: true,
                onPressed: () {
                  Navigator.of(context).popUntil((route) => route.isFirst);
                },
              ),
              const SizedBox(height: 16),
            ],
          ),
        ),
      ),
    );
  }
}
