import fs from "fs";
import path from "path";
import OpenAI from "openai";
import YAML from "yaml";

const client = new OpenAI({ apiKey: process.env.TGT_OPENAI_API_KEY! });
const dir = path.join(process.cwd(), "assistants/tgt");

(async () => {
  const files = fs.readdirSync(dir).filter(f => f.endsWith(".yaml"));
  for (const f of files) {
    const spec = YAML.parse(fs.readFileSync(path.join(dir, f), "utf8"));
    // Upsert by name
    const existing = (await client.beta.assistants.list({ order: "desc" }))
      .data.find(a => a.name === spec.name);
    if (existing) {
      const updated = await client.beta.assistants.update(existing.id, spec);
      console.log(`Updated: ${updated.name} (${updated.id})`);
    } else {
      const created = await client.beta.assistants.create(spec);
      console.log(`Created: ${created.name} (${created.id})`);
    }
  }
})();

