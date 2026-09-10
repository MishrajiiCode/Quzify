import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../widgets/glossy_container.dart';

class LeaderboardUser {
  final int rank;
  final String name;
  final String avatar;
  final int xp;
  final bool isCurrentUser;

  const LeaderboardUser({
    required this.rank,
    required this.name,
    required this.avatar,
    required this.xp,
    this.isCurrentUser = false,
  });
}

class LeaderboardScreen extends StatefulWidget {
  const LeaderboardScreen({super.key});

  @override
  State<LeaderboardScreen> createState() => _LeaderboardScreenState();
}

class _LeaderboardScreenState extends State<LeaderboardScreen> {
  String _selectedPeriod = 'Weekly';

  final List<LeaderboardUser> _mockUsers = const [
    LeaderboardUser(rank: 1, name: "Aria Nova", avatar: "👑", xp: 3420),
    LeaderboardUser(rank: 2, name: "CyberKnight", avatar: "⚡", xp: 2980),
    LeaderboardUser(rank: 3, name: "QuantumPro", avatar: "🚀", xp: 2750),
    LeaderboardUser(rank: 4, name: "NeoLearner", avatar: "🧬", xp: 2410),
    LeaderboardUser(rank: 5, name: "PixelMaster", avatar: "🎮", xp: 2190),
    LeaderboardUser(rank: 6, name: "CodeVoyager", avatar: "💻", xp: 1950),
    LeaderboardUser(rank: 7, name: "MathGenius", avatar: "📐", xp: 1720),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.transparent,
      body: SafeArea(
        child: SingleChildScrollView(
          physics: const BouncingScrollPhysics(),
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              // Title
              const Align(
                alignment: Alignment.centerLeft,
                child: Text(
                  'Global Leaderboard',
                  style: TextStyle(
                    color: AppTheme.textPrimary,
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              const SizedBox(height: 4),
              const Align(
                alignment: Alignment.centerLeft,
                child: Text(
                  'Compete with scholars across the globe for weekly rewards.',
                  style: TextStyle(
                    color: AppTheme.textSecondary,
                    fontSize: 13,
                  ),
                ),
              ),
              const SizedBox(height: 18),

              // Period Selector (Pill Container)
              Container(
                padding: const EdgeInsets.all(4),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(999),
                  color: Colors.white.withOpacity(0.06),
                  border: Border.all(color: AppTheme.glassBorder),
                ),
                child: Row(
                  children: [
                    _buildPeriodTab('Daily'),
                    _buildPeriodTab('Weekly'),
                    _buildPeriodTab('All-Time'),
                  ],
                ),
              ),
              const SizedBox(height: 24),

              // Top 3 Podium
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  // Rank 2 (Silver)
                  _buildPodiumItem(
                    user: _mockUsers[1],
                    color: const Color(0xFFC0C0C0),
                    height: 120,
                  ),
                  const SizedBox(width: 14),
                  // Rank 1 (Gold)
                  _buildPodiumItem(
                    user: _mockUsers[0],
                    color: AppTheme.neonGold,
                    height: 145,
                    isFirst: true,
                  ),
                  const SizedBox(width: 14),
                  // Rank 3 (Bronze)
                  _buildPodiumItem(
                    user: _mockUsers[2],
                    color: const Color(0xFFCD7F32),
                    height: 105,
                  ),
                ],
              ),
              const SizedBox(height: 24),

              // Rest of Ranks List (Pills)
              ListView.separated(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemCount: _mockUsers.length - 3,
                separatorBuilder: (_, __) => const SizedBox(height: 10),
                itemBuilder: (context, index) {
                  final user = _mockUsers[index + 3];
                  return GlossyContainer(
                    borderRadius: BorderRadius.circular(999),
                    padding: const EdgeInsets.symmetric(
                        horizontal: 18, vertical: 12),
                    child: Row(
                      children: [
                        Text(
                          '#${user.rank}',
                          style: const TextStyle(
                            color: AppTheme.textMuted,
                            fontWeight: FontWeight.bold,
                            fontSize: 14,
                          ),
                        ),
                        const SizedBox(width: 14),
                        Text(user.avatar, style: const TextStyle(fontSize: 22)),
                        const SizedBox(width: 12),
                        Expanded(
                          child: Text(
                            user.name,
                            style: const TextStyle(
                              color: AppTheme.textPrimary,
                              fontWeight: FontWeight.w600,
                              fontSize: 14,
                            ),
                          ),
                        ),
                        Container(
                          padding: const EdgeInsets.symmetric(
                              horizontal: 10, vertical: 4),
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(999),
                            color: AppTheme.neonBlue.withOpacity(0.15),
                          ),
                          child: Text(
                            '${user.xp} XP',
                            style: const TextStyle(
                              color: AppTheme.neonBlue,
                              fontWeight: FontWeight.bold,
                              fontSize: 12,
                            ),
                          ),
                        ),
                      ],
                    ),
                  );
                },
              ),
              const SizedBox(height: 95),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildPeriodTab(String title) {
    final isSelected = _selectedPeriod == title;
    return Expanded(
      child: GestureDetector(
        onTap: () {
          setState(() {
            _selectedPeriod = title;
          });
        },
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 8),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(999),
            gradient: isSelected ? AppTheme.cyanGradient : null,
          ),
          child: Center(
            child: Text(
              title,
              style: TextStyle(
                color: isSelected ? Colors.black : AppTheme.textSecondary,
                fontWeight: isSelected ? FontWeight.bold : FontWeight.w500,
                fontSize: 13,
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildPodiumItem({
    required LeaderboardUser user,
    required Color color,
    required double height,
    bool isFirst = false,
  }) {
    return Column(
      children: [
        // Avatar with glow
        Container(
          width: isFirst ? 58 : 48,
          height: isFirst ? 58 : 48,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            border: Border.all(color: color, width: 2),
            boxShadow: [
              BoxShadow(
                color: color.withOpacity(0.4),
                blurRadius: 14,
              ),
            ],
          ),
          child: Center(
            child: Text(
              user.avatar,
              style: TextStyle(fontSize: isFirst ? 28 : 22),
            ),
          ),
        ),
        const SizedBox(height: 8),
        Text(
          user.name,
          style: const TextStyle(
            color: AppTheme.textPrimary,
            fontSize: 12,
            fontWeight: FontWeight.w600,
          ),
        ),
        Text(
          '${user.xp} XP',
          style: TextStyle(
            color: color,
            fontSize: 11,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 8),

        // Podium Pillar
        Container(
          width: 80,
          height: height,
          decoration: BoxDecoration(
            borderRadius: const BorderRadius.vertical(top: Radius.circular(16)),
            gradient: LinearGradient(
              colors: [
                color.withOpacity(0.35),
                color.withOpacity(0.1),
              ],
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
            ),
            border: Border.all(color: color.withOpacity(0.5), width: 1),
          ),
          child: Center(
            child: Text(
              '#${user.rank}',
              style: TextStyle(
                color: color,
                fontSize: 24,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ),
      ],
    );
  }
}
