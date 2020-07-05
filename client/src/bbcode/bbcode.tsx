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
    regex: '\\[youtube\\].+v=(.+)&?.*\\[/youtube\\]',
    replace: (matches: string[]) => <YouTube videoId={matches[0]} />,
  },
  // auto-replace https://www.youtube.com/watch?v=_ISAA_Jt9kI
  {
    regex: /\s*https:\/\/www\.youtube\.com\/watch?v=(.+)&?.*\s*/,
    replace: (matches: string[]) => <YouTube videoId={matches[0]} />,
  },
  // auto-replace https://youtu.be/_ISAA_Jt9kI
  {
    regex: /\s*https:\/\/youtu\.be\/(.+)\s*/,
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

/** Codes that can wrap things like Quote (more like <View> than <Text>) */
const wrapperCodes: Code[] = [
  {
    regex: '\\[quote="?(.+?)"?\\](.+?)\\[/quote\\]',
    replace: (matches: string[]) => (
      <Quote name={matches[0]}>{matches[1]}</Quote>
    ),
  },
  {
    regex: '\\[quote\\](.+?)\\[/quote\\]',
    replace: (matches: string[]) => <Quote>{matches[0]}</Quote>,
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
const parseText = (text: string, splits: React.ReactNode[]) => {
  let foundMatch = false;
  // split text into array of components and text (also a react node)
  for (let i = 0; i < textCodes.length; i++) {
    const code = textCodes[i];
    const { before, after, component } = parseCode(text, code);
    if (before) {
      parseText(before, splits);
    }
    if (component) {
      splits.push(component);
      foundMatch = true;
    }
    if (after) {
      parseText(after, splits);
    }
    if (foundMatch) break;
  }

  if (!foundMatch) {
    // no match, add this text.
    splits.push(plainTextComponent(text));
  }
};

/**
 * recursively parse wrapper codes into array of bbcode components or strings based on passed in codes.
 * Children of quotes are text
 * Mutates split array
 */
const parseWrapper = (text: string, splits: React.ReactNode[]) => {
  let foundMatch = false;

  // split text into array of components and text
  for (let i = 0; i < wrapperCodes.length; i++) {
    const code = wrapperCodes[i];
    const { before, after, component } = parseCode(text, code);
    if (before) {
      parseWrapper(before, splits);
    }
    if (component) {
      splits.push(component);
      foundMatch = true;
    }
    if (after) {
      parseWrapper(after, splits);
    }
    if (foundMatch) break;
  }
};

const isReactElement = (el: React.ReactNode): el is React.ReactElement =>
  typeof el !== 'string';

/**
 * parse text into array of bbcode components
 */
export const parse = (text: string): React.ReactNode => {
  const splits: React.ReactNode[] = [];
  // split quotes first then text ones
  parseWrapper(text, splits);

  if (!splits.length) {
    // no wrapper bbcodes found, look for text codes straight in text
    parseText(text, splits);
  } else {
    // go through children of each wrapper code found and parse those for text codes
    splits.forEach((split, index, splitArray) => {
      const newChildrenSplits: React.ReactNode[] = [];
      // parse children prop text into sub components, or its just normal text
      const childText: string = isReactElement(split)
        ? split.props.children
        : split;

      parseText(childText, newChildrenSplits);
      if (newChildrenSplits.length) {
        // update children prop with this new array of splits
        if (newChildrenSplits.length === 1) {
          // update array in place
          splitArray[index] = React.cloneElement(split as any, {
            children: newChildrenSplits[0],
          });
        } else {
          // update array in place, make sure each child has a key
          splitArray[index] = React.cloneElement(split as any, {
            children: newChildrenSplits.map((child, childIndex) =>
              React.cloneElement(child as any, {
                key: `${index}-${childIndex}`,
              }),
            ),
          });
        }
      }
    });
  }

  if (!splits.length) {
    // no bbcode found
    return plainTextComponent(text);
  }

  if (splits.length === 1) {
    //no need to add key for one thing
    return splits[0];
  }

  return splits.map((split, index) =>
    React.cloneElement(split as any, { key: `${index}` }),
  );
};
