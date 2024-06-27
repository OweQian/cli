#!/usr/bin/env node

const lib = require("oweqian-test-lib");

// 注册一个命令 oweqian-test init

const argv = require("process").argv;

const command = argv[2];

const options = argv.slice(3);

if (options.length > 1) {
  let [option, param] = options;
  option = option.replace("--", "");

  if (command) {
    if (lib[command]) {
      lib[command]({ option, param });
    } else {
      console.log("无效的命令");
    }
  } else {
    console.log("请输入命令");
  }
}

// 实现参数解析 --version 和 init --name
if (command.startsWith("--") || command.startsWith("-")) {
  const globalOption = command.replace(/--|-/g, "");
  if (globalOption === "version" || globalOption === "V") {
    console.log("1.0.0");
  }
}
