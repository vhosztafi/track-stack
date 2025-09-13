import { http, HttpResponse } from 'msw';
const BASE = 'https://api.tfl.gov.uk';

export const tubeStatuses = [
  {
    id: 'bakerloo',
    name: 'Bakerloo',
    modeName: 'tube',
    lineStatuses: [{ id: 0, statusSeverity: 10, statusSeverityDescription: 'Good Service' }],
  },
];

export const handlers = [
  http.get(`${BASE}/Line/Mode/Tube/Status`, () => HttpResponse.json(tubeStatuses)),
];
