var state = 'index.js文件的state';
var exists = 'index.js文件的exists';
export { state, exists };

export function isString(str) {
  if (typeof str === 'string') {
    return true;
  }
  return false;
}

export var otherVal = '其他值';

// 默认输出 export default 命令
var exportDefaultVal = '我是index.js文件的默认输出';
export default exportDefaultVal;

