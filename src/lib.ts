import {createEffect, createSignal} from 'solid-js'

export type Channel<T> = (next?: T) => T

export function channel<T>(get: () => T, set: (next: T) => T): Channel<T> {
  return (next?: T) => (next === undefined ? get() : set(next))
}

type Comparator<T> = (a: T, b: T) => boolean

export function signal<T>(value?: T, equals?: Comparator<T>) {
  const [get, set] = createSignal(value!, {equals}) as [() => T, any] // todo: fix typings
  return channel<T>(get, set)
}

let storageBlocked = false
try {
  localStorage.setItem('_', '')
  localStorage.removeItem('_')
} catch {
  storageBlocked = true
}

export function persistentSignal<T>(
  key: string,
  defaultValue: T,
  equals?: Comparator<T>,
  serialize = (x: T) => JSON.stringify(x),
  deserialize = (x: string) => JSON.parse(x) as T
) {
  if (storageBlocked) return signal(defaultValue, equals)

  let initial = defaultValue
  const saved = localStorage.getItem(key)
  if (saved) {
    initial = deserialize(saved)
  }

  const sig = signal(initial)

  effect(() => {
    localStorage.setItem(key, serialize(sig()))
  })

  return sig
}

export const effect = createEffect
