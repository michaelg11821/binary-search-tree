export class TreeNode {
  data;
  left;
  right;

  constructor(data: any, left: TreeNode | null, right: TreeNode | null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}
