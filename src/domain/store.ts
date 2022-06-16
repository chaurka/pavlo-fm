const KEY = 'charts'

import {createPersistentSignal} from '$/lib/persistent'
import {Channel, signal} from '$/lib/reactive'
import {Chart, serializeCharts, deserializeCharts} from '$/domain/chart'

export interface Store {
  charts: Channel<Chart[]>
  currentChartIndex: Channel<number>
  currentChart: Channel<Chart | undefined>
}

export function createStore(): Store {
  const charts = createPersistentSignal(
    KEY,
    [] as Chart[],
    () => false,
    serializeCharts,
    deserializeCharts
  )
  const currentChartIndex = signal(0)
  const currentChart = () =>
    charts().at(currentChartIndex()) as Chart | undefined

  return {
    charts,
    currentChartIndex,
    currentChart
  }
}
