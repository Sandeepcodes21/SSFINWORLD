import React from "react";

const SellSection = ({ isAdmin, children }) => {
  return (
    <section
      id="sell"
      className={`py-16 md:py-24 px-6 md:px-10 relative z-1 ${isAdmin ? "block" : "hidden"}`}
    >
      <div className="flex flex-wrap justify-between items-end gap-6 mb-14">
        <div>
          <div className="text-[11px] text-accent uppercase tracking-[0.25em] mb-3.5 flex items-center gap-2.5">
            <span className="w-6 h-px bg-accent"></span> Step 01 — Upload
          </div>
          <h2 className="font-syne font-bold text-[clamp(32px,5vw,60px)] tracking-[-0.03em] leading-none">
            Put Your Car to Work: Add Your Listing in Minutes!
          </h2>
        </div>
        <p className="text-muted max-w-[420px] leading-relaxed text-sm">
          Car ki 3-4 pictures upload karein, details bharein, aur listing
          instantly inventory me live ho jayegi.
        </p>
      </div>

      {children}
    </section>
  );
};

export default SellSection;
