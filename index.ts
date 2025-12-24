import { Tree } from "./tree";

const bst = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

console.log("start");
bst.prettyPrint();

console.log("inserting 2...");
bst.insert(2);

bst.prettyPrint();

console.log("deleting 2");
console.log(bst.deleteItem(2));

bst.prettyPrint();
