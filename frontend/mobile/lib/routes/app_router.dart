import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../providers/auth_provider.dart';
import '../screens/auth/login_screen.dart';
import '../screens/auth/signup_screen.dart';
import '../screens/feed/public_feed_screen.dart';

final appRouter = GoRouter(
  routes: [
    GoRoute(
      path: '/login',
      builder: (_, __) => const LoginScreen(),
    ),
    GoRoute(
      path: '/signup',
      builder: (_, __) => const SignupScreen(),
    ),
    GoRoute(
      path: '/',
      builder: (_, __) => const PublicFeedScreen(),
    ),
  ],

  redirect: (context, state) {
    final auth = context.read<AuthProvider>();

    if (!auth.isInitialized) return null;

    final loggedIn = auth.isAuthenticated;
    final isAuthRoute =
        state.uri.path == '/login' || state.uri.path == '/signup';

    if (!loggedIn && !isAuthRoute) return '/login';
    if (loggedIn && isAuthRoute) return '/';

    return null;
  },
);
