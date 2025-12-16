export function verifyLinks(linksArray, verifyFn, urlKey = 'url', labelKey = 'label') {
  linksArray.forEach((link) => {
    verifyFn(link[urlKey], link[labelKey]);
  });
}
