import { TreeNode } from "./tree-node";
import { prepareTreeArray } from "./utils";

export class Tree {
  root;

  constructor(arr: any[]) {
    const treeArr = prepareTreeArray(arr);

    this.root = this.buildTree(treeArr, 0, arr.length - 1);
  }

  private buildTree(arr: any[], start: number, end: number) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const root = arr[mid] ? new TreeNode(arr[mid], null, null) : null;

    if (!root) return null;

    root.left = this.buildTree(arr, start, mid - 1);
    root.right = this.buildTree(arr, mid + 1, end);

    return root;
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
    if (currentNode === null) return new TreeNode(value, null, null);

    if (value < currentNode.data) {
      currentNode.left = this.insert(value, currentNode.left);
    } else {
      currentNode.right = this.insert(value, currentNode.right);
    }

    return currentNode;
  }

  deleteItem(value: any, currentNode: TreeNode | null = this.root) {
    if (currentNode === null) {
      return currentNode;
    }

    if (value > currentNode.data) {
      currentNode.right = this.deleteItem(value, currentNode.right);
    } else if (value < currentNode.data) {
      currentNode.left = this.deleteItem(value, currentNode.left);
    } else {
      if (currentNode.left === null) {
        return currentNode.right;
      } else if (currentNode.right === null) {
        return currentNode.left;
      } else {
        let cur = currentNode.right;
        while (cur?.left !== null) {
          cur = cur.left;
        }

        currentNode.data = cur.data;
        currentNode.right = this.deleteItem(
          currentNode.data,
          currentNode.right
        );
      }
    }
    return currentNode;
  }

  find(value: any) {
    let currentNode = this.root;

    while (currentNode !== null) {
      if (currentNode.data === value) return currentNode;

      if (value < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    return null;
  }

  iterativeLevelOrderForEach(callback: (node: TreeNode) => void) {
    if (this.root === null) return;

    const queue: TreeNode[] = [];
    queue.push(this.root);

    while (queue.length > 0) {
      const cur = queue[0];

      if (cur === undefined) return;

      callback(cur);

      if (cur.left !== null) {
        queue.push(cur.left);
      }

      if (cur.right !== null) {
        queue.push(cur.right);
      }

      queue.shift();
    }
  }

  recursiveLevelOrderForEach(
    callback: (node: TreeNode) => void,
    queue: (TreeNode | null)[] = [this.root]
  ) {
    if (queue.length === 0) return;

    const cur = queue[0];

    if (cur === null) return;
    if (cur === undefined) return;

    callback(cur);

    const levelNodes: TreeNode[] = [];

    if (cur.left !== null) {
      levelNodes.push(cur.left);
    }

    if (cur.right !== null) {
      levelNodes.push(cur.right);
    }

    queue.shift();

    this.recursiveLevelOrderForEach(callback, [...queue, ...levelNodes]);
  }
}
