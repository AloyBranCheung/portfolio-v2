"use client";

import sendEmail from "@/lib/nodemailer";

export default function ContactMe() {
  const handleClick = async () => {
    await sendEmail({
      from: "thatonegamer618@gmail.com",
      subject: "test handleclick",
      text: "this is a test ",
    });
  };
  return (
    <div>
      <button onClick={handleClick}>click me</button>
    </div>
  );
}
