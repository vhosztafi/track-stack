import { describe, expectTypeOf, it } from 'vitest';

import type { Disruption, Line, LineStatus } from './tfl.ts';

describe('TfL types', () => {
  it('LineStatus shape', () => {
    expectTypeOf<LineStatus>().toMatchObjectType<{
      id: number;
      statusSeverity: number;
      statusSeverityDescription: string;
      reason?: string;
    }>();
  });

  it('Disruption shape', () => {
    expectTypeOf<Disruption>().toMatchObjectType<{
      category: string;
      description: string;
      closureText?: string;
    }>();
  });

  it('Line shape', () => {
    expectTypeOf<Line>().toMatchObjectType<{
      id: string;
      name: string;
      modeName: string;
      lineStatuses: LineStatus[];
      disruptions?: Disruption[];
    }>();
  });

  it('example objects satisfy types', () => {
    const status: LineStatus = {
      id: 1,
      statusSeverity: 10,
      statusSeverityDescription: 'Good Service',
    };

    const line: Line = {
      id: 'bakerloo',
      name: 'Bakerloo',
      modeName: 'tube',
      lineStatuses: [status],
    };

    const disruption: Disruption = {
      category: 'Information',
      description: 'Minor delays expected',
    };

    expectTypeOf(line.lineStatuses[0]).toEqualTypeOf<LineStatus>();
    expectTypeOf(disruption.category).toBeString();
  });
});
