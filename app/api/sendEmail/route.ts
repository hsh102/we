import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Define the type for the incoming request data
interface ContactFormData {
  selectedRole: "model" | "advertiser";
  name: string;
  address: string;
  mobileNumber: string;
  email: string;
  businessName?: string;
  age?: string;
  files?: File[];
}

export async function POST(request: Request) {
  try {
    // Validate and parse the JSON body
    const formData: ContactFormData = await request.json();

    if (
      !formData.selectedRole ||
      !formData.name ||
      !formData.address ||
      !formData.mobileNumber ||
      !formData.email ||
      (formData.selectedRole === "advertiser" && !formData.businessName) ||
      (formData.selectedRole === "model" && !formData.age)
    ) {
      return new NextResponse(JSON.stringify({ message: "Invalid form data" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "powrsofficial@gmail.com",
        pass: "mrnb eptw copm wuce", // Replace with your Gmail app password
      },
    });

    const mailOptions = {
      from: "powrsofficial@gmail.com",
      to: "blueeyeproduction123@gmail.com",
      subject: "New Contact Form Submission",
      html: `
        <p><strong>Role:</strong> ${formData.selectedRole}</p>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Address:</strong> ${formData.address}</p>
        <p><strong>Mobile Number:</strong> ${formData.mobileNumber}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        ${formData.selectedRole === "advertiser" ? `<p><strong>Business Name:</strong> ${formData.businessName}</p>` : ""}
        ${formData.selectedRole === "model" ? `<p><strong>Age:</strong> ${formData.age}</p>` : ""}
        ${formData.selectedRole === "model" && formData.files ? `<p><strong>Attached Files:</strong> ${formData.files.map(file => file.name).join(", ")}</p>` : ""}
      `,
    };

    await transporter.sendMail(mailOptions);

    return new NextResponse(
      JSON.stringify({ message: "Email Sent Successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new NextResponse(JSON.stringify({ message: "Failed to Send Email" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
