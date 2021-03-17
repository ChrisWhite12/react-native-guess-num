import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Colors from '../constants/colors'
import TitleText from './TitleText'

const Header = props => {
    return (
        <View style={styles.header}>
            <TitleText>{props.title}</TitleText>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        height: 100,
        paddingTop: 40,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Header