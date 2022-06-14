import '$/edit.sass'

import {For, Show} from 'solid-js'
import {createElementSize} from '@solid-primitives/resize-observer'
import {signal, Channel} from '$/lib'
import {dataUrl} from '$/data-url'

import {GetString} from '$/inputs'
import {Chart, ChartCover} from '$/chart'

const getRandomColor = () =>
  `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`

const isTouchDevice = 'ontouchstart' in window

export function Edit(p: {chart: Chart}) {
  const currentCell = signal(-1)
  const cover = () => p.chart.getCover(currentCell())

  return (
    <div class="edit">
      <EditGrid chart={p.chart} currentCover={currentCell} />
      <Show
        when={currentCell() !== -1}
        fallback={<em>Select a cell to edit it</em>}
      >
        <EditCover cover={cover()} />
      </Show>
    </div>
  )
}

function EditGrid(p: {chart: Chart; currentCover: Channel<number>}) {
  const w = () => p.chart.width()
  const h = () => p.chart.height()

  const container = signal<HTMLElement>()

  const size = createElementSize(() => container())
  const cellSize = () => Math.max(100, size.width / Math.min(w(), h()))

  const coords = (x: number, y: number) => w() * y + x

  return (
    <div
      ref={next => container(next)}
      class="edit-grid"
      style={{height: size.width + 'px'}}
    >
      <For each={Array(h())}>
        {(_, y) => (
          <div class="edit-row" style={{width: `${cellSize() * w()}px`}}>
            <For each={Array(w())}>
              {(_, x) => (
                <EditCell
                  showTitle={p.chart.showTitles()}
                  height={cellSize()}
                  cover={p.chart.getCover(coords(x(), y()))}
                  select={() => p.currentCover(coords(x(), y()))}
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
  height: number
  showTitle: boolean
  cover: ChartCover
  select: () => void
}) {
  const show = signal(false)
  const edit = signal<HTMLElement>()

  function onClick(event: Event) {
    if (isTouchDevice && event.target !== edit()) show(!show())
  }

  return (
    <div
      class="edit-cell"
      style={{
        height: `${p.height}px`,
        'background-image': `url(${p.cover.src()})`
      }}
      classList={{show: show()}}
      onClick={onClick}
    >
      <button
        ref={next => edit(next)}
        class="edit-cell-edit"
        onClick={p.select}
      >
        edit
      </button>
      <Show when={p.showTitle}>
        <div class="edit-cell-title">
          <div class="artist">{p.cover.artist()}</div>
          <div class="album">{p.cover.album()}</div>
        </div>
      </Show>
    </div>
  )
}

function EditCover(p: {cover: ChartCover}) {
  const artist = (next?: string) => p.cover.artist(next)
  const album = (next?: string) => p.cover.album(next)
  const src = (next?: string) => p.cover.src(next)

  return (
    <div class="edit-cover">
      {/* stolen from $/config.sass */}
      <div class="config-pref">
        <div class="config-pref-label">Artist</div>
        <div class="config-pref-input">
          <GetString value={artist} />
        </div>
      </div>
      <div class="config-pref">
        <div class="config-pref-label">Album</div>
        <div class="config-pref-input">
          <GetString value={album} />
        </div>
      </div>
      <div class="config-pref">
        <div class="config-pref-label">Drag-n-drop image</div>
        <div class="config-pref-input">
          <GetImage setValue={src} />
        </div>
      </div>
      <div class="config-pref">
        <div class="config-pref-label">URL</div>
        <div class="config-pref-input">
          <GetString value={src}></GetString>
        </div>
      </div>
    </div>
  )
}

function GetImage(p: {setValue: (url: string) => void}) {
  throw new Error('Івел сінер тупий підарас')
  const input = signal<HTMLInputElement>()

  function handle() {
    const file = input().files?.item(0)
    if (file) dataUrl(file).then(url => p.setValue(url))
  }

  return (
    <input
      ref={input}
      class="get-image"
      type="file"
      accept="image/*"
      onInput={handle}
    ></input>
  )
}
