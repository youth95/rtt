const parse = require('lcov-parse');
const fs = require('fs');

// 限制配置
const LINE_LIMIT = 1;
const FUNCTIONS_LIMIT = 1;
const BRANCHES_LIMIT = 0.8;

const STR_LINE_LIMIT = `${(LINE_LIMIT * 100).toFixed(2)}%`;
const STR_FUNCTIONS_LIMIT = `${(FUNCTIONS_LIMIT * 100).toFixed(2)}%`;
const STR_BRANCHES_LIMIT = `${(BRANCHES_LIMIT * 100).toFixed(2)}%`;
const LCOV_FILE_PATH = 'coverage/lcov.info';
if (fs.readFileSync(LCOV_FILE_PATH).toString('utf8') === '') {
  process.exit(0);
}

parse(LCOV_FILE_PATH, function (err, data) {
  if (err) {
    throw err;
  }
  const report = data.map(item => {
    const { file, lines, functions, branches } = item;
    return {
      file,
      lines: lines.hit / (lines.found || 1),
      functions: functions.hit / (functions.found || 1),
      branches: lines.hit / (branches.found || 1),
    }
  });
  let fail = false;
  for (const item of report) {
    const { file, lines, functions, branches } = item;
    if (lines < LINE_LIMIT) {
      console.error(`[error] file: '${file}' lines coverage is ${(lines * 100).toFixed(2)}% , less than ${STR_LINE_LIMIT}`);
      fail = true;
    }
    if (functions < FUNCTIONS_LIMIT) {
      console.error(`[error] file: '${file}' functions coverage is ${(lines * 100).toFixed(2)}% ,less than ${STR_FUNCTIONS_LIMIT}`);
      fail = true;
    }
    if (branches < BRANCHES_LIMIT) {
      console.error(`[error] file: '${file}' branches coverage is ${(lines * 100).toFixed(2)}% , less than ${STR_BRANCHES_LIMIT}`);
      fail = true;
    }
  }
  if (fail) {
    process.exit(1);
  }
});