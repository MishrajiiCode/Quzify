import 'package:flutter/material.dart';
import '../models/quiz_models.dart';
import '../services/update_service.dart';
import '../services/user_service.dart';
import '../theme/app_theme.dart';
import '../widgets/glossy_container.dart';
import '../widgets/glossy_pill_button.dart';
import '../widgets/pill_stat_badge.dart';
import '../widgets/update_dialog.dart';

class StoreScreen extends StatefulWidget {
  const StoreScreen({super.key});

  @override
  State<StoreScreen> createState() => _StoreScreenState();
}

class _StoreScreenState extends State<StoreScreen> {
  final List<StoreItem> _catalog = [
    StoreItem(
      id: 'avatar_neon_bot',
      name: 'Cyber Android',
      type: 'avatar',
      icon: '🤖',
      cost: 100,
      description: 'Futuristic robotic avatar with neon circuit aura.',
    ),
    StoreItem(
      id: 'avatar_dragon',
      name: 'Mythic Drake',
      type: 'avatar',
      icon: '🐉',
      cost: 250,
      description: 'Ancient celestial beast of boundless wisdom.',
    ),
    StoreItem(
      id: 'avatar_cosmic',
      name: 'Astral Wizard',
      type: 'avatar',
      icon: '🧙‍♂️',
      cost: 300,
      description: 'Master of mathematical and quantum dimensions.',
    ),
    StoreItem(
      id: 'booster_2x',
      name: '2X XP Elixir',
      type: 'booster',
      icon: '🧪',
      cost: 80,
      description: 'Doubles all XP earned in your next 3 quizzes.',
    ),
    StoreItem(
      id: 'booster_shield',
      name: 'Streak Aegis',
      type: 'booster',
      icon: '🛡️',
      cost: 150,
      description: 'Preserves your daily streak if you miss a study day.',
    ),
  ];

  bool _isCheckingUpdate = false;

