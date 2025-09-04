export class GeneratorUtils {
  public static toArray<T>(generator: Generator<T>): T[] {
    return [...generator];
  }

  public static *take<T>(generator: Generator<T>, count: number): Generator<T> {
    let taken = 0;
    for (const item of generator) {
      if (taken >= count) break;
      yield item;
      taken++;
    }
  }

  public static *skip<T>(generator: Generator<T>, count: number): Generator<T> {
    let skipped = 0;
    for (const item of generator) {
      if (skipped < count) {
        skipped++;
        continue;
      }
      yield item;
    }
  }

  public static *fromIterable<T>(iterable: Iterable<T>): Generator<T> {
    yield* iterable;
  }
}
