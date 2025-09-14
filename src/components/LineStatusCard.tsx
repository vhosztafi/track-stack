import { type ReactNode, useMemo, useState } from 'react';

import { cn } from '../lib/cn.ts';
import type { LineCardVM } from '../types/tfl.ts';
import { Button } from './atoms/Button.tsx';

export type LineStatusCardProps = {
  item: LineCardVM;
  children?: ReactNode;
};

export default function LineStatusCard({ item }: LineStatusCardProps) {
  const { line, colourClassName, subStatuses, canExpand, defaultOpen } = item;

  const [open, setOpen] = useState(defaultOpen && canExpand);
  const panelId = useMemo(
    () =>
      `panel-${line
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')}`,
    [line]
  );

  return (
    <div
      className={cn(
        'border border-t-0 border-tfl-panel first:border-t xl:border-t',
        'relative bg-white',
        'focus-within:ring-tfl-ring rounded-xs focus-within:ring-2 focus-within:ring-tfl-ink focus-within:ring-offset-2 focus-within:ring-offset-white',
        open ? 'bg-surfaceMuted' : 'hover:bg-surfaceMuted',
        colourClassName
      )}
    >
      <span
        aria-hidden
        className={cn(
          'absolute left-0 top-0 h-full w-[6px] md:w-[8px]',
          `bg-${colourClassName} border-y-${colourClassName} `
        )}
      />{' '}
      <button
        type="button"
        aria-expanded={canExpand ? open : undefined}
        aria-controls={canExpand ? panelId : undefined}
        aria-disabled={!canExpand || undefined}
        disabled={!canExpand}
        onClick={() => canExpand && setOpen((v) => !v)}
        className={cn(
          'min-h-24 w-full cursor-pointer border-0 bg-transparent text-left outline-none',
          'focus-visible:outline-none',
          !canExpand && 'cursor-default'
        )}
      >
        <div className="flex w-full flex-col items-stretch border-t border-transparent md:flex-row">
          <div className="flex w-full">
            <h4
              id={`${panelId}-heading`}
              className={cn(
                'w-full md:w-[70%]',
                'pl-5 pr-7 pt-5 md:pt-6',
                'm-0 text-left',
                'text-[21px] font-[400] leading-[1.35rem] text-tfl-ink'
              )}
            >
              {line}
            </h4>

            <div className="w-full py-5 text-base leading-6 md:py-5">
              {subStatuses && subStatuses.length > 0 && (
                <ul className="m-0 list-none p-0" role="list">
                  {subStatuses.map((s, i) => (
                    <li key={i} className={i ? 'mt-[1.33rem]' : undefined}>
                      <div className="block w-full text-lg font-400 text-[#03071c]">{s.label}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {canExpand ? (
              <div className="relative ml-2 w-7 pt-5 md:ml-14 md:mr-5 md:w-14">
                <span
                  aria-hidden="true"
                  className={cn(
                    'block h-7 w-7 bg-[#03071c]',
                    'transition-transform duration-200',
                    open && 'rotate-180'
                  )}
                  style={{
                    maskImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cpath fill='%23000' fill-rule='evenodd' d='M23.097 11.134 16 18.05l-7.096-6.917L7 13.064l7.77 7.575c.679.659 1.78.66 2.459 0l7.77-7.574-1.902-1.931z'/%3E%3C/svg%3E\")",
                    WebkitMaskImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cpath fill='%23000' fill-rule='evenodd' d='M23.097 11.134 16 18.05l-7.096-6.917L7 13.064l7.77 7.575c.679.659 1.78.66 2.459 0l7.77-7.574-1.902-1.931z'/%3E%3C/svg%3E\")",
                  }}
                />
              </div>
            ) : (
              <div className="relative ml-2 w-7 pt-5 md:ml-14 md:mr-5 md:w-14"></div>
            )}
          </div>
        </div>
      </button>
      {open && (
        <div id={panelId} role="region" aria-labelledby={`${panelId}-heading`}>
          <div className="bg-tfl-surfaceMuted">
            <div className="border-t border-tfl-panel bg-white py-5 text-[0.95rem] font-300 leading-6 text-tfl-ink">
              <div className="flex w-full">
                <div className="m-0 w-full pl-5 pr-7 pt-5 md:w-[70%] md:pt-6"></div>
                <div className="w-full">
                  <ul className="m-0 mb-4" role="list">
                    {item.subStatuses.map(
                      (subStatus, idx) =>
                        subStatus.scope && (
                          <li key={`${line}-${idx}`} className="mb-2">
                            <p>{subStatus.scope}</p>
                          </li>
                        )
                    )}
                  </ul>
                  <Button variant="secondary" size="md" className="mb-0 h-10 min-w-72">
                    Replan your journey
                  </Button>
                </div>
                <div className="relative ml-2 w-7 pt-5 md:ml-14 md:mr-5 md:w-14"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
