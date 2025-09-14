import * as React from 'react';

import { cn } from '../../lib/cn';

export const Divider: React.FC<React.HTMLAttributes<HTMLHRElement> & { label?: string }> = ({
  className,
  label,
  ...props
}) => (
  <hr
    {...props}
    aria-label={label || undefined}
    className={cn('my-6 border-t border-slate-200', className)}
  />
);
