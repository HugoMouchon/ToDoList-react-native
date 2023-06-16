import { Image } from "react-native";
import { s } from "./Header.style";
import { Text } from "react-native";
import headerlogo from "../../assets/logo_todolist.png";
import { View } from "react-native";

export function Header() {
    return (
        <>
            <Image style={s.img} source={headerlogo} resizeMode="contain" />
            <Text style={s.subtitle}>To Do List</Text>
        </>
    );
}