import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView
} from "react-native";

import BodyText from "../components/BodyText";
import Card from "../components/Card";
import Input from "../components/Input";
import StartButton from "../components/StartButton";
import TitleText from "../components/TitleText";
import Colors from "../constants/colors";

const StartScreen = (props) => {
    const [enteredValue, setEnteredValue] = useState("");
    const [conf, setConf] = useState(false);
    const [selNum, setSelNum] = useState("");
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4)

    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 4)
        }

        Dimensions.addEventListener('change', updateLayout)

        return () => {
            Dimensions.removeEventListener('change', updateLayout)
        }
    })


    

    

    const handleNumberInput = (inputText) => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ""));
    };

    const handleResetPress = () => {
        setEnteredValue("");
    };

    const handleConfirmPress = () => {
        const pickedNumber = parseInt(enteredValue);

        if (isNaN(pickedNumber) || pickedNumber <= 0 || pickedNumber > 99) {
        Alert.alert("Invalid Number!", "Has to be number between 1 and 99", [
            { text: "Okay", style: "destructive", onPress: handleResetPress },
        ]);
        return;
        }

        setConf(true);
        setEnteredValue("");
        setSelNum(parseInt(enteredValue));
    };

    let confimedOutput;
    if (conf) {
        confimedOutput = (
            <View>
                <View style={styles.confirmBox}>
                    <Text>Chosen Number: {selNum}</Text>
                </View>
                <View>
                    <StartButton title='Start game' onPress={() => props.onStart(selNum)} >
                        START GAME
                    </StartButton>
                </View>
            </View>
        );
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback
                onPress={() => {
                    Keyboard.dismiss();
                }}
                >
                <View style={styles.startScreen}>
                    <TitleText style={styles.title1}> Start a new game</TitleText>
                    {/* <View style={styles.inputContainer}> */}
                    <Card style={styles.inputContainer}>
                    <BodyText style={styles.text}>Select a Number</BodyText>

                    <Input
                        style={styles.inputField}
                        blurOnSubmit
                        keyboardType="number-pad"
                        maxLength={2}
                        autoCorrect={false}
                        onChangeText={handleNumberInput}
                        value={enteredValue}
                    />

                    <View style={styles.btnContainer}>
                        <View style={{width: buttonWidth}}>
                        <Button
                            title="Reset"
                            onPress={handleResetPress}
                            color={Colors.primary}
                        />
                        </View>

                        <View style={{width: buttonWidth}}>
                        <Button
                            title="Confirm"
                            onPress={handleConfirmPress}
                            color={Colors.secondary}
                        />
                        </View>
                    </View>
                    </Card>
                    {confimedOutput}
                </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    startScreen: {
        flex: 1,
        padding: 10,
        alignItems: "center",
    },
    title1: {
        fontSize: 25,
        marginVertical: 20
    },
    btnContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal: 20,
    },
    inputContainer: {
        width: "80%",
        maxWidth: "95%",
        minWidth: 300,
        alignItems: "center",
    },
    inputField: {
        width: "80%",
        textAlign: "center",
    },
    // buttons: {
    //     // width: "45%",
    //     width: Dimensions.get('window').width / 4
    // },
    confirmBox: {
        margin: 10,
        height: 30,
        borderBottomColor: Colors.secondary,
        borderBottomWidth: 2
    },
    startBtn: {
        margin: 10
    },
    text: {
        fontFamily: 'open-sans'
    }

});

export default StartScreen;
