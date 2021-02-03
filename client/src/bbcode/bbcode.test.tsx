import React from 'react';
import { Linking } from 'react-native';
import {
  render as testRender,
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
  const parsed = parse(text);
  const { getByTestId, toJSON } = render(parsed);

  expect(toJSON()).toMatchSnapshot();
  expect(getByTestId('bbcode-plain')).toEqual(text);
});

it('works with bold bbcode', () => {
  const text = 'Hello [b]dude[/b] wassup';
  const { getByTestId, getAllByTestId, toJSON } = render(parse(text));

  expect(toJSON()).toMatchSnapshot();
  expect(getByTestId('bbcode-bold')).toEqual('dude');
  const plainTexts = getAllByTestId('bbcode-plain');
  expect(plainTexts[0]).toEqual('Hello ');
  expect(plainTexts[1]).toEqual(' wassup');
});

it('works with url bbcode', () => {
  const url = 'https://dude.com';
  const text = `Hello [url]${url}[/url] wassup`;
  const { getByTestId, toJSON } = render(parse(text));

  expect(toJSON()).toMatchSnapshot();
  const urlComp = getByTestId('bbcode-url');
  expect(urlComp).toEqual(url);

  fireEvent.press(urlComp);
  expect(openURLSpy).toBeCalledWith(url);
});

it('works with url and link text bbcode', () => {
  const linkText = `DUDE`;
  const url = 'https://dude.com';
  const text = `Hello [url=${url}]${linkText}[/url] wassup`;
  const { getByTestId, toJSON } = render(parse(text));

  expect(toJSON()).toMatchSnapshot();
  const urlComp = getByTestId('bbcode-url');
  expect(urlComp).toEqual(linkText);

  fireEvent.press(urlComp);
  expect(openURLSpy).toBeCalledWith(url);
});

it('works with url in quotes and link text bbcode', () => {
  const linkText = `DUDE`;
  const url = 'https://dude.com';
  const text = `Hello [url="${url}"]${linkText}[/url] wassup`;
  const { getByTestId, toJSON } = render(parse(text));

  expect(toJSON()).toMatchSnapshot();
  const urlComp = getByTestId('bbcode-url');
  expect(urlComp).toEqual(linkText);

  fireEvent.press(urlComp);
  expect(openURLSpy).toBeCalledWith(url);
});

it('works with url auto matcher', () => {
  const url = 'https://dude.com';
  const text = `Hello ${url} wassup`;
  const { getByTestId, toJSON } = render(parse(text));

  expect(toJSON()).toMatchSnapshot();
  const urlComp = getByTestId('bbcode-url');
  expect(urlComp).toEqual(url);

  fireEvent.press(urlComp);
  expect(openURLSpy).toBeCalledWith(url);
});

it('works with url auto matcher, trailing slash', () => {
  const url = 'https://dude.com/';
  const text = `Hello ${url} wassup`;
  const { getByTestId, toJSON } = render(parse(text));

  expect(toJSON()).toMatchSnapshot();
  const urlComp = getByTestId('bbcode-url');
  expect(urlComp).toEqual(url);

  fireEvent.press(urlComp);
  expect(openURLSpy).toBeCalledWith(url);
});

it('works with url auto matcher, query params', () => {
  const url = 'https://dude.com/?foo=bar';
  const text = `Hello ${url} wassup`;
  const { getByTestId, toJSON } = render(parse(text));

  expect(toJSON()).toMatchSnapshot();
  const urlComp = getByTestId('bbcode-url');
  expect(urlComp).toEqual(url);

  fireEvent.press(urlComp);
  expect(openURLSpy).toBeCalledWith(url);
});

it('works with newlines', () => {
  const text = `Line 1\nLine 2 `;
  const { toJSON, getByTestId } = render(parse(text));

  expect(toJSON()).toMatchSnapshot();

  //retains the newlines
  expect(getByTestId('bbcode-plain')).toEqual(text);
});

