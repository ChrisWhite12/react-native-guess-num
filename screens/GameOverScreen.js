import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";

const GameOverScreen = (props) => {
    return (
        <View style={styles.screen}>
        <TitleText>Game Over</TitleText>
        <View style={styles.imageContainer}>
            <Image
            // source={require("../assets/success.png")}
            source={{
                uri:
                "https://cdn.pixabay.com/photo/2016/05/05/23/52/mountain-summit-1375015_960_720.jpg",
            }}
            style={styles.image}
            resizeMode="cover"
            />
        </View>
        <BodyText>
            Guesses: <Text style={styles.highlight}>{props.rounds} </Text>
            -- Number: {" "}
            <Text style={styles.highlight}>{props.userNumber}</Text>
        </BodyText>
        <Button title="New Game" onPress={props.onRestart} />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    imageContainer: {
        margin: 20,
        borderRadius: 150,
        borderWidth: 3,
        width: 300,
        height: 300,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    highlight: {
        color: '#ff7744',
        fontFamily: 'open-sans-bold'
    }
});

export default GameOverScreen;
