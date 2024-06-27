#!/usr/bin/env node

const { Command } = require("commander");
const pkg = require("../package.json");
// 单例
const program = new Command();

program
  // .name(pkg.name)
  .name(Object.keys(pkg.bin)[0])
  .usage("<command> [options]")
  .version(pkg.version)
  .option("-d --debug", "是否开启调试模式", false)
  .option("-e --envName <envName>", "获取环境变量名称");

// command 注册命令
// <source> 必传
// [destination] 可传 | <destination> 必传
const clone = program.command("clone <source> <destination>");
clone
  .description("clone a repository")
  .option("-f --force", "是否强制克隆")
  .action((source, destination, cmdObj) => {
    console.log("do clone", source, destination, cmdObj.force);
  });

// addCommand 注册子命令(分组)
const service = new Command("service");
service
  .command("start [port]")
  .description("start service at some port")
  .action((port) => {
    console.log("do service start", port);
  });

service
  .command("stop")
  .description("stop service")
  .action(() => {
    console.log("stop service");
  });

program.addCommand(service);

// oweqian-test install init -> oweqian-cli init
program
  .command("install [name]", "install package", {
    executableFile: "oweqian-cli",
    isDefault: true,
  })
  .alias("i");

// 匹配任意命令
program
  .arguments("<cmd> [options]")
  .description("test command", {
    cmd: "command to run",
    options: "options for command",
  })
  .action((cmd, options) => {
    console.log(cmd, options);
  });
program.parse(process.argv);
