import { Image, Text } from "react-native";
import { s } from "./Header.style";
import headerlogo from "../../assets/logo_todo.png";
import { View } from "react-native";

// Composant Header composé d'un logo et d'un texte
export function Header() {
    return (
        <View style={{flex: 1, justifyContent: "center", gap: -30}}>
            <Image style={s.img} source={headerlogo} resizeMode="contain" />
            <Text style={s.subtitle}>To Do List</Text>
        </View>
    );
}