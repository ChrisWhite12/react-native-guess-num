import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    Alert,
    ScrollView,
    Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Card from "../components/Card";
import StartButton from "../components/StartButton";
import BodyText from "../components/BodyText";

const genRndBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
        return genRndBetween(min, max, exclude);
    } else {
        return rndNum;
    }
};

const renderListItem = (value,numRound) => {
    return (
        <View key={value} style={styles.listItem}>
            <BodyText>#{numRound}</BodyText>
            <BodyText style={styles.listItemText}>{value}</BodyText>
        </View>
    )
}

const GameScreen = (props) => {
    const initGuess = genRndBetween(1, 100, props.userNum);
    const [currGuess, setCurrGuess] = useState(initGuess);
    // const [rounds,setRounds] = useState(0)
    const [pastGuess, setPastGuess] = useState([initGuess]);
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
        Dimensions.get('window').height
    )
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
        Dimensions.get('window').width
    )
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userNum, onGameOver } = props;

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


    const handleNextGuess = (direction) => {
        if ((direction === "lower" && currGuess < userNum) ||
            (direction === "higher" && currGuess > userNum)) {
            Alert.alert("Don't lie", "Incorrect Hint", [
            { text: "Okay", style: "cancel" },
            ]);
            return;
        }
        if (direction === "lower") {
            currentHigh.current = currGuess;
        } else {
            currentLow.current = currGuess + 1;
        }

        const nextNum = genRndBetween(
        currentLow.current,
        currentHigh.current,
        currGuess
        );

        setCurrGuess(nextNum);
        setPastGuess((curPastGuess) => [nextNum, ...curPastGuess]);
        // console.log(pastGuess)
        // setRounds(curRounds => curRounds + 1)
    };

    useEffect(() => {
        if (currGuess === userNum) {
            onGameOver(pastGuess.length);
        }
    }, [currGuess, userNum, onGameOver]);

    if(availableDeviceHeight < 500){
        return (
            <View style={styles.screen}>
                <Text>Opponent's Guess</Text>
                <View style={styles.controls}>
                    <StartButton
                    title="Lower"
                    onPress={handleNextGuess.bind(this, "lower")}
                    >
                    <Ionicons name="md-remove" color="white" size={24} />
                    </StartButton>
                    <Text style={styles.numContainer}>{currGuess}</Text>
                    
                    <StartButton
                    title="Higher"
                    onPress={handleNextGuess.bind(this, "higher")}
                    >
                    <Ionicons name="md-add" color="white" size={24} />
                    </StartButton>
                </View>
                <View style={styles.mainList}>
                    <ScrollView contentContainerStyle={styles.list}>
                        {pastGuess.map((guess,index) => renderListItem(guess, pastGuess.length - index))}
                    </ScrollView>
                </View>
            </View>
        )
    }

    return (
        <ScrollView>
            <View style={styles.screen}>
                <Text>Opponent's Guess</Text>
                <Text style={styles.numContainer}>{currGuess}</Text>
                <Card style={styles.btnContainer}>
                    <StartButton
                    title="Lower"
                    onPress={handleNextGuess.bind(this, "lower")}
                    >
                    <Ionicons name="md-remove" color="white" size={24} />
                    </StartButton>
                    <StartButton
                    title="Higher"
                    onPress={handleNextGuess.bind(this, "higher")}
                    >
                    <Ionicons name="md-add" color="white" size={24} />
                    </StartButton>
                </Card>
                <View style={styles.mainList}>
                    <ScrollView contentContainerStyle={styles.list}>
                        {pastGuess.map((guess,index) => renderListItem(guess, pastGuess.length - index))}
                    </ScrollView>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",
    },
    btnContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-around",
        paddingHorizontal: 20,
        margin: (Dimensions.get('window').height > 600) ? 20 : 10,
    },
    mainList: {
        width: (Dimensions.get('window').width > 350) ? '60%': '80%',
        flex: 1
    },
    list: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "flex-end"
    },
    listItemText: {
        color: 'black',
        height: 50,
    },
    listItem: {
        borderColor: '#55a',
        padding: 15,
        borderWidth: 2,
        margin: 10,
        flexDirection: "row",
        justifyContent: 'space-around',
        width: "50%"
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80%',
    },
    numContainer: {
        borderColor: '#cab',
        borderWidth: 2,
        borderRadius: 5,
        width: '30%',
        textAlign: 'center',
        fontSize: 20
    }
});

export default GameScreen;
