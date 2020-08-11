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
  regex: RegExp;
  replace(matches: string[]): React.ReactElement;
};

/** codes that surround text only, can't be nested */
const textCodes: Code[] = [
  {
    regex: /\[img\]([\s\S]+?)\[\/img\]/,
    replace: (matches: string[]) => <Img url={matches[0]} />,
  },
  {
    regex: /\[img=(.+?)\]/,
    replace: (matches: string[]) => <Img url={matches[0]} />,
  },
  {
    regex: /\[b\]([\s\S]+?)\[\/b\]/,
    replace: (matches: string[]) => <Bold>{matches[0]}</Bold>,
  },
  {
    regex: /\[i\]([\s\S]+?)\[\/i\]/,
    replace: (matches: string[]) => <Italic>{matches[0]}</Italic>,
  },
  {
    regex: /\[url\]([\s\S]+?)\[\/url\]/,
    replace: (matches: string[]) => <Url url={matches[0]}>{matches[0]}</Url>,
  },
  {
    regex: /\[url="?(.+?)"?\]([\s\S]+?)\[\/url\]/,
    replace: (matches: string[]) => <Url url={matches[0]}>{matches[1]}</Url>,
  },
  {
    regex: /\[youtube\].+v=(.+)&?.*\[\/youtube\]/,
    replace: (matches: string[]) => <YouTube videoId={matches[0]} />,
  },
  // auto-replace https://www.youtube.com/watch?v=_ISAA_Jt9kI
  {
    regex: /https:\/\/.*youtube\.com\/watch\?v=((\w|\d)+)/,
    replace: (matches: string[]) => <YouTube videoId={matches[0]} />,
  },
  // auto-replace https://youtu.be/_ISAA_Jt9kI
  {
    regex: /https:\/\/youtu\.be\/((\w|\d)+)/,
    replace: (matches: string[]) => <YouTube videoId={matches[0]} />,
  },
  {
    regex: /\[bandcamp.*? album=(\d+).* track=(\d+).*?\]/,
    replace: (matches: string[]) => (
      <Bandcamp album={matches[0]} track={matches[1]} />
    ),
  },
  {
    regex: /\[bandcamp.*? album=(\d+).*?\]/,
    replace: (matches: string[]) => <Bandcamp album={matches[0]} />,
  },
  {
    regex: /\[bandcamp.*? track=(\d+).*?\]/,
    replace: (matches: string[]) => <Bandcamp track={matches[0]} />,
  },
  {
    regex: /\[url="?(.+?)"?\]([\s\S]+?)\[\/url\]/,
    replace: (matches: string[]) => <Url url={matches[0]}>{matches[1]}</Url>,
  },
  {
    regex: /\[soundcloud url="?(.+?)"?.*?\]/,
    replace: (matches: string[]) => <Soundcloud url={matches[0]} />,
  },
  {
    // lastly auto match a url without bbcodes surrounding
    regex: /(https?:\/\/\S+)/,
    replace: (matches: string[]) => <Url url={matches[0]}>{matches[0]}</Url>,
  },
];

/** Codes that can wrap things like Quote (more like <View> than <Text>) */
const wrapperCodes: Code[] = [
  {
    regex: /\[quote="?(.+?)"?\]([\s\S]+?)\[\/quote\]/,
    replace: (matches: string[]) => (
      <Quote name={matches[0]}>{matches[1]}</Quote>
    ),
  },
  {
    regex: /\[quote name="?(.+?)"?\]([\s\S]+?)\[\/quote\]/,
    replace: (matches: string[]) => (
      <Quote name={matches[0]}>{matches[1]}</Quote>
    ),
  },
  {
    regex: /\[quote\]([\s\S]+?)\[\/quote\]/,
    replace: (matches: string[]) => <Quote>{matches[0]}</Quote>,
  },
];

const plainTextComponent = (text: string) => (
  <Text testID="bbcode-plain">{text}</Text>
);

