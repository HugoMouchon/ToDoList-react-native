import { View } from "react-native";
import { Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as NavigationBar from 'expo-navigation-bar';
import { s } from "./App.style";
import { useEffect } from "react";
import { Header } from "./components/Header/Header";
import { CardToDo } from "./components/CardToDo/CardToDo";


export default function App() {

  const TODO_LIST = [
    { id: 1, title: "Sortir le chien", isCompleted: true}
  ]

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync("#F9F9F9");
  }, []);

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={s.app}>
          <View style={s.header} >
            <Header/>
          </View>
          <View style={s.body} >
            <CardToDo todo={TODO_LIST[0]}/>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
      <View style={s.footer} >
        <Text>Footer</Text>
      </View>
    </>
  );
}

