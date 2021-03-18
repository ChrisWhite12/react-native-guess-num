import React, { useEffect,useState } from "react";
import { View, Text, StyleSheet, Button, Image, Dimensions, ScrollView } from "react-native";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";

const GameOverScreen = (props) => {

    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
        Dimensions.get('window').height
    )
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
        Dimensions.get('window').width
    )

    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceWidth(Dimensions.get('window').width)
            setAvailableDeviceHeight(Dimensions.get('window').height)
        }

        Dimensions.addEventListener('change', updateLayout)

        return (() => {
            Dimensions.removeEventListener('change',updateLayout)
        })
    })

    return (
        <ScrollView>
            <View style={styles.screen}>
            <TitleText>Game Over</TitleText>
            <View style={{...styles.imageContainer,...{
                margin: Dimensions.get('window').height / 25,
                borderRadius: Dimensions.get('window').width * 0.7 / 2,
                width: Dimensions.get('window').width * 0.7,
                height: Dimensions.get('window').width * 0.7,
            }}}>
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
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    imageContainer: {
        borderWidth: 3,
        overflow: "hidden",
    },
    imageContainerResp: {
        margin: Dimensions.get('window').height / 25,
        borderRadius: Dimensions.get('window').width * 0.7 / 2,
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
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
