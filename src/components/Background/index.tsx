import React from 'react';
import { ImageBackground } from 'react-native';

import backgroundImg from '../../assets/background-galaxy.png';

import { styles } from './styles';

interface props {
    children: React.ReactNode
}

export function Background({children}:props) {
  return (
    <ImageBackground 
        defaultSource={backgroundImg}
        source={backgroundImg}
        style={styles.container} 
    >
        {children}
    </ImageBackground>
  );
}