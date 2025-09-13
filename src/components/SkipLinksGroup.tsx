import { twMerge } from 'tailwind-merge';

import SkipLink from './SkipLink';

export type LinkItem = {
  targetId: string;
  label: string;
};

export default function SkipLinksGroup({
  links,
  className,
}: {
  links: Array<LinkItem>;
  className?: string;
}) {
  return (
    <nav aria-label="Skip links" className={twMerge('', className)}>
      {links.map((l) => (
        <SkipLink key={l.targetId} targetId={l.targetId} label={l.label} />
      ))}
    </nav>
  );
}
