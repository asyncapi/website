export function registerClickAway(callback) {
  document.removeEventListener("click", unregisterClickAway)
  document.addEventListener("click", unregisterClickAway)

  document.querySelectorAll('iframe').forEach(iframe => {
    if (iframe.attributes.src.value.startsWith('/') && !iframe.attributes.src.value.startsWith('//')) {
      iframe.contentWindow.document.removeEventListener("click", unregisterClickAway)
      iframe.contentWindow.document.addEventListener("click", unregisterClickAway)
    }
  })

  function unregisterClickAway() {
    document.removeEventListener("click", unregisterClickAway)
    document.querySelectorAll('iframe').forEach(iframe => {
      if (iframe.attributes.src.value.startsWith('/') && !iframe.attributes.src.value.startsWith('//')) {
        iframe.contentWindow.document.removeEventListener("click", unregisterClickAway)
      }
    })
    callback()
  }
}