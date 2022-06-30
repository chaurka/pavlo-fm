import './styles.sass'

import {ComponentProps, FlowProps, Show} from 'solid-js'
import {GetInt} from '$/inputs'

export function Config(p: FlowProps) {
  return <div class="config">{p.children}</div>
}

export function ConfigPref(p: FlowProps<{label: string}>) {
  return (
    <div class="config-pref">
      <div class="config-pref-label">{p.label}</div>
      <div class="config-pref-input">{p.children}</div>
    </div>
  )
}

export function ConfigPrefInt(
  p: ComponentProps<typeof GetInt> & {label: string; sync?: () => void}
) {
  return (
    <ConfigPref label={p.label}>
      <div class="config-pref-int">
        <GetInt value={p.value} />
        <Show when={p.sync}>
          <button class="config-pref-int-sync" onClick={p.sync}>
            sync
          </button>
        </Show>
      </div>
    </ConfigPref>
  )
}
