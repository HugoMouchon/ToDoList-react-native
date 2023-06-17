import { View, Text } from "react-native";
import { s } from "./TabBottomMenu.style";
import { TouchableOpacity } from "react-native";

export function TabBottomMenu({ selectedTabName, onPress }) {

    function getTextStyle(tabName) {
        return {
            fontWeight: "bold",
            color: tabName === selectedTabName ? "#2F76E5" : "black",
        };
    }

    return (
        <View style={s.container}>
            <TouchableOpacity onPress={()=> onPress("All")}>
                <Text style={getTextStyle("All")}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> onPress("In progress")}>
                <Text style={getTextStyle("In progress")}>In progress</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> onPress("Done")}>
                <Text style={getTextStyle("Done")}>Done</Text>
            </TouchableOpacity>
        </View>
    );
}