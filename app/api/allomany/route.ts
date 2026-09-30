import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const membersFile = path.join(
  "C:",
  "Users",
  "batik",
  "Desktop",
  "kpallomanybot",
  "data",
  "members.json"
);

export async function GET() {
  try {
    if (!fs.existsSync(membersFile)) {
      return NextResponse.json([]);
    }

    const file = fs.readFileSync(
      membersFile,
      "utf8"
    );

    const members = JSON.parse(file);

    if (!Array.isArray(members)) {
      return NextResponse.json([]);
    }

    return NextResponse.json(members);
  } catch (error) {
    console.error(
      "Állomány betöltési hiba:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Nem sikerült betölteni az állományt.",
      },
      {
        status: 500,
      }
    );
  }
}