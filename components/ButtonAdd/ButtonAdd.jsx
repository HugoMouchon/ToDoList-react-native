import { TouchableOpacity, Text } from "react-native";
import { s } from "./ButtonAdd.style";

// Composant qui permet de créer une tâche
export function ButtonAdd({ onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={s.btn}>
            <Text style={s.text}>+ New todo</Text>
        </TouchableOpacity>
    );
}