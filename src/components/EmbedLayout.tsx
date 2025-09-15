import { type ReactNode } from 'react';

export type EmbedLayoutProps = {
  children: ReactNode;
};

export default function EmbedLayout({ children }: EmbedLayoutProps) {
  return (
    <div className="min-h-dvh bg-slate-50 text-tfl-ink">
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto max-w-[1440px] px-4 py-4 sm:px-6 xl:px-0"
      >
        {children}
      </main>
    </div>
  );
}
