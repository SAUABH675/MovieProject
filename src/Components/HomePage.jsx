import React, { useEffect, useRef } from "react";
import Logo from "/ssju_logo.png";
import { Link } from "react-router-dom";

const HomePage = () => {
  document.title = "Movix - Homepage";
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const students = ["Saurabh Tiwari", "Deepanshu Panday", "Deepak Bungla"];

  return (
    <div className="relative flex flex-col md:flex-row min-h-screen w-screen overflow-auto md:overflow-hidden bg-[linear-gradient(125deg,#06000f_0%,#0c0018_35%,#0f0022_65%,#08001a_100%)] font-serif text-white">

      {/* LEFT PANEL */}
      <div className="relative z-10 flex w-full md:w-[42%] flex-col items-center justify-center border-b md:border-b-0 md:border-r border-[#6556cd2e] px-8 py-12 md:px-12 md:h-screen">
        <p className="hidden md:block absolute left-[18px] top-1/2 whitespace-nowrap text-[9px] uppercase tracking-[0.3em] text-[#6556cd66] [transform:translateY(-50%)_rotate(-90deg)]">
          Movix · 2023–26
        </p>

        {/* Logo ring */}
        <div className="mb-6 flex h-[140px] w-[140px] md:h-[190px] md:w-[190px]  items-center justify-center rounded-full border-[1.5px] border-[#6556cd73] bg-[#6556cd12] p-[10px] shadow-[0_0_60px_rgba(101,86,205,0.25)] [animation-duration:5s]">
          <img src={Logo} alt="College Logo" className="h-full w-full rounded-full object-contain" />
        </div>

        <p className="max-w-[280px] text-center text-[11px] sm:text-[12px] uppercase leading-[1.7] tracking-[0.16em] text-[#b4a5ffa6]">
          LSM Government PG College<br />Pithoragarh
        </p>
        <div className="my-5 h-[2px] w-[60px] rounded-full bg-[linear-gradient(90deg,transparent,#6556CD,transparent)]" />
        <p className="text-center text-[10px] sm:text-[11px] uppercase tracking-[0.12em] text-[#7869be8c]">
          Department of Computer Application
        </p>
      </div>

      {/* RIGHT PANEL */}
      <div className="relative z-10 flex flex-1 flex-col items-start justify-center px-8 sm:px-12 md:pl-[60px] md:pr-16 py-12 md:py-0">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#6556cd4d] bg-[#6556cd1f] px-4 py-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-[#6556CD]" />
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-[#b4a5ffcc]">
            Final Year Project
          </span>
        </div>

        {/* Title */}
        <h1 className="mb-2 bg-[linear-gradient(135deg,#ffffff_10%,#c4b8ff_50%,#6556CD_100%)] bg-clip-text text-[clamp(48px,7.5vw,100px)] font-bold leading-[0.95] tracking-[0.04em] text-transparent">
          MOVIX
        </h1>
        <p className="mb-8 sm:mb-11 text-[12px] sm:text-[14px] uppercase tracking-[0.22em] text-[#8c7dd2a6]">
          A Movie Discovery Web Application
        </p>

        {/* Info cards */}
        <div className="mb-8 sm:mb-12 flex w-full max-w-[520px] gap-3 sm:gap-4 flex-col sm:flex-row">
          {/* Students */}
          <div className="flex-1 rounded-2xl border border-[#6556cd38] bg-white/5 p-4 sm:p-5 backdrop-blur-xl">
            <p className="mb-3 text-[9px] uppercase tracking-[0.22em] text-[#9687d28c]">Developed by</p>
            {students.map((name, i) => (
              <div key={i} className={`flex items-center gap-3 ${i < students.length - 1 ? "mb-3" : ""}`}>
                <div className="flex h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#6556CD] text-[11px] font-bold text-white shadow-lg">
                  {name.charAt(0)}
                </div>
                <div>
                  <p className="text-[12px] sm:text-[13px] text-[#e1daffe6]">{name}</p>
                  <p className="text-[9px] sm:text-[10px] text-[#8273be99]">BCA Final Year</p>
                </div>
              </div>
            ))}
          </div>

          {/* Supervisor */}
          <div className="flex-1 rounded-2xl border border-[#6556cd38] bg-white/5 p-4 sm:p-5 backdrop-blur-xl">
            <p className="mb-3 text-[9px] uppercase tracking-[0.22em] text-[#9687d28c]">Supervised by</p>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 sm:h-11 sm:w-11 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#5544bb] to-[#8b6eff] text-[14px] font-bold text-white shadow-xl">
                D
              </div>
              <div>
                <p className="text-[12px] sm:text-[13px] text-[#e1daffe6]">Dr. Santosh Kumar</p>
                <p className="text-[9px] sm:text-[10px] text-[#8273be99]">Asst. Professor</p>
                <p className="text-[9px] sm:text-[10px] text-[#8273be80]">Dept. of BCA</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <Link
          to="/home"
          className="group inline-flex items-center gap-3 rounded-full border border-[#b4a5ff40] bg-gradient-to-br from-[#5a4dbf] to-[#7c68f0] px-8 sm:px-12 py-3 sm:py-[15px] text-[13px] sm:text-[15px] font-semibold tracking-wider text-white shadow-2xl transition-all hover:-translate-y-1 hover:scale-105"
        >
          <span>Explore Movix</span>
          <svg className="h-[15px] w-[15px] sm:h-[17px] sm:w-[17px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
