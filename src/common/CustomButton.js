import React from 'react';
import {View, Text} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';

import styles from './styles';

function CustomButton({title, onPress, testID}) {
  return (
    <RectButton disabled style={styles.button} {...{onPress, testID}}>
      <View accessible>
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </RectButton>
  );
}

export default CustomButton;
