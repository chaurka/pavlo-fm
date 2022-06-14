import {createMutable} from 'solid-js/store'
import {signal} from '$/lib'

export interface ChartCoverDto {
  src: string
  album: string
  artist: string
}

export class ChartCover {
  static fromDto(dto: ChartCoverDto) {
    const obj = new ChartCover()

    obj.artist(dto.artist)
    obj.album(dto.album)
    obj.src(dto.src)

    return obj
  }

  artist = signal('')
  album = signal('')
  src = signal('')

  toDto(): ChartCoverDto {
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
  static fromDto(dto: ChartDto) {
    const obj = new Chart()

    obj.width(dto.width)
    obj.height(dto.height)
    obj.showTitles(dto.showTitles)
    obj.name(dto.name)
    obj.covers.push(...dto.covers.map(c => ChartCover.fromDto(c)))

    return obj
  }

  width = signal(3)
  height = signal(3)
  showTitles = signal(true)
  name = signal('Unnamed')
  covers = createMutable<ChartCover[]>([])

  getCover(i: number) {
    return (this.covers[i] ??= new ChartCover())
  }

  toDto(): ChartDto {
    return {
      width: this.width(),
      height: this.height(),
      showTitles: this.showTitles(),
      name: this.name(),
      covers: this.covers.map(c => c.toDto())
    }
  }

  clone() {
    return Chart.fromDto(this.toDto())
  }
}
