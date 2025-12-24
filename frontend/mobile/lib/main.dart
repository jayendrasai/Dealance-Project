import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

import 'app.dart';
import 'core/graphql/graphql_client.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Required by graphql_flutter
  await initHiveForFlutter();

  runApp(
    GraphQLProvider(
      client: GraphQLConfig.client,
      child: const App(),
    ),
  );
}
