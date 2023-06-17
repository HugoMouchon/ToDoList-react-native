import { View, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as NavigationBar from 'expo-navigation-bar';
import { s } from "./App.style";
import { useEffect, useState } from "react";
import { Header } from "./components/Header/Header";
import { CardToDo } from "./components/CardToDo/CardToDo";
import { ScrollView } from "react-native";
import { TabBottomMenu } from "./components/TabBottomMenu/TabBottomMenu";


export default function App() {

  const [selectedTabName, setSelectedTabName] = useState("all");

  const [todoList, setTodoList] = useState([
    { id: 1, title: "Sortir le chien", isCompleted: true },
    { id: 2, title: "Sortir le chien", isCompleted: false },
    { id: 3, title: "Sortir le chien", isCompleted: true },
    { id: 4, title: "Sortir le chien", isCompleted: false },
    { id: 5, title: "Sortir le chien", isCompleted: true },
    { id: 6, title: "Sortir le chien", isCompleted: false },
  ]);

  function getFilteredList() {
    switch (selectedTabName) {
      case "all":
        return todoList
      case "inProgress":
        return todoList.filter((todo) => !todo.isCompleted)
      case "done":
        return todoList.filter((todo) => todo.isCompleted)
    }
  }

  function updateTodo(todo) {
    const updateTodo = {
      ...todo,
      isCompleted: !todo.isCompleted
    }

    const indexToUpdate = todoList.findIndex((todo) => todo.id === updateTodo.id)

    const updatedTodoList = [...todoList]
    updatedTodoList[indexToUpdate] = updateTodo
    setTodoList(updatedTodoList);

    console.log(todo);
  }

  function renderTodoList() {
    return getFilteredList().map((todo) => (
      <View
        style={s.cardItem} key={todo.id}>
        <CardToDo onPress={updateTodo} todo={todo} />
      </View>
    ));
  }

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync("#ACE5F3");
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
        <TabBottomMenu
          todoList={todoList}
          onPress={setSelectedTabName}
          selectedTabName={selectedTabName} />
      </View>
    </>
  );
}

