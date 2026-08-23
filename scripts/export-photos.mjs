import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

const REGION = process.env.AWS_REGION || "eu-west-2";
const TABLE = process.env.DYNAMODB_TABLE || "photos";

const OUT = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "src",
  "data",
  "photos.json"
);

const ddb = new DynamoDBClient({ region: REGION });

const scanAll = async () => {
  const items = [];
  let ExclusiveStartKey;
  do {
    const res = await ddb.send(
      new ScanCommand({ TableName: TABLE, ExclusiveStartKey })
    );
    for (const it of res.Items || []) items.push(unmarshall(it));
    ExclusiveStartKey = res.LastEvaluatedKey;
  } while (ExclusiveStartKey);
  return items;
};

const num = (v) => (typeof v === "number" ? v : v == null ? null : Number(v));

const mapSettings = (s = {}) => ({
  camera: s.camera ?? null,
  lens: s.lens ?? null,
  focalLength: num(s.focal_length),
  focalLength35: num(s.focal_length_35),
  aperture: num(s.aperture),
  shutter: s.shutter ?? null,
  iso: num(s.iso),
  takenAt: s.taken_at ?? null,
});

const mapPhoto = (r) => ({
  id: r.image_id,
  section: r.collection_id || "",
  order: Number.isFinite(num(r.order_index)) ? num(r.order_index) : -1,
  title: r.title || "",
  location: r.location || "",
  description: r.description || "",
  featured: Boolean(r.featured),
  tags: Array.isArray(r.tags) ? r.tags : [],
  width: num(r.width),
  height: num(r.height),
  aspect: num(r.aspect),
  settings: mapSettings(r.settings),
});

const main = async () => {
  const rows = (await scanAll()).map(mapPhoto);
  rows.sort((a, b) => {
    const s = a.section.localeCompare(b.section);
    if (s !== 0) return s;
    const ao = a.order < 0 ? Infinity : a.order;
    const bo = b.order < 0 ? Infinity : b.order;
    if (ao !== bo) return ao - bo;
    return a.id.localeCompare(b.id);
  });
  writeFileSync(OUT, JSON.stringify(rows, null, 2) + "\n", "utf8");
  const sections = rows.reduce((acc, r) => {
    acc[r.section || "(none)"] = (acc[r.section || "(none)"] || 0) + 1;
    return acc;
  }, {});
  console.log(`Wrote ${rows.length} photos to src/data/photos.json`);
  console.log("Sections:", sections);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
