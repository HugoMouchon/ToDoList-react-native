import { View } from "react-native";
import { Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as NavigationBar from 'expo-navigation-bar';
import { s } from "./App.style";
import { useEffect } from "react";


export default function App() {

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync("grey");
  }, []);

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={s.app}>
          <View style={s.header} >
            <Text>Header</Text>
          </View>
          <View style={s.body} >
            <Text>Body dazdazzdazdadr</Text>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
      <View style={s.footer} >
        <Text>Footer</Text>
      </View>
    </>
  );
}

