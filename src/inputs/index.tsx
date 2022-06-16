import './styles.sass'

import {Channel, signal, effect} from '$/lib/reactive'
import {dataUrl} from '$/lib/data-url'

interface InputProps<T> {
  value: Channel<T>
}

export function GetInt(p: InputProps<number>) {
  const decrement = () => void p.value(p.value() - 1)
  const increment = () => void p.value(p.value() + 1)

  return (
    <div class="get-int">
      <button class="get-int-button" onClick={decrement}>
        -
      </button>
      <div class="get-int-value">{p.value()}</div>
      <button class="get-int-button" onClick={increment}>
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

export function GetImage(p: InputProps<string>) {
  const input = signal<HTMLInputElement>()

  effect(() => {
    input().value = p.value()
  })

  function handle() {
    const file = input().files?.item(0)
    if (file) dataUrl(file).then(url => p.value(url))
  }

  return (
    <>
      <label class="get-image-base">
        <input
          ref={input}
          class="get-image-input"
          type="file"
          accept="image/*"
          onInput={handle}
        />
        <div class="button get-image-button">Upload image</div>
      </label>
    </>
  )
}
