import { StyleSheet } from "react-native";

export const s = StyleSheet.create({

    card: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        height: 115,
        borderRadius: 13,
        paddingHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },

    text: {
        fontSize: 20,
    },

    img: {
        width: 25,
        height: 25,
    },
})