export function evaluateNumericAnswer(expected: number, received: number, tolerance = 0): boolean {
  return Math.abs(expected - received) <= tolerance;
}

export function evaluateDragMatches(expected: [string, string][], received: [string, string][]): boolean {
  if (expected.length !== received.length) return false;
  const expectedSet = new Set(expected.map((pair) => pair.join("::")));
  return received.every((pair) => expectedSet.has(pair.join("::")));
}
