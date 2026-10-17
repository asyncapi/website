import dayjs from 'dayjs';

import { isUpcomingEvent } from '../utils/staticHelpers';

describe('isUpcomingEvent', () => {
  const now = dayjs('2026-10-12T10:00:00.000Z');

  test('treats an event earlier today as recorded', () => {
    expect(isUpcomingEvent('2026-10-12T09:00:00.000Z', now)).toBe(false);
  });

  test('treats an event later today as upcoming', () => {
    expect(isUpcomingEvent('2026-10-12T11:00:00.000Z', now)).toBe(true);
  });

  test('treats a future day as upcoming', () => {
    expect(isUpcomingEvent('2026-10-13T09:00:00.000Z', now)).toBe(true);
  });

  test('treats a past day as recorded', () => {
    expect(isUpcomingEvent('2026-10-11T18:00:00.000Z', now)).toBe(false);
  });

  test('does not treat an event starting exactly now as upcoming', () => {
    expect(isUpcomingEvent(now, now)).toBe(false);
  });
});
