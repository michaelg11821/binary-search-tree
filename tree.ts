import { TreeNode } from "./tree-node";
import { prepareTreeArray } from "./utils";

function buildTree(arr: any[], start: number, end: number) {
  if (start > end) return null;

  const mid = Math.floor((start + end) / 2);
  const root = arr[mid] ? new TreeNode(arr[mid], null, null) : null;

  if (!root) return null;

  root.left = buildTree(arr, start, mid - 1);
  root.right = buildTree(arr, mid + 1, end);

  return root;
}

export class Tree {
  root;

  constructor(arr: any[]) {
    const treeArr = prepareTreeArray(arr);

    this.root = buildTree(treeArr, 0, arr.length - 1);
  }

  prettyPrint(node: TreeNode | null = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }

    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }

    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);

    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  insert(value: any, currentNode: TreeNode | null = this.root) {
    if (currentNode === null) return;

    if (value < currentNode.data) {
      if (currentNode.left === null) {
        currentNode.left = new TreeNode(value, null, null);
      }

      this.insert(value, currentNode.left);
    } else if (value > currentNode.data) {
      if (currentNode.right === null) {
        currentNode.right = new TreeNode(value, null, null);
      }

      this.insert(value, currentNode.right);
    }
  }
}
