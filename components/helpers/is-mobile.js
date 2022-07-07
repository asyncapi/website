let isMobile = undefined;
export function isMobileDevice() {
  if (typeof navigator === 'undefined') return false;
  if (typeof isMobile === 'boolean') return isMobile;

  let regexp = /android|iphone|kindle|ipad/i;
  return isMobile = regexp.test(navigator.userAgent);
}