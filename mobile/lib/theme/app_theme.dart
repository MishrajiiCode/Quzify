import 'package:flutter/material.dart';

class AppTheme {
  // Deep Cyber Canvas
  static const Color background = Color(0xFF080918);
  static const Color surface = Color(0xFF111430);
  static const Color surfaceLight = Color(0xFF1B1F48);

  // Vibrant Cyber Neons
  static const Color neonCyan = Color(0xFF00F5D4);
  static const Color neonPurple = Color(0xFF7B2CBF);
  static const Color neonBlue = Color(0xFF3A86FF);
  static const Color neonPink = Color(0xFFFF007F);
  static const Color neonGold = Color(0xFFFFBE0B);
  static const Color neonRed = Color(0xFFFF0054);
  static const Color neonGreen = Color(0xFF00F5D4);

  // Glass Specular Tints
  static const Color glassWhite = Color(0x1AFFFFFF);
  static const Color glassBorder = Color(0x33FFFFFF);
  static const Color glassHighlight = Color(0x4DFFFFFF);

  // Typography
  static const Color textPrimary = Color(0xFFFFFFFF);
  static const Color textSecondary = Color(0xFFB0B7D6);
  static const Color textMuted = Color(0xFF6B7294);

  // Gradients
  static const LinearGradient primaryGradient = LinearGradient(
    colors: [neonPurple, neonBlue],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  static const LinearGradient cyanGradient = LinearGradient(
    colors: [Color(0xFF00CEC9), Color(0xFF0984E3)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  static const LinearGradient goldGradient = LinearGradient(
    colors: [Color(0xFFFFBE0B), Color(0xFFFB5607)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  static const LinearGradient glassGradient = LinearGradient(
    colors: [
      Color(0x2EFFFFFF),
      Color(0x0AFFFFFF),
    ],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  static ThemeData get darkTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      scaffoldBackgroundColor: background,
      colorScheme: const ColorScheme.dark(
        primary: neonCyan,
        secondary: neonPurple,
        surface: surface,
        error: neonRed,
        onPrimary: Colors.black,
        onSecondary: Colors.white,
        onSurface: textPrimary,
      ),
      fontFamily: 'Roboto',
      appBarTheme: const AppBarTheme(
        backgroundColor: Colors.transparent,
        elevation: 0,
        centerTitle: true,
        titleTextStyle: TextStyle(
          color: textPrimary,
          fontSize: 20,
          fontWeight: FontWeight.bold,
          letterSpacing: 0.5,
        ),
      ),
    );
  }
}
