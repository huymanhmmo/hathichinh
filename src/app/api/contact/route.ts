import { NextResponse } from "next/server";

export const runtime = "edge";

const RECIPIENT_EMAILS = "cskh@hathichinh.com, hachinh.rhm@gmail.com";

// --- Security: HTML escape to prevent XSS in email templates ---
function escapeHtml(str: string): string {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// --- Security: Phone number validation ---
const PHONE_REGEX = /^[0-9\s\-+().]{8,15}$/;

/**
 * Send email via Resend API (Edge-compatible, no nodemailer needed).
 * Set RESEND_API_KEY env variable in Cloudflare Pages dashboard.
 * Free tier: 100 emails/day — https://resend.com
 *
 * Fallback: If no RESEND_API_KEY is set, log to console (useful for dev).
 */
async function sendEmail(subject: string, htmlContent: string) {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
        // Dev/fallback: just log
        console.log("[Contact] No RESEND_API_KEY set. Email would be sent:");
        console.log(`  To: ${RECIPIENT_EMAILS}`);
        console.log(`  Subject: ${subject}`);
        return { success: true, fallback: true };
    }

    const recipients = RECIPIENT_EMAILS.split(",").map((e) => e.trim());

    const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            from: "Hà Thị Chinh Website <noreply@hathichinh.com>",
            to: recipients,
            subject,
            html: htmlContent,
        }),
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Resend API error ${res.status}: ${errorText}`);
    }

    return { success: true };
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { type, data } = body;

        if (!type || !data) {
            return NextResponse.json({ error: "Missing type or data" }, { status: 400 });
        }

        let subject = "";
        let htmlContent = "";

        if (type === "booking") {
            const { name, phone, email, service, clinic, date, time, notes } = data;
            if (!name || !phone) {
                return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
            }
            if (!PHONE_REGEX.test(phone)) {
                return NextResponse.json({ error: "Invalid phone number format" }, { status: 400 });
            }

            // Sanitize all user inputs
            const s = {
                name: escapeHtml(String(name)),
                phone: escapeHtml(String(phone)),
                email: email ? escapeHtml(String(email)) : "",
                service: service ? escapeHtml(String(service)) : "",
                clinic: clinic ? escapeHtml(String(clinic)) : "",
                date: date ? escapeHtml(String(date)) : "",
                time: time ? escapeHtml(String(time)) : "",
                notes: notes ? escapeHtml(String(notes)) : "",
            };

            subject = `[Đặt lịch khám] ${s.name} – ${s.phone}`;
            htmlContent = `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #1a3a5c, #2a5a8c); padding: 24px; border-radius: 12px 12px 0 0;">
                        <h2 style="color: #fff; margin: 0;">📅 Yêu cầu đặt lịch khám mới</h2>
                    </div>
                    <div style="background: #fff; padding: 24px; border: 1px solid #e5e7eb; border-top: 0; border-radius: 0 0 12px 12px;">
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr><td style="padding: 8px 0; color: #6b7280; width: 140px;">Họ và tên:</td><td style="padding: 8px 0; font-weight: bold;">${s.name}</td></tr>
                            <tr><td style="padding: 8px 0; color: #6b7280;">Số điện thoại:</td><td style="padding: 8px 0; font-weight: bold;"><a href="tel:${s.phone}">${s.phone}</a></td></tr>
                            ${s.email ? `<tr><td style="padding: 8px 0; color: #6b7280;">Email:</td><td style="padding: 8px 0;">${s.email}</td></tr>` : ""}
                            ${s.service ? `<tr><td style="padding: 8px 0; color: #6b7280;">Dịch vụ:</td><td style="padding: 8px 0;">${s.service}</td></tr>` : ""}
                            ${s.clinic ? `<tr><td style="padding: 8px 0; color: #6b7280;">Phòng khám:</td><td style="padding: 8px 0;">${s.clinic}</td></tr>` : ""}
                            ${s.date ? `<tr><td style="padding: 8px 0; color: #6b7280;">Ngày khám:</td><td style="padding: 8px 0;">${s.date}</td></tr>` : ""}
                            ${s.time ? `<tr><td style="padding: 8px 0; color: #6b7280;">Giờ khám:</td><td style="padding: 8px 0;">${s.time}</td></tr>` : ""}
                            ${s.notes ? `<tr><td style="padding: 8px 0; color: #6b7280;">Ghi chú:</td><td style="padding: 8px 0;">${s.notes}</td></tr>` : ""}
                        </table>
                        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
                        <p style="color: #9ca3af; font-size: 12px; margin: 0;">Email này được gửi tự động từ form đặt lịch tại hathichinh.com</p>
                    </div>
                </div>
            `;
        } else if (type === "contact") {
            const { name, phone, message } = data;
            if (!name || !phone) {
                return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
            }
            if (!PHONE_REGEX.test(phone)) {
                return NextResponse.json({ error: "Invalid phone number format" }, { status: 400 });
            }

            // Sanitize all user inputs
            const s = {
                name: escapeHtml(String(name)),
                phone: escapeHtml(String(phone)),
                message: message ? escapeHtml(String(message)) : "",
            };

            subject = `[Liên hệ] ${s.name} – ${s.phone}`;
            htmlContent = `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #1a3a5c, #2a5a8c); padding: 24px; border-radius: 12px 12px 0 0;">
                        <h2 style="color: #fff; margin: 0;">💬 Tin nhắn liên hệ mới</h2>
                    </div>
                    <div style="background: #fff; padding: 24px; border: 1px solid #e5e7eb; border-top: 0; border-radius: 0 0 12px 12px;">
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr><td style="padding: 8px 0; color: #6b7280; width: 140px;">Họ và tên:</td><td style="padding: 8px 0; font-weight: bold;">${s.name}</td></tr>
                            <tr><td style="padding: 8px 0; color: #6b7280;">Số điện thoại:</td><td style="padding: 8px 0; font-weight: bold;"><a href="tel:${s.phone}">${s.phone}</a></td></tr>
                            ${s.message ? `<tr><td style="padding: 8px 0; color: #6b7280;">Tin nhắn:</td><td style="padding: 8px 0;">${s.message}</td></tr>` : ""}
                        </table>
                        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
                        <p style="color: #9ca3af; font-size: 12px; margin: 0;">Email này được gửi tự động từ form liên hệ tại hathichinh.com</p>
                    </div>
                </div>
            `;
        } else {
            return NextResponse.json({ error: "Invalid type" }, { status: 400 });
        }

        await sendEmail(subject, htmlContent);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Email send error:", error);
        return NextResponse.json(
            { error: "Failed to send email. Please try again later." },
            { status: 500 }
        );
    }
}
