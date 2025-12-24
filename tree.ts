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

  private findNodeBefore(value: any) {
    let currentNode = this.root;

    while (currentNode !== null) {
      if (currentNode.left && currentNode.left.data === value) {
        return currentNode;
      } else if (currentNode.right && currentNode.right.data === value) {
        return currentNode;
      }

      if (value < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    return null;
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

  private deleteLeaf(prevNode: TreeNode | null, currentNode: TreeNode | null) {
    if (prevNode === null) return;

    if (prevNode.left === currentNode) {
      prevNode.left = null;
    } else if (prevNode.right === currentNode) {
      prevNode.right = null;
    }
  }

  private deleteNodeWithOneChild(
    prevNode: TreeNode | null,
    currentNode: TreeNode | null
  ) {
    if (currentNode === null) return;

    const childNode = currentNode.left ?? currentNode.right;

    if (prevNode === null) return;

    if (prevNode.left === currentNode) {
      prevNode.left = childNode;
    } else if (prevNode.right === currentNode) {
      prevNode.right = childNode;
    }
  }

  // private deleteNodeWithTwoChildren(
  //   prevNode: TreeNode | null,
  //   currentNode: TreeNode | null
  // ) {
  //   if (currentNode === null) return;

  //   if (currentNode.right === null) return;

  //   let nextBiggestNode: TreeNode | null = currentNode.right;

  //   while (nextBiggestNode.left !== null) {
  //     nextBiggestNode = nextBiggestNode.left;
  //   }

  //   if (prevNode === null) return;

  //   if (prevNode.left === currentNode) {
  //     prevNode.left = nextBiggestNode;
  //   } else if (prevNode.right === currentNode) {
  //     prevNode.right = nextBiggestNode;
  //   }
  // }

  deleteItem(value: any) {
    const prevNode = this.findNodeBefore(value);
    const nodeToDelete = this.find(value);

    if (nodeToDelete === null) return;

    if (nodeToDelete.left === null && nodeToDelete.right === null) {
      this.deleteLeaf(prevNode, nodeToDelete);
    }

    if (nodeToDelete.left && nodeToDelete.right === null) {
      this.deleteNodeWithOneChild(prevNode, nodeToDelete);
    } else if (nodeToDelete.right && nodeToDelete.left === null) {
      this.deleteNodeWithOneChild(prevNode, nodeToDelete);
    }
  }
}
