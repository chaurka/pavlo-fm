import './styles.sass'

import {Store} from '$/domain/store'
import {Chart} from '$/domain/chart'
import {For} from 'solid-js'
import {Fallback} from '$/lib/fallback'

export function Charts(store: Store) {
  function create() {
    const chart = new Chart()
    store.charts(store.charts().slice().concat(chart))
    store.currentChartIndex(store.charts().length - 1)
  }

  function select(i: number) {
    store.currentChartIndex(i)
  }
  function del(i: number) {
    if (!confirm('This action is irreversible! Proceed?')) return
    const clone = store.charts().slice()
    clone.splice(i, 1)
    store.charts(clone)
  }

  return (
    <div class="charts">
      <button onClick={create}>Create new chart</button>
      <div class="charts-list">
        <For each={store.charts()} fallback={<Fallback>No charts</Fallback>}>
          {(chart, i) => (
            <div class="charts-item">
              <div
                class="charts-item-title"
                classList={{
                  selected: chart === store.currentChart()
                }}
              >
                {chart.name()}
              </div>
              <div class="charts-item-tools">
                <button onClick={() => select(i())}>select</button>
                <button onClick={() => del(i())}>delete</button>
              </div>
            </div>
          )}
        </For>
      </div>
    </div>
  )
}
