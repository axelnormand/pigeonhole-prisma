import React from 'react';
import Image from 'react-native-scalable-image';
import { Dimensions } from 'react-native';

export const Img: React.FC<{ url: string }> = ({ url }) => (
  <Image
    width={Dimensions.get('window').width} // height will be calculated automatically
    source={{ uri: url }}
  />
);
