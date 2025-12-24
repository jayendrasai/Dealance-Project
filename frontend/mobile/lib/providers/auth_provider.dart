import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class AuthProvider extends ChangeNotifier {
  static const _storage = FlutterSecureStorage();
  static const _tokenKey = 'jwt';

  String? _token;
  bool _initialized = false;

  String? get token => _token;
  bool get isAuthenticated => _token != null;
  bool get isInitialized => _initialized;

  AuthProvider() {
    _loadToken();
  }

  Future<void> _loadToken() async {
    _token = await _storage.read(key: _tokenKey);
    _initialized = true;
    notifyListeners();
  }

  Future<void> login(String token) async {
    await _storage.write(key: _tokenKey, value: token);
    _token = token;
    notifyListeners();
  }

  Future<void> logout() async {
    await _storage.delete(key: _tokenKey);
    _token = null;
    notifyListeners();
  }
}
