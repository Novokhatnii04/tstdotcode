export interface IBlock {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
}

export const defaultBlocks: IBlock[] = [
  { id: "1", x: 50, y: 50, width: 300, height: 100, zIndex: 1 },
  { id: "2", x: 400, y: 50, width: 300, height: 100, zIndex: 1 },
  { id: "3", x: 50, y: 200, width: 300, height: 100, zIndex: 1 },
  { id: "4", x: 400, y: 200, width: 300, height: 100, zIndex: 1 },
  { id: "5", x: 50, y: 350, width: 300, height: 100, zIndex: 1 },
];
