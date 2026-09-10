import 'package:flutter/material.dart';
import '../services/quiz_service.dart';
import '../services/user_service.dart';
import '../theme/app_theme.dart';
import '../widgets/glossy_container.dart';
import '../widgets/glossy_pill_button.dart';
import '../widgets/pill_stat_badge.dart';
import 'quiz_play_screen.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return ListenableBuilder(
      listenable: UserService(),
      builder: (context, _) {
        final userService = UserService();
        final categories = QuizService().categories;

        return Scaffold(
          backgroundColor: Colors.transparent,
          body: SafeArea(
            child: SingleChildScrollView(
              physics: const BouncingScrollPhysics(),
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Top Stat Bar (Pill Chips)
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      // User & Level Pill
                      Container(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 10, vertical: 6),
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(999),
                          color: Colors.white.withOpacity(0.08),
                          border: Border.all(color: AppTheme.glassBorder),
                        ),
                        child: Row(
                          children: [
                            Text(userService.avatar,
                                style: const TextStyle(fontSize: 18)),
                            const SizedBox(width: 8),
                            Text(
                              'Lvl ${userService.level}',
                              style: const TextStyle(
                                color: AppTheme.neonCyan,
                                fontWeight: FontWeight.bold,
                                fontSize: 13,
                              ),
                            ),
                          ],
                        ),
                      ),

                      // Stats Pills
                      Row(
                        children: [
                          PillStatBadge(
                            icon: '🔥',
                            value: '${userService.streak}',
                            label: 'Streak',
                            accentColor: AppTheme.neonGold,
                          ),
                          const SizedBox(width: 8),
                          PillStatBadge(
                            icon: '🪙',
                            value: '${userService.coins}',
                            accentColor: AppTheme.neonGold,
                          ),
                        ],
                      ),
                    ],
                  ),
                  const SizedBox(height: 20),

                  // Hero Banner Card (Glossy with Neon Glow)
                  GlossyContainer(
                    width: double.infinity,
                    borderRadius: BorderRadius.circular(32),
                    borderColor: AppTheme.neonCyan.withOpacity(0.4),
                    hasGlow: true,
                    glowColor: AppTheme.neonCyan.withOpacity(0.25),
                    padding: const EdgeInsets.all(24),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Container(
                              padding: const EdgeInsets.symmetric(
                                  horizontal: 12, vertical: 4),
                              decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(999),
                                color: AppTheme.neonPurple.withOpacity(0.3),
                                border: Border.all(
                                  color: AppTheme.neonPurple.withOpacity(0.6),
                                ),
                              ),
                              child: const Text(
                                'DAILY LEARNING ARENA',
                                style: TextStyle(
                                  color: AppTheme.neonCyan,
                                  fontSize: 10,
                                  fontWeight: FontWeight.bold,
                                  letterSpacing: 1.2,
                                ),
                              ),
                            ),
                            Text(
                              '${(userService.levelProgress * 100).round()}% to Lvl ${userService.level + 1}',
                              style: const TextStyle(
                                color: AppTheme.textMuted,
                                fontSize: 11,
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 12),
                        const Text(
                          'Test Your Knowledge\n& Earn Big XP',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 22,
                            fontWeight: FontWeight.bold,
                            height: 1.25,
                          ),
                        ),
                        const SizedBox(height: 10),
                        ClipRRect(
                          borderRadius: BorderRadius.circular(999),
                          child: LinearProgressIndicator(
                            value: userService.levelProgress,
                            minHeight: 6,
                            backgroundColor: Colors.white.withOpacity(0.08),
                            valueColor: const AlwaysStoppedAnimation<Color>(
                                AppTheme.neonCyan),
                          ),
                        ),
                        const SizedBox(height: 20),
                        GlossyPillButton(
                          text: 'Play Quick Quiz',
                          icon: Icons.play_arrow_rounded,
                          gradient: AppTheme.cyanGradient,
                          textColor: Colors.black,
                          onPressed: () {
                            Navigator.of(context).push(
                              MaterialPageRoute(
                                builder: (context) => const QuizPlayScreen(
                                  categoryId: 'science',
                                  categoryTitle: 'Quick Arena Challenge',
                                ),
                              ),
                            );
                          },
                        ),
                      ],
                    ),
                  ),

                  const SizedBox(height: 28),

                  // Category Header
                  const Text(
                    'Explore Subjects',
                    style: TextStyle(
                      color: AppTheme.textPrimary,
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                      letterSpacing: 0.5,
                    ),
                  ),
                  const SizedBox(height: 14),

                  // Categories List (Pill & Glossy Cards)
                  ListView.separated(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    itemCount: categories.length,
                    separatorBuilder: (_, __) => const SizedBox(height: 12),
                    itemBuilder: (context, index) {
                      final cat = categories[index];
                      return GlossyContainer(
                        borderRadius: BorderRadius.circular(24),
                        padding: const EdgeInsets.all(16),
                        onTap: () {
                          Navigator.of(context).push(
                            MaterialPageRoute(
                              builder: (context) => QuizPlayScreen(
                                categoryId: cat.id,
                                categoryTitle: cat.title,
                              ),
                            ),
                          );
                        },
                        child: Row(
                          children: [
                            Container(
                              width: 48,
                              height: 48,
                              decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                gradient: cat.gradient,
                                boxShadow: [
                                  BoxShadow(
                                    color: (cat.gradient.colors.first)
                                        .withOpacity(0.35),
                                    blurRadius: 10,
                                  ),
                                ],
                              ),
                              child: Icon(
                                cat.icon,
                                color: Colors.white,
                                size: 24,
                              ),
                            ),
                            const SizedBox(width: 14),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    cat.title,
                                    style: const TextStyle(
                                      color: AppTheme.textPrimary,
                                      fontWeight: FontWeight.bold,
                                      fontSize: 15,
                                    ),
                                  ),
                                  const SizedBox(height: 4),
                                  Text(
                                    cat.description,
                                    style: const TextStyle(
                                      color: AppTheme.textSecondary,
                                      fontSize: 12,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            Container(
                              padding: const EdgeInsets.all(8),
                              decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                color: Colors.white.withOpacity(0.06),
                              ),
                              child: const Icon(
                                Icons.arrow_forward_ios,
                                color: AppTheme.neonCyan,
                                size: 14,
                              ),
                            ),
                          ],
                        ),
                      );
                    },
                  ),

                  const SizedBox(height: 95), // Spacing for bottom dock
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}
