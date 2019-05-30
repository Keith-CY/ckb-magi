import { ConfigService } from '../../config/config.service'
import { Injectable } from '@nestjs/common'
import axios from 'axios'
import { ReplaySubject, BehaviorSubject } from 'rxjs'

const api = {
  blocks: '/api/v1/blocks',
}

@Injectable()
export class SyncService {
  public blocks$ = new ReplaySubject()
  public total$ = new BehaviorSubject(0)
  private timer = null
  private url = ''
  private interval = 1000
  constructor(private readonly configService: ConfigService) {
    this.url = this.configService.get('URL')
    this.interval = this.configService.get('INTERVAL')
  }
  start() {
    this.stop()
    this.fetchBlocks()
    this.timer = setInterval(() => {
      this.fetchBlocks
    }, this.interval)
    return {
      code: 200,
    }
  }
  stop() {
    clearInterval(this.timer)
    return { code: 200 }
  }

  private fetchBlocks = () => {
    axios
      .get(`${this.url}${api.blocks}`, {
        headers: {
          'Content-Type': 'application/vnd.api+json',
          Accept: 'application/vnd.api+json',
        },
      })
      .then(({ data: { data, meta } }) => {
        this.blocks$.next(data.map(({ attributes }) => attributes))
        this.total$.next(meta.total)
      })
      .catch(console.error)
  }
}
