import { Controller, Get, Post, Res, HttpStatus, Body, } from '@nestjs/common';
import { Response } from 'express';
import { GameService } from '../services/game.service';
import { BoardBoxIdDto } from '../dto/boardBoxId.dto';

@Controller('/game/api/v1')
export class AppController {
  constructor(
    private readonly gameService: GameService,
    ) {}

  @Post('/board')
  async setGameBoardBox(
    @Body() box: BoardBoxIdDto,
    @Res() res: Response,
  ){
    res
      .status(HttpStatus.OK)
      .json(await this.gameService.setBoardBox(box.id));
  }

  @Get('/board')
  async getGameBoard(@Res() res: Response,){
    res.status(HttpStatus.OK).json(await this.gameService.get());
  }

  @Post('/reset')
  async resetGameBoard(@Res() res: Response,){
    res.status(HttpStatus.OK).json(await this.gameService.reset());
  }
}
