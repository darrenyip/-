// leetcode 98
// 验证二叉

// 1. ez solutions     O(n)
// In-order solution
// result is an asending order array
function isValid(self, root) {
    inorder = self.inorder(root);
}

function inorder(self, root) {
    if (!root) return [];
    return self.inorder(root.left) + [root.val] + self.inorder(root.right);
}

// 2. recursion solution   O(n)
// validate(...,min,max)