# Project Guidance

## User Preferences

- Dark mode theme
- Neon blue and emerald green accents
- Modern, minimalist, professional and secure visual style
- Mobile banking app presentation

## Accepted Requirements

- Dark-mode mobile banking dashboard named NeoFlow
- Balance display of €4,250.00
- Quick action menu: Send, Receive, Pay, History
- Monthly expenses bar chart
- Bottom navigation bar
- Sandbox prototype disclaimer text
- Neon blue and emerald green accents on a dark theme

## Verified Commands

- **typecheck**: `pnpm typecheck`
- **fix**: `pnpm fix`
- **build**: `pnpm build`

## Learnings

- With darkMode: ["class"] in tailwind.config.js, the dark palette only applies when a `dark` class is on the html element; adding class="dark" in src/frontend/index.html is the minimal fix when no ThemeProvider exists.
- Guard decorative Tailwind animations with the motion-safe: variant so prefers-reduced-motion is honored.
- `label` is a reserved keyword in Motoko and cannot be used as a record field name; rename the field (for example to `title`) consistently across types and consumers.
- Backend verification order: mops install && mops check --fix from src/backend, then mops build, then pnpm bindgen from the project root.
- Backend Balance.amountCents and MonthlyExpense.amountCents are bigint cents; divide by 100 before Intl.NumberFormat and use a shared formatCurrency helper in src/frontend/src/lib/format.ts.
- The dashboard reads getBalance, getMonthlyExpenses and getQuickActions from the backend through React Query hooks in src/frontend/src/hooks/useQueries.ts using useActor(createActor).
