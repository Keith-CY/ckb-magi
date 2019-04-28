import { Injectable } from '@nestjs/common'
import * as dotenv from 'dotenv'

@Injectable()
export class ConfigService {
  private readonly envConfig: dotenv.DotenvConfigOutput
  constructor(filePath: string = '.env') {
    this.envConfig = dotenv.config({ path: filePath }).parsed
  }
  get(key: string) {
    return this.envConfig[key]
  }
}
