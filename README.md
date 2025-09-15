# TrackStack - TfL Line Status Viewer

[![CI](https://github.com/vhosztafi/track-stack/workflows/CI/badge.svg)](https://github.com/vhosztafi/track-stack/actions)
[![codecov](https://codecov.io/gh/vhosztafi/track-stack/branch/master/graph/badge.svg)](https://codecov.io/gh/vhosztafi/track-stack)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A single-page React + TypeScript app built with Vite.  
Displays the current status of London Underground (and optionally other modes) using
the [TfL Open Data API](https://api.tfl.gov.uk).

Live demo: [https://trackstack.live](https://trackstack.live)  
Storybook: [https://storybook.trackstack.live](https://storybook.trackstack.live)

> **Note:** This project is not a pixel-perfect clone of tfl.gov.uk styling.  
> Instead, it's an opportunity to demonstrate my approach to feature development:  
> accessible UI, clean component architecture, testability, and forward-looking design.

## Tech Stack

- React + TypeScript + Vite
- Tailwind CSS
- ESLint
- Vitest + React Testing Library
- Storybook (with accessibility checks)
- GitHub Actions (CI for tests + linting)

## Getting Started

Install dependencies:

```bash
npm install
````

Run dev server (defaults to [http://localhost:3000](http://localhost:3000)):

```bash
npm run dev
```

Build and preview:

```bash
npm run build
npm run preview
```

## Testing

**Unit tests**:

```bash
npm test
```

**Storybook (component + a11y checks)**:

```bash
npm run storybook
```

## API Configuration

- Base URL: `https://api.tfl.gov.uk`
- Endpoint used: `/Line/Mode/Tube/Status`

The app can run without API credentials (keys are optional but TfL applies rate-limits).  
If you want to supply your own credentials:

1. Copy the provided `.env.example` to `.env.local`:

```bash
   cp .env.example .env.local
```

2. Fill in your TfL app credentials:

```bash
VITE_TFL_APP_ID=yourid
VITE_TFL_APP_KEY=yourkey
```

- Do **not** commit secrets — keep them in `.env.local`.

## Roadmap

### ✅ Phase 1 — Foundations

- Initial project setup (Vite, React, TypeScript, Tailwind)
- Base data layer: TfL API integration
- Accessibility baseline (skip links, semantic HTML, ARIA)

### ✅ Phase 2 — Core UI

- Responsive two-column/one-column layout
- Line cards with live statuses
- Accordion for disruptions (keyboard + screen reader friendly)

### ✅ Phase 3 — Robustness

- Error handling & retry logic
- Loading states & skeletons
- Auto-refresh with "last updated" timestamp

### ✅ Phase 4 — Extended Features

- Tabs for filtering by service state
- Storybook docs with accessibility checks

### ✅ Phase 5 — Production Readiness

- GitHub Actions CI/CD setup to deploy Azure Static Web Apps
- Test coverage (unit, integration)
- Deployment of Storybook alongside app

### ✅ Phase 6 — Enhancements

- **Embed mode** — minimal headerless view for dashboards/iframes
- **Deep-link support** — shareable URLs with filters

---

## Embed Mode

TrackStack now supports an embed mode perfect for dashboards and iframes. Access it at `/embed` with optional URL
parameters for customization.

### Basic Usage

```html

<iframe
        src="/embed"
        width="100%"
        height="600"
        frameborder="0"
        title="Tube Status">
</iframe>
```

### URL Parameters

- **`tab`**: Filter services (`all`, `active`, `paused`)
- **`hideTitle`**: Hide the "Status" heading (`true`)
- **`hideTabs`**: Hide tab navigation (`true`)

### Examples

- **Active services only**: `/embed?tab=active`
- **Minimal widget**: `/embed?tab=active&hideTitle=true&hideTabs=true`
- **Disruptions only**: `/embed?tab=paused&hideTitle=true`

### Demo

Visit `/embed-demo.html` to see all embed configurations in action.

---

## Future Enhancements (post-challenge)

- **Updated Overground branding** — reflect 2024/25 line renamings & striped colours
- **CI-powered accessibility testing** — axe + Cypress integration
- **PWA support** — installable offline-first experience
- **Keyboard shortcuts** — quick navigation/filtering
- **Multi-mode support** — add DLR, Overground, TfL Rail, Elizabeth Line, Tram
- **User preferences** — save mode/line/filter settings in localStorage
- **Dark mode** — system preference detection + toggle
- **Animations** — subtle transitions for state changes

## License / Attribution

- Uses [TfL Open Data API](https://api.tfl.gov.uk/) — subject to their terms.
- Webfont by [OnlineWebFonts.com](https://www.onlinewebfonts.com/fonts/johnston100), used with attribution as required.  

