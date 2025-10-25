"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Database, Search, Edit } from "lucide-react";
import SegmentTree from "../../utils/segmentTree";

function SegmentTreePage() {
  const [arrayInput, setArrayInput] = useState<string>("1,2,3,4,5");
  const [arr, setArr] = useState<number[]>([1, 2, 3, 4, 5]);
  const [st, setSt] = useState<SegmentTree | null>(new SegmentTree(arr));
  const [qL, setQL] = useState<string>("1");
  const [qR, setQR] = useState<string>("3");
  const [queryResult, setQueryResult] = useState<number | null>(null);
  const [updIdx, setUpdIdx] = useState<string>("2");
  const [updVal, setUpdVal] = useState<string>("10");

  const rebuild = () => {
    const parsed = arrayInput
      .split(",")
      .map((s) => parseInt(s.trim()))
      .filter((n) => !Number.isNaN(n));
    setArr(parsed);
    setSt(new SegmentTree(parsed));
    setQueryResult(null);
  };

  const handleQuery = () => {
    if (!st) return;
    const l = parseInt(qL);
    const r = parseInt(qR);
    try {
      const res = st.query(l, r);
      setQueryResult(res);
    } catch (e) {
      alert((e as Error).message);
    }
  };

  const handleUpdate = () => {
    if (!st) return;
    const idx = parseInt(updIdx);
    const val = parseInt(updVal);
    try {
      st.update(idx, val);
      // update local array copy for display
      const copy = arr.slice();
      if (idx >= 0 && idx < copy.length) copy[idx] = val;
      setArr(copy);
      // refresh the segment tree reference so React re-renders debug tree
      setSt(new SegmentTree(copy));
    } catch (e) {
      alert((e as Error).message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <header className="bg-white dark:bg-slate-800 shadow-sm border-b dark:border-slate-700">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link to="/array-algorithms" className="p-2 hover:bg-gray-100 dark:bg-slate-700 rounded-lg">
                <ArrowLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              </Link>
              <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
                <Database className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Segment Tree (Range Sum)</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Array Input</h2>
          <div className="space-y-3">
            <input
              type="text"
              value={arrayInput}
              onChange={(e) => setArrayInput(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              placeholder="e.g., 1,2,3,4"
            />
            <div className="flex gap-3">
              <button onClick={rebuild} className="px-4 py-2 bg-purple-600 text-white rounded-lg">Build Tree</button>
              <button onClick={() => { setArrayInput("1,2,3,4,5"); setArr([1,2,3,4,5]); setSt(new SegmentTree([1,2,3,4,5])); }} className="px-4 py-2 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg">Reset</button>
            </div>
          </div>
        </div>

        <div className="mb-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Query</h2>
          <div className="flex gap-3 items-center">
            <input value={qL} onChange={(e) => setQL(e.target.value)} className="w-20 px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white" />
            <span className="text-gray-600 dark:text-gray-300">to</span>
            <input value={qR} onChange={(e) => setQR(e.target.value)} className="w-20 px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white" />
            <button onClick={handleQuery} className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2"><Search className="w-4 h-4" /> Query</button>
            {queryResult !== null && <div className="ml-auto text-lg font-semibold text-gray-900 dark:text-white">Result: {queryResult}</div>}
          </div>
        </div>

        <div className="mb-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Point Update</h2>
          <div className="flex gap-3 items-center">
            <input value={updIdx} onChange={(e) => setUpdIdx(e.target.value)} className="w-20 px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white" />
            <input value={updVal} onChange={(e) => setUpdVal(e.target.value)} className="w-28 px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white" />
            <button onClick={handleUpdate} className="px-4 py-2 bg-yellow-600 text-white rounded-lg flex items-center gap-2"><Edit className="w-4 h-4" /> Update</button>
          </div>
        </div>

        <div className="mb-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Current Array & Debug Tree</h2>
          <div className="flex flex-wrap gap-3 mb-4">
            {arr.map((v, i) => (
              <div key={i} className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-gray-100 font-semibold">{v}</div>
            ))}
          </div>
          {/* Visual representation of the internal segment tree array arranged by levels */}
          <div className="bg-gray-50 dark:bg-slate-900 p-4 rounded-lg overflow-x-auto text-sm text-gray-800 dark:text-gray-100">
            {st ? (
              (() => {
                const treeArr = st.debugTree();
                // treeArr is 0-based array where we used 1-based indexing for nodes; ensure length
                const levels: { idx: number; val: number | null }[][] = [];
                let level = 0;
                let start = 1;
                // stop when start index exceeds array length
                while (start < treeArr.length) {
                  const count = 1 << level;
                  const row: { idx: number; val: number | null }[] = [];
                  for (let i = 0; i < count; i++) {
                    const idx = start + i;
                    if (idx < treeArr.length) row.push({ idx, val: treeArr[idx] ?? null });
                    else row.push({ idx, val: null });
                  }
                  levels.push(row);
                  level++;
                  start += count;
                  // safety: avoid infinite loop
                  if (level > 20) break;
                }

                return (
                  <div className="space-y-4">
                    {levels.map((row, rIdx) => (
                      <div key={rIdx} className="flex items-center justify-center gap-4">
                        {row.map((node) => (
                          <div key={node.idx} className="flex flex-col items-center">
                            <div className="w-20 h-12 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-gray-100 font-mono border border-gray-200 dark:border-slate-600">
                              {node.val !== null ? node.val : "-"}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">#{node.idx}</div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                );
              })()
            ) : (
              <div>[]</div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default SegmentTreePage;
