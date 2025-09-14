import * as React from 'react';

import { cn } from '../../lib/cn';

type BaseProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  external?: boolean;
  newTab?: boolean;
  variant?: 'default' | 'subtle';
};

export const Link = React.forwardRef<HTMLAnchorElement, BaseProps>(
  ({ className, external, newTab, children, variant = 'default', ...props }, ref) => {
    const rel =
      [props.rel, (external || newTab) && 'noopener', (external || newTab) && 'noreferrer']
        .filter(Boolean)
        .join(' ') || undefined;

    const target = newTab ? '_blank' : props.target;

    const label = typeof children === 'string' ? children : undefined;

    const ariaLabel = newTab
      ? `${label ?? ''}${label ? ' ' : ''}(opens in a new tab)`
      : props['aria-label'];

    return (
      <a
        ref={ref}
        {...props}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        className={cn(
          'inline-flex items-center gap-1 rounded-none underline decoration-2 underline-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-tfl-ink focus-visible:ring-offset-2',
          variant === 'subtle' && 'no-underline hover:underline',
          className
        )}
      >
        <span>{children}</span>
        {external && (
          <span aria-hidden="true" className="inline-block">
            <svg viewBox="0 0 24 24" className="h-4 w-4">
              <path fill="currentColor" d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z" />
              <path fill="currentColor" d="M5 5h6v2H7v10h10v-4h2v6H5z" />
            </svg>
          </span>
        )}
      </a>
    );
  }
);
Link.displayName = 'Link';
