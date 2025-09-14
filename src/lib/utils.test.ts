import { describe, expect, it } from 'vitest';

import type { Line } from '../types/tfl.ts';
import { mapToVM } from './utils';

describe('mapToVM', () => {
  it('maps a line with good service and no disruptions', () => {
    const input: Line[] = [
      {
        id: 'bakerloo',
        name: 'Bakerloo',
        lineStatuses: [
          {
            statusSeverityDescription: 'Good Service',
            reason: '',
            id: 0,
            statusSeverity: 0,
          },
        ],
        disruptions: [],
        modeName: '',
      },
    ];

    const result = mapToVM(input);

    expect(result).toHaveLength(1);
    const vm = result[0];
    expect(vm).toMatchObject({
      id: 'bakerloo',
      line: 'Bakerloo',
      colourClassName: 'tfl-line-bakerloo',
      canExpand: false,
      isGoodService: true,
      defaultOpen: false,
    });
    expect(vm.subStatuses).toEqual([{ label: 'Good Service', scope: '' }]);
  });

  it('maps a line with a status reason as a disruption (can expand, not good service)', () => {
    const input: Line[] = [
      {
        id: 'central',
        name: 'Central',
        lineStatuses: [
          {
            statusSeverityDescription: 'Minor Delays',
            reason: 'Signal failure at Oxford Circus',
            id: 0,
            statusSeverity: 0,
          },
        ],
        disruptions: [],
        modeName: '',
      },
    ];

    const [vm] = mapToVM(input);

    expect(vm.colourClassName).toBe('tfl-line-central');
    expect(vm.canExpand).toBe(true);
    expect(vm.isGoodService).toBe(false);
    expect(vm.subStatuses).toEqual([
      {
        label: 'Minor Delays',
        scope: 'Signal failure at Oxford Circus',
      },
    ]);
  });

  it('maps a line with disruptions, merging with statuses and handling labels/scopes correctly', () => {
    const input: Line[] = [
      {
        id: 'northern',
        name: 'Northern',
        lineStatuses: [
          {
            statusSeverityDescription: 'Part Suspended',
            reason: '',
            id: 0,
            statusSeverity: 0,
          },
        ],
        disruptions: [
          {
            description: 'No service between Camden Town and Kennington',
            category: 'Service Disruption',
          },
          {
            description: '',
            category: 'Information',
          },
        ],
        modeName: '',
      },
    ];

    const [vm] = mapToVM(input);

    expect(vm.id).toBe('northern');
    expect(vm.line).toBe('Northern');
    expect(vm.colourClassName).toBe('tfl-line-northern');
    expect(vm.canExpand).toBe(true);
    expect(vm.isGoodService).toBe(false);

    expect(vm.subStatuses).toEqual([
      { label: 'Part Suspended', scope: '' },
      {
        label: 'No service between Camden Town and Kennington',
        scope: 'No service between Camden Town and Kennington',
      },
      { label: '', scope: '' },
    ]);
  });

  it('handles empty input', () => {
    const result = mapToVM([]);
    expect(result).toEqual([]);
  });
});
