function findSubstring(s, words) {
    const m = s.length,
        n = words.length;
    const wordLen = words[0].length,
        substrLen = n * wordLen;
    const result = [];
    if (m < substrLen) return result;

    const wordCount = {};
    for (let i = 0; i < n; ++i) {
        wordCount[words[i]] = (wordCount[words[i]] ? wordCount[words[i]] : 0) + 1;
    }
    console.log(wordCount);
    console.log("s length:", m, "subStringLegnth:", substrLen, m - substrLen + 1);
    for (let i = 0; i < m - substrLen + 1; ++i) {
        const map = {};
        let j = i;
        for (; j < i + substrLen; j += wordLen) {
            // get the single word substring from s
            const str = s.substring(j, j + wordLen);
            // see if wordCount object has single word we took from s
            // yes -> break current for loop ||  no -> in map obj, add one to the key which is the single word.
            if (!wordCount[str]) break;
            map[str] = map[str] ? map[str] : 0 + 1;
            // compare the map and wordcount obj value with word chunk.
            // value i map is greater than wordcount value means it replicated.
            if (map[str] > wordCount[str]) break;
        }
        console.log("----- ", map);
        if (j === i + substrLen) result.push(i);
    }
    return result;
}
const s = "barfoothefoobarman";
const s2 = "wordgoodgoodgoodbestword";
const words2 = ["word", "good", "best", "word"];
const words = ["foo", "bar"];
console.log(findSubstring(s, words));