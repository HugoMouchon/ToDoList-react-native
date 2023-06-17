import { View, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as NavigationBar from 'expo-navigation-bar';
import { s } from "./App.style";
import { useEffect, useState } from "react";
import { Header } from "./components/Header/Header";
import { CardToDo } from "./components/CardToDo/CardToDo";
import { ScrollView } from "react-native";
import { TabBottomMenu } from "./components/TabBottomMenu/TabBottomMenu";
import { Alert } from "react-native";
import { ButtonAdd } from "./components/ButtonAdd/ButtonAdd";
import Dialog from "react-native-dialog";
import uuid from "react-native-uuid";


export default function App() {

  const [selectedTabName, setSelectedTabName] = useState("all");
  const [todoList, setTodoList] = useState([]);
  const [isAddDialogVisible, setIsAddDialogVisible] = useState(false);
  const [inputValue, setInputValue] = useState();

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

  function deleteTodo(todoToDelete) {
    Alert.alert("Suppression", "Voulez-vous supprimer cette tâche ?", [
      {
        text: "Supprimer",
        style: "destructive",
        onPress: () => {
          setTodoList(todoList.filter(todo => todo.id !== todoToDelete.id));
        }
      },
      {
        text: "Annuler",
        style: 'cancel',
      }
    ])
  }

  function renderTodoList() {
    return getFilteredList().map((todo) => (
      <View
        style={s.cardItem} key={todo.id}>
        <CardToDo
          onLongPress={deleteTodo}
          onPress={updateTodo}
          todo={todo} />
      </View>
    ));
  }

  function showAddDialog() {
    setIsAddDialogVisible(true);
  }

  function addTodo() {
    const newTodo = {
      id: uuid.v4(),
      title: inputValue,
      isCompleted: false,
    };
    setTodoList([...todoList, newTodo]);
    setIsAddDialogVisible(false);
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
          <ButtonAdd onPress={showAddDialog} />
        </SafeAreaView>
      </SafeAreaProvider>
      <TabBottomMenu
        todoList={todoList}
        onPress={setSelectedTabName}
        selectedTabName={selectedTabName}
      />
      <Dialog.Container
        visible={isAddDialogVisible}
        onBackdropPress={() => setIsAddDialogVisible(false)}>
        <Dialog.Title>
          Créer une tâche
        </Dialog.Title>
        <Dialog.Description>
          Choisi un nom pour la nouvelle tâche
        </Dialog.Description>
        <Dialog.Input onChangeText={setInputValue} />
        <Dialog.Button label={"Créer"} onPress={addTodo} />
      </Dialog.Container>
    </>
  );
}
 
