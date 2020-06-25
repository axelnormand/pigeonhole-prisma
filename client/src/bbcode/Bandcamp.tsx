import React from 'react';
import ReactYoutube from 'react-youtube';

export const Bandcamp: React.FC<{ album?: string; track?: string }> = ({
  album,
  track,
}) => {
  if (album && track) {
    const url = `https://bandcamp.com/EmbeddedPlayer/album=${album}/size=large/artwork=small/bgcol=ffffff/linkcol=0687f5/tracklist=false/track=${track}`;
    return (
      <iframe
        style={{ border: 0, width: '560px', height: '120px' }}
        src={url}
        seamless
      />
    );
  }

  if (album) {
    const url = `https://bandcamp.com/EmbeddedPlayer/album=${album}/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=true`;
    return (
      <iframe
        style={{ border: 0, width: '350px', height: '654px' }}
        src={url}
        seamless
      />
    );
  }

  // just track
  const url = `https://bandcamp.com/EmbeddedPlayer/track=${track}/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false`;
  return (
    <iframe
      style={{ border: 0, width: '350px', height: '442px' }}
      src={url}
      seamless
    />
  );
};
