import React from 'react';
import { WebView } from 'react-native-webview';

export const Soundcloud: React.FC<{ url: string }> = ({ url }) => {
  const soundcloudUrl = `https://w.soundcloud.com/player/?url=${url}&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true`;
  return (
    <WebView
      testID="bbcode-soundcloud"
      style={{ flex: 1 }}
      source={{
        uri: soundcloudUrl,
      }}
    />
  );
};
