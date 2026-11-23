const task = await taskSpace("news23 newspaper render");
const page = task.page("p1");
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
console.log({ entryPng: out, url: await page.url() });
