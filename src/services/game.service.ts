import { Injectable } from '@nestjs/common';
import { RedisService } from './redis.service';
import { IBoard } from '../interfaces/board.interface';

@Injectable()
export class GameService {
  constructor(private readonly redisService: RedisService, ) {
    this.init();
  }

  async init(): Promise<IBoard> {
    const game: IBoard = {
      canPlay: true,
      message: '',
      nextTurn: (Math.floor(Math.random() * 100) % 2 === 0)? 'x': 'o',
      board: ['','','','','','','','','',],
      logs: [this.formatLogMessage('Game initialised.')],
    };
    await this.redisService.setKey('gameContent', JSON.stringify(game));
    return game;
  }

  async get():Promise<IBoard> {
    const gameContent = await this.redisService.getKey('gameContent');
    return JSON.parse(gameContent);
  }

  async setBoardBox(id: number): Promise<IBoard> {
    let game:IBoard = JSON.parse(await this.redisService.getKey('gameContent'));
    if (!game.canPlay) {
      return game;
    }

    if (game.board[id] !== '') {
      game.message = `${id}: this box is used`;
      return game;
    }

    game.message = '';
    game.logs.push(this.formatLogMessage(`Player ${game.nextTurn} turned.`));
    game.board[id] = game.nextTurn;

    let winner = this.checkGameStatus(game);
    if (winner !== '') {
      game.message = `${winner} win!`;
      game.canPlay = false;
      game.logs.push(this.formatLogMessage(`${winner} WIN !!!`));
      game.nextTurn = '';
    }
    
    if (winner === '') {
      game.nextTurn = (game.nextTurn === 'x')?'o':'x';
    }

    await this.redisService.setKey('gameContent', JSON.stringify(game));
    return game;  
  }

  async reset():Promise<IBoard> {
    return await this.init();
  }

  private checkGameStatus(game: IBoard):string {
    const winPatterns:Array<Array<number>> = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [2,4,6], [0,4,8],
    ];
    let xPlayer: string = game.board.map((x,i) => { return (x==='x')?i:''}).toString();
    let oPlayer: string = game.board.map((x,i) => { return (x==='o')?i:''}).toString();
    let winner: string = '';
    winPatterns.forEach((pattern) => {
      if (
        xPlayer.includes(pattern[0].toString()) &&
        xPlayer.includes(pattern[1].toString()) &&
        xPlayer.includes(pattern[2].toString())) {
        winner = 'X';
      }
      if (
        oPlayer.includes(pattern[0].toString()) &&
        oPlayer.includes(pattern[1].toString()) &&
        oPlayer.includes(pattern[2].toString())) {
        winner = 'O';
      }
    })
    if (game.board.toString().length===17) { winner = 'Friendship'; }
    return winner;
  }

  private formatLogMessage(text: string): string {
    return `${new Date().toISOString()} - ${text}`;
  }
}
