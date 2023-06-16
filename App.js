import { View, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as NavigationBar from 'expo-navigation-bar';
import { s } from "./App.style";
import { useEffect, useState } from "react";
import { Header } from "./components/Header/Header";
import { CardToDo } from "./components/CardToDo/CardToDo";
import { ScrollView } from "react-native";


export default function App() {

  const [todoList, setTodoList] = useState([
    { id: 1, title: "Sortir le chien", isCompleted: true },
    { id: 2, title: "Sortir le chien", isCompleted: false },
    { id: 3, title: "Sortir le chien", isCompleted: true },
    { id: 4, title: "Sortir le chien", isCompleted: false },
    { id: 5, title: "Sortir le chien", isCompleted: true },
    { id: 6, title: "Sortir le chien", isCompleted: false },
  ]);

  function renderTodoList() {
    return todoList.map((todo) => (
      <View
        style={s.cardItem} key={todo.id}>
        <CardToDo todo={todo} />
      </View>
    ));
  }

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync("#F9E28F");
  }, []);

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={s.app}>
          <View style={s.header} >
            <Header />
          </View>
          <View style={s.body}>
            <ScrollView>{renderTodoList()}</ScrollView>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
      <View style={s.footer} >
        <Text>Footer</Text>
      </View>
    </>
  );
}

