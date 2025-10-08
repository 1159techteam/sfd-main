"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function VolunteerForm() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [university, setUniversity] = useState("");
  const [department, setDepartment] = useState("");
  const [availability, setAvailability] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<string>("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const whatsappGroupLink =
    selectedRoles === "Protocol/Ushering"
      ? "https://chat.whatsapp.com/IQNcycOWXLaLu2d2GBPxP5?mode=ems_copy_t"
      : selectedRoles === "Logistics"
      ? "https://chat.whatsapp.com/GevY3ETR6Ac75LLLlPxRXb?mode=ems_copy_t"
      : selectedRoles === "Media/Publicity"
      ? "https://chat.whatsapp.com/BeeUoFGZT29HjKh1o6eMDn?mode=ems_copy_t"
      : "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    if (!fullName || !phone || !email || !state || !city) {
      setStatus("error");
      setErrorMessage('All fields with "*" are required.');
      return;
    }

    if (!selectedRoles) {
      setStatus("error");
      setErrorMessage("Please select a volunteer role.");
      return;
    }

    try {
      const formData = {
        fullName,
        phone,
        email,
        state,
        city,
        university,
        department,
        availability,
        roles: selectedRoles,
      };

      const res = await fetch("/api/volunteer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Submission failed");

      setStatus("success");
      setFullName("");
      setPhone("");
      setEmail("");
      setState("");
      setCity("");
      setUniversity("");
      setDepartment("");
      setAvailability("");
      setSelectedRoles("");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setStatus("error");
      setErrorMessage(error.message || "Something went wrong");
    }
  };

  return (
    <div className="p-8 bg-black/80 rounded-lg border border-gray-800 max-w-2xl mx-auto mt-2">
      {/* Back to Home Logo */}
      <div className="mb-6 text-center">
        <Link href="/" className="inline-block">
          <Image
            src="/logo.png"
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
            Tap the button below to join our {selectedRoles} WhatsApp community.
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
            Volunteer Registration
          </h2>

          <input
            type="text"
            placeholder="Full Name *"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded focus:ring-2 focus:ring-[#D4AF37]"
          />
          <input
            type="tel"
            placeholder="Phone *"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded focus:ring-2 focus:ring-[#D4AF37]"
          />
          <input
            type="email"
            placeholder="Email *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded focus:ring-2 focus:ring-[#D4AF37]"
          />
          <input
            type="text"
            placeholder="State *"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded focus:ring-2 focus:ring-[#D4AF37]"
          />
          <input
            type="text"
            placeholder="City *"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded focus:ring-2 focus:ring-[#D4AF37]"
          />
          <input
            type="text"
            placeholder="University/Organization"
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded focus:ring-2 focus:ring-[#D4AF37]"
          />
          <input
            type="text"
            placeholder="Department/Field of Study"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded focus:ring-2 focus:ring-[#D4AF37]"
          />

          {/* Role selection */}
          <div>
            <label className="block mb-2 font-medium text-[#D4AF37]">
              Volunteer Role *
            </label>
            <div className="space-y-2">
              {["Media/Publicity", "Protocol/Ushering", "Logistics"].map(
                (role) => (
                  <label
                    key={role}
                    className="flex items-center space-x-2 text-gray-300"
                  >
                    <input
                      type="radio"
                      name="role"
                      value={role}
                      checked={selectedRoles === role}
                      onChange={() => setSelectedRoles(role)}
                      className="h-4 w-4 text-[#D4AF37] border-gray-300 focus:ring-[#D4AF37]"
                    />
                    <span>{role}</span>
                  </label>
                )
              )}
            </div>
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
            {status === "loading" ? "Submitting..." : "Submit"}
          </button>

          {/* Link to Participate */}
          <div className="text-center mt-4">
            <Link
              href="/participate"
              className="text-sm text-[#D4AF37] underline hover:text-yellow-400 transition-colors"
            >
              Click here to participate instead
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}
