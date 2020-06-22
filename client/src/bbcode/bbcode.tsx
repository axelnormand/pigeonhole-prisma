import React from 'react';
import { Img } from './Img';
import { Bold } from './Bold';
import { Italic } from './Italic';
import { Url } from './Url';
import { YouTube } from './YouTube';
import { Quote } from './Quote';

type Code = {
  regex: string;
  replace(matches: string[]): React.ReactElement;
};

/** codes that surround text only */
const textCodes: Code[] = [
  {
    regex: '\\[img\\](.+?)\\[/img\\]',
    replace: (matches: string[]) => <Img url={matches[0]} />,
  },
  {
    regex: '\\[img=(.+?)\\]',
    replace: (matches: string[]) => <Img url={matches[0]} />,
  },
  {
    regex: '\\[b\\](.+?)\\[/b\\]',
    replace: (matches: string[]) => <Bold>{matches[0]}</Bold>,
  },
  {
    regex: '\\[i\\](.+?)\\[/i\\]',
    replace: (matches: string[]) => <Italic>{matches[0]}</Italic>,
  },
  {
    regex: '\\[url\\](.+?)\\[/url\\]',
    replace: (matches: string[]) => <Url url={matches[0]}>{matches[0]}</Url>,
  },
  {
    regex: '\\[url="?(.+?)"?\\](.+?)\\[/url\\]',
    replace: (matches: string[]) => <Url url={matches[0]}>{matches[1]}</Url>,
  },
  {
    regex: '(http.+?) ',
    replace: (matches: string[]) => <Url url={matches[0]}>{matches[0]}</Url>,
  },
  {
    regex: '\\[youtube\\].*?youtube.*?v=(.*?)\\[/youtube\\]',
    replace: (matches: string[]) => <YouTube videoId={matches[0]} />,
  },
];

/** Codes that can wrap things (more like <View> than <Text>) */
const wrapperCodes: Code[] = [
  {
    regex: '\\[quote="?(.+?)"?\\](.+?)\\[/quote\\]',
    replace: (matches: string[]) => (
      <Quote name={matches[0]}>{matches[1]}</Quote>
    ),
  },
];

const parseCode = (
  text: string,
  code: Code,
): { before?: string; component?: React.ReactElement; after?: string } => {
  const matches = text.match(code.regex);
  if (!matches?.length) return {};
  const before = text.slice(0, matches.index);
  const component = code.replace(matches.slice(1));
  const after = matches.index
    ? text.slice(matches.index + matches[0].length)
    : undefined;
  return { before, after, component };
};

/**
 * recursively parse text into array of bbcode components based on passed in codes.
 * Mutates split array
 */
const doParse = (text: string, codes: Code[], splits: React.ReactNode[]) => {
  // split text into array of components and text (also a react node)
  codes.forEach((code) => {
    const { before, after, component } = parseCode(text, code);
    if (before) {
      splits.push(before);
    }
    if (component) {
      splits.push(component);
    }
    if (after) {
      const lengthBefore = splits.length;
      doParse(after, codes, splits);
      const lengthAfter = splits.length;
      if (lengthBefore === lengthAfter) {
        //no further splits so add after
        splits.push(after);
      }
    }
  });
};

const isReactElement = (el: React.ReactNode): el is React.ReactElement =>
  typeof el !== 'string';

/**
 * parse text into array of bbcode components
 */
export const parse = (text: string): React.ReactNode => {
  const splits: React.ReactNode[] = [];
  // split quotes first then text ones
  doParse(text, wrapperCodes, splits);

  if (!splits.length) {
    // no wrapper bbcodes found, look for text codes straight in text
    doParse(text, textCodes, splits);
  } else {
    // go through children of each wrapper code found and parse those for text codes
    splits.forEach((split) => {
      // if split is a react component, then parse the children as text
      const splitTexts = isReactElement(split)
        ? React.Children.toArray(split.props.children)
        : [split];
      splitTexts.forEach((splitText) => {
        doParse(splitText as string, textCodes, splits);
      });
    });
  }

  if (!splits.length) {
    // no bbcode
    return text;
  }
  return (
    <>
      {splits.map((split, index) => (
        <React.Fragment key={index}>{split}</React.Fragment>
      ))}
    </>
  );
};
