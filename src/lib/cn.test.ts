import { describe, expect, it } from 'vitest';

import { cn } from './cn';

describe('cn', () => {
  it('merges truthy classes and ignores falsy', () => {
    // eslint-disable-next-line no-constant-binary-expression
    const res = cn('p-2', false && 'bg-red-500', undefined, 'text-sm');
    expect(res).toBe('p-2 text-sm');
  });

  it('dedupes Tailwind conflicts via twMerge', () => {
    const res = cn('p-2', 'p-4', 'text-red-500', 'text-blue-500');
    expect(res).toBe('p-4 text-blue-500');
  });

  it('supports object syntax like clsx', () => {
    const active = true;
    const res = cn('btn', { 'btn-active': active, hidden: !active });
    expect(res).toBe('btn btn-active');
  });
});
