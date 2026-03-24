import watcher from "@parcel/watcher";
import { dirname } from "node:path";
const IGNORE = [
  "**/.git/**",
  "**/.DS_Store",
  "**/Thumbs.db",
  "**/node_modules/**",
  "**/bower_components/**",
  "**/dist/**",
  "**/build/**",
  "**/out/**",
  "**/.next/**",
  "**/.cache/**",
  "**/__pycache__/**",
  "**/*.min.js",
  "**/*.min.css",
  "**/*.map"
];
const EVENT_TYPE_MAP = {
  create: 1,
  update: 2,
  delete: 3
};
let subscription = null;
function toFsChangeEvents(events) {
  const byDir = /* @__PURE__ */ new Map();
  for (const event of events) {
    const dir = dirname(event.path);
    let entries = byDir.get(dir);
    if (!entries) {
      entries = [];
      byDir.set(dir, entries);
    }
    entries.push({
      path: event.path,
      type: EVENT_TYPE_MAP[event.type]
    });
  }
  const result = [];
  for (const [dirPath, changes] of byDir) {
    result.push({ dirPath, changes });
  }
  return result;
}
async function watchFolder(folderPath) {
  await unwatch();
  try {
    subscription = await watcher.subscribe(
      folderPath,
      (error, events) => {
        if (error) {
          console.error(
            `[watcher-worker] ${folderPath}: ${error.message}`
          );
          return;
        }
        if (events.length === 0) return;
        process.parentPort.postMessage(toFsChangeEvents(events));
      },
      { ignore: IGNORE }
    );
  } catch (error) {
    const err = error;
    console.error(
      `[watcher-worker] Failed to watch ${folderPath}: ${err.message}`
    );
  }
}
async function unwatch() {
  if (subscription) {
    await subscription.unsubscribe();
    subscription = null;
  }
}
const keepAlive = setInterval(() => {
}, 2 ** 31 - 1);
let pending = Promise.resolve();
process.parentPort.on("message", ({ data }) => {
  if (data.cmd === "watch") {
    pending = pending.then(() => watchFolder(data.path));
  } else if (data.cmd === "unwatch") {
    pending = pending.then(() => unwatch());
  } else if (data.cmd === "close") {
    clearInterval(keepAlive);
    pending.then(() => unwatch()).then(() => process.exit(0));
  }
});
