import '$/app.sass'

import {Show, JSXElement} from 'solid-js'

import {persistentSignal} from '$/lib'
import {Chart} from '$/chart'

import {Edit} from '$/edit'
import {Config} from '$/config'
import {Charts} from '$/charts'
import {Tabs} from '$/tabs'

const serializeCharts = (x: Chart[]) => JSON.stringify(x.map(c => c.toDto()))
const deserializeCharts = (x: string) =>
  JSON.parse(x).map((c: any) => Chart.fromDto(c))

export function App() {
  const charts = persistentSignal<Chart[]>(
    'charts',
    [],
    () => false,
    serializeCharts,
    deserializeCharts
  )
  const currentChartIndex = persistentSignal(
    'currentChartIndex',
    0,
    undefined,
    String,
    Number
  )

  const currentChart = () => charts()[currentChartIndex()]

  return (
    <div class="app">
      <h1 class="app-title">
        <span class="app-title-highlight">Pavlo.fm</span> - the chart generator
      </h1>
      <Charts
        currentChart={currentChart}
        currentChartIndex={currentChartIndex}
        charts={charts}
      />
      <Tabs>
        {[
          {
            title: 'Configure chart',
            content: (
              <Guard chart={currentChart()}>
                <Config chart={currentChart()} />
              </Guard>
            )
          },
          {
            title: 'Edit chart',
            content: (
              <Guard chart={currentChart()}>
                <Edit chart={currentChart()} />
              </Guard>
            )
          }
        ]}
      </Tabs>
    </div>
  )
}

function Guard(p: {chart: Chart; children: JSXElement}) {
  return (
    <Show
      when={p.chart}
      fallback={<em>Create or select a chart to get started</em>}
    >
      {p.children}
    </Show>
  )
}
