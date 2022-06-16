import './styles.sass'

import {For, Show} from 'solid-js'
import {createElementSize} from '@solid-primitives/resize-observer'
import {signal, Channel} from '$/lib/reactive'

import {Config, ConfigPref} from '$/config'
import {GetString, GetImage} from '$/inputs'
import {Chart, ChartCover} from '$/domain/chart'

const isTouchDevice = 'ontouchstart' in window

export function Edit(p: {chart: Chart}) {
  const currentCell = signal(-1)
  const cover = () => p.chart.getCover(currentCell())

  const editorHook = signal<HTMLElement>()
  const focusEditor = () => editorHook().scrollIntoView({behavior: 'smooth'})

  return (
    <div class="edit">
      <EditGrid
        focusEditor={focusEditor}
        chart={p.chart}
        currentCover={currentCell}
      />
      <Show
        when={currentCell() !== -1}
        fallback={<em>Select a cell to edit it</em>}
      >
        <EditCover setHook={editorHook} cover={cover()} />
      </Show>
    </div>
  )
}

function EditGrid(p: {
  focusEditor(): void
  chart: Chart
  currentCover: Channel<number>
}) {
  const w = () => p.chart.width()
  const h = () => p.chart.height()

  const container = signal<HTMLElement>()

  const size = createElementSize(() => container())
  const cellSize = () => Math.max(100, size.width / Math.min(w(), h()))

  const coords = (x: number, y: number) => w() * y + x
  function selectCell(x: number, y: number) {
    p.currentCover(coords(x, y))
    p.focusEditor()
  }

  return (
    <div ref={container} class="edit-grid" style={{height: size.width + 'px'}}>
      <For each={Array(h())}>
        {(_, y) => (
          <div class="edit-row" style={{width: `${cellSize() * w()}px`}}>
            <For each={Array(w())}>
              {(_, x) => (
                <EditCell
                  showTitle={p.chart.showTitles()}
                  cellSize={cellSize()}
                  cover={p.chart.getCover(coords(x(), y()))}
                  select={() => selectCell(x(), y())}
                />
              )}
            </For>
          </div>
        )}
      </For>
    </div>
  )
}

function EditCell(p: {
  cellSize: number
  showTitle: boolean
  cover: ChartCover
  select: () => void
}) {
  return (
    <div
      class="edit-cell"
      style={{
        height: `${p.cellSize}px`,
        'background-image': `url(${p.cover.src()})`
      }}
      onClick={p.select}
    >
      <div class="edit-cell-caption">click to edit</div>
      <Show when={p.showTitle && (p.cover.album() || p.cover.artist())}>
        <div class="edit-cell-title">
          <div class="artist">{p.cover.artist()}</div>
          <div class="album">{p.cover.album()}</div>
        </div>
      </Show>
    </div>
  )
}

function EditCover(p: {setHook(next: HTMLElement): void; cover: ChartCover}) {
  const artist = (next?: string) => p.cover.artist(next)
  const album = (next?: string) => p.cover.album(next)
  const src = (next?: string) => p.cover.src(next)

  return (
    <>
      <div ref={p.setHook}></div>

      <Config>
        <ConfigPref label="Artist">
          <GetString value={artist} />
        </ConfigPref>
        <div class="config-pref">
          <div class="config-pref-label">Album</div>
          <div class="config-pref-input">
            <GetString value={album} />
          </div>
        </div>
        <div class="config-pref">
          <div class="config-pref-label">Image</div>
          <div class="config-pref-input">
            <GetImage value={src} />
          </div>
        </div>
        <div class="config-pref">
          <div class="config-pref-label">Image URL</div>
          <div class="config-pref-input">
            <GetString value={src}></GetString>
          </div>
        </div>
      </Config>
    </>
  )
}
