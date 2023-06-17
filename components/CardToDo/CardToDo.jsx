import { Image, Text, TouchableOpacity } from "react-native";
import check from "../../assets/check.png"
import { s } from './CardToDo.style';

// Composant de card qui contient: Un bouton dans lequel il y a un titre et une icône.
export function CardToDo({ todo, onPress, onLongPress }) {
    return (
        <TouchableOpacity onLongPress={() => onLongPress(todo)} onPress={() => onPress(todo)} style={s.card}>
            <Text style={[s.text, todo.isCompleted && { textDecorationLine: "line-through" }]}>
                {todo.title}
            </Text>
            {todo.isCompleted && <Image style={s.img} source={check} />}
        </TouchableOpacity>
    );
}