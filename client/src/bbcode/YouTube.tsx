import React from 'react';
import { WebView } from 'react-native-webview';

export const YouTube: React.FC<{ videoId: string }> = ({ videoId }) => (
  <WebView
    javaScriptEnabled={true}
    domStorageEnabled={true}
    allowsInlineMediaPlayback={true}
    testID="bbcode-youtube"
    source={{
      uri: `https://www.youtube.com/embed/${videoId}?playsinline=1&fs=1`,
    }}
  />
);
