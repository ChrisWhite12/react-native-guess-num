import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Button, Alert } from 'react-native'
import Card from '../components/Card'

const genRndBetween = (min,max,exclude) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    const rndNum = Math.floor(Math.random() * (max - min)) + min

    if(rndNum === exclude){
        return genRndBetween(min,max,exclude)
    }
    else{
        return rndNum
    }
}

const GameScreen = props => {

    const [currGuess, setCurrGuess] = useState(genRndBetween(1,100, props.userNum))
    const [rounds,setRounds] = useState(0)
    const currentLow = useRef(1)
    const currentHigh = useRef(100)

    const { userNum, onGameOver } = props

    const handleNextGuess = direction => {
        if((direction === 'lower' && currGuess < userNum) || (direction === 'higher' && currGuess > userNum)){
            Alert.alert('Don\'t lie','Incorrect Hint',[{text: 'Okay', style: 'cancel'}])
            return
        }
        if(direction === 'lower'){
            currentHigh.current = currGuess
        }
        else{
            currentLow.current = currGuess
        }
        const nextNum = genRndBetween(currentLow.current,currentHigh.current, currGuess)
        setCurrGuess(nextNum)
        setRounds(curRounds => curRounds + 1)
    }

    useEffect(() => {
        if(currGuess === userNum){
            onGameOver(rounds)
        }
    },[currGuess, userNum, onGameOver])

    return (
        <View style={styles.screen}>
            <Text>
                Opponent's Guess
            </Text>
            <Text>
                {currGuess}
            </Text>
            <Text>
                {props.userNum}
            </Text>
            <Card style={styles.btnContainer}>
                <Button title="Lower" onPress={handleNextGuess.bind(this, 'lower')} />
                <Button title="Higher" onPress={handleNextGuess.bind(this, 'higher')} />
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    btnContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        margin: 20
    },
})

export default GameScreen