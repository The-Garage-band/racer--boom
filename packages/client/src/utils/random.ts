export class Random {
  static randomInt(from: number, to: number): number {
    if (from === to) {
      return from
    }
    return Math.floor(Math.random() * (to - from)) + from
  }

  static random(from: number, to: number): number {
    if (from === to) {
      return from
    }
    return Math.random() * (to - from) + from
  }

  static range(root: number, delta: number): number {
    return this.random(root - delta, root + delta)
  }

  static applyIntRange(value: number, delta: number): number {
    return Math.round(value * this.range(1, delta))
  }

  static randomFrom<T extends number | string | boolean>(array: T[]): T {
    return array[this.randomInt(0, array.length)] as T
  }

  static shuffleArray<T extends number | string | boolean>(array: T[]): T[] {
    let tmp: T
    const result = array.slice(0)
    for (let i = array.length - 1; i >= 0; i -= 1) {
      const j = this.randomInt(0, i + 1)

      tmp = result[i]
      result[i] = result[j]
      result[j] = tmp
    }

    return result
  }

  static probability(probability: number): boolean {
    if (probability === 0) {
      return false
    }
    if (probability === 1) {
      return true
    }
    return Math.random() < probability
  }
}
