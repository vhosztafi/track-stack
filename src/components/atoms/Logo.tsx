import { cn } from '../../lib/cn.ts';

type LogoProps = {
  className?: string;
  alt?: string;
};

export function Logo({ className, alt = 'TrackStack' }: LogoProps) {
  return <img src="/trackstack-logo.svg" alt={alt} className={cn('h-8 w-auto', className)} />;
}
