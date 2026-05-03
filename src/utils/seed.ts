import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import Chapter from '../models/Chapter';
import Problem from '../models/Problem';
import Progress from '../models/Progress';

const chapters = [
  { title: 'Arrays & Hashing', description: 'Fundamental data structures essential for optimal time complexity.', icon: '{}', order: 1 },
  { title: 'Two Pointers', description: 'Efficient technique using two indices to traverse arrays.', icon: '↔', order: 2 },
  { title: 'Sliding Window', description: 'Optimize subarray/substring problems with a moving window.', icon: '▬', order: 3 },
  { title: 'Stack', description: 'LIFO data structure for bracket matching and monotonic problems.', icon: '⊞', order: 4 },
  { title: 'Binary Search', description: 'Divide and conquer on sorted data for O(log n) solutions.', icon: '⌕', order: 5 },
  { title: 'Linked Lists', description: 'Dynamic linear data structure with pointer-based traversal.', icon: '⛓', order: 6 },
  { title: 'Trees', description: 'Hierarchical structures — BST, traversals, and LCA problems.', icon: 'tree', order: 7 },
  { title: 'Dynamic Programming', description: 'Solve complex problems by breaking into overlapping subproblems.', icon: 'code', order: 8 },
];

const problemsData = [
  // Arrays & Hashing (chapter index 0)
  { title: 'Contains Duplicate', number: 217, difficulty: 'Easy', chapterIdx: 0, order: 1, leetcodeUrl: 'https://leetcode.com/problems/contains-duplicate/', youtubeUrl: 'https://www.youtube.com/watch?v=3OamzN90kPg', articleUrl: 'https://neetcode.io/problems/duplicate-integer' },
  { title: 'Valid Anagram', number: 242, difficulty: 'Easy', chapterIdx: 0, order: 2, leetcodeUrl: 'https://leetcode.com/problems/valid-anagram/', youtubeUrl: 'https://www.youtube.com/watch?v=9UtInBqnCgA', articleUrl: 'https://neetcode.io/problems/is-anagram' },
  { title: 'Two Sum', number: 1, difficulty: 'Easy', chapterIdx: 0, order: 3, leetcodeUrl: 'https://leetcode.com/problems/two-sum/', youtubeUrl: 'https://www.youtube.com/watch?v=KLlXCFG5TnA', articleUrl: 'https://neetcode.io/problems/two-integer-sum' },
  { title: 'Group Anagrams', number: 49, difficulty: 'Medium', chapterIdx: 0, order: 4, leetcodeUrl: 'https://leetcode.com/problems/group-anagrams/', youtubeUrl: 'https://www.youtube.com/watch?v=vzdNOK2oB2E', articleUrl: 'https://neetcode.io/problems/anagram-groups' },
  { title: 'Top K Frequent Elements', number: 347, difficulty: 'Medium', chapterIdx: 0, order: 5, leetcodeUrl: 'https://leetcode.com/problems/top-k-frequent-elements/', youtubeUrl: 'https://www.youtube.com/watch?v=YPTqKIgVk-k', articleUrl: 'https://neetcode.io/problems/top-k-elements-in-list' },
  { title: 'Product of Array Except Self', number: 238, difficulty: 'Medium', chapterIdx: 0, order: 6, leetcodeUrl: 'https://leetcode.com/problems/product-of-array-except-self/', youtubeUrl: 'https://www.youtube.com/watch?v=bNvIQI2wAjk', articleUrl: 'https://neetcode.io/problems/products-of-array-discluding-self' },
  { title: 'Valid Sudoku', number: 36, difficulty: 'Medium', chapterIdx: 0, order: 7, leetcodeUrl: 'https://leetcode.com/problems/valid-sudoku/', youtubeUrl: 'https://www.youtube.com/watch?v=TjFXEUCMqI8', articleUrl: 'https://neetcode.io/problems/valid-sudoku' },
  { title: 'Longest Consecutive Sequence', number: 128, difficulty: 'Medium', chapterIdx: 0, order: 8, leetcodeUrl: 'https://leetcode.com/problems/longest-consecutive-sequence/', youtubeUrl: 'https://www.youtube.com/watch?v=P6RZZMu_maU', articleUrl: 'https://neetcode.io/problems/longest-consecutive-sequence' },
  // Two Pointers (chapter index 1)
  { title: 'Valid Palindrome', number: 125, difficulty: 'Easy', chapterIdx: 1, order: 1, leetcodeUrl: 'https://leetcode.com/problems/valid-palindrome/', youtubeUrl: 'https://www.youtube.com/watch?v=jn9tRQB6rTM', articleUrl: 'https://neetcode.io/problems/is-palindrome' },
  { title: 'Two Sum II', number: 167, difficulty: 'Medium', chapterIdx: 1, order: 2, leetcodeUrl: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/', youtubeUrl: 'https://www.youtube.com/watch?v=cQ1Oz4ckceM', articleUrl: 'https://neetcode.io/problems/two-integer-sum-ii' },
  { title: '3Sum', number: 15, difficulty: 'Medium', chapterIdx: 1, order: 3, leetcodeUrl: 'https://leetcode.com/problems/3sum/', youtubeUrl: 'https://www.youtube.com/watch?v=jzZsG8n2R9A', articleUrl: 'https://neetcode.io/problems/three-integer-sum' },
  { title: 'Container With Most Water', number: 11, difficulty: 'Medium', chapterIdx: 1, order: 4, leetcodeUrl: 'https://leetcode.com/problems/container-with-most-water/', youtubeUrl: 'https://www.youtube.com/watch?v=UuiTKBwPgAo', articleUrl: 'https://neetcode.io/problems/max-water-container' },
  { title: 'Trapping Rain Water', number: 42, difficulty: 'Hard', chapterIdx: 1, order: 5, leetcodeUrl: 'https://leetcode.com/problems/trapping-rain-water/', youtubeUrl: 'https://www.youtube.com/watch?v=ZI2z5pq0TqA', articleUrl: 'https://neetcode.io/problems/trapping-rain-water' },
  // Sliding Window (chapter index 2)
  { title: 'Best Time to Buy and Sell Stock', number: 121, difficulty: 'Easy', chapterIdx: 2, order: 1, leetcodeUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/', youtubeUrl: 'https://www.youtube.com/watch?v=1pkOgXD63yU', articleUrl: 'https://neetcode.io/problems/buy-and-sell-crypto' },
  { title: 'Longest Substring Without Repeating Characters', number: 3, difficulty: 'Medium', chapterIdx: 2, order: 2, leetcodeUrl: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', youtubeUrl: 'https://www.youtube.com/watch?v=wiGpQwVHdE0', articleUrl: 'https://neetcode.io/problems/longest-substring-without-duplicates' },
  { title: 'Longest Repeating Character Replacement', number: 424, difficulty: 'Medium', chapterIdx: 2, order: 3, leetcodeUrl: 'https://leetcode.com/problems/longest-repeating-character-replacement/', youtubeUrl: 'https://www.youtube.com/watch?v=gqXU1UyA8pk', articleUrl: 'https://neetcode.io/problems/longest-repeating-substring-with-replacement' },
  { title: 'Permutation in String', number: 567, difficulty: 'Medium', chapterIdx: 2, order: 4, leetcodeUrl: 'https://leetcode.com/problems/permutation-in-string/', youtubeUrl: 'https://www.youtube.com/watch?v=UbyhOgBN834', articleUrl: 'https://neetcode.io/problems/permutation-string' },
  { title: 'Minimum Window Substring', number: 76, difficulty: 'Hard', chapterIdx: 2, order: 5, leetcodeUrl: 'https://leetcode.com/problems/minimum-window-substring/', youtubeUrl: 'https://www.youtube.com/watch?v=jSto0O4AJbM', articleUrl: 'https://neetcode.io/problems/minimum-window-with-characters' },
  // Stack (chapter index 3)
  { title: 'Valid Parentheses', number: 20, difficulty: 'Easy', chapterIdx: 3, order: 1, leetcodeUrl: 'https://leetcode.com/problems/valid-parentheses/', youtubeUrl: 'https://www.youtube.com/watch?v=WTzjTskDFMg', articleUrl: 'https://neetcode.io/problems/validate-parentheses' },
  { title: 'Min Stack', number: 155, difficulty: 'Medium', chapterIdx: 3, order: 2, leetcodeUrl: 'https://leetcode.com/problems/min-stack/', youtubeUrl: 'https://www.youtube.com/watch?v=qkLl7nAwDPo', articleUrl: 'https://neetcode.io/problems/minimum-stack' },
  { title: 'Evaluate Reverse Polish Notation', number: 150, difficulty: 'Medium', chapterIdx: 3, order: 3, leetcodeUrl: 'https://leetcode.com/problems/evaluate-reverse-polish-notation/', youtubeUrl: 'https://www.youtube.com/watch?v=iu0082c4HDE', articleUrl: 'https://neetcode.io/problems/evaluate-reverse-polish-notation' },
  { title: 'Daily Temperatures', number: 739, difficulty: 'Medium', chapterIdx: 3, order: 4, leetcodeUrl: 'https://leetcode.com/problems/daily-temperatures/', youtubeUrl: 'https://www.youtube.com/watch?v=cTBiBSnjO3c', articleUrl: 'https://neetcode.io/problems/daily-temperatures' },
  { title: 'Car Fleet', number: 853, difficulty: 'Medium', chapterIdx: 3, order: 5, leetcodeUrl: 'https://leetcode.com/problems/car-fleet/', youtubeUrl: 'https://www.youtube.com/watch?v=Pr6T-3yB9RM', articleUrl: 'https://neetcode.io/problems/car-fleet' },
  // Binary Search (chapter index 4)
  { title: 'Binary Search', number: 704, difficulty: 'Easy', chapterIdx: 4, order: 1, leetcodeUrl: 'https://leetcode.com/problems/binary-search/', youtubeUrl: 'https://www.youtube.com/watch?v=s4DPM8ct1pI', articleUrl: 'https://neetcode.io/problems/binary-search' },
  { title: 'Search a 2D Matrix', number: 74, difficulty: 'Medium', chapterIdx: 4, order: 2, leetcodeUrl: 'https://leetcode.com/problems/search-a-2d-matrix/', youtubeUrl: 'https://www.youtube.com/watch?v=Ber2pi2C0j0', articleUrl: 'https://neetcode.io/problems/search-2d-matrix' },
  { title: 'Koko Eating Bananas', number: 875, difficulty: 'Medium', chapterIdx: 4, order: 3, leetcodeUrl: 'https://leetcode.com/problems/koko-eating-bananas/', youtubeUrl: 'https://www.youtube.com/watch?v=U2SozAs9RzA', articleUrl: 'https://neetcode.io/problems/eating-bananas' },
  { title: 'Find Minimum in Rotated Sorted Array', number: 153, difficulty: 'Medium', chapterIdx: 4, order: 4, leetcodeUrl: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/', youtubeUrl: 'https://www.youtube.com/watch?v=nIVW4P8b1VA', articleUrl: 'https://neetcode.io/problems/find-minimum-in-rotated-sorted-array' },
  { title: 'Search in Rotated Sorted Array', number: 33, difficulty: 'Medium', chapterIdx: 4, order: 5, leetcodeUrl: 'https://leetcode.com/problems/search-in-rotated-sorted-array/', youtubeUrl: 'https://www.youtube.com/watch?v=U8XENwh8Oy8', articleUrl: 'https://neetcode.io/problems/find-target-in-rotated-sorted-array' },
  // Linked Lists (chapter index 5)
  { title: 'Reverse Linked List', number: 206, difficulty: 'Easy', chapterIdx: 5, order: 1, leetcodeUrl: 'https://leetcode.com/problems/reverse-linked-list/', youtubeUrl: 'https://www.youtube.com/watch?v=G0_I-ZF0S38', articleUrl: 'https://neetcode.io/problems/reverse-a-linked-list' },
  { title: 'Merge Two Sorted Lists', number: 21, difficulty: 'Easy', chapterIdx: 5, order: 2, leetcodeUrl: 'https://leetcode.com/problems/merge-two-sorted-lists/', youtubeUrl: 'https://www.youtube.com/watch?v=XIdigk956u0', articleUrl: 'https://neetcode.io/problems/merge-two-sorted-linked-lists' },
  { title: 'Linked List Cycle', number: 141, difficulty: 'Easy', chapterIdx: 5, order: 3, leetcodeUrl: 'https://leetcode.com/problems/linked-list-cycle/', youtubeUrl: 'https://www.youtube.com/watch?v=gBTe7lFR3vc', articleUrl: 'https://neetcode.io/problems/linked-list-cycle-detection' },
  { title: 'Reorder List', number: 143, difficulty: 'Medium', chapterIdx: 5, order: 4, leetcodeUrl: 'https://leetcode.com/problems/reorder-list/', youtubeUrl: 'https://www.youtube.com/watch?v=S5bfdUTrKLM', articleUrl: 'https://neetcode.io/problems/reorder-linked-list' },
  { title: 'Remove Nth Node From End', number: 19, difficulty: 'Medium', chapterIdx: 5, order: 5, leetcodeUrl: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/', youtubeUrl: 'https://www.youtube.com/watch?v=XVuQxVej6y8', articleUrl: 'https://neetcode.io/problems/remove-node-from-end-of-linked-list' },
  // Trees (chapter index 6)
  { title: 'Invert Binary Tree', number: 226, difficulty: 'Easy', chapterIdx: 6, order: 1, leetcodeUrl: 'https://leetcode.com/problems/invert-binary-tree/', youtubeUrl: 'https://www.youtube.com/watch?v=OnSn2XEQ4MY', articleUrl: 'https://neetcode.io/problems/invert-a-binary-tree' },
  { title: 'Maximum Depth of Binary Tree', number: 104, difficulty: 'Easy', chapterIdx: 6, order: 2, leetcodeUrl: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/', youtubeUrl: 'https://www.youtube.com/watch?v=hTM3phVI6YQ', articleUrl: 'https://neetcode.io/problems/depth-of-binary-tree' },
  { title: 'Diameter of Binary Tree', number: 543, difficulty: 'Easy', chapterIdx: 6, order: 3, leetcodeUrl: 'https://leetcode.com/problems/diameter-of-binary-tree/', youtubeUrl: 'https://www.youtube.com/watch?v=bkxqA8Rfv04', articleUrl: 'https://neetcode.io/problems/binary-tree-diameter' },
  { title: 'Lowest Common Ancestor of BST', number: 235, difficulty: 'Medium', chapterIdx: 6, order: 4, leetcodeUrl: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/', youtubeUrl: 'https://www.youtube.com/watch?v=gs2LMfuOR9k', articleUrl: 'https://neetcode.io/problems/lowest-common-ancestor-in-binary-search-tree' },
  { title: 'Binary Tree Level Order Traversal', number: 102, difficulty: 'Medium', chapterIdx: 6, order: 5, leetcodeUrl: 'https://leetcode.com/problems/binary-tree-level-order-traversal/', youtubeUrl: 'https://www.youtube.com/watch?v=6ZnyEApgFYg', articleUrl: 'https://neetcode.io/problems/level-order-traversal-of-binary-tree' },
  // Dynamic Programming (chapter index 7)
  { title: 'Climbing Stairs', number: 70, difficulty: 'Easy', chapterIdx: 7, order: 1, leetcodeUrl: 'https://leetcode.com/problems/climbing-stairs/', youtubeUrl: 'https://www.youtube.com/watch?v=Y0lT9Fck7qI', articleUrl: 'https://neetcode.io/problems/climbing-stairs' },
  { title: 'Min Cost Climbing Stairs', number: 746, difficulty: 'Easy', chapterIdx: 7, order: 2, leetcodeUrl: 'https://leetcode.com/problems/min-cost-climbing-stairs/', youtubeUrl: 'https://www.youtube.com/watch?v=ktmzAZWkEZ0', articleUrl: 'https://neetcode.io/problems/min-cost-climbing-stairs' },
  { title: 'House Robber', number: 198, difficulty: 'Medium', chapterIdx: 7, order: 3, leetcodeUrl: 'https://leetcode.com/problems/house-robber/', youtubeUrl: 'https://www.youtube.com/watch?v=73r3KWiEvyk', articleUrl: 'https://neetcode.io/problems/house-robber' },
  { title: 'Coin Change', number: 322, difficulty: 'Medium', chapterIdx: 7, order: 4, leetcodeUrl: 'https://leetcode.com/problems/coin-change/', youtubeUrl: 'https://www.youtube.com/watch?v=H9bfqozjoqs', articleUrl: 'https://neetcode.io/problems/coin-change' },
  { title: 'Longest Increasing Subsequence', number: 300, difficulty: 'Medium', chapterIdx: 7, order: 5, leetcodeUrl: 'https://leetcode.com/problems/longest-increasing-subsequence/', youtubeUrl: 'https://www.youtube.com/watch?v=cjWnW0hdF1Y', articleUrl: 'https://neetcode.io/problems/longest-increasing-subsequence' },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI as string);
  console.log('Connected to MongoDB');

  await Progress.deleteMany({});
  await Problem.deleteMany({});
  await Chapter.deleteMany({});
  console.log('Cleared existing data');

  const createdChapters = await Chapter.insertMany(chapters);
  console.log(`Created ${createdChapters.length} chapters`);

  const problems = problemsData.map((p) => ({
    title: p.title,
    number: p.number,
    difficulty: p.difficulty,
    chapterId: createdChapters[p.chapterIdx]._id,
    youtubeUrl: p.youtubeUrl,
    leetcodeUrl: p.leetcodeUrl,
    articleUrl: p.articleUrl,
    order: p.order,
  }));

  const createdProblems = await Problem.insertMany(problems);
  console.log(`Created ${createdProblems.length} problems`);

  await mongoose.disconnect();
  console.log('Seed complete');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
