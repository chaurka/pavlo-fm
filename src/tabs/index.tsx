import './styles.sass'

import {JSXElement, For} from 'solid-js'
import {signal} from '$/lib/reactive'

export function Tabs(p: {children: {title: string; content: JSXElement}[]}) {
  const active = signal(0)
  const content = () => p.children[active()].content

  return (
    <div class="tabs">
      <div class="tabs-header">
        <For each={p.children}>
          {(tab, i) => (
            <button
              classList={{active: active() === i()}}
              class="tabs-title"
              onClick={() => active(i())}
            >
              {tab.title}
            </button>
          )}
        </For>
      </div>
      <div class="tabs-body">{content()}</div>
    </div>
  )
}