  void _buyItem(StoreItem item) async {
    final userService = UserService();
    if (userService.purchasedItems.contains(item.id)) {
      if (item.type == 'avatar') {
        await userService.purchaseItem(item); // equips it
        if (!mounted) return;
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('${item.name} equipped!'),
            backgroundColor: AppTheme.neonCyan,
          ),
        );
      }
      return;
    }

    if (!userService.canAfford(item.cost)) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Not enough Quiz Coins! Play quizzes to earn more.'),
          backgroundColor: AppTheme.neonRed,
        ),
      );
      return;
    }

    final success = await userService.purchaseItem(item);
    if (success) {
      if (!mounted) return;
      showDialog(
        context: context,
        builder: (context) => AlertDialog(
          backgroundColor: AppTheme.surface,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(24),
            side: const BorderSide(color: AppTheme.neonCyan, width: 1.2),
          ),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(item.icon, style: const TextStyle(fontSize: 56)),
              const SizedBox(height: 12),
              const Text(
                'UNLOCKED!',
                style: TextStyle(
                  color: AppTheme.neonCyan,
                  fontWeight: FontWeight.bold,
                  fontSize: 18,
                  letterSpacing: 1,
                ),
              ),
              const SizedBox(height: 6),
              Text(
                'You now own ${item.name}!',
                textAlign: TextAlign.center,
                style: const TextStyle(color: AppTheme.textSecondary),
              ),
              const SizedBox(height: 18),
              GlossyPillButton(
                text: 'Awesome',
                gradient: AppTheme.cyanGradient,
                textColor: Colors.black,
                height: 44,
                onPressed: () => Navigator.of(context).pop(),
              ),
            ],
          ),
        ),
      );
    }
  }

  void _checkManualUpdate() async {
    setState(() {
      _isCheckingUpdate = true;
    });

    final updateInfo = await UpdateService().checkForUpdate();

    setState(() {
      _isCheckingUpdate = false;
    });

    if (!mounted) return;

    if (updateInfo != null && updateInfo.hasUpdate) {
      UpdateDialog.show(context, updateInfo);
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Row(
            children: [
              Icon(Icons.check_circle, color: AppTheme.neonGreen),
              SizedBox(width: 8),
              Text('You are on the latest version of Quizify AI!'),
            ],
          ),
          backgroundColor: AppTheme.surfaceLight,
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return ListenableBuilder(
      listenable: UserService(),
      builder: (context, _) {
        final userService = UserService();

        return Scaffold(
          backgroundColor: Colors.transparent,
          body: SafeArea(
            child: SingleChildScrollView(
              physics: const BouncingScrollPhysics(),
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Title & Coins header
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Cyber Store',
                            style: TextStyle(
                              color: AppTheme.textPrimary,
                              fontSize: 24,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          SizedBox(height: 2),
                          Text(
                            'Power up your profile & learning.',
                            style: TextStyle(
                              color: AppTheme.textSecondary,
                              fontSize: 13,
                            ),
                          ),
                        ],
                      ),
                      PillStatBadge(
                        icon: '🪙',
                        value: '${userService.coins}',
                        label: 'Coins',
                        accentColor: AppTheme.neonGold,
                      ),
                    ],
                  ),
                  const SizedBox(height: 20),

                  // Catalog Items
                  ListView.separated(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    itemCount: _catalog.length,
                    separatorBuilder: (_, __) => const SizedBox(height: 12),
                    itemBuilder: (context, index) {
                      final item = _catalog[index];
                      final isOwned =
                          userService.purchasedItems.contains(item.id);
                      final isEquipped = userService.avatar == item.icon;

                      return GlossyContainer(
                        borderRadius: BorderRadius.circular(24),
                        padding: const EdgeInsets.all(16),
                        child: Row(
                          children: [
                            Container(
                              width: 52,
                              height: 52,
                              decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                color: Colors.white.withOpacity(0.06),
                                border: Border.all(
                                  color: AppTheme.neonCyan.withOpacity(0.3),
                                ),
                              ),
                              child: Center(
                                child: Text(
                                  item.icon,
                                  style: const TextStyle(fontSize: 26),
                                ),
                              ),
                            ),
                            const SizedBox(width: 14),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    item.name,
                                    style: const TextStyle(
                                      color: AppTheme.textPrimary,
                                      fontWeight: FontWeight.bold,
                                      fontSize: 15,
                                    ),
                                  ),
                                  const SizedBox(height: 4),
                                  Text(
                                    item.description,
                                    style: const TextStyle(
                                      color: AppTheme.textMuted,
                                      fontSize: 12,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            const SizedBox(width: 10),

                            // Purchase / Equip Pill
                            GestureDetector(
                              onTap: () => _buyItem(item),
                              child: Container(
                                padding: const EdgeInsets.symmetric(
                                    horizontal: 14, vertical: 8),
                                decoration: BoxDecoration(
                                  borderRadius: BorderRadius.circular(999),
                                  gradient: isEquipped
                                      ? null
                                      : (isOwned
                                          ? AppTheme.primaryGradient
                                          : AppTheme.cyanGradient),
                                  color: isEquipped
                                      ? Colors.white.withOpacity(0.1)
                                      : null,
                                  border: isEquipped
                                      ? Border.all(color: AppTheme.glassBorder)
                                      : null,
                                ),
                                child: isEquipped
                                    ? const Text(
                                        'Equipped',
                                        style: TextStyle(
                                          color: AppTheme.neonCyan,
                                          fontSize: 12,
                                          fontWeight: FontWeight.bold,
                                        ),
                                      )
                                    : (isOwned
                                        ? const Text(
                                            'Equip',
                                            style: TextStyle(
                                              color: Colors.white,
                                              fontSize: 12,
                                              fontWeight: FontWeight.bold,
                                            ),
                                          )
                                        : Row(
                                            mainAxisSize: MainAxisSize.min,
                                            children: [
                                              const Text('🪙',
                                                  style: TextStyle(
                                                      fontSize: 12)),
                                              const SizedBox(width: 4),
                                              Text(
                                                '${item.cost}',
                                                style: const TextStyle(
                                                  color: Colors.black,
                                                  fontWeight: FontWeight.bold,
                                                  fontSize: 13,
                                                ),
                                              ),
                                            ],
                                          )),
                              ),
                            ),
                          ],
                        ),
                      );
                    },
                  ),

                  const SizedBox(height: 28),

                  // System / Settings Section
                  GlossyContainer(
                    borderRadius: BorderRadius.circular(24),
                    padding: const EdgeInsets.all(18),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'App & Updates',
                          style: TextStyle(
                            color: AppTheme.textPrimary,
                            fontWeight: FontWeight.bold,
                            fontSize: 16,
                          ),
                        ),
                        const SizedBox(height: 6),
                        const Text(
                          'Quizify AI automatically notifies you whenever an updated APK is released on GitHub.',
                          style: TextStyle(
                            color: AppTheme.textSecondary,
                            fontSize: 12,
                          ),
                        ),
                        const SizedBox(height: 14),
                        GlossyPillButton(
                          text: _isCheckingUpdate
                              ? 'Checking GitHub Releases...'
                              : 'Check for Updates Now',
                          icon: Icons.system_update_alt,
                          isSecondary: true,
                          height: 44,
                          isLoading: _isCheckingUpdate,
                          onPressed: _checkManualUpdate,
                        ),
                      ],
                    ),
                  ),

                  const SizedBox(height: 95),
                ],
              ),
            ),
          ),
        );
      },
    );
  }
}
