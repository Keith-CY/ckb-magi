import { ConfigService } from '../../config/config.service'
import { Injectable } from '@nestjs/common'
import CKB from '@nervosnetwork/ckb-sdk-core'
import { Subject } from 'rxjs'
import { distinctUntilChanged } from 'rxjs/operators'
import { BlocksService } from '../blocks/blocks.service'

@Injectable()
export class SyncService {
  public ckb: CKB
  public blockNumberSubject = new Subject()
  public blockHashSubject = new Subject()
  public blockSubject = new Subject()
  private timer = null
  private url = ''
  private interval = 1000
  constructor(private readonly configService: ConfigService) {
    this.url = this.configService.get('URL')
    this.interval = this.configService.get('INTERVAL')
    this.ckb = new CKB(this.url)
    this.start()
    this.propagate()
  }
  start() {
    this.timer = setInterval(() => {
      this.ckb.rpc
        .getTipBlockNumber()
        .then(num => {
          this.blockNumberSubject.next(num)
        })
        .catch(err => console.error(err.message))
    }, this.interval)
  }
  stop() {
    clearInterval(this.timer)
  }

  propagate() {
    this.blockNumberSubject
      .pipe(distinctUntilChanged())
      .subscribe(async num => {
        const hash = await this.ckb.rpc.getBlockHash(`${num}`)
        this.blockHashSubject.next(hash)
        const block = await this.ckb.rpc.getBlock(hash)
        this.blockSubject.next(block)
      })
  }
}
