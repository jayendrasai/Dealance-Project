// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import { AppApolloProvider } from './apollo/ApolloProvider';
// import { NavigationContainer } from '@react-navigation/native';
// //import RootNavigator from './navigation/RootNavigator';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// export default function App() {
//   return (
//     <AppApolloProvider>
//       <SafeAreaProvider>
//         <NavigationContainer>
//           {/* <RootNavigator /> */}
//           <View style={styles.container}>
//             <Text>Welcome to the Mobile App!</Text>
//             <StatusBar style="auto" />
//           </View>
//         </NavigationContainer>
//       </SafeAreaProvider>
//     </AppApolloProvider>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


import { Text, View  , StyleSheet} from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>PURE RN TEST</Text>
    </View>
  );
}
