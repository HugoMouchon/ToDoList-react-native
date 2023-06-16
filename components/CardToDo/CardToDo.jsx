import { Image, Text, TouchableOpacity } from "react-native";
import check from "../../assets/check.png"
import { s } from './CardToDo.style';


export function CardToDo({ todo, onPress }) {
    return (
        <TouchableOpacity onPress={() => onPress(todo)} style={s.card}>
            <Text style={[s.text, todo.isCompleted && { textDecorationLine: "line-through" }]}>
                {todo.title}
            </Text>
            {todo.isCompleted && <Image style={s.img} source={check} />}
        </TouchableOpacity>
    );
}