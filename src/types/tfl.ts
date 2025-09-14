// Minimal types for TfL Line Status API
// Based on GET https://api.tfl.gov.uk/Line/Mode/Tube/Status

export interface LineStatus {
  id: number;
  statusSeverity: number;
  statusSeverityDescription: string;
  reason?: string;
}

export interface Disruption {
  category: string;
  description: string;
  closureText?: string;
}

export interface Line {
  id: string;
  name: string;
  modeName: string;
  lineStatuses: LineStatus[];
  disruptions?: Disruption[];
}

export interface SubStatus {
  label: string;
  scope?: string;
}

export type LineCardVM = {
  id: string;
  line: string;
  colourClassName: string;
  subStatuses: SubStatus[];
  canExpand: boolean;
  isGoodService: boolean;
  defaultOpen?: boolean;
};
