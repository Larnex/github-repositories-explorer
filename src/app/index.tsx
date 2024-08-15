/* eslint-disable prettier/prettier */
import { Image, StyleSheet, Text } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';


const PartialLogo = require('../../assets/images/partial-react-logo.png');

export default function HomeScreen() {
      return (
            <ParallaxScrollView
                  headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
                  headerImage={<Image source={PartialLogo} style={styles.reactLogo} />}
            >
                  <Text className="text-xl text-charcoal-50">TEST</Text>
            </ParallaxScrollView>
      );
}

const styles = StyleSheet.create({
      titleContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
      },
      stepContainer: {
            gap: 8,
            marginBottom: 8,
      },
      reactLogo: {
            height: 178,
            width: 290,
            bottom: 0,
            left: 0,
            position: 'absolute',
      },
});
