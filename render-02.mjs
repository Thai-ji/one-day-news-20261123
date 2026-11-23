const spaces = await listTaskSpaces();
const existing = spaces.find((s) => s.name === "news23 newspaper render");
const task = !existing
  ? await taskSpace("news23 newspaper render")
  : existing.ownership === "user"
    ? await claimTaskSpace(existing.id)
    : await taskSpace(existing.id);
const tabs = await task.tabs();
const active = tabs.find((t) => t.active) || tabs[0];
const page = active.label ? task.page(active.label) : await task.adopt(active.page);
await page.goto("file:///D:/DSH-Bot-Workspace/Scout/news23-entry/design.html");
await page.cdp("Emulation.setDeviceMetricsOverride", {
  width: 1024,
  height: 1024,
  deviceScaleFactor: 1,
  mobile: false,
});
await page.waitForLoadState();
await page.waitForTimeout(1000);
const out = await page.screenshot({ path: "D:/DSH-Bot-Workspace/Scout/news23-entry/entry.png" });
console.log({ entryPng: out, spaceId: task.spaceId, page: page.label });
