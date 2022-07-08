module.exports = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'body-max-length': [0],
		'body-max-line-length': [0]
	}
	// rules: {
	//   "type-enum": [2, "always", ["build", "chore", "ci", "docs", "feat", "fix", "perf", "refactor", "revert", "style", "test", "button"]],
	// }
};
