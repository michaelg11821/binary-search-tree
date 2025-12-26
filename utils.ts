import type { TreeNode } from "./tree-node";

export function prepareTreeArray(arr: any[]) {
  const arrWithNoDupes = [...new Set(arr)];

  return Array.from(arrWithNoDupes).sort((a, b) => a - b);
}

export function printDataInNode(node: TreeNode) {
  console.log(node.data);
}
