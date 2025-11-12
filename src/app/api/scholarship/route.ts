import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const GOOGLE_CLIENT_EMAIL_SCHOOLARSHIP = process.env.GOOGLE_CLIENT_EMAIL_SCHOOLARSHIP || "";
const GOOGLE_PRIVATE_KEY_SCHOOLARSHIP = (process.env.GOOGLE_PRIVATE_KEY_SCHOOLARSHIP || "").replace(/\\n/g, "\n");
const GOOGLE_SHEET_ID_SCHOOLARSHIP = process.env.GOOGLE_SHEET_ID_SCHOOLARSHIP || "";
const SHEET_NAME = "Sheet1";

const t = (v: unknown) => (typeof v === "string" ? v.trim() : "");
const phoneOk = (p: string) => /^[0-9+\-()\s]{7,}$/.test(p);

export async function POST(request: NextRequest) {
  try {
    const raw = await request.json();

    let category = t(raw.category).toLowerCase();
    if (!["grant", "scholarship"].includes(category)) category = "scholarship";

    const name = t(raw.name);
    const institution = t(raw.institution);
    const reason = t(raw.reason);
    const phone = t(raw.phone).replace(/\s+/g, "");
    const department = t(raw.department);
    const businessName = t(raw.businessName);
    const businessNature = t(raw.businessNature);

    if (!GOOGLE_CLIENT_EMAIL_SCHOOLARSHIP || !GOOGLE_PRIVATE_KEY_SCHOOLARSHIP || !GOOGLE_SHEET_ID_SCHOOLARSHIP) {
      return NextResponse.json(
        {
          error: "Config missing",
          details: {
            GOOGLE_CLIENT_EMAIL_SCHOOLARSHIP,
            hasPrivateKey: !!GOOGLE_PRIVATE_KEY_SCHOOLARSHIP,
            GOOGLE_SHEET_ID_SCHOOLARSHIP,
          },
        },
        { status: 500 }
      );
    }

    if (category === "scholarship") {
      if (!name || !institution || !phone || !department) {
        return NextResponse.json({ error: "All scholarship fields are required." }, { status: 400 });
      }
    } else {
      if (!businessName || !businessNature || !reason || !phone || !reason) {
        return NextResponse.json({ error: "All grant fields are required." }, { status: 400 });
      }
    }
    if (!phoneOk(phone)) return NextResponse.json({ error: "Invalid phone." }, { status: 400 });

    // --- AUTH TEST ---
    let auth;
    try {
      auth = new google.auth.JWT({
        email: GOOGLE_CLIENT_EMAIL_SCHOOLARSHIP,
        key: GOOGLE_PRIVATE_KEY_SCHOOLARSHIP,
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      });
      await auth.authorize();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      return NextResponse.json(
        { error: "Google auth failed", detail: e?.message ?? String(e) },
        { status: 500 }
      );
    }

    const sheets = google.sheets({ version: "v4", auth });

    // --- METADATA TEST (ensures correct sheet id + access) ---
    try {
      await sheets.spreadsheets.get({ spreadsheetId: GOOGLE_SHEET_ID_SCHOOLARSHIP });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      return NextResponse.json(
        { error: "Spreadsheet get failed", detail: e?.message ?? String(e) },
        { status: 500 }
      );
    }

    const timestamp = new Date().toLocaleString("en-GB", { timeZone: "Africa/Lagos" });
    const row = [
      name || "",
      department || "",
      institution || "",
      phone || "",
      category,
      businessName || "",
      businessNature || "",
      reason || "",
      timestamp,
    ];

    // --- APPEND TEST ---
    try {
      await sheets.spreadsheets.values.append({
        spreadsheetId: GOOGLE_SHEET_ID_SCHOOLARSHIP,
        range: `${SHEET_NAME}!A:I`,
        valueInputOption: "RAW",
        insertDataOption: "INSERT_ROWS",
        requestBody: { values: [row] },
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      return NextResponse.json(
        { error: "Google Sheets append failed", detail: e?.message ?? String(e) },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 201 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return NextResponse.json(
      { error: "Failed to process registration", detail: err?.message ?? String(err) },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ status: "ok", message: "Grant/Scholarship API is functional" });
}
