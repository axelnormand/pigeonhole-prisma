import React from 'react';
import { Linking } from 'react-native';
import {
  render as testRender,
  getNodeText,
  fireEvent,
} from '@testing-library/react-native';
import { parse } from './bbcode';
import { ApplicationProvider } from '@ui-kitten/components';
import { mapping } from '@eva-design/eva';

const openURLSpy = jest.spyOn(Linking, 'openURL');

const render = (el: React.ReactNode) =>
  testRender(
    <ApplicationProvider
      mapping={mapping}
      theme={{
        'text-primary-color': '#fff',
        'text-basic-color': '#ff2',
      }}
    >
      {el}
    </ApplicationProvider>,
  );

it('works with no bbcode', () => {
  const text = 'Hello dude';
  const { getByTestId, asJSON } = render(parse(text));

  expect(asJSON()).toMatchSnapshot();
  expect(getNodeText(getByTestId('bbcode-plain'))).toEqual(text);
});

it('works with bold bbcode', () => {
  const text = 'Hello [b]dude[/b] wassup';
  const { getByTestId, getAllByTestId, asJSON } = render(parse(text));

  expect(asJSON()).toMatchSnapshot();
  expect(getNodeText(getByTestId('bbcode-bold'))).toEqual('dude');
  const plainTexts = getAllByTestId('bbcode-plain');
  expect(getNodeText(plainTexts[0])).toEqual('Hello ');
  expect(getNodeText(plainTexts[1])).toEqual(' wassup');
});

it('works with url bbcode', () => {
  const url = 'https://dude.com';
  const text = `Hello [url]${url}[/url] wassup`;
  const { getByTestId, asJSON } = render(parse(text));

  expect(asJSON()).toMatchSnapshot();
  const urlComp = getByTestId('bbcode-url');
  expect(getNodeText(urlComp)).toEqual(url);

  fireEvent.press(urlComp);
  expect(openURLSpy).toBeCalledWith(url);
});

it('works with url and link text bbcode', () => {
  const linkText = `DUDE`;
  const url = 'https://dude.com';
  const text = `Hello [url=${url}]${linkText}[/url] wassup`;
  const { getByTestId, asJSON } = render(parse(text));

  expect(asJSON()).toMatchSnapshot();
  const urlComp = getByTestId('bbcode-url');
  expect(getNodeText(urlComp)).toEqual(linkText);

  fireEvent.press(urlComp);
  expect(openURLSpy).toBeCalledWith(url);
});

it('works with url in quotes and link text bbcode', () => {
  const linkText = `DUDE`;
  const url = 'https://dude.com';
  const text = `Hello [url="${url}"]${linkText}[/url] wassup`;
  const { getByTestId, asJSON } = render(parse(text));

  expect(asJSON()).toMatchSnapshot();
  const urlComp = getByTestId('bbcode-url');
  expect(getNodeText(urlComp)).toEqual(linkText);

  fireEvent.press(urlComp);
  expect(openURLSpy).toBeCalledWith(url);
});

it('works with url auto matcher', () => {
  const url = 'https://dude.com';
  const text = `Hello ${url} wassup`;
  const { getByTestId, asJSON } = render(parse(text));

  expect(asJSON()).toMatchSnapshot();
  const urlComp = getByTestId('bbcode-url');
  expect(getNodeText(urlComp)).toEqual(url);

  fireEvent.press(urlComp);
  expect(openURLSpy).toBeCalledWith(url);
});

it('works with url auto matcher, trailing slash', () => {
  const url = 'https://dude.com/';
  const text = `Hello ${url} wassup`;
  const { getByTestId, asJSON } = render(parse(text));

  expect(asJSON()).toMatchSnapshot();
  const urlComp = getByTestId('bbcode-url');
  expect(getNodeText(urlComp)).toEqual(url);

  fireEvent.press(urlComp);
  expect(openURLSpy).toBeCalledWith(url);
});

it('works with url auto matcher, query params', () => {
  const url = 'https://dude.com/?foo=bar';
  const text = `Hello ${url} wassup`;
  const { getByTestId, asJSON } = render(parse(text));

  expect(asJSON()).toMatchSnapshot();
  const urlComp = getByTestId('bbcode-url');
  expect(getNodeText(urlComp)).toEqual(url);

  fireEvent.press(urlComp);
  expect(openURLSpy).toBeCalledWith(url);
});

