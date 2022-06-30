import './styles.sass'

import {Show} from 'solid-js'
import {Fallback} from '$/lib/fallback'

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
      <Show
        when={store.currentChart()}
        fallback={<Fallback>Nothing to edit</Fallback>}
      >
        {chart => (
          <Tabs>
            {[
              {
                title: 'Configure chart',
                content: <AppConfig chart={chart} />
              },
              {
                title: 'Edit chart',
                content: <Edit chart={chart} />
              }
            ]}
          </Tabs>
        )}
      </Show>
    </div>
  )
}

function AppConfig(p: {chart: Chart}) {
  const syncWidth = () => void p.chart.height(p.chart.width())
  const syncHeight = () => void p.chart.width(p.chart.height())

  return (
    <Config>
      <ConfigPref label="Name">
        <GetString value={p.chart.name} />
      </ConfigPref>
      <ConfigPrefInt label="Width" value={p.chart.width} sync={syncWidth} />
      <ConfigPrefInt label="Height" value={p.chart.height} sync={syncHeight} />
      <ConfigPref label="Show titles">
        <GetBool value={p.chart.showTitles} />
      </ConfigPref>
    </Config>
  )
}
