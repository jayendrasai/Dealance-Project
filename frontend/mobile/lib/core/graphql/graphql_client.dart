import 'package:flutter/foundation.dart';

import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class GraphQLConfig {
  static const _storage = FlutterSecureStorage();

  static final HttpLink httpLink = HttpLink(
    // Android emulator uses 10.0.2.2 instead of localhost
    'http://10.0.2.2:3000/graphql',
  );

  static final AuthLink authLink = AuthLink(
    getToken: () async {
      final token = await _storage.read(key: 'jwt');
      return token == null ? null : 'Bearer $token';
    },
  );

  static final Link link = authLink.concat(httpLink);

  static final ValueNotifier<GraphQLClient> client =
      ValueNotifier(
        GraphQLClient(
          link: link,
          cache: GraphQLCache(store: InMemoryStore()),
        ),
      );
}
