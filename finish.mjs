const existing = (await listTaskSpaces()).find((s) => s.name === "news23 newspaper render");
const task = existing.ownership === "user"
  ? await claimTaskSpace(existing.id)
  : await taskSpace(existing.id);
await task.finish({ keep: [] });
console.log("browser space finished");
