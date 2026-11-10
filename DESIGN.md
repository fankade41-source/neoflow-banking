# Design Brief

## Direction

NeoFlow — Neon Ledger: a dark-first, mobile-width banking dashboard where money reads as light on a deep navy-teal instrument panel.

## Tone

Refined futuristic minimalism — clinical restraint with two electric accents, so the interface feels precise, secure, and calm rather than playful.

## Differentiation

Every monetary figure is set in tabular Space Grotesk numerals with a subtle gradient, while neon blue and emerald are rationed as signal colors (action vs. inflow) instead of decoration.

## Color Palette

| Token      | OKLCH          | Role                                  |
| ---------- | -------------- | ------------------------------------- |
| background | 0.16 0.022 245 | Deep navy-teal canvas                 |
| foreground | 0.95 0.008 220 | Primary text                          |
| card       | 0.21 0.028 243 | Elevated panels and cards             |
| primary    | 0.72 0.16 232  | Neon blue — actions, active states    |
| accent     | 0.76 0.17 158  | Emerald — inflow, growth, success     |
| muted      | 0.26 0.03 243  | Inactive surfaces, secondary text bg  |

## Typography

- Display: Space Grotesk — headings, balance numerals, tabular figures
- Body: DM Sans — labels, body copy, navigation
- Mono: Geist Mono — micro-labels, timestamps, account identifiers
- Scale: hero `text-4xl sm:text-5xl font-bold tracking-tight`, h2 `text-xl font-semibold tracking-tight`, label `text-xs font-semibold tracking-widest uppercase`, body `text-sm sm:text-base`

## Elevation & Depth

Three tiers: flat background, `bg-card` panels with `shadow-subtle`, and the balance card on `bg-gradient-panel` with `shadow-elevated`; depth comes from layered surfaces and hairline borders, never glow.

## Structural Zones

| Zone        | Background              | Border   | Notes                                                  |
| ----------- | ----------------------- | -------- | ------------------------------------------------------ |
| Header      | transparent on canvas   | none     | Greeting + avatar + notification, sticky, blurred      |
| Balance     | gradient-panel          | hairline | Hero card, neon-blue edge accent, emerald delta pill   |
| Actions     | bg-card pills           | hairline | Four quick actions: Send, Receive, Pay, History        |
| Chart       | bg-card                 | hairline | Monthly expenses bars, current month in emerald        |
| Disclaimer  | muted/40                | border-t | Sandbox prototype notice, small mono text              |
| Bottom nav  | sidebar + backdrop-blur | border-t | Home, Cards, Stats, Profile; active tab neon blue      |

## Spacing & Rhythm

Mobile-first single column max-w-md centered; `space-y-6` between zones, `p-5` card padding, `gap-3` inside action grids, `gap-1.5` for icon-label pairs.

## Component Patterns

- Buttons: full-radius pills, `bg-gradient-primary` for primary, `bg-secondary` ghost for secondary, hover lifts to `shadow-elevated`
- Cards: `rounded-[var(--radius)]` (1.25rem), `bg-card`, hairline `border-border`, `shadow-subtle`
- Badges: pill, emerald `bg-accent/15 text-accent` for inflow, blue `bg-primary/15 text-primary` for neutral
- Nav items: icon + label stack, active state neon blue with soft `bg-primary/10` pill

## Motion

- Entrance: `animate-rise` staggered 60ms per zone, 0.5s ease-out
- Hover: `transition-smooth` 0.3s, translate-y-px + shadow-elevated on interactive cards
- Decorative: `animate-bar-grow` on chart bars (0.7s, staggered), subtle pulse on notification dot

## Constraints

- Dark mode is the default and primary surface; light mode exists but is secondary
- Neon blue and emerald are signal colors only — never large fills or gradient backgrounds
- No glow/neon box-shadows; depth via layered surfaces and hairline borders
- Mobile-width column centered on desktop; never stretch to full viewport width

## Signature Detail

The balance figure: oversized tabular Space Grotesk numerals on a gradient panel with a single emerald delta pill — a typographic treatment that makes the number itself the interface.
