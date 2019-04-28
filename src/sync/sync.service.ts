import { ConfigService } from './../config/config.service'
import { Injectable } from '@nestjs/common'
import CKB from '@nervosnetwork/ckb-sdk-core'
import { Subject } from 'rxjs'
import { distinctUntilChanged } from 'rxjs/operators'
import { BlocksService } from '../blocks/blocks.service'

@Injectable()
export class SyncService {
  public ckb: CKB
  public subject = new Subject()
  private timer = null
  private url = ''
  private interval = 1000
  constructor(
    private readonly blocksService: BlocksService,
    private readonly configService: ConfigService,
  ) {
    this.url = this.configService.get('URL')
    this.interval = this.configService.get('INTERVAL')
    this.ckb = new CKB(this.url)
    this.start()
    this.log()
  }
  start() {
    this.timer = setInterval(() => {
      this.ckb.rpc
        .getTipBlockNumber()
        .then(num => {
          this.subject.next(num)
        })
        .catch(err => console.error(err.message))
    }, this.interval)
  }
  stop() {
    clearInterval(this.timer)
  }
  log() {
    this.subject.pipe(distinctUntilChanged()).subscribe(num => {
      console.log(num)
    })
  }
}
