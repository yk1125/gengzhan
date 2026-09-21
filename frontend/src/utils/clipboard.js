const legacyCopy = (text) => {
  const textarea = document.createElement('textarea')
  const activeElement = document.activeElement

  textarea.value = text
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.left = '-9999px'
  textarea.style.top = '0'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.focus()
  textarea.select()
  textarea.setSelectionRange(0, textarea.value.length)

  let copied = false
  try {
    copied = document.execCommand('copy')
  } finally {
    textarea.remove()
    activeElement?.focus?.()
  }

  if (!copied) throw new Error('Legacy clipboard copy was rejected')
}

export const copyToClipboard = async (value) => {
  const text = String(value ?? '')
  if (!text) throw new Error('Clipboard value is empty')

  if (typeof window !== 'undefined' && typeof navigator !== 'undefined' && navigator.clipboard?.writeText && (window.isSecureContext || window.location?.protocol === 'http:')) {
    try {
      await navigator.clipboard.writeText(text)
      return
    } catch (error) {
      // Permission policies and embedded browsers may reject the modern API.
    }
  }

  if (typeof document === 'undefined') throw new Error('Clipboard is unavailable')
  legacyCopy(text)
  return true
}
