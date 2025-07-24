/**
 * @description Registers a callback function to be invoked when a click occurs outside of specified elements.
 * @param {function} callback - The callback function to be invoked when a click occurs outside of specified elements.
 *                             It takes a MouseEvent parameter and returns void.
 */
export function registerClickAway(callback: (event: MouseEvent) => void) {
  /**
   * @description Handles the click event and invokes the callback function
   * if the click occurs outside of specified elements.
   * @param {MouseEvent} event - The MouseEvent object representing the click event.
   */
  function unregisterClickAway(event: MouseEvent) {
    document.removeEventListener('click', unregisterClickAway);

    document.querySelectorAll('iframe').forEach((iframe) => {
      const src = iframe.attributes.getNamedItem('src');

      if (src && src.value.startsWith('/') && !src.value.startsWith('//')) {
        iframe.contentWindow?.document.removeEventListener('click', unregisterClickAway);
      }
    });

    callback(event);
  }

  document.removeEventListener('click', unregisterClickAway);
  document.addEventListener('click', unregisterClickAway);

  document.querySelectorAll('iframe').forEach((iframe) => {
    const src = iframe.attributes.getNamedItem('src');

    if (src && src.value.startsWith('/') && !src.value.startsWith('//')) {
      iframe.contentWindow?.document.removeEventListener('click', unregisterClickAway);
      iframe.contentWindow?.document.addEventListener('click', unregisterClickAway);
    }
  });
}
