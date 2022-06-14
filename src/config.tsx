import '$/config.sass'

import {Chart} from '$/chart'
import {ComponentProps, FlowProps} from 'solid-js'
import {GetInt, GetString, GetBool} from '$/inputs'

export function Config(p: {chart: Chart}) {
  return (
    <div class="config">
      <ConfigPref label="Name">
        <GetString value={p.chart.name.bind(p.chart)} />
      </ConfigPref>
      <ConfigPrefInt
        label="Width"
        min={1}
        max={25}
        value={p.chart.width.bind(p.chart)}
        sync={() => p.chart.height(p.chart.width())}
      ></ConfigPrefInt>
      <ConfigPrefInt
        label="Height"
        min={1}
        max={25}
        value={p.chart.height.bind(p.chart)}
        sync={() => p.chart.width(p.chart.height())}
      ></ConfigPrefInt>
      <ConfigPref label="Show titles">
        <GetBool value={p.chart.showTitles.bind(p.chart)} />
      </ConfigPref>
    </div>
  )
}

function ConfigPref(p: FlowProps<{label: string}>) {
  return (
    <div class="config-pref">
      <div class="config-pref-label">{p.label}</div>
      <div class="config-pref-input">{p.children}</div>
    </div>
  )
}

function ConfigPrefInt(
  p: ComponentProps<typeof GetInt> & {label: string; sync: () => void}
) {
  return (
    <ConfigPref label={p.label}>
      <div class="config-pref-int">
        <GetInt min={p.min} max={p.max} value={p.value} />
        <button class="config-pref-int-sync" onClick={p.sync}>
          sync
        </button>
      </div>
    </ConfigPref>
  )
}
