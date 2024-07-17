let isMobile: boolean | undefined;

/**
 * @description Checks whether the current device is a mobile device.
 */
export function isMobileDevice(): boolean {
  if (typeof navigator === 'undefined') return false;
  if (typeof isMobile === 'boolean') return isMobile;

  const regexp = /android|iphone|kindle|ipad/i;

  isMobile = regexp.test(navigator.userAgent);

  return isMobile;
}
