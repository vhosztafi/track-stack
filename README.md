# TrackStack - TfL Line Status Viewer

A single-page React + TypeScript app built with Vite.  
Displays the current status of London Underground (and optionally other modes) using
the [TfL Open Data API](https://api.tfl.gov.uk).

## Tech Stack

- React + TypeScript + Vite
- Tailwind CSS
- ESLint
- Vitest + React Testing Library
- Storybook
- Playwright + Cucumber

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

- **Unit tests**:

```bash
npm test
```

- **Storybook (component + a11y checks)**:

```bash
npm run storybook
```

## API Configuration

- Base URL: `https://api.tfl.gov.uk`
- Endpoint used: `/Line/Mode/Tube/Status`
- Optional credentials:
    ```bash
    VITE_TFL_APP_ID=yourid
    VITE_TFL_APP_KEY=yourkey
    ```
- API works without keys (rate-limited).
- Do **not** commit secrets — keep them in `.env.local`.

## Roadmap

### Phase 1 — Data layer, accessibility baseline, and scaffolding

### Phase 2 — Minimal UI

### Phase 3 — States, error handling, and refresh

### Phase 4 — Cross-modes and filtering (optional)

### Phase 5 — Production readiness

## License / Attribution

- Uses [TfL Open Data API](https://api.tfl.gov.uk/) — subject to their terms.
