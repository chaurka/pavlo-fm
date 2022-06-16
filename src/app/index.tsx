import './styles.sass'

import {Show, JSXElement} from 'solid-js'

import {Chart} from '$/domain/chart'
import {createStore} from '$/domain/store'

import {pendingSync} from '$/lib/persistent'

import {Config, ConfigPref, ConfigPrefInt} from '$/config'
import {GetString, GetBool} from '$/inputs'
import {Edit} from '$/edit'
import {Charts} from '$/charts'
import {Tabs} from '$/tabs'

export function App() {
  const store = createStore()

  return (
    <div class="app">
      <h1 class="app-title">
        <span class="app-title-highlight">Pavlo.fm</span> - the chart generator
      </h1>
      <div class="app-state">
        {pendingSync() ? '🤔 Out of sync' : '🥳 Charts are saved'}
      </div>
      <Charts {...store} />
      <Tabs>
        {[
          {
            title: 'Configure chart',
            content: (
              <Show when={store.currentChart()} fallback={Fallback}>
                {chart => <AppConfig chart={chart} />}
              </Show>
            )
          },
          {
            title: 'Edit chart',
            content: (
              <Show when={store.currentChart()} fallback={Fallback}>
                {chart => <Edit chart={chart} />}
              </Show>
            )
          }
        ]}
      </Tabs>
    </div>
  )
}

const Fallback = () => <em>Create or select a chart to get started</em>

function AppConfig(p: {chart: Chart}) {
  const syncWidth = () => void p.chart.height(p.chart.width())
  const syncHeight = () => void p.chart.width(p.chart.height())

  return (
    <Config>
      <ConfigPref label="Name">
        <GetString value={p.chart.name} />
      </ConfigPref>
      <ConfigPrefInt
        label="Width"
        value={p.chart.width}
        min={Chart.MIN_SIDE}
        max={Chart.MAX_SIDE}
        sync={syncWidth}
      />
      <ConfigPrefInt
        label="Height"
        value={p.chart.height}
        min={Chart.MIN_SIDE}
        max={Chart.MAX_SIDE}
        sync={syncHeight}
      />
      <ConfigPref label="Show titles">
        <GetBool value={p.chart.showTitles} />
      </ConfigPref>
    </Config>
  )
}
