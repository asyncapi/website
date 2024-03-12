let isMobile: boolean | undefined;

export function isMobileDevice(): boolean {
  if (typeof navigator === 'undefined') return false;
  if (typeof isMobile === 'boolean') return isMobile;

  const regexp = /android|iphone|kindle|ipad/i;

  return (isMobile = regexp.test(navigator.userAgent));
}
