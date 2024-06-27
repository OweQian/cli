#!/usr/bin/env node

const { Command } = require("commander");
const pkg = require("../package.json");
// 单例
const program = new Command();

program.version(pkg.version);

program.parse();
