import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Card = props => {
    return (
        <View style={{...styles.card, ...props.style}}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        shadowColor: "#ddd",
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 5,
        shadowOpacity: 0.3,
        elevation: 5,
        backgroundColor: 'white',
        padding: 30,
        borderRadius: 20
    }
})

export default Card