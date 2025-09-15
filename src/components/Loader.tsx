import { cn } from '../lib/cn.ts';
import { Logo } from './atoms/Logo.tsx';

type LoaderProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'simple' | 'pulse' | 'bounce' | 'color-shift' | 'wiggle' | 'combo' | 'funky';
  className?: string;
  text?: string;
  showText?: boolean;
};
const sizeClasses = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
  xl: 'h-16 w-16',
};

const variantClasses = {
  simple: 'loader-spin',
  pulse: 'loader-pulse',
  bounce: 'loader-bounce',
  'color-shift': 'loader-color-shift',
  wiggle: 'loader-wiggle',
  combo: 'loader-combo',
  funky: 'loader-funky',
};

export function Loader({
  size = 'md',
  variant = 'funky',
  className,
  text = 'Loading...',
  showText = true,
}: LoaderProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
      <div className="relative">
        <Logo className={cn(sizeClasses[size], variantClasses[variant])} alt="Loading" />
        {variant === 'funky' && (
          <div className="loader-spin absolute inset-0 rounded-full border-2 border-tfl-highlight border-opacity-30"></div>
        )}
      </div>
      {showText && <p className="animate-pulse text-sm font-medium text-tfl-ink/70">{text}</p>}
    </div>
  );
}
