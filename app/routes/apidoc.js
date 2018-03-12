
import {resolve} from 'path'
import {
  Controller,
  Post,
  Auth,
  Get,
  Required,
} from '../decorator/router'
@Controller('/apidoc')
export default class Apidoc {
@Get('/')
async Apidoc (ctx, next) {
   await ctx.render('index.html')
 }
}