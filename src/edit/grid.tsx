import {signal, Channel, effect} from '$/lib/reactive'
import {createElementSize} from '@solid-primitives/resize-observer'
import {Chart, ChartCover} from '$/domain/chart'

export function Grid(p: {
  chart: Chart
  focusEditor(): void
  currentCell: Channel<number>
}) {
  const gridNode = signal<HTMLDivElement>()

  return <div ref={gridNode} class="grid"></div>
}
