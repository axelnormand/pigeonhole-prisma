import React from 'react';
import { Linking } from 'react-native';
import {
  render as testRender,
  getNodeText,
  fireEvent,
} from '@testing-library/react-native';
import { parse } from './bbcode';
import { ApplicationProvider } from '@ui-kitten/components';
import { mapping, dark } from '@eva-design/eva';

const openURLSpy = jest.spyOn(Linking, 'openURL');

const render = (el: React.ReactNode) =>
  testRender(
    <ApplicationProvider mapping={mapping} theme={dark}>
      {el}
    </ApplicationProvider>,
  );

it('works with no bbcode', () => {
  const text = 'Hello dude';
  expect(parse(text)).toEqual(text);
});

it('works with bold bbcode', () => {
  const text = 'Hello [b]dude[/b] wassup';
  const { getByTestId } = render(parse(text));
  expect(getNodeText(getByTestId('bbcode-bold'))).toEqual('dude');
});

it('works with url bbcode', () => {
  const url = 'https://dude.com';
  const text = `Hello [url]${url}[/url] wassup`;
  const { getByTestId, debug } = render(parse(text));
  debug();
  const urlComp = getByTestId('bbcode-url');
  expect(getNodeText(urlComp)).toEqual(url);

  fireEvent.press(urlComp);
  expect(openURLSpy).toBeCalledWith(url);
});

it('works with url and link text bbcode', () => {
  const linkText = `DUDE`;
  const url = 'https://dude.com';
  const text = `Hello [url=${url}]${linkText}[/url] wassup`;
  const { getByTestId } = render(parse(text));

  const urlComp = getByTestId('bbcode-url');
  expect(getNodeText(urlComp)).toEqual(linkText);

  fireEvent.press(urlComp);
  expect(openURLSpy).toBeCalledWith(url);
});

it('works with url in quotes and link text bbcode', () => {
  const linkText = `DUDE`;
  const url = 'https://dude.com';
  const text = `Hello [url="${url}"]${linkText}[/url] wassup`;
  const { getByTestId } = render(parse(text));

  const urlComp = getByTestId('bbcode-url');
  expect(getNodeText(urlComp)).toEqual(linkText);

  fireEvent.press(urlComp);
  expect(openURLSpy).toBeCalledWith(url);
});

it('works with url auto matcher', () => {
  const url = 'https://dude.com';
  const text = `Hello ${url} wassup`;
  const { getByTestId } = render(parse(text));

  const urlComp = getByTestId('bbcode-url');
  expect(getNodeText(urlComp)).toEqual(url);

  fireEvent.press(urlComp);
  expect(openURLSpy).toBeCalledWith(url);
});

it('works with youtube bbcode', () => {
  const videoId = '123';
  const text = `Hello [youtube]https://youtube.com?v=${videoId}[/youtube] wassup`;
  const { getByTestId } = render(parse(text));

  const youtubeComp = getByTestId('bbcode-youtube');
  expect(youtubeComp.getProp('source')).toEqual({
    uri: `https://www.youtube.com/embed/${videoId}?playsinline=1&fs=1`,
  });
});

it('works 2 bbcodes', () => {
  const text = '[i]Hello[/i] [b]dude[/b] wassup';
  const { getByTestId } = render(parse(text));

  expect(getNodeText(getByTestId('bbcode-italic'))).toEqual('Hello');
  expect(getNodeText(getByTestId('bbcode-bold'))).toEqual('dude');
});

it('works with quote bbcode', () => {
  const name = 'Foo';
  const quoteText = 'hello, world';
  const text = `[quote name=${name}]${quoteText}[/quote]`;
  const { getByTestId } = render(parse(text));

  expect(getNodeText(getByTestId('bbcode-quote-name'))).toEqual(name);
  expect(getNodeText(getByTestId('bbcode-quote-text'))).toEqual(quoteText);
});

it('works with quote bbcode, name in quotes', () => {
  const name = 'Foo';
  const quoteText = 'hello, world';
  const text = `[quote name="${name}"]${quoteText}[/quote]`;
  const { getByTestId } = render(parse(text));

  expect(getNodeText(getByTestId('bbcode-quote-name'))).toEqual(name);
  expect(getNodeText(getByTestId('bbcode-quote-text'))).toEqual(quoteText);
});

it('works with quote bbcode and nested text bbcodes', () => {
  const name = 'Foo';
  const quoteText = '[i]Hello[/i] [b]dude[/b] wassup';
  const text = `[quote name=${name}]${quoteText}[/quote]`;
  const { getByTestId } = render(parse(text));

  expect(getNodeText(getByTestId('bbcode-quote-name'))).toEqual(name);

  //check whole sentence there
  expect(getNodeText(getByTestId('bbcode-quote-text'))).toEqual(
    'Hello dude wassup',
  );

  // check nested text codes ok
  expect(getNodeText(getByTestId('bbcode-italic'))).toEqual('Hello');
  expect(getNodeText(getByTestId('bbcode-bold'))).toEqual('dude');
});
