import React from "react";

const SellSection = ({ isAdmin, children }) => {
  return (
    <section
      id="sell"
      className={`py-16 md:py-24 px-6 md:px-10 relative z-1 bg-slate-50/50 ${
        isAdmin ? "block" : "hidden"
      }`}
    >
      <div className="flex flex-wrap justify-between items-end gap-6 mb-12 max-w-[1200px] mx-auto">
        <div>
          <div className="text-[11px] text-[#d97706] font-bold uppercase tracking-[0.25em] mb-3 flex items-center gap-2.5">
            <span className="w-6 h-0.5 bg-[#d97706]"></span> Step 01 — Upload
          </div>
          <h2 className="font-syne font-bold text-[clamp(28px,4vw,52px)] tracking-tight leading-tight text-slate-900 max-w-[720px]">
            Put Your Car to Work: Add Your Listing in Minutes!
          </h2>
        </div>
        <p className="text-slate-500 font-medium max-w-[420px] leading-relaxed text-sm">
          Car ki 3-4 pictures upload karein, details bharein, aur listing
          instantly inventory me live ho jayegi.
        </p>
      </div>

      <div className="flex justify-center">{children}</div>
    </section>
  );
};

export default SellSection;
