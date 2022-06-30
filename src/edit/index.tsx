import './styles.sass'

import {For, Show} from 'solid-js'
import {signal, Channel, effect} from '$/lib/reactive'

import {Config, ConfigPref} from '$/config'
import {GetString, GetImage} from '$/inputs'
import {Chart, ChartCover} from '$/domain/chart'
import {Grid} from '$/edit/grid'

export function Edit(p: {chart: Chart}) {
  const currentCell = signal(-1)
  const cover = () => p.chart.getCover(currentCell())

  const editorHook = signal<HTMLElement>()
  const focusEditor = () => editorHook().scrollIntoView({behavior: 'smooth'})

  return (
    <div class="edit">
      <Grid
        focusEditor={focusEditor}
        chart={p.chart}
        currentCell={currentCell}
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
