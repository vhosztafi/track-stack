import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Foundations/Colours',
  parameters: {
    layout: 'padded',
    a11y: {
      config: {
        rules: [{ id: 'color-contrast', enabled: false }],
      },
    },
  },
};
export default meta;

type Swatch = {
  token: string;
  name: string;
  hex: string;
  border?: boolean;
};

function luminance(hex: string) {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16) / 255;
  const g = parseInt(h.substring(2, 4), 16) / 255;
  const b = parseInt(h.substring(4, 6), 16) / 255;
  const a = [r, g, b].map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

function textOn(hex: string) {
  return luminance(hex) < 0.5 ? 'text-white' : 'text-tfl-ink';
}

function SwatchCard({ s }: { s: Swatch }) {
  const textClass = textOn(s.hex);
  return (
    <div className="flex items-center gap-3">
      <div
        className={[
          'relative flex h-12 w-20 items-center justify-center rounded-lg shadow-inner',
          s.token,
          s.border ? 'ring-1 ring-tfl-border' : '',
        ].join(' ')}
        aria-label={`${s.name} ${s.hex}`}
        title={`${s.name} ${s.hex}`}
      >
        <span className={`text-xs font-medium ${textClass}`}>Aa</span>
      </div>
      <div className="min-w-0">
        <div className="text-sm font-medium text-tfl-ink">{s.name}</div>
        <code className="text-xs text-tfl-ink/70">{s.hex}</code>
      </div>
    </div>
  );
}

function Grid({ items }: { items: Swatch[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {items.map((s) => (
        <SwatchCard key={s.name} s={s} />
      ))}
    </div>
  );
}

const coreUI: Swatch[] = [
  { token: 'bg-tfl-ink', name: 'tfl.ink (text)', hex: '#03071c' },
  { token: 'bg-tfl-surface', name: 'tfl.surface', hex: '#ffffff', border: true },
  { token: 'bg-tfl-surfaceMuted', name: 'tfl.surfaceMuted', hex: '#f7f9fa', border: true },
  { token: 'bg-tfl-panel', name: 'tfl.panel', hex: '#e1e4e8', border: true },
  { token: 'bg-tfl-border', name: 'tfl.border', hex: '#c1c8d2', border: true },
  { token: 'bg-tfl-highlight', name: 'tfl.highlight', hex: '#ffe500' },
];

const status: Swatch[] = [
  { token: 'bg-status-success', name: 'status.success', hex: '#00703C' },
  { token: 'bg-status-warning', name: 'status.warning', hex: '#FFDD00' },
  { token: 'bg-status-error', name: 'status.error', hex: '#D4351C' },
];

const lines: Swatch[] = [
  { token: 'bg-tfl-line-bakerloo', name: 'Bakerloo', hex: '#b26300' },
  { token: 'bg-tfl-line-central', name: 'Central', hex: '#dc241f' },
  { token: 'bg-tfl-line-circle', name: 'Circle', hex: '#ffc80a' },
  { token: 'bg-tfl-line-district', name: 'District', hex: '#007d32' },
  { token: 'bg-tfl-line-hammersmithCity', name: 'Hammersmith & City', hex: '#f589a6' },
  { token: 'bg-tfl-line-jubilee', name: 'Jubilee', hex: '#838d93' },
  { token: 'bg-tfl-line-metropolitan', name: 'Metropolitan', hex: '#9b0058' },
  { token: 'bg-tfl-line-northern', name: 'Northern', hex: '#000000' },
  { token: 'bg-tfl-line-piccadilly', name: 'Piccadilly', hex: '#0019a8' },
  { token: 'bg-tfl-line-victoria', name: 'Victoria', hex: '#039be5' },
  { token: 'bg-tfl-line-waterlooCity', name: 'Waterloo & City', hex: '#76d0bd' },
  { token: 'bg-tfl-line-elizabeth', name: 'Elizabeth line', hex: '#60399e' },
  { token: 'bg-tfl-line-overground', name: 'London Overground', hex: '#fa7b05' },
  { token: 'bg-tfl-line-dlr', name: 'DLR', hex: '#00afad' },
  { token: 'bg-tfl-line-tram', name: 'Tram', hex: '#5fb526' },
];

export const CoreUI: StoryObj = {
  name: 'Core UI / Neutrals',
  render: () => (
    <div className="space-y-6">
      <p className="text-sm text-tfl-ink/70">Baseline UI tokens used across components.</p>
      <Grid items={coreUI} />
      <h3 className="mt-8 text-base font-semibold text-tfl-ink">Status</h3>
      <Grid items={status} />
    </div>
  ),
};

export const TfLLines: StoryObj = {
  name: 'Lines (Tube + TfL Rail)',
  render: () => (
    <div className="space-y-6">
      <p className="text-sm text-tfl-ink/70">
        Colours for line badges, chips and small accents. Text automatically shifts to white or ink
        for contrast.
      </p>
      <Grid items={lines} />
    </div>
  ),
};
