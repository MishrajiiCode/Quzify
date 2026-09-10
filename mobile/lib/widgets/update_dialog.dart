import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import '../services/update_service.dart';
import '../theme/app_theme.dart';
import 'glossy_container.dart';
import 'glossy_pill_button.dart';

class UpdateDialog extends StatelessWidget {
  final AppUpdateInfo updateInfo;

  const UpdateDialog({super.key, required this.updateInfo});

  static Future<void> show(BuildContext context, AppUpdateInfo info) async {
    return showDialog<void>(
      context: context,
      barrierDismissible: false,
      builder: (context) => UpdateDialog(updateInfo: info),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Dialog(
      backgroundColor: Colors.transparent,
      insetPadding: const EdgeInsets.symmetric(horizontal: 20),
      child: GlossyContainer(
        borderRadius: BorderRadius.circular(32),
        borderColor: AppTheme.neonCyan.withOpacity(0.4),
        hasGlow: true,
        glowColor: AppTheme.neonCyan.withOpacity(0.3),
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            // Pill header badge
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(999),
                gradient: LinearGradient(
                  colors: [
                    AppTheme.neonCyan.withOpacity(0.25),
                    AppTheme.neonPurple.withOpacity(0.25),
                  ],
                ),
                border: Border.all(
                  color: AppTheme.neonCyan.withOpacity(0.5),
                  width: 1,
                ),
              ),
              child: const Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(Icons.rocket_launch, color: AppTheme.neonCyan, size: 16),
                  SizedBox(width: 8),
                  Text(
                    'NEW UPDATE AVAILABLE',
                    style: TextStyle(
                      color: AppTheme.neonCyan,
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                      letterSpacing: 1.0,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 18),

            // Title
            Text(
              updateInfo.releaseTitle,
              textAlign: TextAlign.center,
              style: const TextStyle(
                color: AppTheme.textPrimary,
                fontSize: 20,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 12),

            // Version tags
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                _buildVersionPill("Current", "v${updateInfo.currentVersion}", false),
                const Padding(
                  padding: EdgeInsets.symmetric(horizontal: 8),
                  child: Icon(Icons.arrow_forward, color: AppTheme.neonCyan, size: 16),
                ),
                _buildVersionPill("Latest", "v${updateInfo.latestVersion}", true),
              ],
            ),
            const SizedBox(height: 16),

            // Changelog
            Container(
              constraints: const BoxConstraints(maxHeight: 140),
              width: double.infinity,
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(16),
                color: Colors.black.withOpacity(0.3),
                border: Border.all(color: AppTheme.glassBorder),
              ),
              child: SingleChildScrollView(
                child: Text(
                  updateInfo.releaseNotes.isNotEmpty
                      ? updateInfo.releaseNotes
                      : "Exciting new quiz questions, performance optimizations, and UI refinements.",
                  style: const TextStyle(
                    color: AppTheme.textSecondary,
                    fontSize: 13,
                    height: 1.4,
                  ),
                ),
              ),
            ),
            const SizedBox(height: 24),

            // Update Action Buttons
            GlossyPillButton(
              text: 'Install New Update (APK)',
              icon: Icons.download,
              gradient: AppTheme.cyanGradient,
              textColor: Colors.black,
              onPressed: () async {
                final uri = Uri.parse(updateInfo.downloadUrl);
                if (await canLaunchUrl(uri)) {
                  await launchUrl(uri, mode: LaunchMode.externalApplication);
                }
              },
            ),
            const SizedBox(height: 10),
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: const Text(
                'Remind Me Later',
                style: TextStyle(
                  color: AppTheme.textMuted,
                  fontSize: 13,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildVersionPill(String label, String version, bool isHighlight) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(999),
        color: isHighlight
            ? AppTheme.neonCyan.withOpacity(0.2)
            : Colors.white.withOpacity(0.08),
        border: Border.all(
          color: isHighlight
              ? AppTheme.neonCyan.withOpacity(0.6)
              : AppTheme.glassBorder,
        ),
      ),
      child: Text(
        "$label: $version",
        style: TextStyle(
          color: isHighlight ? AppTheme.neonCyan : AppTheme.textSecondary,
          fontSize: 12,
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  }
}
