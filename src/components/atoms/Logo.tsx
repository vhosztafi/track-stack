import { cn } from '../../lib/cn.ts';

type LogoProps = {
  className?: string;
  alt?: string;
};

export function Logo({ className, alt = 'TrackStack Logo' }: LogoProps) {
  return (
    <img
      src="/trackstack-logo.svg"
      alt={alt}
      width="32"
      height="32"
      className={cn('h-8 w-auto', className)}
    />
  );
}
