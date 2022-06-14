import '$/charts.sass'

import {Channel} from '$/lib'
import {For} from 'solid-js'
import {Chart} from '$/chart'

export function Charts(p: {
  currentChartIndex: Channel<number>
  currentChart: Channel<Chart>
  charts: Channel<Chart[]>
}) {
  function create() {
    const chart = new Chart()
    p.charts(p.charts().slice().concat(chart))
    p.currentChartIndex(p.charts().length - 1)
  }
  function select(i: number) {
    p.currentChartIndex(i)
  }
  function del(i: number) {
    const clone = p.charts().slice()
    clone.splice(i, 1)
    p.charts(clone)
  }

  return (
    <div class="charts">
      <button onClick={create}>Create new chart</button>
      <div class="charts-list">
        <For
          each={p.charts()}
          fallback={<em>Create a chart to get started</em>}
        >
          {(chart, i) => (
            <div class="charts-item">
              <div
                class="charts-item-title"
                classList={{
                  selected: chart === p.currentChart()
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
