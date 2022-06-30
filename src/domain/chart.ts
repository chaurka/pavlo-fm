import {createMutable} from 'solid-js/store'
import {signal, managedSignal, createMinmax} from '$/lib/reactive'

const k_toDto = Symbol()
const k_fromDto = Symbol()

export interface ChartCoverDto {
  src: string
  album: string
  artist: string
}

export class ChartCover {
  static [k_fromDto](dto: ChartCoverDto) {
    const obj = new ChartCover()

    obj.artist(dto.artist)
    obj.album(dto.album)
    obj.src(dto.src)

    return obj
  }

  artist = signal('')
  album = signal('')
  src = signal('');

  [k_toDto](): ChartCoverDto {
    return {
      artist: this.artist(),
      album: this.album(),
      src: this.src()
    }
  }
}

export interface ChartDto {
  width: number
  height: number
  showTitles: boolean
  name: string
  covers: ChartCoverDto[]
}

export class Chart {
  static MIN_SIDE = 1
  static MAX_SIDE = 25

  static [k_fromDto](dto: ChartDto) {
    const obj = new Chart()

    obj.width(dto.width)
    obj.height(dto.height)
    obj.showTitles(dto.showTitles)
    obj.name(dto.name)
    obj.covers.push(...dto.covers.map(c => ChartCover[k_fromDto](c)))

    return obj
  }

  width = createMinmax(3, Chart.MIN_SIDE, Chart.MAX_SIDE)
  height = createMinmax(3, Chart.MIN_SIDE, Chart.MAX_SIDE)
  showTitles = signal(true)
  name = managedSignal('Unnamed', undefined, next => next || 'Unnamed')
  covers = createMutable<ChartCover[]>([])

  getCover(i: number) {
    return (this.covers[i] ??= new ChartCover())
  }

  [k_toDto](): ChartDto {
    return {
      width: this.width(),
      height: this.height(),
      showTitles: this.showTitles(),
      name: this.name(),
      covers: this.covers.map(c => c[k_toDto]())
    }
  }

  clone() {
    return Chart[k_fromDto](this[k_toDto]())
  }
}

export const serializeCharts = (charts: Chart[]) =>
  charts.map(c => c[k_toDto]())
export const deserializeCharts = (data: any) =>
  (data as ChartDto[]).map(chart => Chart[k_fromDto](chart))
