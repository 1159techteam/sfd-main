import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(
  /\\n/g,
  "\n"
);
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;
const SHEET_NAME = "Sheet1"; // Make sure this matches your sheet name

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const name = formData.get("name") as string;

    // Basic validation
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY || !GOOGLE_SHEET_ID) {
      console.warn("⚠️ Google Sheets not configured properly");
      return NextResponse.json(
        {
          success: false,
          error: "Google Sheets not configured. Check .env.local",
        },
        { status: 500 }
      );
    }

    // Authenticate with Google Sheets API
    const auth = new google.auth.JWT({
      email: GOOGLE_CLIENT_EMAIL,
      key: GOOGLE_PRIVATE_KEY,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Fetch existing rows (email is in column A)
    const readRes = await sheets.spreadsheets.values.get({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: `${SHEET_NAME}!A2:A`, // Skip header row
    });

    const rows = readRes.data.values || [];

    // Check if email exists (case-insensitive)
    const emailExists = rows.some(
      (row) => row[0]?.trim().toLowerCase() === email.trim().toLowerCase()
    );

    if (emailExists) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    // Append new row
    const timestamp = new Date().toISOString();
    await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: `${SHEET_NAME}!A:D`,
      valueInputOption: "RAW",
      requestBody: {
        values: [
          [
            email.trim(),
            name?.trim() || "N/A",
            timestamp,
            "School for the Daring Website",
            phone.trim(),
          ],
        ],
      },
    });

    console.log("✅ Successfully posted to Google Sheets");

    return NextResponse.json(
      {
        success: true,
        message: "Successfully registered for the movement!",
        data: {
          email: email.trim(),
          name: name?.trim() || "N/A",
          timestamp,
          phone: phone.trim(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ API Error:", error);
    return NextResponse.json(
      { error: "Failed to process registration" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "working",
    message: "Lead registration API is functional",
    sheetId: GOOGLE_SHEET_ID,
  });
}
