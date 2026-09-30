import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const newsFile = path.join(
  "C:",
  "Users",
  "batik",
  "Desktop",
  "kphirbot",
  "data",
  "news.json"
);

export async function GET() {
  try {
    if (!fs.existsSync(newsFile)) {
      return NextResponse.json([]);
    }

    const file = fs.readFileSync(newsFile, "utf8");
    const news = JSON.parse(file);

    return NextResponse.json(news);
  } catch (error) {
    console.error("Hírek betöltési hiba:", error);

    return NextResponse.json(
      {
        error: "Nem sikerült betölteni a híreket."
      },
      {
        status: 500
      }
    );
  }
}