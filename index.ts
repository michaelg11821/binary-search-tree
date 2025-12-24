import { Tree } from "./tree";

const bst = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

bst.prettyPrint();

bst.insert(2);

bst.prettyPrint();
