import { GameService, } from './game.service';
import * as redis  from 'redis-mock';

describe('GameService', () => {
  //let appController: AppController;
  let gameService: GameService;
  let redisClient;

  beforeEach(async () => {
    redisClient = redis.createClient();
    redisClient.setKey = () => {};
    gameService = new GameService(redisClient);
  });

  describe('Init function test of GameService', () => {
    it('should return initialized game board with rigth parameters', async () => {
      const boardContent = await gameService.init();
      expect(boardContent).toMatchSnapshot({
        board: ["", "", "", "", "", "", "", "", ""],
        canPlay: true,
        logs: expect.any(Array),
        message: '',
        nextTurn: expect.any(String),
      });
    });
  });
});
