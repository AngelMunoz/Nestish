import { build } from "bun";

const built = await build({
  root: ".",
  outdir: "./dist",
  target: "bun",
  entrypoints: ["./src/main.ts"],
  format: "esm",
  splitting: true,
  sourcemap: "external",
  minify: {
    identifiers: false,
    syntax: true,
    whitespace: true,
  },
  external: [
    "@nestjs/microservices",
    "@nestjs/websockets/socket-module",
    "class-validator",
    "class-transformer",
  ],
});

if (built.success) {
  console.log("Build success!");
  console.log("Files Produced:");
  for (const file of built.outputs) {
    console.log(`\t[${file.kind}]: ${file.path} - ${file.hash}`);
  }
} else {
  console.error("Build failed!");
}

for (const log of built.logs) {
  switch (log.level) {
    case "error":
      console.error(log.message);
      break;
    case "warning":
      console.warn(log.message);
      break;
    case "info":
      console.info(log.message);
      break;
    case "debug":
      console.debug(log.message);
      break;
    case "verbose":
    default:
      console.log(log.message);
      break;
  }
}
