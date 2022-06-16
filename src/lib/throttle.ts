export function throttle<Args extends any[]>(
  f: (...args: Args) => void,
  ms: number
) {
  let args: Args | null = null

  setInterval(() => {
    if (args) {
      console.log('throttle:', args)
      f.apply(undefined, args)
      args = null
    }
  }, ms)

  return (...recieved: Args) => {
    args = recieved
  }
}
