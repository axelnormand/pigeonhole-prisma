import React from 'react';

export const Soundcloud: React.FC<{ url: string }> = ({ url }) => {
  const soundcloudUrl = `https://w.soundcloud.com/player/?url=${url}&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true`;
  return <iframe width="700" height="550" scrolling="no" src={soundcloudUrl} />;
};
