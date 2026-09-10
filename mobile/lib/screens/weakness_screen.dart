import 'package:flutter/material.dart';
import '../services/quiz_service.dart';
import '../services/user_service.dart';
import '../theme/app_theme.dart';
import '../widgets/glossy_container.dart';
import '../widgets/glossy_pill_button.dart';
import 'quiz_play_screen.dart';

class WeaknessScreen extends StatelessWidget {
  const WeaknessScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return ListenableBuilder(
      listenable: UserService(),
      builder: (context, _) {
        final weaknesses = UserService().getWeaknessList();
        weaknesses.sort((a, b) => a.accuracy.compareTo(b.accuracy));
        final weakest = weaknesses.isNotEmpty ? weaknesses.first : null;

        return Scaffold(
          backgroundColor: Colors.transparent,
          body: SafeArea(
            child: SingleChildScrollView(
              physics: const BouncingScrollPhysics(),
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Title
                  const Text(
                    'AI Weakness Profiler',
                    style: TextStyle(
                      color: AppTheme.textPrimary,
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 4),
                  const Text(
                    'Personalized diagnostics powered by your quiz history.',
                    style: TextStyle(
                      color: AppTheme.textSecondary,
                      fontSize: 13,
                    ),
                  ),
                  const SizedBox(height: 20),

                  // Spotlight Card (Glossy)
                  if (weakest != null)
                    GlossyContainer(
                      width: double.infinity,
                      borderRadius: BorderRadius.circular(28),
                      borderColor: AppTheme.neonRed.withOpacity(0.4),
                      hasGlow: true,
                      glowColor: AppTheme.neonRed.withOpacity(0.2),
                      padding: const EdgeInsets.all(20),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              Container(
                                padding: const EdgeInsets.all(8),
                                decoration: BoxDecoration(
                                  shape: BoxShape.circle,
                                  color: AppTheme.neonRed.withOpacity(0.2),
                                ),
                                child: const Icon(
                                  Icons.warning_amber_rounded,
                                  color: AppTheme.neonRed,
                                  size: 20,
                                ),
                              ),
                              const SizedBox(width: 10),
                              const Text(
                                'TARGET AREA DETECTED',
                                style: TextStyle(
                                  color: AppTheme.neonRed,
                                  fontSize: 11,
                                  fontWeight: FontWeight.bold,
                                  letterSpacing: 1,
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 12),
                          Text(
                            'Needs Focus: ${weakest.category}',
                            style: const TextStyle(
                              color: Colors.white,
                              fontSize: 18,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(height: 6),
                          Text(
                            'Current accuracy is ${weakest.accuracy.round()}% across ${weakest.attempted} questions. Practice targeted drills to boost mastery.',
                            style: const TextStyle(
                              color: AppTheme.textSecondary,
                              fontSize: 13,
                            ),
                          ),
                          const SizedBox(height: 16),
                          GlossyPillButton(
                            text: 'Start ${weakest.category} Drill',
                            icon: Icons.flash_on,
                            gradient: const LinearGradient(
                              colors: [AppTheme.neonRed, AppTheme.neonPurple],
                            ),
                            height: 44,
                            onPressed: () {
                              final questions = QuizService()
                                  .getDrillQuestions(weakest.category);
                              Navigator.of(context).push(
                                MaterialPageRoute(
                                  builder: (context) => QuizPlayScreen(
                                    categoryId: weakest.category.toLowerCase(),
                                    categoryTitle: '${weakest.category} Drill',
                                    customQuestions: questions,
                                  ),
                                ),
                              );
                            },
                          ),
                        ],
                      ),
                    ),

                  const SizedBox(height: 24),
                  const Text(
                    'Subject Mastery Breakdown',
                    style: TextStyle(
                      color: AppTheme.textPrimary,
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 12),

                  // Breakdown list
                  ListView.separated(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    itemCount: weaknesses.length,
                    separatorBuilder: (_, __) => const SizedBox(height: 10),
                    itemBuilder: (context, index) {
                      final item = weaknesses[index];
                      final isLow = item.accuracy < 60;
                      final barColor = isLow ? AppTheme.neonRed : AppTheme.neonGreen;

                      return GlossyContainer(
                        borderRadius: BorderRadius.circular(20),
                        padding: const EdgeInsets.symmetric(
                            horizontal: 16, vertical: 14),
                        child: Column(
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Row(
                                  children: [
                                    Icon(
                                      isLow
                                          ? Icons.trending_down
                                          : Icons.trending_up,
                                      color: barColor,
                                      size: 18,
                                    ),
                                    const SizedBox(width: 8),
                                    Text(
                                      item.category,
                                      style: const TextStyle(
                                        color: AppTheme.textPrimary,
                                        fontWeight: FontWeight.bold,
                                        fontSize: 15,
                                      ),
                                    ),
                                  ],
                                ),
                                Container(
                                  padding: const EdgeInsets.symmetric(
                                      horizontal: 10, vertical: 4),
                                  decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(999),
                                    color: barColor.withOpacity(0.15),
                                    border: Border.all(
                                      color: barColor.withOpacity(0.4),
                                    ),
                                  ),
                                  child: Text(
                                    '${item.accuracy.round()}%',
                                    style: TextStyle(
                                      color: barColor,
                                      fontWeight: FontWeight.bold,
                                      fontSize: 12,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 10),
                            // Progress bar
                            ClipRRect(
                              borderRadius: BorderRadius.circular(999),
                              child: LinearProgressIndicator(
                                value: item.accuracy / 100.0,
                                minHeight: 6,
                                backgroundColor: Colors.white.withOpacity(0.06),
                                valueColor: AlwaysStoppedAnimation<Color>(barColor),
                              ),
                            ),
                          ],
                        ),
                      );
                    },
                  ),
                  const SizedBox(height: 90), // Spacing for bottom dock
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}
