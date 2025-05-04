function exploreParenthesis(n) {
  const result = [];

  function dfs(str, open, close) {
    if (str.length === n * 2) {
        result.push(str)
        return
    }

    if (open < n) {
        dfs(str + "(", open + 1, close)
    }

    if (close < open) {
        dfs(str + ")", open, close + 1)
    }
  }

  dfs("", 0, 0)

  return result
}

console.log(exploreParenthesis(3))