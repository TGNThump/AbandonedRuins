export default class RuinSet {
  private _bookId: number | undefined;

  public name: string;
  public blueprintBook: string;
  public spawnChancePerChunk: number;
  public minimumSquareDistanceFromSpawn: number | null;
  public maximumSquareDistanceFromSpawn: number | null;

  constructor(name: string, blueprintBook: string, spawnChancePerChunk: number, minimumDistanceFromSpawn: number | null, maximumDistanceFromSpawn: number | null) {
    this.name = name;
    this.blueprintBook = blueprintBook;
    this.spawnChancePerChunk = spawnChancePerChunk;
    this.minimumSquareDistanceFromSpawn = minimumDistanceFromSpawn === null ? null : minimumDistanceFromSpawn * minimumDistanceFromSpawn;
    this.maximumSquareDistanceFromSpawn = maximumDistanceFromSpawn === null ? null : maximumDistanceFromSpawn * maximumDistanceFromSpawn;
  }

  get bookId(): number {
    return <number>this._bookId;
  }

  set bookId(value: number) {
    this._bookId = value;
  }
}