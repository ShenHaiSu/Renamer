const fs = require("fs");
const fsPromise = require("fs/promises");
const Process = require("process");
const {errorOut, logOut} = require("./core/logOut");
const {checkConfig} = require("./core/checkConfig");

const configDir = "./config.json"
let config = {}


fsPromise
  .access(configDir, fs.constants.F_OK)
  .then(() => {
    // 文件存在分支
    return fsPromise.readFile(configDir, "utf-8");
  })
  .catch(() => {
    // 文件不存在分支
    errorOut("config.json配置文件不存在，终止运行")
    Process.exit(0);
  })
  .then(data => {
    try {
      let newData = JSON.parse(data);
      return new Promise(resolve => resolve(newData));
    } catch (e) {
      errorOut("config.json配置文件语法不规范！");
      Process.exit(0);
    }
  })
  .then(data => {
    // 拿到配置文件
    config = data;
    logOut("配置文件读取完毕");
    logOut(config);

    // 检查配置文件是否属性完整
    if (checkConfig(config)) {
      errorOut("配置文件中部分属性缺失");
      Process.exit(0);
    }

    const {targetDir} = config;
    for (let i = 0; i < targetDir.length; i++) {
      renameMainFunc(targetDir[i]).then(res => logOut(res));
    }
  })

async function renameMainFunc(dir) {
  return fsPromise
    .readdir(dir)
    .catch(() => {
      errorOut(`${dir} 不存在`);
      Process.exit(0);
    })
    .then(files => {
      if (files.length === 0) return `${dir} 目录内无内容`;
      logOut(`${dir} 目录中有 ${files.length} 个文件。`);
      files.forEach(file => {
        let extension;
        {
          // 获取文件扩展名
          let fileArray = file.split(".");
          extension = "." + fileArray[fileArray.length - 1];
          if (fileArray.length === 1) extension = "";

        }
        let newName = "";
        {
          // 初始化新名字
          const {newNameLength, stringPool} = config;
          for (let i = 0; i < newNameLength; i++) {
            let index = (Math.random() * stringPool.length).toFixed(0);
            newName += stringPool[index];
          }
        }
        let outNewName = dir + "/" + newName + extension;
        fs.renameSync(dir + "/" + file,outNewName);

      })
    })
}