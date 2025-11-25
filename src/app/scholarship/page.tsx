"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function ScholarshipForm() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black/90 p-6">
      <div className="bg-black border border-gray-800 rounded-2xl p-10 max-w-md w-full text-center shadow-xl">
        
        {/* Logo */}
        <Link href="/" className="inline-block mb-6">
          <Image
            src="/white.svg"
            alt="Logo"
            width={180}
            height={80}
            priority
            unoptimized
          />
        </Link>

        <h1 className="text-3xl font-bold text-[#D4AF37] mb-4">
          Registration Closed
        </h1>

        <p className="text-gray-300 leading-relaxed mb-6">
          Thank you for applying for the <span className="text-[#D4AF37] font-semibold">Grant and Scholarship opportunity!</span>.  
        </p>
        <Link
          href="/"
          className="inline-block bg-[#D4AF37] hover:bg-yellow-500 text-white font-bold py-3 px-6 rounded-full transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
