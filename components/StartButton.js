import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const StartButton = props => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>{props.children}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#cab',
        margin: 10,
        borderRadius: 10,
        height: 100,
        justifyContent: 'center'
    },
    buttonText: {
        color: '#555',
        fontFamily: 'open-sans',
        fontSize: 25,
        margin: 20
    }
})

export default StartButton