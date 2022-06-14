import '$/inputs.sass'

import {Channel} from '$/lib'

interface InputProps<T> {
  value: Channel<T>
}

export function GetInt(p: InputProps<number> & {min: number; max: number}) {
  const allowDecrement = () => p.value() > p.min
  const allowIncrement = () => p.value() < p.max
  const decrement = () => void (allowDecrement() && p.value(p.value() - 1))
  const increment = () => void (allowIncrement() && p.value(p.value() + 1))

  return (
    <div class="get-int">
      <button
        class="get-int-button"
        classList={{disabled: !allowDecrement()}}
        onClick={decrement}
      >
        -
      </button>
      <div class="get-int-value">{p.value()}</div>
      <button
        class="get-int-button"
        classList={{disabled: !allowIncrement()}}
        onClick={increment}
      >
        +
      </button>
    </div>
  )
}

export function GetBool(p: InputProps<boolean>) {
  const toggle = () => p.value(!p.value())

  return (
    <button class="get-bool" onClick={toggle}>
      {p.value() ? 'Yes' : 'No'}
    </button>
  )
}

export function GetString(p: InputProps<string>) {
  return (
    <input
      class="get-string"
      value={p.value()}
      onInput={e => p.value(e.currentTarget.value)}
    />
  )
}
