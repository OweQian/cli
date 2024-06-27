#!/usr/bin/env node

const yargs = require("yargs/yargs");
const dedent = require("dedent");

const { hideBin } = require("yargs/helpers");

const arg = hideBin(process.argv);
const cli = yargs(arg);
cli
  .usage("Usage: oweqian-test [command] <options>")
  .demandCommand(
    1,
    "A command is required. Pass --help to see all available commands and options"
  )
  .strict()
  .recommendCommands()
  .fail((err, msg) => {
    console.log(err);
  })
  .alias("h", "help")
  .alias("v", "version")
  .wrap(cli.terminalWidth())
  .epilogue(
    dedent`Leading and trailing lines will be trimmed, so you can write something like
  this and have it work as you expect:

    * how convenient it is
    * that I can use an indented list
       - and still have it do the right thing

  That's all.`
  )
  .options({
    debug: {
      type: "boolean",
      describe: "Bootstrap debug mode",
      alias: "d",
    },
  })
  .option("registry", {
    type: "string",
    describe: "Define global registry",
    alias: "r",
  })
  .group(["debug"], "Dev Options:")
  .group(["registry"], "Extra Options:")
  .command(
    "init [name]",
    "Do init a project",
    (yargs) => {
      yargs.option("name", {
        type: "string",
        describe: "Name of a project",
        alias: "n",
      });
    },
    (argv) => {
      console.log(argv);
    }
  )
  .command({
    command: "list",
    aliases: ["ls", "la", "ll"],
    describe: "List local packages",
    builder: (yargs) => {},
    handler: (argv) => {
      console.log(argv);
    },
  }).argv;
