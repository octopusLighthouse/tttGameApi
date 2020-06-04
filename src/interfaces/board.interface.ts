export interface IBoard {
  canPlay: boolean;
  message: string;
  nextTurn: string;
  board: Array<string>;
  logs: Array<string>;
}