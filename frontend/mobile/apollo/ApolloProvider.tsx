import React, {PropsWithChildren} from 'react';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onError } from '@apollo/client/link/error';

const API_URL = 'http://localhost:3000/graphql'; // ⚠️ IMPORTANT: Change 'localhost' to your computer's IP address if testing on a physical device/Expo Go app!

const TOKEN_KEY = 'dealance-jwt';

// 1. Storage utility for JWT
/**
 * Secure JWT storage
 * Uses SecureStore instead of AsyncStorage for security
 */
export const storage = {
  getToken: async (): Promise<string | null> =>
    SecureStore.getItemAsync(TOKEN_KEY),

  setToken: async (token: string): Promise<void> =>
    SecureStore.setItemAsync(TOKEN_KEY, token),

  clearToken: async (): Promise<void> =>
    SecureStore.deleteItemAsync(TOKEN_KEY),
};

// 2. HTTP Link (Connects to the GraphQL endpoint)
const httpLink = createHttpLink({
  uri: API_URL,
});

// 3. Auth Link (Attaches the JWT to every request header)
const authLink = setContext(async (_, { headers }) => {
  const token = await storage.getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// 4. Error Link (Handles token expiration, logging out the user)
/**
 * Error handling link (Apollo Client v4)
 */
const errorLink = onError((error) => {
  const { graphQLErrors, networkError } = error as {
    graphQLErrors?: { message: string }[];
    networkError?: Error;
  };

  if (graphQLErrors) {
    graphQLErrors.forEach((err) => {
      console.error('[GraphQL error]:', err.message);
    });
  }

  if (networkError) {
    console.error('[Network error]:', networkError.message);
  }
});



// 5. Apollo Client Instance
const client = new ApolloClient({
  // Link composition order is important: error -> auth -> http
  link: errorLink.concat(authLink.concat(httpLink)), 
  cache: new InMemoryCache({
    // Type policies help Apollo normalize data correctly, especially for IdeaCards
    typePolicies: {
      Query: {
        fields: {
          publicFeed: {
            keyArgs: false,
            // Example for future pagination:
            // merge(existing = [], incoming) {
            //   return [...existing, ...incoming];
            // },
          },
        },
      },
    },
  }),
});

// 6. Provider Wrapper
export const AppApolloProvider = ({ children }: PropsWithChildren) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);