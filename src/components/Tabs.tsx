import { useEffect, useMemo, useRef, useState } from 'react';

import { cn } from '../lib/cn';

export type TabItem = {
  id: string;
  label: string;
};

type TabsProps = {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (id: string) => void;
  ariaLabel?: string;
  fullWidth?: boolean;
  bordered?: boolean;
  className?: string;
};

export default function Tabs({
  items,
  value,
  defaultValue,
  onValueChange,
  ariaLabel = 'Tabs',
  fullWidth = false,
  bordered = true,
  className,
}: TabsProps) {
  const isControlled = value !== undefined;

  const firstId = useMemo(() => items[0]?.id, [items]);

  const [internalValue, setInternalValue] = useState<string | undefined>(defaultValue ?? firstId);

  useEffect(() => {
    if (isControlled) return;
    if (!internalValue || !items.some((i) => i.id === internalValue)) {
      setInternalValue(firstId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, firstId, isControlled]);

  const selectedId = isControlled ? value : internalValue;

  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const setSelected = (id: string) => {
    if (isControlled) {
      onValueChange?.(id);
    } else {
      setInternalValue(id);
      onValueChange?.(id);
    }
  };

  const focusTabByIndex = (idx: number) => tabRefs.current[idx]?.focus();

  if (!items || items.length === 0) return null;

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      aria-orientation="horizontal"
      className={cn(
        'flex rounded-t-xl bg-tfl-panel',
        bordered && 'border-b border-tfl-panel',
        fullWidth ? 'w-full' : 'w-fit',
        className
      )}
    >
      {items.map((item, idx) => {
        const active = item.id === selectedId;

        return (
          <button
            type="button"
            key={item.id}
            ref={(el) => {
              tabRefs.current[idx] = el;
            }}
            role="tab"
            id={`tab-${item.id}`}
            aria-selected={active}
            tabIndex={active ? 0 : -1}
            onClick={() => setSelected(item.id)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') {
                e.preventDefault();
                const next = (idx + 1) % items.length;
                setSelected(items[next].id);
                focusTabByIndex(next);
              } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                const prev = (idx - 1 + items.length) % items.length;
                setSelected(items[prev].id);
                focusTabByIndex(prev);
              } else if (e.key === 'Home') {
                e.preventDefault();
                setSelected(items[0].id);
                focusTabByIndex(0);
              } else if (e.key === 'End') {
                e.preventDefault();
                const last = items.length - 1;
                setSelected(items[last].id);
                focusTabByIndex(last);
              }
            }}
            className={cn(
              'h-12 px-8 py-3 text-[1rem] transition',
              'focus:z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-tfl-ink focus-visible:ring-offset-2',
              active ? 'rounded-t-xl bg-white font-400' : 'font-300 hover:underline'
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
