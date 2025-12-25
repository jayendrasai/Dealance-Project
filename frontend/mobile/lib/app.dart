import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'core/ui/app_theme.dart';

import 'providers/auth_provider.dart';
import 'screens/auth/login_screen.dart';

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (_) => AuthProvider()..tryAutoLogin(),
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        theme : AppTheme.lightTheme,
        home: LoginScreen(),
      ),
    );
  }
}
