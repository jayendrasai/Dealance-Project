import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class AuthProvider extends ChangeNotifier {
  final _storage = const FlutterSecureStorage();

  String? _token;
  bool _isAuthenticated = false;

  bool get isAuthenticated => _isAuthenticated;
  String? get token => _token;

  Future<void> login(String jwt) async {
    _token = jwt;
    _isAuthenticated = true;

    await _storage.write(key: 'jwt', value: jwt);
    notifyListeners();
  }

  Future<void> logout() async {
    _token = null;
    _isAuthenticated = false;

    await _storage.delete(key: 'jwt');
    notifyListeners();
  }

  Future<void> tryAutoLogin() async {
    final storedToken = await _storage.read(key: 'jwt');
    if (storedToken != null) {
      _token = storedToken;
      _isAuthenticated = true;
      notifyListeners();
    }
  }
}
