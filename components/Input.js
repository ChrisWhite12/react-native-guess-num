import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'

const Input = props => {
    return (
        <TextInput {...props} style={{...styles.inputField, ...props.style}}/>
    )
}

const styles = StyleSheet.create({
    inputField: {
        margin: 10,
        borderColor: 'black',
        borderWidth: 2,
        height: 30
    }
})

export default Input