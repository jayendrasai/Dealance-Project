import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:provider/provider.dart';

import '../../providers/auth_provider.dart';

const String loginMutation = r'''
mutation Login($email: String!, $password: String!) {
  login(input: { email: $email, password: $password }) {
    accessToken
  }
}
''';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final emailController = TextEditingController();
  final passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Login')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Mutation(
          options: MutationOptions(
            document: gql(loginMutation),
            onCompleted: (data) async {
  if (data == null) return;

  final loginData = data['login'];
  if (loginData == null) return;

  final token = loginData['accessToken'];
  if (token == null) return;

  await context.read<AuthProvider>().login(token);
},

          ),
          builder: (runMutation, result) {
            return Column(
              children: [
                TextField(
                  controller: emailController,
                  decoration: const InputDecoration(labelText: 'Email'),
                ),
                TextField(
                  controller: passwordController,
                  obscureText: true,
                  decoration: const InputDecoration(labelText: 'Password'),
                ),
                const SizedBox(height: 20),
                ElevatedButton(
                  onPressed: () {
                    runMutation({
                      'email': emailController.text,
                      'password': passwordController.text,
                    });
                  },
                  child: const Text('Login'),
                ),
                if (result?.isLoading ?? false)
                  const Padding(
                    padding: EdgeInsets.only(top: 16),
                    child: CircularProgressIndicator(),
                  ),
              ],
            );
          },
        ),
      ),
    );
  }
}
