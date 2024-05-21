import useEventListener from "../../hooks/useEventListener"

export function registerClickAway(callback) {
  function unregisterClickAway(event) {
    document.querySelectorAll('iframe').forEach(iframe => {
      const src = iframe.attributes.src
      if (src && src.value.startsWith('/') && !src.value.startsWith('//')) {
        iframe.contentWindow.document.removeEventListener("click", unregisterClickAway)
      }
    })
    callback(event)
  }

  useEventListener("click", unregisterClickAway, document)

  document.querySelectorAll('iframe').forEach(iframe => {
    const src = iframe.attributes.src
    if (src && src.value.startsWith('/') && !src.value.startsWith('//')) {
      useEventListener("click", unregisterClickAway, iframe.contentWindow.document)
    }
  })
}
