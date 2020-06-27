import React from 'react';
import { Img } from './Img';
import { Bold } from './Bold';
import { Italic } from './Italic';
import { Url } from './Url';
import { YouTube } from './YouTube';
import { Quote } from './Quote';
import { Text } from '@ui-kitten/components';
import { Soundcloud } from './Soundcloud';
import { Bandcamp } from './Bandcamp';

type Code = {
  regex: string | RegExp;
  replace(matches: string[]): React.ReactElement;
};

/** codes that surround text only, can't be nested */
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
    regex: '\\[youtube\\].*v=(.+)&?.*\\[/youtube\\]',
    replace: (matches: string[]) => <YouTube videoId={matches[0]} />,
  },
  {
    regex: '\\[bandcamp.*? album=(\\d+).* track=(\\d+).*?\\]',
    replace: (matches: string[]) => (
      <Bandcamp album={matches[0]} track={matches[1]} />
    ),
  },
  {
    regex: '\\[bandcamp.*? album=(\\d+).*?\\]',
    replace: (matches: string[]) => <Bandcamp album={matches[0]} />,
  },
  {
    regex: '\\[bandcamp.*? track=(\\d+).*?\\]',
    replace: (matches: string[]) => <Bandcamp track={matches[1]} />,
  },
  {
    regex: '\\[url="?(.+?)"?\\](.+?)\\[/url\\]',
    replace: (matches: string[]) => <Url url={matches[0]}>{matches[1]}</Url>,
  },
  {
    regex: '\\[soundcloud url="?(.+?)"?.*?\\]',
    replace: (matches: string[]) => <Soundcloud url={matches[0]} />,
  },
  {
    // lastly auto match a url without bbcodes surrounding
    regex: /\s*(https?:\/\/\S+)\s*/,
    replace: (matches: string[]) => <Url url={matches[0]}>{matches[0]}</Url>,
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

const plainTextComponent = (text: string) => (
  <Text testID="bbcode-plain">{text}</Text>
);

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
const doParse = (
  text: string,
  codes: Code[],
  canNestCodes: boolean,
  splits: React.ReactNode[],
) => {
  let remainingText = text;
  // split text into array of components and text (also a react node)
  codes.forEach((code) => {
    const { before, after, component } = parseCode(remainingText, code);
    if (before) {
      splits.push(plainTextComponent(before));
    }
    if (component) {
      splits.push(component);
      if (!canNestCodes) {
        // now remove matched portion of text as cant have
        remainingText = `${before || ''}${after || ''}`;
      }
    }
    if (after) {
      const lengthBefore = splits.length;
      doParse(after, codes, canNestCodes, splits);
      const lengthAfter = splits.length;
      if (lengthBefore === lengthAfter) {
        //no further splits so add after
        splits.push(plainTextComponent(after));
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
  doParse(text, wrapperCodes, true, splits);

  if (!splits.length) {
    // no wrapper bbcodes found, look for text codes straight in text
    doParse(text, textCodes, false, splits);
  } else {
    // go through children of each wrapper code found and parse those for text codes
    splits.forEach((split, index, splitArray) => {
      if (isReactElement(split)) {
        // parse children prop text into sub components
        const childText = split.props.children;
        const newChildrenSplits: React.ReactNode[] = [];
        doParse(childText as string, textCodes, false, newChildrenSplits);
        if (newChildrenSplits.length) {
          // update children prop with this new array of splits
          // update array in place
          splitArray[index] = React.cloneElement(split, {
            children: newChildrenSplits,
          });
        }
      } else {
        // this is normal before or after text
        doParse(split as string, textCodes, false, splits);
      }
    });
  }

  if (!splits.length) {
    // no bbcode
    return plainTextComponent(text);
  }
  return (
    <>
      {splits.map((split, index) => (
        <React.Fragment key={index}>{split}</React.Fragment>
      ))}
    </>
  );
};
