import { twMerge } from 'tailwind-merge';

export type SkipLinkProps = {
  targetId: string;
  label: string;
  className?: string;
};

export default function SkipLink({ targetId, label, className }: SkipLinkProps) {
  return (
    <a
      href={`#${targetId}`}
      className={twMerge(
        'font-weight-300 absolute left-[-9999px] top-0 box-border bg-white p-4.5 text-left text-lg font-normal leading-[27px] text-[#03071c] underline opacity-0 focus:fixed focus:left-6 focus:top-0 focus:opacity-100 focus:shadow-inset-1 focus-visible:outline-none',
        className
      )}
    >
      {label}
    </a>
  );
}
