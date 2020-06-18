import React from 'react';
import { render as testRender } from '@testing-library/react-native';
import { parse } from './bbcode';
import { ApplicationProvider } from '@ui-kitten/components';
import { mapping, dark } from '@eva-design/eva';

const render = (el: React.ReactNode) =>
  testRender(
    <ApplicationProvider mapping={mapping} theme={dark}>
      {el}
    </ApplicationProvider>,
  );

it('works with no bbcode', () => {
  const text = 'Hello dude';
  const { getByText } = render(parse(text));
  expect(getByText(/dude/)).toBeTruthy();
});

it('works with bold bbcode', () => {
  const text = 'Hello [b]dude[/b] wassup';
  const { asJSON } = render(parse(text));
  expect(asJSON()).toMatchInlineSnapshot(`
        Hello <Bold>dude</Bold> wassup
    `);
});

it('works with url bbcode', () => {
  const text = 'Hello [url]https://dude.com[/url] wassup';
  const { asJSON } = render(parse(text));
  expect(asJSON()).toMatchInlineSnapshot(`
    <Text status="primary" onPress={() => Linking.openURL("https://dude.com")}>
        https://dude.com
    </Text>
  `);
});

it('works with url and text bbcode', () => {
  const text = 'Hello [url=https://dude.com]DUDE[/url] wassup';
  const { asJSON } = render(parse(text));
  expect(asJSON()).toMatchInlineSnapshot(`
      <Text status="primary" onPress={() => Linking.openURL("https://dude.com")}>
          DUDE
      </Text>
  `);
});

it('works with youtube bbcode', () => {
  const text =
    'Hello [youtube]https://youtube.com?v=123&foo=barr[/youtube] wassup';
  const { asJSON } = render(parse(text));
  expect(asJSON()).toMatchInlineSnapshot(`
  <WebView
    javaScriptEnabled={true}
    domStorageEnabled={true}
    allowsInlineMediaPlayback={true}
    source={{
        uri: 'https://www.youtube.com/embed/123?playsinline=1&fs=1',
    }}
    />
  `);
});

it('works with 2 bbcodes', () => {
  const text = '[i]Hello[/i] [b]dude[/b] wassup';
  const { asJSON } = render(parse(text));
  expect(asJSON()).toMatchInlineSnapshot(`
    <Italic>Hello</Italic> <Bold>dude</Bold> wassup
  `);
});
