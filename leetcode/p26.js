// Remove Duplicates from Sorted Array

var removeDuplicates = function(nums) {
    if (nums.length == 0) {
        return null;
    }
    let unique = 1;
    for (let scanner = 1; scanner < nums.length; scanner++) {
        if (nums[scanner] != nums[scanner - 1]) {
            nums[unique] = nums[scanner];
            unique++;
        }
    }
    return unique;
};