# 文件批量随机重命名-Node.js
## 自述
  将需要重命名的文件放在自定的文件件下（或者项目目录底下的test文件夹下），使用下列语句来启动重命名。
```batch
$ node index.js
```
如出现异常将会自动终止运行。

## 食用指南
1. 在`Code`处下载zip格式代码文件
2. 解压到任意文件夹
3. 编辑`config.json`文件
4. `$ node index.js`运行即可

## 配置
- 在`config.json`中进行编辑运行配置``
- `targetDir`数组中使用写入需要重命名文件的所属文件夹的相对位置或绝对位置
- `stringPool`随机字节库
- `newNameLength`新名字的长度

## 基本思路
1. 先检测`config.json`是否存在
2. 再检测内容是否符合json语法
3. 再检测对象内的属性是否完整
4. 通过`fori`循环遍历地址和文件
5. 通过`Math.random()`方法从字符库中随机字符并拼接
6. 重命名文件完毕``