it('works with newline and url', () => {
  const linkText = `Line 1\nLine 2`;
  const url = 'https://dude.com';
  const text = `Hello [url="${url}"]${linkText}[/url] wassup`;
  const { getByTestId, toJSON } = render(parse(text));

  const urlComp = getByTestId('bbcode-url');
  expect(urlComp).toEqual(linkText);

  fireEvent.press(urlComp);
  expect(openURLSpy).toBeCalledWith(url);

  expect(toJSON()).toMatchSnapshot();
});

it('works with newline and url auto match', () => {
  const url = 'https://dude.com/';
  const text = `Line 1\n${url}`;
  const { getByTestId, toJSON } = render(parse(text));

  expect(toJSON()).toMatchSnapshot();
  const urlComp = getByTestId('bbcode-url');
  expect(urlComp).toEqual(url);

  //retains the newline
  expect(getByTestId('bbcode-plain')).toEqual(`Line 1\n`);
});

it('works with newline and url auto match 1st', () => {
  const url = 'https://dude.com/';
  const text = `${url}\nLine 2\n`;
  const { getByTestId, toJSON } = render(parse(text));

  expect(toJSON()).toMatchSnapshot();
  const urlComp = getByTestId('bbcode-url');
  expect(urlComp).toEqual(url);

  //retains the newline
  expect(getByTestId('bbcode-plain')).toEqual(`\nLine 2\n`);
});

it('works with youtube bbcode', () => {
  const videoId = '123Abc';
  const text = `Hello [youtube]https://youtube.com/watch?v=${videoId}[/youtube] wassup`;
  const { getByTestId, toJSON } = render(parse(text));

  expect(toJSON()).toMatchSnapshot();
  const youtubeComp = getByTestId('bbcode-youtube');
  expect(youtubeComp.findByProps({ props: 'source' })).toEqual({
    uri: `https://www.youtube.com/embed/${videoId}?playsinline=1&fs=1`,
  });
});

it('works with youtube auto replace (long domain with www)', () => {
  const videoId = '123Abc';
  const text = `Hello https://www.youtube.com/watch?v=${videoId} wassup`;
  const { getByTestId, toJSON } = render(parse(text));

  expect(toJSON()).toMatchSnapshot();
  const youtubeComp = getByTestId('bbcode-youtube');
  expect(youtubeComp.findByProps({ props: 'source' })).toEqual({
    uri: `https://www.youtube.com/embed/${videoId}?playsinline=1&fs=1`,
  });
});

it('works with youtube auto replace (long domain without www)', () => {
  const videoId = '123Abc';
  const text = `Hello https://youtube.com/watch?v=${videoId} wassup`;
  const { getByTestId, toJSON } = render(parse(text));

  expect(toJSON()).toMatchSnapshot();
  const youtubeComp = getByTestId('bbcode-youtube');
  expect(youtubeComp.findByProps({ props: 'source' })).toEqual({
    uri: `https://www.youtube.com/embed/${videoId}?playsinline=1&fs=1`,
  });
});

it('works with youtube auto replace (short domain)', () => {
  const videoId = '123Abc';
  const text = `Hello https://youtu.be/${videoId} wassup`;
  const { getByTestId, toJSON } = render(parse(text));

  expect(toJSON()).toMatchSnapshot();
  const youtubeComp = getByTestId('bbcode-youtube');
  expect(youtubeComp.findByProps({ props: 'source' })).toEqual({
    uri: `https://www.youtube.com/embed/${videoId}?playsinline=1&fs=1`,
  });
});

it('works 2 bbcodes', () => {
  const text = '[i]Hello[/i] [b]dude[/b] wassup';
  const { getByTestId, toJSON, queryAllByTestId } = render(parse(text));

  expect(toJSON()).toMatchSnapshot();
  expect(getByTestId('bbcode-italic')).toEqual('Hello');
  expect(getByTestId('bbcode-bold')).toEqual('dude');
  const plainTexts = queryAllByTestId('bbcode-plain');
  expect(plainTexts[0]).toEqual(' ');
  expect(plainTexts[1]).toEqual(' wassup');
});

