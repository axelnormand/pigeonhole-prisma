import React from 'react';
import { WebView } from 'react-native-webview';

export const Bandcamp: React.FC<{ album?: string; track?: string }> = ({
  album,
  track,
}) => {
  if (album && track) {
    const url = `https://bandcamp.com/EmbeddedPlayer/album=${album}/size=large/artwork=small/bgcol=ffffff/linkcol=0687f5/tracklist=false/track=${track}`;
    return (
      <WebView
        testID="bbcode-bandcamp"
        style={{ flex: 1, width: '560px', height: '120px' }}
        source={{
          uri: url,
        }}
      />
    );
  }

  if (album) {
    const url = `https://bandcamp.com/EmbeddedPlayer/album=${album}/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=true`;
    return (
      <WebView
        testID="bbcode-bandcamp"
        style={{ flex: 1, width: '350px', height: '654px' }}
        source={{
          uri: url,
        }}
      />
    );
  }

  // just track
  const url = `https://bandcamp.com/EmbeddedPlayer/track=${track}/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false`;
  return (
    <WebView
      testID="bbcode-bandcamp"
      style={{ flex: 1, width: '350px', height: '442px' }}
      source={{
        uri: url,
      }}
    />
  );
};
