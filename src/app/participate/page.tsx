"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ParticipateForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [stateField, setStateField] = useState("");
  const [city, setCity] = useState("");
  const [university, setUniversity] = useState("");
  const [department, setDepartment] = useState("");

  type Status = "idle" | "loading" | "success" | "error";
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const whatsappGroupLink = "https://chat.whatsapp.com/BRma6t5wIOj9s3SDHZKIks";

  const validate = () => {
    if (!name || !email || !phone || !stateField || !city) {
      setErrorMessage("All fields marked * are required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    if (!validate()) {
      setStatus("error");
      return;
    }

    const payload = {
      name,
      email,
      phone,
      state: stateField,
      city,
      university,
      department,
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Submission failed");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setPhone("");
      setStateField("");
      setCity("");
      setUniversity("");
      setDepartment("");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "Something went wrong");
    }
  };

  return (
    <div className="p-8 bg-black/80 rounded-lg border border-gray-800 max-w-lg mx-auto mt-2">
      {/* Back to Home Logo */}
      <div className="mb-6 text-center">
        <Link href="/" className="inline-block">
          <Image
            src="/white.svg"
            alt="Logo"
            width={200}
            height={100}
            priority
            unoptimized
          />
        </Link>
      </div>

      {status === "success" ? (
        <div className="text-center py-8">
          <h3 className="text-2xl font-bold mb-4 text-green-500">
            Registration Successful!
          </h3>
          <p className="mb-6 text-gray-200">
            Thank you for joining. Tap below to join our WhatsApp community.
          </p>
          <a
            href={whatsappGroupLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-[#25D366] text-white font-semibold rounded-lg hover:bg-[#1ebe5d]"
          >
            Join WhatsApp Group
          </a>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold mb-4 text-center text-[#D4AF37]">
            Join The Movement
          </h2>
          
          <div>
            <label className="block mb-2 font-medium text-[#D4AF37]">Your Name *</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-700 rounded focus:ring-2 focus:ring-[#D4AF37]"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block mb-2 font-medium text-[#D4AF37]">Your Email *</label>
            <input
              type="email"
              className="w-full p-3 border border-gray-700 rounded focus:ring-2 focus:ring-[#D4AF37]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block mb-2 font-medium text-[#D4AF37]">Phone Number *</label>
            <input
              type="tel"
              className="w-full p-3 border border-gray-700 rounded focus:ring-2 focus:ring-[#D4AF37]"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block mb-2 font-medium text-[#D4AF37]">State *</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-700 rounded focus:ring-2 focus:ring-[#D4AF37]"
              value={stateField}
              onChange={(e) => setStateField(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block mb-2 font-medium text-[#D4AF37]">City *</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-700 rounded focus:ring-2 focus:ring-[#D4AF37]"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block mb-2 font-medium text-[#D4AF37]">University / Organization</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-700 rounded focus:ring-2 focus:ring-[#D4AF37]"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block mb-2 font-medium text-[#D4AF37]">Department / Field of Study</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-700 rounded focus:ring-2 focus:ring-[#D4AF37]"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>

          {status === "error" && (
            <div className="text-red-500 text-sm font-semibold bg-red-500/10 p-2 rounded">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-[#D4AF37] hover:bg-yellow-500 text-white font-bold py-3 px-4 rounded disabled:opacity-50"
          >
            {status === "loading" ? "Submitting..." : "JOIN THE MOVEMENT"}
          </button>

          {/* Volunteer Redirect */}
          <div className="text-center mt-4">
            <Link
              href="/volunteer"
              className="text-sm text-[#D4AF37] underline hover:text-yellow-400 transition-colors"
            >
              Click here to volunteer
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}
