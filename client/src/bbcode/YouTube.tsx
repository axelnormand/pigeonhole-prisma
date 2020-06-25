import React from 'react';
import ReactYoutube from 'react-youtube';

export const YouTube: React.FC<{ videoId: string }> = ({ videoId }) => (
  <ReactYoutube videoId={videoId} />
);
