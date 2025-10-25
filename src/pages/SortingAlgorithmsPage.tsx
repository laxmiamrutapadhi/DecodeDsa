import type React from "react";
import { useRef, useState } from "react";
import { ArrowUpDown, Clock, Code2, GitCompare, Eye } from "lucide-react";
import SortingVisualizer from "../components/SortingVisualizer";
import ParallelSortingVisualizer from "../components/ParallelSortingVisualizer";
import { Link } from "react-router-dom";
import { getAvailableAlgorithms } from "../utils/sortingAlgorithms";
import { SortingAlgorithm } from "../types/algorithms";
import { QuestionsDialog, QuestionInfo } from "../components/ui/QuestionsDialog";

const sortingAlgorithms = getAvailableAlgorithms();

const QUESTIONS: QuestionInfo[] = [
  {
    id: "sort-colors",
    title: "Sort Colors",
    description:
      "Sort an array of colors represented as integers (0, 1, 2) using a single pass.",
    comingSoon: true,
  },
  {
    id: "sort-array-by-parity",
    title: "Sort Array by Parity",
    description:
      "Given an array of integers, group all even integers at the beginning followed by all odd integers.",
    comingSoon: true,
  },
  {
    id: "merge-k-sorted-lists",
    title: "Merge K Sorted Lists",
    description:
      "Given k sorted linked lists, merge them into a single sorted linked list.",
    comingSoon: true,
  },
  {
    id: "kth-largest-element",
    title: "Kth Largest Element",
    description: "Find the kth largest element in an unsorted array.",
    comingSoon: true,
  },
  {
    id: "top-k-frequent-elements",
    title: "Top K Frequent Elements",
    description:
      "Given an array of integers, find the k most frequent elements.",
    comingSoon: true,
  },
  {
    id: "maximum-gap",
    title: "Maximum Gap",
    description:
      "Given an array of integers, find the maximum gap between the sorted elements.",
    comingSoon: true,
  },
];

function SortingAlgorithmsPage() {
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState<SortingAlgorithm | null>(null);
  const [selectedAlgorithm2, setSelectedAlgorithm2] =
    useState<SortingAlgorithm | null>(null);
  const [inputArray, setInputArray] = useState<string>("");
  const [showVisualization, setShowVisualization] = useState(false);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [showQuestionsModal, setShowQuestionsModal] = useState<boolean>(false);
  const vizRef = useRef<HTMLDivElement | null>(null);

  const handleAlgorithmSelect = (algorithm: SortingAlgorithm) => {
    setSelectedAlgorithm(algorithm);
    setInputArray("64 34 25 12 22 11 90");
    setShowVisualization(true);
    setTimeout(() => {
      vizRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputArray.trim()) setShowVisualization(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-slate-950 dark:via-slate-900 dark:to-gray-900 transition-colors duration-500">
      <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-gray-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto py-5 px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-3">
              <Link to="/">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 shadow-md">
                  <ArrowUpDown className="w-6 h-6 text-white" />
                </div>
              </Link>
              <div>
                <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  Sorting Algorithms Visualizer
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  {comparisonMode
                    ? "Compare two sorting algorithms side by side"
                    : "Explore how different sorting algorithms organize data step by step"}
                </p>
              </div>
              <button
                onClick={() => setShowQuestionsModal(true)}
                className="ml-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium"
              >
                Questions
              </button>
            </div>

            {/* Mode Toggle */}
            <div className="flex items-center space-x-2 bg-gray-100 dark:bg-slate-700 rounded-lg p-1">
              <button
                onClick={() => setComparisonMode(false)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
                  !comparisonMode
                    ? "bg-white dark:bg-slate-600 shadow-sm text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                }`}
              >
                <Eye className="w-5 h-5" />
                <span className="text-sm font-medium">Single View</span>
              </button>

              <button
                onClick={() => setComparisonMode(true)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
                  comparisonMode
                    ? "bg-white dark:bg-slate-600 shadow-sm text-purple-600 dark:text-purple-400"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                }`}
              >
                <GitCompare className="w-5 h-5" />
                <span className="text-sm font-medium">Compare</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="px-6 py-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 mb-10 md:grid-cols-2 lg:grid-cols-3">
          {sortingAlgorithms.map((algorithm) => (
            <div
              key={algorithm.name}
              className={`rounded-2xl shadow-lg bg-white dark:bg-slate-800 border transition duration-300 hover:-translate-y-1 ${
                comparisonMode
                  ? selectedAlgorithm?.name === algorithm.name
                    ? "border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800"
                    : selectedAlgorithm2?.name === algorithm.name
                    ? "border-purple-500 ring-2 ring-purple-200 dark:ring-purple-800"
                    : "border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500"
                  : selectedAlgorithm?.name === algorithm.name
                  ? "border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800"
                  : "border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500"
              }`}
              onClick={() =>
                comparisonMode
                  ? selectedAlgorithm?.name === algorithm.name
                    ? setSelectedAlgorithm(null)
                    : selectedAlgorithm2?.name === algorithm.name
                    ? setSelectedAlgorithm2(null)
                    : !selectedAlgorithm
                    ? setSelectedAlgorithm(algorithm)
                    : setSelectedAlgorithm2(algorithm)
                  : handleAlgorithmSelect(algorithm)
              }
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {algorithm.name}
                  </h3>
                  <div className="flex space-x-1 items-center">
                    <div className="p-2 rounded-md bg-gradient-to-r from-blue-100 to-purple-100 dark:from-slate-900 dark:to-slate-700">
                      <ArrowUpDown className="text-blue-600 dark:text-blue-400 w-5 h-5" />
                    </div>
                  </div>
                </div>

                <p className="mb-6 text-gray-700 dark:text-gray-300">
                  {algorithm.description}
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-gray-50 dark:bg-slate-700">
                    <div className="flex items-center mb-1">
                      <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Time Complexity
                      </span>
                    </div>
                    <p className="font-semibold text-blue-600 dark:text-blue-400">
                      {algorithm.timeComplexity}
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-gray-50 dark:bg-slate-700">
                    <div className="flex items-center mb-1">
                      <Code2 className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Space Complexity
                      </span>
                    </div>
                    <p className="font-semibold text-purple-600 dark:text-purple-400">
                      {algorithm.spaceComplexity}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showVisualization && selectedAlgorithm && (
          <div
            ref={vizRef}
            className="mt-10 p-6 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-md rounded-2xl"
          >
            {comparisonMode && selectedAlgorithm2 ? (
              <ParallelSortingVisualizer
                algorithm1={selectedAlgorithm}
                algorithm2={selectedAlgorithm2}
                inputArray={inputArray}
              />
            ) : (
              <SortingVisualizer
                algorithm={selectedAlgorithm}
                inputArray={inputArray}
              />
            )}
          </div>
        )}
      </main>

      {showQuestionsModal && (
        <QuestionsDialog
          title="Sorting Algorithm Problems"
          questions={[...QUESTIONS]}
          onQuestionSelect={(question) => {
            const algorithm = sortingAlgorithms.find((algo) =>
              algo.name.toLowerCase().includes(question.id.split("-")[0])
            );
            if (algorithm) {
              setSelectedAlgorithm(algorithm);
              setShowQuestionsModal(false);
              setShowVisualization(false);
              setInputArray("64 34 25 12 22 11 90");
            }
          }}
          onClose={() => setShowQuestionsModal(false)}
        />
      )}
    </div>
  );
}

export default SortingAlgorithmsPage;
