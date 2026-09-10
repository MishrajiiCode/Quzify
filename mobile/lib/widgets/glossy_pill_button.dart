import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../theme/app_theme.dart';

class GlossyPillButton extends StatelessWidget {
  final String text;
  final IconData? icon;
  final VoidCallback? onPressed;
  final LinearGradient? gradient;
  final Color? textColor;
  final Color? borderColor;
  final double height;
  final double? width;
  final bool isSecondary;
  final bool isLoading;

  const GlossyPillButton({
    super.key,
    required this.text,
    this.icon,
    required this.onPressed,
    this.gradient,
    this.textColor,
    this.borderColor,
    this.height = 52,
    this.width,
    this.isSecondary = false,
    this.isLoading = false,
  });

  @override
  Widget build(BuildContext context) {
    final effectiveGradient = gradient ??
        (isSecondary
            ? LinearGradient(
                colors: [
                  Colors.white.withOpacity(0.12),
                  Colors.white.withOpacity(0.04),
                ],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              )
            : AppTheme.primaryGradient);

    final effectiveTextColor = textColor ??
        (isSecondary ? AppTheme.textPrimary : Colors.white);

    final effectiveBorder = borderColor ??
        (isSecondary
            ? AppTheme.glassBorder
            : AppTheme.neonCyan.withOpacity(0.5));

    return SizedBox(
      height: height,
      width: width,
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(999),
          boxShadow: isSecondary
              ? null
              : [
                  BoxShadow(
                    color: (effectiveGradient.colors.first).withOpacity(0.35),
                    blurRadius: 16,
                    offset: const Offset(0, 4),
                  ),
                ],
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(999),
          child: BackdropFilter(
            filter: ImageFilter.blur(sigmaX: 12, sigmaY: 12),
            child: Material(
              color: Colors.transparent,
              child: InkWell(
                onTap: isLoading
                    ? null
                    : () {
                        HapticFeedback.lightImpact();
                        onPressed?.call();
                      },
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 24),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(999),
                    border: Border.all(color: effectiveBorder, width: 1.2),
                    gradient: effectiveGradient,
                  ),
                  child: Center(
                    child: isLoading
                        ? const SizedBox(
                            width: 22,
                            height: 22,
                            child: CircularProgressIndicator(
                              color: Colors.white,
                              strokeWidth: 2.5,
                            ),
                          )
                        : Row(
                            mainAxisSize: MainAxisSize.min,
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              if (icon != null) ...[
                                Icon(icon, color: effectiveTextColor, size: 20),
                                const SizedBox(width: 8),
                              ],
                              Text(
                                text,
                                style: TextStyle(
                                  color: effectiveTextColor,
                                  fontSize: 15,
                                  fontWeight: FontWeight.bold,
                                  letterSpacing: 0.5,
                                ),
                              ),
                            ],
                          ),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
