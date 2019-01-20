import * as express from 'express'
import * as serveHandler from 'serve-handler'
import * as path from 'path'

import { controller, httpGet, interfaces, BaseHttpController } from 'inversify-express-utils'

@controller('/')
export class HomeController extends BaseHttpController implements interfaces.Controller {
  constructor() {
    super()
  }

  @httpGet('/foo')
  private async _index(req: express.Request, res: express.Response) {
    return serveHandler(req, res, {
      cleanUrls: true,
      public: path.resolve(process.cwd(), 'reports'),
      unlisted: ['.gitkeep'],
    })
  }
}
