---
title: 服务器开发node.js
published: 2026-07-21
pinned: true
description: A simple example of a Markdown blog post.
tags: [Markdown, Blogging]
category: '科技'
licenseName: "Unlicensed"
author: emn178
sourceLink: "https://github.com/emn178/markdown"
draft: false
---
# 一、服务器开发
## Node.js是什么
 是一个基于V8 JavaScript引擎的JavaScript运行时环境。
## Node.js架构
![image.png](https://cdn2.flowus.cn/fe-web-app-images/resize-left.svg)
举例如下：
#### 步骤 1：JavaScript 执行
- V8 引擎执行 `fs.readFile()`，这是一个异步函数。
- Node.js Bindings 将这个调用转发给 libuv。
#### 步骤 2：libuv 接收任务
- libuv 判断这是一个“文件读取”操作，属于**阻塞型 I/O**。
- 它不会让主线程等待，而是将这个任务放入 **线程池（Worker Threads）** 中执行。
- 同时，主线程继续执行后续代码（比如注册其他事件或处理新请求）。
#### 步骤 3：线程池执行阻塞操作
- Worker Thread 调用 OS 的 `read()` 系统调用，读取文件内容。
- 读取完成后，将结果和回调函数打包，放入 **Event Queue（事件队列）**。
#### 步骤 4：Event Loop 调度回调
- Event Loop 是一个无限循环，它会按顺序检查各个阶段（timers → I/O callbacks → check → close callbacks 等）。
- 当轮到 “I/O callbacks” 阶段时，它会从事件队列中取出刚才的回调函数。
- 然后，将这个回调函数交还给 **V8 引擎**执行。
#### 步骤 5：V8 执行回调
- V8 执行 `(err, data) => { console.log(data); }`，输出文件内容。
- 整个过程主线程从未被阻塞，始终在处理其他任务。
---
```js
// 指定 JavaScript 语法高亮
function demo() {
  return "代码块";
}
```
[链接文本](https://example.com "可选标题，hover显示")\
[相对路径链接](/about/ "内部页面")\
[无标题链接](https://example.com)

*斜体文本*（推荐）
_斜体文本_
**粗体文本**（推荐）
__粗体文本__
***粗斜体文本***

行内代码：`console.log("hello")`
含反引号的代码：`` `code` 中的反引号 ``
HTML 标签示例：`<div class="demo">`

<img src="/path/to/img.wep" alt="替代文本" width="300" height="200">

| 左对齐 | 居中对齐 | 右对齐 |
| :----- | :------: | -----: |
| 内容1  | 内容2    | 内容3  |
| 长文本内容 | 居中示例 | 数值100 |