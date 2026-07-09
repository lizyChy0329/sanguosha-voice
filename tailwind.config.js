/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        /* ===== Page-level colors ===== */
        "bg-page": "var(--color-bg-page)",
        "bg-card": "var(--color-bg-card)",
        "bg-deep-nav": "var(--color-bg-deep-nav)",
        "bg-dark": "var(--color-bg-dark)",
        "bg-darker": "var(--color-bg-darker)",
        "bg-search": "var(--color-bg-search)",

        /* ===== Faction colors ===== */
        gold: {
          DEFAULT: "var(--color-gold)",
          light: "var(--color-gold-light)",
        },
        wei: {
          DEFAULT: "var(--color-wei)",
          light: "var(--color-wei-light)",
          border: "var(--color-wei-border)",
          bg: "var(--color-wei-bg)",
        },
        shu: {
          DEFAULT: "var(--color-shu)",
          light: "var(--color-shu-light)",
          border: "var(--color-shu-border)",
          bg: "var(--color-shu-bg)",
        },
        wu: {
          DEFAULT: "var(--color-wu)",
          light: "var(--color-wu-light)",
          border: "var(--color-wu-border)",
          bg: "var(--color-wu-bg)",
        },
        qun: {
          DEFAULT: "var(--color-qun)",
          light: "var(--color-qun-light)",
          border: "var(--color-qun-border)",
          bg: "var(--color-qun-bg)",
        },

        /* ===== Accent colors ===== */
        "accent-green": "var(--color-accent-green)",
        "accent-amber": "var(--color-accent-amber)",

        /* ===== Text colors ===== */
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "text-muted": "var(--color-text-muted)",
        "text-white": "var(--color-text-white)",

        /* ===== shadcn-vue CSS variables (keep intact) ===== */
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },

      /* ===== Typography tokens ===== */
      fontSize: {
        title: ["var(--font-size-title)", { lineHeight: "1.5" }],
        body: ["var(--font-size-body)", { lineHeight: "1.5" }],
        caption: ["var(--font-size-caption)", { lineHeight: "1.5" }],
        badge: ["var(--font-size-badge)", { lineHeight: "1" }],
      },

      /* ===== Spacing tokens ===== */
      spacing: {
        page: "var(--spacing-page)",
        "card-gap": "var(--spacing-card-gap)",
        "card-padding": "var(--spacing-card-padding)",
        "section-gap": "var(--spacing-section-gap)",
      },

      /* ===== Border radius tokens ===== */
      borderRadius: {
        card: "var(--radius-card)",
        button: "var(--radius-button)",
        badge: "var(--radius-badge)",
        panel: "var(--radius-panel)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      /* ===== Shadow tokens ===== */
      boxShadow: {
        card: "var(--shadow-card)",
        panel: "var(--shadow-panel)",
        fab: "var(--shadow-fab)",
      },

      /* ===== Font family tokens ===== */
      fontFamily: {
        heading: ['"Noto Serif SC"', "serif"],
        sans: [
          '"Noto Sans SC"',
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
