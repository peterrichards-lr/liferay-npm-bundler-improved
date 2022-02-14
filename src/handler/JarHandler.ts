import Pack from '../types/Pack.types'
import archiver, { Archiver } from 'archiver'
import { createWriteStream, WriteStream } from 'fs'
import { sep } from 'path'

export default class JarHandler {
  public name: string
  public archive: Archiver
  public output: WriteStream

  constructor() {
    this.archive = archiver('zip')
  }

  initialize(): void {
    this.output = createWriteStream(`dist${sep}${this.name}`)

    this.archive.on('warning', function (err) {
      if (err.code === 'ENOENT') {
        console.log('warning', err)
      } else {
        throw err
      }
    })

    this.archive.on('error', function (err) {
      throw err
    })

    this.archive.pipe(this.output)
  }

  setName(pack: Pack): void {
    this.name = `${pack.name}-${pack.version}.jar`
  }

  async create(): Promise<void> {
    await this.archive.finalize()
  }
}
