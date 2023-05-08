export function registerClickAway(callback) {
  function unregisterClickAway(event) {
    document.removeEventListener("click", unregisterClickAway)
    document.querySelectorAll('iframe').forEach(iframe => {
      const src = iframe.attributes.src
      if (src && src.value.startsWith('/') && !src.value.startsWith('//')) {
        iframe.contentWindow.document.removeEventListener("click", unregisterClickAway)
      }
    })
    callback(event)
  }

  document.removeEventListener("click", unregisterClickAway)
  document.addEventListener("click", unregisterClickAway)

  document.querySelectorAll('iframe').forEach(iframe => {
    const src = iframe.attributes.src
    if (src && src.value.startsWith('/') && !src.value.startsWith('//')) {
      iframe.contentWindow.document.removeEventListener("click", unregisterClickAway)
      iframe.contentWindow.document.addEventListener("click", unregisterClickAway)
    }
  })
}