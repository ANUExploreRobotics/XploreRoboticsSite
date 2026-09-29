// app/api/contact/route.js
import { NextResponse } from "next/server";
import { Resend } from "resend";

// Replace with your actual API key, though it is highly recommended 
// to put this in a .env.local file as process.env.RESEND_API_KEY
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    // 1. Grab the data sent from your frontend form
    const { name, email, message } = await req.json();

    // 2. Use your Resend code to send the email
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'anuexplorationrobotics@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      reply_to: email, // This lets you hit "reply" in Gmail to email them back!
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/> ${message}</p>
      `
    });

    // 3. Tell the frontend it was a success
    return NextResponse.json({ success: true, data });
    
  } catch (error) {
    // Tell the frontend if something broke
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}