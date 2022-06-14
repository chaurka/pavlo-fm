export function dataUrl(blob: Blob) {
  return new Promise<string>(res => {
    const reader = new FileReader()
    reader.readAsDataURL(blob)
    reader.addEventListener('loadend', () => res(reader.result as string))
  })
}