it('works with underline', () => {
  const text = 'Hello [u]dude[/u]';
  const { getByTestId, toJSON, queryAllByTestId } = render(parse(text));

  expect(toJSON()).toMatchSnapshot();
  expect(getByTestId('bbcode-underline')).toEqual('dude');
  expect(getByTestId('bbcode-plain')).toEqual('Hello ');
});

it('works with quote bbcode and name', () => {
  const name = 'Foo';
  const quoteText = 'hello, world';
  const text = `[quote=${name}]${quoteText}[/quote]`;
  const { getByTestId, toJSON } = render(parse(text));

  expect(toJSON()).toMatchSnapshot();
  expect(getByTestId('bbcode-quote-name')).toContain(name);
  expect(getByTestId('bbcode-quote-text')).toBeDefined();
  expect(getByTestId('bbcode-plain')).toEqual(quoteText);
});

it('works with quote bbcode in quotes and name', () => {
  const name = 'Foo';
  const quoteText = 'hello, world';
  const text = `[quote="${name}"]${quoteText}[/quote]`;
  const { getByTestId, toJSON } = render(parse(text));

  expect(getByTestId('bbcode-quote-name')).toContain(name);
  expect(getByTestId('bbcode-quote-text')).toBeDefined();
  expect(getByTestId('bbcode-plain')).toEqual(quoteText);
  expect(toJSON()).toMatchSnapshot();
});

it('works with quote bbcode and no name', () => {
  const quoteText = 'hello, world';
  const text = `[quote]${quoteText}[/quote]`;
  const { getByTestId, queryByTestId, toJSON } = render(parse(text));

  expect(toJSON()).toMatchSnapshot();
  expect(queryByTestId('bbcode-quote-name')).toBeNull();
  expect(getByTestId('bbcode-plain')).toEqual(quoteText);
});

it('works with newline and quote with name=', () => {
  const name = 'Foo';
  const quoteText = `Line 1\nLine 2`;
  const afterText = `I'm After`;
  const text = `[quote name=${name}]${quoteText}[/quote]${afterText}`;
  const { getByTestId, toJSON, queryAllByTestId } = render(parse(text));

  expect(getByTestId('bbcode-quote-name')).toContain(name);
  //retains the newline
  const plainTexts = queryAllByTestId('bbcode-plain');
  expect(plainTexts[0]).toEqual(quoteText);
  expect(plainTexts[1]).toEqual(afterText);
  expect(toJSON()).toMatchSnapshot();
});

it('works with quote bbcode and more text', () => {
  const before = 'Before ';
  const after = ' After';
  const name = 'Foo';
  const quoteText = 'hello, world';
  const text = `${before}[quote=${name}]${quoteText}[/quote]${after}`;
  const { getByTestId, queryAllByTestId, toJSON } = render(parse(text));

  expect(toJSON()).toMatchSnapshot();
  expect(getByTestId('bbcode-quote-name')).toContain(name);

  const plainTexts = queryAllByTestId('bbcode-plain');
  expect(plainTexts.length).toEqual(3);
  expect(plainTexts[0]).toEqual(before);
  expect(plainTexts[1]).toEqual(quoteText);
  expect(plainTexts[2]).toEqual(after);
});

it('works with quote bbcode, name in quotes', () => {
  const name = 'Foo';
  const quoteText = 'hello, world';
  const text = `[quote="${name}"]${quoteText}[/quote]`;
  const { getByTestId, toJSON } = render(parse(text));

  expect(toJSON()).toMatchSnapshot();
  expect(getByTestId('bbcode-quote-name')).toContain(name);
  expect(getByTestId('bbcode-plain')).toEqual(quoteText);
});

it('works with quote bbcode and nested text bbcodes', () => {
  const name = 'Foo';
  const quoteText = '[i]Hello[/i] [b]dude[/b] wassup';
  const text = `[quote=${name}]${quoteText}[/quote]`;
  const { getByTestId, toJSON } = render(parse(text));

  expect(toJSON()).toMatchSnapshot();
  expect(getByTestId('bbcode-quote-name')).toContain(name);

  // check nested text codes ok
  expect(getByTestId('bbcode-italic')).toEqual('Hello');
  expect(getByTestId('bbcode-bold')).toEqual('dude');
});

