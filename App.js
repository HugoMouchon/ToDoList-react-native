import { View, Alert, ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as NavigationBar from 'expo-navigation-bar';
import { s } from "./App.style";
import { useEffect, useState } from "react";
import { Header } from "./components/Header/Header";
import { CardToDo } from "./components/CardToDo/CardToDo";
import { TabBottomMenu } from "./components/TabBottomMenu/TabBottomMenu";
import { ButtonAdd } from "./components/ButtonAdd/ButtonAdd";
import Dialog from "react-native-dialog";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Variables utilisées pour l'Async Storage afin de pouvoir vérifier la sauvegarde et le rechargement
let isFirstRender = true;
let isLoadUpdate = false;

export default function App() {

  // Etat qui stock la valeur selectionné sur le menu Tab et défini par défaut sur "All"
  const [selectedTabName, setSelectedTabName] = useState("all");
  // Etat qui stock dans un tableau les différentes tâches"
  const [todoList, setTodoList] = useState([]);
  // Etat qui stock la valeur faux par defaut afin de cacher la fenetre popup et la rend visible quand lors de l'appui du bouton 'New todo'"
  const [isAddDialogVisible, setIsAddDialogVisible] = useState(false);
  // Etat qui stock la valeur tapé par l'utilisateur dans l'input lors d'une création de tâche"
  const [inputValue, setInputValue] = useState();

  // Appel de la fonction loadTodoList 1 seule fois à l'ouverture de l'app
  useEffect(() => {
    loadTodoList();
  }, []);

  // Permet de sauvegarder via la fonction 'saveTodoList' à chaque changement de todoList, il ne s'applique pas au premier rendu
  useEffect(() => {
    if (isLoadUpdate) {
      isLoadUpdate = false;
    } else {
      if (!isFirstRender) {
        saveTodoList();
      } else {
        isFirstRender = false;
      }
    }
  }, [todoList]);

  // fonction qui permet de sauvegarder le tableau todoList via l'Async Storage, il sera transformer entierement en string et renommé @todolist
  // Utilisation des Try/Catch afin d'anticiper les potentiels futurs erreurs.
  async function saveTodoList() {
    console.log("SAVE");
    try {
      await AsyncStorage.setItem("@todolist", JSON.stringify(todoList));
    } catch (error) {
      alert("Erreur" + error);
    }
  }

  // fonction qui permet de recharger le tableau todoList via l'Async Storage, via son nom @todolist puis retransformé via la méthode 'parse'.
  // Utilisation des Try/Catch afin d'anticiper les potentiels futurs erreurs.
  async function loadTodoList() {
    console.log("LOAD");
    try {
      const stringifiedTodoList = await AsyncStorage.getItem("@todolist");
      if (stringifiedTodoList !== null) {
        const parsedTodoList = JSON.parse(stringifiedTodoList);
        isLoadUpdate = true;
        setTodoList(parsedTodoList);
      }
    } catch (error) {
      alert("Erreur" + error);
    }
  }

  // fonction permettant de filtrer grâce à la méthode 'filter' le tableau todoList afin retourner le nombre de toutes les tâches,ainsi que celles en progress et celles déjà effectuées.
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

  // fonction permettant de mettre à jours la liste de tâches grâce au booléen (rest operator du tableau afin de ne pas changer le state directement)
  function updateTodo(todo) {
    const updateTodo = {
      ...todo,
      isCompleted: !todo.isCompleted
    }
    // Utilisation de la méthode 'findUndex' sur le tableau todoList afin de trouver la correspondance de deux tâches par rapport à leurs ID
    const indexToUpdate = todoList.findIndex((todo) => todo.id === updateTodo.id)

    const updatedTodoList = [...todoList]
    updatedTodoList[indexToUpdate] = updateTodo
    setTodoList(updatedTodoList);
  }

  // Fonction permettant de rechercher une tâche via la correspondance de son l'id et de la supprimer 
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

  // Fonction qui permet de boucler via la methode .map l'objet CardToDo appelant lui même la fonction suppression et la fonction de mise à jours
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

  // Fonction qui permet de passer l'état 'isAddDialogVisible' à true
  function showAddDialog() {
    setIsAddDialogVisible(true);
  }

  // Fonction qui d'ajouter une nouvelle tache avec un id unique (via "react-native-uuid"), le titre tapé dans l'input et le booleen complété à faux.
  // Puis, mise à jours du tableau et fermeture automatique de la popup
  function addTodo() {
    const newTodo = {
      id: uuid.v4(),
      title: inputValue,
      isCompleted: false,
    };
    setTodoList([...todoList, newTodo]);
    setIsAddDialogVisible(false);
  }

  // Permet de changer la couleur de la barre de navigation propre au système Android une seule fois lors du chargement de l'application
  useEffect(() => {
    NavigationBar.setBackgroundColorAsync("#D4FBF9");
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

