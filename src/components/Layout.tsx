import { type ReactNode } from 'react';

import Footer from './Footer.tsx';
import Header from './Header.tsx';
import SkipLinksGroup from './SkipLinksGroup.tsx';

export type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <SkipLinksGroup
        links={[
          { targetId: 'main-content', label: 'Skip to content' },
          { targetId: 'main-nav', label: 'Skip to navigation' },
          { targetId: 'footer', label: 'Skip to footer' },
        ]}
      />

      <div className="min-h-dvh bg-slate-50 text-tfl-ink">
        <Header />

        <main
          id="main-content"
          tabIndex={-1}
          className="mx-auto max-w-[1440px] px-4 pb-6 pt-[72px] md:px-6 md:pt-[104px] xl:px-0"
        >
          {children}
        </main>

        <Footer />
      </div>
    </>
  );
}
