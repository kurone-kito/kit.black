import daisyUi from 'daisyui';
import type { Config } from 'tailwindcss';

import containerQueries = require('@tailwindcss/container-queries');
import safeArea = require('tailwindcss-safe-area');

export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  plugins: [daisyUi, containerQueries, safeArea],
  theme: {
    extend: {
      fontFamily: {
        Lato: ['Lato'],
        sans: [
          'Helvetica Neue',
          'Arial',
          'Hiragino Sans',
          'BIZ UDPGothic',
          'Yu Gothic',
          'YuGothic',
          'Meiryo',
          'sans-serif',
        ],
      },
    },
  },
} satisfies Config;
