import 'package:flutter/material.dart';

class AppTheme {
  static const primaryColor = Color(0xFF3D3D3D);
  static const accentColor = Color(0xFFB59D82);
  static const backgroundColor = Color(0xFFEADFD3);

  static ThemeData lightTheme = ThemeData(
    scaffoldBackgroundColor: Colors.transparent,
    fontFamily: 'Poppins',
    primaryColor: primaryColor,

    textTheme: const TextTheme(
      headlineLarge: TextStyle(
        fontFamily: 'Revalia',
        fontWeight: FontWeight.w600,
        color: primaryColor,
      ),
      bodyMedium: TextStyle(
        fontSize: 16,
        color: Colors.black54,
      ),
    ),

    inputDecorationTheme: InputDecorationTheme(
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(42),
      ),
    ),
  );
}
