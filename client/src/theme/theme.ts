import {dark} from '@eva-design/eva';
import { getColor } from 'tailwind-rn';
import {
  DarkTheme,
  Theme,
} from '@react-navigation/native';

export const colors = {
  'color-primary-100': getColor('blue-100'),
  'color-primary-200': getColor('blue-200'),
  'color-primary-300': getColor('blue-300'),
  'color-primary-400': getColor('blue-400'),
  'color-primary-500': getColor('blue-500'),
  'color-primary-600': getColor('blue-600'),
  'color-primary-700': getColor('blue-700'),
  'color-primary-800': getColor('blue-800'),
  'color-primary-900': getColor('blue-900'),

  'color-success-100': getColor('green-100'),
  'color-success-200': getColor('green-200'),
  'color-success-300': getColor('green-300'),
  'color-success-400': getColor('green-400'),
  'color-success-500': getColor('green-500'),
  'color-success-600': getColor('green-600'),
  'color-success-700': getColor('green-700'),
  'color-success-800': getColor('green-800'),
  'color-success-900': getColor('green-900'),

  'color-warning-100': getColor('yellow-100'),
  'color-warning-200': getColor('yellow-200'),
  'color-warning-300': getColor('yellow-300'),
  'color-warning-400': getColor('yellow-400'),
  'color-warning-500': getColor('yellow-500'),
  'color-warning-600': getColor('yellow-600'),
  'color-warning-700': getColor('yellow-700'),
  'color-warning-800': getColor('yellow-800'),
  'color-warning-900': getColor('yellow-900'),

  'color-danger-100': getColor('red-100'),
  'color-danger-200': getColor('red-200'),
  'color-danger-300': getColor('red-300'),
  'color-danger-400': getColor('red-400'),
  'color-danger-500': getColor('red-500'),
  'color-danger-600': getColor('red-600'),
  'color-danger-700': getColor('red-700'),
  'color-danger-800': getColor('red-800'),
  'color-danger-900': getColor('red-900'),
};

export const evaTheme = {
  ...dark,
  ...colors,
};


export const navTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: dark['color-basic-700'],
  },
};