it('works with youtube bbcode', () => {
  const videoId = '123';
  const text = `Hello [youtube]https://youtube.com/watch?v=${videoId}[/youtube] wassup`;
  const { getByTestId, asJSON } = render(parse(text));

  expect(asJSON()).toMatchSnapshot();
  const youtubeComp = getByTestId('bbcode-youtube');
  expect(youtubeComp.getProp('source')).toEqual({
    uri: `https://www.youtube.com/embed/${videoId}?playsinline=1&fs=1`,
  });
});

it('works with youtube auto replace (long domain)', () => {
  const videoId = '123';
  const text = `Hello https://youtube.com/watch?v=${videoId} wassup`;
  const { getByTestId, asJSON } = render(parse(text));

  expect(asJSON()).toMatchSnapshot();
  const youtubeComp = getByTestId('bbcode-youtube');
  expect(youtubeComp.getProp('source')).toEqual({
    uri: `https://www.youtube.com/embed/${videoId}?playsinline=1&fs=1`,
  });
});

it('works with youtube auto replace (short domain)', () => {
  const videoId = '123';
  const text = `Hello https://youtu.be/${videoId} wassup`;
  const { getByTestId, asJSON } = render(parse(text));

  expect(asJSON()).toMatchSnapshot();
  const youtubeComp = getByTestId('bbcode-youtube');
  expect(youtubeComp.getProp('source')).toEqual({
    uri: `https://www.youtube.com/embed/${videoId}?playsinline=1&fs=1`,
  });
});

it('works 2 bbcodes', () => {
  const text = '[i]Hello[/i] [b]dude[/b] wassup';
  const { getByTestId, asJSON } = render(parse(text));

  expect(asJSON()).toMatchSnapshot();
  expect(getNodeText(getByTestId('bbcode-italic'))).toEqual('Hello');
  expect(getNodeText(getByTestId('bbcode-bold'))).toEqual('dude');
  expect(getNodeText(getByTestId('bbcode-plain'))).toEqual(' wassup');
});

it('works with quote bbcode', () => {
  const name = 'Foo';
  const quoteText = 'hello, world';
  const text = `[quote=${name}]${quoteText}[/quote]`;
  const { getByTestId, asJSON } = render(parse(text));

  expect(asJSON()).toMatchSnapshot();
  expect(getNodeText(getByTestId('bbcode-quote-name'))).toContain(name);
  expect(getNodeText(getByTestId('bbcode-quote-text'))).toEqual(quoteText);
});

it('works with quote bbcode and more text', () => {
  const name = 'Foo';
  const quoteText = 'hello, world';
  const text = `Before [quote=${name}]${quoteText}[/quote] After`;
  const { getByTestId, asJSON } = render(parse(text));

  expect(asJSON()).toMatchSnapshot();
  expect(getNodeText(getByTestId('bbcode-quote-name'))).toContain(name);
  expect(getNodeText(getByTestId('bbcode-quote-text'))).toEqual(quoteText);
});

it('works with quote bbcode, name in quotes', () => {
  const name = 'Foo';
  const quoteText = 'hello, world';
  const text = `[quote="${name}"]${quoteText}[/quote]`;
  const { getByTestId, asJSON } = render(parse(text));

  expect(asJSON()).toMatchSnapshot();
  expect(getNodeText(getByTestId('bbcode-quote-name'))).toContain(name);
  expect(getNodeText(getByTestId('bbcode-quote-text'))).toBeDefined();
  expect(getNodeText(getByTestId('bbcode-plain'))).toEqual(quoteText);
});

it('works with quote bbcode and nested text bbcodes', () => {
  const name = 'Foo';
  const quoteText = '[i]Hello[/i] [b]dude[/b] wassup';
  const text = `[quote=${name}]${quoteText}[/quote]`;
  const { getByTestId, asJSON } = render(parse(text));

  expect(asJSON()).toMatchSnapshot();
  expect(getNodeText(getByTestId('bbcode-quote-name'))).toContain(name);

  // check nested text codes ok
  expect(getNodeText(getByTestId('bbcode-italic'))).toEqual('Hello');
  expect(getNodeText(getByTestId('bbcode-bold'))).toEqual('dude');
});
