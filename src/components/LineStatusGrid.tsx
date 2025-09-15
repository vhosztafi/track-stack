import type { LineCardVM } from '../types/tfl';
import LineStatusCard from './LineStatusCard.tsx';

export type LineStatusGridProps = {
  items: LineCardVM[];
};

export default function LineStatusGrid({ items }: LineStatusGridProps) {
  return (
    <div className="rounded-b-xl p-0">
      <ul className="m-0 grid list-none grid-cols-1 gap-x-6 p-0 md:grid-cols-2 md:gap-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <LineStatusCard item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
