/**
 * Helper function to verify multiple links using the same verification method
 * Reduces repetitive forEach loops in tests
 * 
 * @param {Array} linksArray - Array of link objects with url/href and label properties
 * @param {Function} verifyFn - The verification function to call for each link
 * @param {string} urlKey - The property name for the URL (default: 'url')
 * @param {string} labelKey - The property name for the label (default: 'label')
 */
export function verifyLinks(linksArray, verifyFn, urlKey = 'url', labelKey = 'label') {
  linksArray.forEach((link) => {
    verifyFn(link[urlKey], link[labelKey]);
  });
}
