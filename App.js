import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import Header from "./components/Header";
import GameOverScreen from "./screens/GameOverScreen";
import GameScreen from "./screens/GameScreen";
import StartScreen from "./screens/StartScreen";
import TitleText from "./components/TitleText";

const fetchFonts = () => {
  Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [rounds, setRounds] = useState(0);
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={console.warn}
      />
    );
  }

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };

  const gameOverHandler = (numRounds) => {
    setRounds(numRounds);
  };

  const newGameHandler = () => {
    setRounds(0);
    setUserNumber(null);
  };

  let content = <StartScreen onStart={startGameHandler} />;

  if (userNumber && rounds <= 0) {
    content = <GameScreen userNum={userNumber} onGameOver={gameOverHandler} />;
  } else if (rounds > 0) {
    content = (
      <GameOverScreen
        rounds={rounds}
        userNumber={userNumber}
        onRestart={newGameHandler}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <Header title='Guess a Number' />
      {content}
    </View>
  );
}

styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
