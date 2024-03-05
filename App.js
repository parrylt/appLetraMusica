import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  Button
} from 'react-native';
import { Audio } from 'expo-av';

export default function App() {

  const [sound, setSound] = useState();
  const [lyrics, setLyrics] = useState('');

  useEffect(() => {
    const fetchLyrics = async () => {
      try {
        const response = await fetch('https://api.lyrics.ovh/v1/Florence-and-The-Machine/Mermaids');
        if (!response.ok) {
          throw new Error('Erro fatal.');
        }
        const data = await response.json();
        setLyrics(data.lyrics);
      } catch (error) {
        console.error('Erro:', error);
      }
    };
    fetchLyrics();
  }, []);

  async function playSound() {
    console.log('Carregando');
    const { sound } = await Audio.Sound.createAsync( require('./assets/Mermaids.mp3')
    );
    setSound(sound);

    console.log('Tocando');
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Descarregando');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
<View>

    <Image
        source={require('./assets/fundo.jpg')}
        style={styles.backgroundImage}
      />

    <ScrollView>
    <View style={styles.container}>
    <Button title="Começar música" onPress={playSound} />
      <Text style={styles.lyricsText}>{'\n'}{lyrics}</Text>
    </View>
    </ScrollView>

</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginBottom: 221,
  },
  lyricsText: {
    textAlign: 'center',
    fontSize: 18,

  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
});