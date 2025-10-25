/**
 * Simple Segment Tree implementation for range sum queries and point updates.
 * Small, dependency-free, and written in TypeScript for reuse across the project.
 */

export class SegmentTree {
  private n: number;
  private tree: number[];

  constructor(arr: number[]) {
    this.n = arr.length;
    this.tree = new Array(Math.max(1, 4 * this.n)).fill(0);
    if (this.n > 0) {
      this.build(arr, 1, 0, this.n - 1);
    }
  }

  private build(arr: number[], node: number, tl: number, tr: number) {
    if (tl === tr) {
      this.tree[node] = arr[tl] ?? 0;
      return;
    }
    const tm = (tl + tr) >> 1;
    this.build(arr, node << 1, tl, tm);
    this.build(arr, (node << 1) + 1, tm + 1, tr);
    this.tree[node] = this.tree[node << 1] + this.tree[(node << 1) + 1];
  }

  /**
   * Query sum on interval [l, r] (inclusive).
   */
  query(l: number, r: number): number {
    if (this.n === 0) return 0;
    if (l < 0 || r < 0 || l >= this.n || r >= this.n || l > r) {
      throw new Error("Invalid query range");
    }
    return this.queryRec(1, 0, this.n - 1, l, r);
  }

  private queryRec(node: number, tl: number, tr: number, l: number, r: number): number {
    if (l > r) return 0;
    if (l === tl && r === tr) return this.tree[node];
    const tm = (tl + tr) >> 1;
    const left = this.queryRec(node << 1, tl, tm, l, Math.min(r, tm));
    const right = this.queryRec((node << 1) + 1, tm + 1, tr, Math.max(l, tm + 1), r);
    return left + right;
  }

  /**
   * Point update: set index idx to value val.
   */
  update(idx: number, val: number) {
    if (this.n === 0) return;
    if (idx < 0 || idx >= this.n) throw new Error("Index out of bounds");
    this.updateRec(1, 0, this.n - 1, idx, val);
  }

  private updateRec(node: number, tl: number, tr: number, idx: number, val: number) {
    if (tl === tr) {
      this.tree[node] = val;
      return;
    }
    const tm = (tl + tr) >> 1;
    if (idx <= tm) this.updateRec(node << 1, tl, tm, idx, val);
    else this.updateRec((node << 1) + 1, tm + 1, tr, idx, val);
    this.tree[node] = this.tree[node << 1] + this.tree[(node << 1) + 1];
  }

  /**
   * Return the internal tree array (useful for debugging/visualization).
   */
  debugTree(): number[] {
    return this.tree.slice();
  }
}

/**
 * Convenience factory that builds a segment tree and exposes commonly used functions.
 */
export function buildSegmentTree(arr: number[]) {
  const st = new SegmentTree(arr);
  return {
    query: (l: number, r: number) => st.query(l, r),
    update: (idx: number, val: number) => st.update(idx, val),
    debug: () => st.debugTree(),
  };
}

export default SegmentTree;
