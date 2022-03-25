module.exports = {
  checkConfig
}

/**
 * 判断配置文件是否有异常
 * @param config {Object} 传入的config对象
 * @return {boolean} 是否文件有异常
 */
function checkConfig(config) {
  let isError = false;
  const {targetDir, newNameLength, stringPool} = config;
  // 判断是否存在
  if (targetDir === undefined) return true;
  if (newNameLength === undefined) return true;
  if (stringPool === undefined) return true;

  // 判断是否类型正确
  if (typeof targetDir !== "object") return true;
  if (typeof stringPool !== "string") return true;
  if (typeof newNameLength !== "number") return true;


  // 其他判断
  if (targetDir.length === 0) return true;
  if (newNameLength < 2) return true;

  return isError;
}