/** return Text wrapped so no line breaks */
const WrapperText: React.FC = ({ children }) => (
  <Text testID="bbcode-text-wrap">{children as any}</Text>
);

const parseCode = (
  text: string,
  code: Code,
): { before?: string; component?: React.ReactElement; after?: string } => {
  const matches = text.match(code.regex);
  if (!matches?.length) return {};
  const before = text.slice(0, matches.index) || undefined;
  // use slice(1) to call replace without the with whole match (index 0) in array
  // Therefore only includes each subsequent match as nicer to use match[0] than match[1] in replace method
  const component = code.replace(matches.slice(1));
  const after =
    matches.index != undefined && matches.index >= 0
      ? text.slice(matches.index + matches[0].length) || undefined
      : undefined;

  return { before, after, component };
};

/**
 * recursively parse codes into array of bbcode components based on passed in codes.
 * Mutates split array
 */
const parseCodes = (
  text: string,
  codes: Code[],
  isWrapperCodes: boolean,
  splits: React.ReactNode[],
) => {
  let foundMatch = false;
  // split text into array of components and text (also a react node)
  for (let i = 0; i < codes.length; i++) {
    const code = codes[i];
    const { before, after, component } = parseCode(text, code);
    if (before) {
      parseCodes(before, codes, isWrapperCodes, splits);
    }
    if (component) {
      splits.push(component);
      foundMatch = true;
    }
    if (after) {
      parseCodes(after, codes, isWrapperCodes, splits);
    }
    if (foundMatch) break;
  }

  if (!foundMatch) {
    // no match, add this text.
    splits.push(isWrapperCodes ? text : plainTextComponent(text));
  }
};

const isReactElement = (el: React.ReactNode): el is React.ReactElement =>
  typeof el !== 'string';

/**
 * parse text into array of bbcode components
 */
export const parse = (text: string): React.ReactNode => {
  const splits: React.ReactNode[] = [];
  // split wrapper codes (eg quotes) first then text ones
  parseCodes(text, wrapperCodes, true, splits);

  if (!splits.length) {
    // no wrapper bbcodes found, look for text codes straight in text
    parseCodes(text, textCodes, false, splits);
  } else {
    // go through children of each wrapper code found and parse those for text codes
    splits.forEach((split, index, splitArray) => {
      const newChildrenSplits: React.ReactNode[] = [];
      // parse children prop text into sub components, or its just normal text
      const childText: string = isReactElement(split)
        ? split.props.children
        : split;
      parseCodes(childText, textCodes, false, newChildrenSplits);
      updateSplitArrayWithNewChildren(splitArray, newChildrenSplits, index);
    });
  }

  if (!splits.length) {
    // no bbcode found
    return <WrapperText>{text}</WrapperText>;
  }

  if (splits.length === 1) {
    //no need to add key for one thing
    return <WrapperText>{splits[0]}</WrapperText>;
  }

  const splitsWithKey = splits.map((split, index) => {
    if (!split || (split as any).length) {
      return split;
    }
    return React.cloneElement(split as any, { key: `${index}` });
  });
  return <WrapperText>{splitsWithKey}</WrapperText>;
};

const updateSplitArrayWithNewChildren = (
  splitArray: React.ReactNode[],
  newChildrenSplits: React.ReactNode[],
  index: number,
) => {
  const split = splitArray[index];
  if (newChildrenSplits.length) {
    // update children prop with this new array of splits
    if (isReactElement(split)) {
      // add key to children
      splitArray[index] = React.cloneElement(split as any, {
        children: newChildrenSplits.map((child, childIndex) => {
          const childComponent = isReactElement(child)
            ? child
            : plainTextComponent(child as any);
          return React.cloneElement(childComponent, {
            key: `${index}-${childIndex}`,
          });
        }),
      });
    } else {
      //currently just a string, replace with Text component(s)
      splitArray[index] =
        newChildrenSplits.length === 1
          ? newChildrenSplits[0]
          : newChildrenSplits;
    }
  }
};
