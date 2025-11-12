

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ScholarshipForm() {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [institution, setInstitution] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessNature, setBusinessNature] = useState("");
  const [reason, setReason] = useState("");

  type Status = "idle" | "loading" | "success" | "error";
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const validate = () => {
    // Scholarship validation (always visible)
    if (!name || !institution || !phone || !department) {
      setErrorMessage("All fields marked * are required for Scholarship.");
      return false;
    }

    // Grant validation (conditionally visible)
    if (category === "grant") {
      if (!businessName || !businessNature || !phone || !reason) {
        setErrorMessage("All fields marked * are required for Grant.");
        return false;
      }
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

    // Build payload dynamically
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payload: any = {
      category,
      name,
      institution,
      phone,
      department,
    };

    if (category === "grant") {
      payload.businessName = businessName;
      payload.businessNature = businessNature;
      payload.reason = reason;
    }

    try {
      const res = await fetch("/api/scholarship", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: any = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");

      // Reset form
      setStatus("success");
      setName("");
      setReason("");
      setPhone("");
      setInstitution("");
      setDepartment("");
      setBusinessName("");
      setBusinessNature("");
      setCategory("");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "Something went wrong");
    }
  };

  return (
    <div className="p-8 bg-black/80 rounded-lg border border-gray-800 max-w-lg mx-auto mt-2">
      {/* Logo */}
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
            Thank you for registering! <br />
            Create your video, collaborate and tag us.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold mb-4 text-center text-[#D4AF37]">
            Join The Movement
          </h2>

          {/* Scholarship Fields (always visible) */}
          <div>
            <label className="block mb-2 font-medium text-[#D4AF37]">
              Your Name *
            </label>
            <input
              type="text"
              className="w-full p-3 bg-white border border-gray-300 rounded focus:ring-2 focus:ring-[#D4AF37] text-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-[#D4AF37]">
              Department *
            </label>
            <input
              type="text"
              className="w-full p-3 bg-white border border-gray-300 rounded focus:ring-2 focus:ring-[#D4AF37] text-black"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-[#D4AF37]">
              Institution *
            </label>
            <select
              className="w-full p-3 bg-white border border-gray-300 rounded focus:ring-2 focus:ring-[#D4AF37] text-black"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
            >
              <option value="">Select an option</option>
              <option value="University of Ilorin">University of Ilorin</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium text-[#D4AF37]">
              Phone Number *
            </label>
            <input
              type="tel"
              className="w-full p-3 bg-white border border-gray-300 rounded focus:ring-2 focus:ring-[#D4AF37] text-black"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          

          {/* Category Selection */}
          <div>
            <label className="block mb-2 font-medium text-[#D4AF37]">
              Category
            </label>
            <select
              className="w-full p-3 bg-white border border-gray-300 rounded focus:ring-2 focus:ring-[#D4AF37] text-black"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select an option</option>
              <option value="scholarship">Scholarship</option>
              <option value="grant">Grant</option>
            </select>
          </div>

          {/* Grant Fields (conditionally visible below Scholarship) */}
          {category === "grant" && (
            <>
              <div>
                <label className="block mb-2 font-medium text-[#D4AF37]">
                  Name of Business *
                </label>
                <input
                  type="text"
                  className="w-full p-3 bg-white border border-gray-300 rounded focus:ring-2 focus:ring-[#D4AF37] text-black"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-[#D4AF37]">
                  Nature of Business *
                </label>
                <input
                  type="text"
                  className="w-full p-3 bg-white border border-gray-300 rounded focus:ring-2 focus:ring-[#D4AF37] text-black"
                  value={businessNature}
                  onChange={(e) => setBusinessNature(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 font-medium text-[#D4AF37]">
                  Why do you deserve this *
                </label>
                <textarea
                  className="w-full p-3 bg-white border border-gray-300 rounded focus:ring-2 focus:ring-[#D4AF37] text-black resize-none  h-30"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>
            </>
          )}

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
            {status === "loading" ? "Submitting..." : "Join The Movement"}
          </button>
        </form>
      )}
    </div>
  );
}
