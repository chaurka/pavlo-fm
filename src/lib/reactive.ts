import {createEffect, createSignal} from 'solid-js'

export type Channel<T> = (next?: T) => T

export function channel<T>(get: () => T, set: (next: T) => T): Channel<T> {
  return (next?: T) => (next === undefined ? get() : set(next))
}

export type Comparator<T> = (a: T, b: T) => boolean

export function signal<T>(initial?: T, equals?: Comparator<T>) {
  const [get, set] = createSignal(initial!, {equals}) as [() => T, any] // todo: fix typings
  return channel<T>(get, set)
}
export const effect = createEffect

export function managedSignal<T>(
  initial: T | undefined,
  equals: Comparator<T> | undefined,
  getNext = (next: T) => next
) {
  const value = signal<T>(initial, equals)

  return channel(
    () => value(),
    next => value(getNext(next))
  )
}

export function createMinmax(initial: number, min: number, max: number) {
  return managedSignal(initial, undefined, next => {
    if (next < min) return min
    if (next > max) return max
    return next
  })
}
