import {throttle} from '$/lib/throttle'
import {Comparator, signal, effect, Channel} from '$/lib/reactive'

let storageBlocked = false
try {
  localStorage.setItem('_', '')
  localStorage.removeItem('_')
} catch {
  storageBlocked = true
}

const requestSync = throttle((fn: () => void) => fn(), 3_000)
const _pendingSync = signal(false)
export const pendingSync = () => _pendingSync()

export function createPersistentSignal<T>(
  key: string,
  defaultValue: T,
  equals?: Comparator<T>,
  toDto = (x: T) => x as any,
  fromDto = (x: any) => x as T
): Channel<T> {
  if (storageBlocked) return signal(defaultValue, equals)

  let initial = defaultValue
  const saved = localStorage.getItem(key)
  if (saved) initial = fromDto(JSON.parse(saved))

  const sig = signal(initial)

  effect(() => {
    // `toDto` may subscribe to nested signals for full reactivity
    const latest = toDto(sig())

    _pendingSync(true)
    requestSync(() => {
      // synchronize with the storage
      localStorage.setItem(key, JSON.stringify(latest))
      _pendingSync(false)
    })
  })

  return sig
}
