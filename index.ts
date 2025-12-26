import { Tree } from "./tree";
import { printDataInNode } from "./utils";

const bst = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

console.log("start");
bst.prettyPrint();

console.log("inserting 2...");
bst.insert(2);

bst.prettyPrint();

console.log("deleting 67");
bst.deleteItem(67);

bst.prettyPrint();

console.log("level order");
bst.recursiveLevelOrderForEach(printDataInNode);

console.log("inorder");
bst.inOrderForEach(printDataInNode);
