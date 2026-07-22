import type { Config } from 'tailwindcss';

/**
 * La Meridiana design system.
 *
 * The name "La Meridiana" means *sundial* — the palette is built around warm,
 * midday Mediterranean light rather than the cliché tricolore red/white/green.
 *
 *   panna     – warm cream paper, the primary background
 *   espresso  – deep warm near-black for text and the footer
 *   terracotta– considered burnt-clay accent (primary CTA / links)
 *   olive     – herbal muted green (secondary accent)
 *   ochre     – golden "sundial" sun tone (highlights, awards)
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        panna: {
          DEFAULT: '#F7F1E6',
          50: '#FCFAF5',
          100: '#F7F1E6',
          200: '#EFE6D3',
          300: '#E4D5B9',
        },
        espresso: {
          DEFAULT: '#241C15',
          800: '#2E241B',
          700: '#3D3025',
          600: '#5A4A3A',
          500: '#7A6A57',
        },
        terracotta: {
          DEFAULT: '#B4502E',
          light: '#C86A46',
          dark: '#933D22',
        },
        olive: {
          DEFAULT: '#5E6B4C',
          light: '#7A8664',
          dark: '#454F38',
        },
        ochre: {
          DEFAULT: '#C99A3E',
          light: '#DEB863',
          dark: '#A67C2A',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '72rem',
      },
      borderRadius: {
        card: '0.75rem',
      },
      boxShadow: {
        soft: '0 8px 30px -12px rgba(36, 28, 21, 0.22)',
        lift: '0 20px 45px -20px rgba(36, 28, 21, 0.35)',
      },
      letterSpacing: {
        widelabel: '0.22em',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease-out both',
      },
    },
  },
  plugins: [],
};

export default config;
