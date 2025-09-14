import type { Line, LineCardVM } from '../types/tfl.ts';

function toSubStatuses(line: Line) {
  const fromStatuses =
    line.lineStatuses?.map((s) => ({
      label: s.statusSeverityDescription,
      scope: s.reason ?? undefined,
    })) ?? [];
  const fromDisruptions =
    line.disruptions?.map((d) => ({
      label: d.description ?? d.category,
      scope: d.description ?? undefined,
    })) ?? [];
  return [...fromStatuses, ...fromDisruptions];
}
function hasDisruption(line: Line) {
  return Boolean(line.disruptions?.length || line.lineStatuses?.some((s) => s.reason));
}
function getLineColourClass(lineId: string) {
  return `tfl-line-${lineId}`;
}

export function mapToVM(lines: Line[]): LineCardVM[] {
  return lines.map((l) => {
    return {
      id: l.id,
      line: l.name,
      colourClassName: getLineColourClass(l.id),
      subStatuses: toSubStatuses(l),
      canExpand: hasDisruption(l),
      isGoodService: !hasDisruption(l),
      defaultOpen: false,
    };
  });
}