it(`Quote first, bold in quote, other codes, real example`, () => {
  const text = `[quote=dereksoul]I really liked the sound of [b]Michael[/b].[/quote]
  Cool. For what it's worth i was surprisingly underwhelmed when i saw them at Raw Power last year but they were on pretty early and that might have been more down to me than them. All other evidence points to this record being good and this launch show being a lot of fun.
  
  I have no doubt laboured this point on here many times but this band is essentially [b]Bad Guys[/b] who were amazing with a different, probably not as good, singer. Check 'em out. PJ from both bands makes some [url=https://www.youtube.com/watch?v=0UPJiLSdzEg]amazing[/url], [url=https://www.youtube.com/watch?v=gcZ3oxMhpmU]hilarious[/url] videos.`;

  const { getAllByTestId, getByTestId, toJSON } = render(parse(text));
  const boldTexts = getAllByTestId('bbcode-bold');
  expect(boldTexts[0]).toEqual('Michael');
  expect(boldTexts[1]).toEqual('Bad Guys');

  expect(getByTestId('bbcode-quote-name')).toContain('dereksoul');

  const plainTexts = getAllByTestId('bbcode-plain');
  expect(plainTexts[0]).toContain('I really liked');
  expect(plainTexts[2]).toContain(
    'I have no doubt laboured this point',
  );
  expect(plainTexts[5]).toContain('videos');

  const urlTexts = getAllByTestId('bbcode-url');
  expect(urlTexts[0]).toContain('amazing');
  expect(urlTexts[1]).toContain('hilarious');

  expect(toJSON()).toMatchSnapshot();
});

it(`Quote first, youtube in quote, real example`, () => {
  const text = `[quote=Leth]Quite like that Caribou track. Can't say anything in that Pitchfork list is of any interest to me but i'm sure there's other good stuff on the way.
  I'm looking forward to the debut [b]Michael[/b] album.
  
  [youtube]https://www.youtube.com/watch?v=BJD5UQBPOwQ[/youtube]
  
  They are playing their album launch at the Shacklewell Arms on Saturday 1st Feb. Support from the thoroughly ace [b]We Wild Blood[/b] and the even wilder [b]MGF[/b]. Heaty on the decks. The whole night is going to be killer. Did i mention it was a Saturday night? Come on down. Tickets are [url=https://dice.fm/partner/lnzrt-ltd/event/w2bep-michael-debut-album-launch-1st-feb-the-shacklewell-arms-london-tickets?_branch_match_id=462617361746934257]£4.50![/url][/quote]
  I really wanna go to this but haven't got any fixed plans for that weekend. Byrne's down so it depends whether I can get any of the £15 tix for the national theatre or not or whether we just wanna hang home. Sounding good though, but I can't see any of the band, where's the doude with the fringe?`;

  const { getAllByTestId, getByTestId, toJSON } = render(parse(text));
  const boldTexts = getAllByTestId('bbcode-bold');
  expect(boldTexts[0]).toEqual('Michael');
  expect(boldTexts[1]).toEqual('We Wild Blood');
  expect(boldTexts[2]).toEqual('MGF');

  expect(getByTestId('bbcode-quote-name')).toContain('Leth');

  const plainTexts = getAllByTestId('bbcode-plain');
  expect(plainTexts[0]).toContain('Quite like that Caribou track');
  expect(plainTexts[2]).toContain('Shacklewell Arms');

  const urlTexts = getAllByTestId('bbcode-url');
  expect(urlTexts[0]).toContain('£4.50!');

  const youtubeComp = getByTestId('bbcode-youtube');
  expect(youtubeComp.findByProps({ props: 'source' })).toEqual({
    uri: expect.stringContaining('BJD5'),
  });

  expect(toJSON()).toMatchSnapshot();
});
