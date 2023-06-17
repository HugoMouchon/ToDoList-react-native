import { View, Text } from "react-native";
import { s } from "./TabBottomMenu.style";
import { TouchableOpacity } from "react-native";


export function TabBottomMenu({ selectedTabName, onPress, todoList }) {
    // Utilisation de la méthode "reduce" qui permet de compter toutes les tâches du tableau todolist (all, in progress et done) pour pouvoir les afficher a droite de chaques texte de bouton.
    const countByStatus = todoList.reduce((accumulator, todo) => {
        todo.isCompleted ? accumulator.done++ : accumulator.inProgress++;
        return accumulator;
    }, { all: todoList.length, inProgress: 0, done: 0, })

    // Fonction qui permet de mettre le texte en gras et de changer sa couleur en bleu lorsque le bouton appuyé
    function getTextStyle(tabName) {
        return {
            fontWeight: "bold",
            color: tabName === selectedTabName ? "#2F76E5" : "black",
        };
    }

    // Composant du Menu Tab
    return (
        <View style={s.container}>
            <TouchableOpacity onPress={() => onPress("all")}>
                <Text style={getTextStyle("all")}>All ({countByStatus.all})</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onPress("inProgress")}>
                <Text style={getTextStyle("inProgress")}>In progress ({countByStatus.inProgress})</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onPress("done")}>
                <Text style={getTextStyle("done")}>Done ({countByStatus.done})</Text>
            </TouchableOpacity>
        </View>
    );
}