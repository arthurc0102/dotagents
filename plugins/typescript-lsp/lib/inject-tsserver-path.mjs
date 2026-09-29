// Run a language server, adding initializationOptions.tsserver.path to the
// client's initialize request unless the client set one. typescript-language-
// server takes the path only from there, and otherwise looks for TypeScript
// only at or above the workspace root.
//
// Usage: node inject-tsserver-path.mjs <tsserver.js> <command> [args...]
import { spawn } from "node:child_process";

const [tsserverPath, command, ...args] = process.argv.slice(2);

const child = spawn(command, args, { stdio: ["pipe", "inherit", "inherit"] });
child.on("exit", (code) => process.exit(code ?? 1));
child.stdin.on("error", () => {});
for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => child.kill(signal));
}

// Messages are parsed only until the initialize request; after that, and on
// anything unexpected, stdin is passed through untouched.
let buffer = Buffer.alloc(0);
let passthrough = false;

const flush = () => {
  passthrough = true;
  if (buffer.length) child.stdin.write(buffer);
  buffer = Buffer.alloc(0);
};

process.stdin.on("data", (chunk) => {
  if (passthrough) {
    child.stdin.write(chunk);
    return;
  }
  buffer = Buffer.concat([buffer, chunk]);
  for (;;) {
    const headerEnd = buffer.indexOf("\r\n\r\n");
    if (headerEnd < 0) return;
    const header = buffer.subarray(0, headerEnd).toString("ascii");
    const length = Number(/content-length:\s*(\d+)/i.exec(header)?.[1]);
    if (!Number.isInteger(length)) return flush();
    const bodyStart = headerEnd + 4;
    if (buffer.length < bodyStart + length) return;

    let message;
    try {
      message = JSON.parse(buffer.subarray(bodyStart, bodyStart + length));
    } catch {
      return flush();
    }
    if (message.method !== "initialize") {
      child.stdin.write(buffer.subarray(0, bodyStart + length));
      buffer = buffer.subarray(bodyStart + length);
      continue;
    }

    message.params ??= {};
    const options = (message.params.initializationOptions ??= {});
    options.tsserver = { path: tsserverPath, ...options.tsserver };
    const body = Buffer.from(JSON.stringify(message));
    child.stdin.write(`Content-Length: ${body.length}\r\n\r\n`);
    child.stdin.write(body);
    buffer = buffer.subarray(bodyStart + length);
    return flush();
  }
});
process.stdin.on("end", () => {
  flush();
  child.stdin.end();
});
