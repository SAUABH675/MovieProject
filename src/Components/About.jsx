import React from "react";
import { Link } from "react-router-dom";

const team = [
  { name: "Saurabh Tiwari", role: "Full Stack Developer", icon: "ri-code-s-slash-line", desc: "Built the core React architecture and Redux state management." },
  { name: "Deepak bugla", role: "UI/UX Designer", icon: "ri-palette-line", desc: "Designed the cinematic interface and user experience flows." },
  { name: "Deepanshu Panday", role: "API Integration", icon: "ri-links-line", desc: "Integrated TMDB API and handled data fetching pipelines." },
];

const techStack = [
  { name: "React.js", icon: "ri-reactjs-line", color: "#61DAFB" },
  { name: "Redux Toolkit", icon: "ri-database-2-line", color: "#764ABC" },
  { name: "React Router", icon: "ri-route-line", color: "#CA4245" },
  { name: "Tailwind CSS", icon: "ri-css3-line", color: "#38BDF8" },
  { name: "TMDB API", icon: "ri-film-line", color: "#01B4E4" },
  { name: "Axios", icon: "ri-arrow-left-right-line", color: "#5A29E4" },
  { name: "Vite", icon: "ri-flashlight-line", color: "#BD34FE" },
];

const features = [
  { icon: "ri-film-line", title: "Movie Details", desc: "Full details including ratings, genres, runtime, tagline, and trailer." },
  { icon: "ri-tv-line", title: "TV Shows", desc: "Season-by-season breakdown with all episode info and air dates." },
  { icon: "ri-user-star-line", title: "Celebrity Profiles", desc: "Biography, social links, and complete filmography for every actor." },
  { icon: "ri-store-line", title: "Watch Providers", desc: "Find where to stream, rent, or buy — available for Indian region." },
  { icon: "ri-search-line", title: "Smart Search", desc: "Search across movies, TV shows, and people all at once." },
  { icon: "ri-play-circle-line", title: "Trailer Player", desc: "Watch official trailers directly in the app without leaving." },
];

const About = () => {
  return (
    <div className="w-screen h-[260vh] bg-[#1F1E24] text-white px-[5%] py-10">
      {/* Nav */}
      <nav className="flex items-center gap-4 mb-10 text-zinc-400">
        <Link to="/home" className="hover:text-[#6556CD] transition ri-home-line text-xl" />
        <span>/</span>
        <span className="text-white font-semibold">About</span>
      </nav>

      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-6xl font-black text-white mb-4">
          About <span className="text-[#6556CD]">Movix</span>
        </h1>
        <p className="text-zinc-400 text-xl max-w-2xl mx-auto leading-relaxed">
          Your ultimate destination to explore movies, TV shows, and the people who make them — powered by the TMDB API.
        </p>
      </div>

      {/* Mission */}
      <div className="bg-[#2a2930] rounded-2xl border border-zinc-700 p-10 mb-12 flex flex-col md:flex-row gap-8 items-center">
        <div className="w-24 h-24 rounded-full bg-[#6556CD] flex items-center justify-center shrink-0">
          <i className="ri-movie-2-line text-5xl text-white"></i>
        </div>
        <div>
          <h2 className="text-3xl font-black text-white mb-3">Our Mission</h2>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Movix was created as a BCA final year project to demonstrate the power of modern web development. We set out to build a real-world application that movie lovers would actually want to use — combining live data from TMDB, a smooth cinematic UI, and lightning-fast performance using Vite and React.
          </p>
        </div>
      </div>

      {/* Features */}
      <h2 className="text-3xl font-black text-white mb-6">What We Offer</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {features.map((f) => (
          <div key={f.title} className="bg-[#2a2930] p-6 rounded-2xl border border-zinc-700 hover:border-[#6556CD] transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-[#6556CD] bg-opacity-20 flex items-center justify-center mb-4 group-hover:bg-[#6556CD] transition-all duration-300">
              <i className={`${f.icon} text-2xl text-[#6556CD] group-hover:text-white transition-all duration-300`}></i>
            </div>
            <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Tech Stack */}
      <h2 className="text-3xl font-black text-white mb-6">Tech Stack</h2>
      <div className="flex flex-wrap gap-4 mb-16">
        {techStack.map((t) => (
          <div
            key={t.name}
            className="flex items-center gap-3 bg-[#2a2930] px-5 py-3 rounded-full border border-zinc-700 hover:border-[#6556CD] transition-all duration-300"
          >
            <i className={`${t.icon} text-xl`} style={{ color: t.color }}></i>
            <span className="text-white font-semibold text-sm">{t.name}</span>
          </div>
        ))}
      </div>

      {/* Team */}
      <h2 className="text-3xl font-black text-white mb-6">Meet the Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {team.map((member) => (
          <div key={member.name} className="bg-[#2a2930] p-8 rounded-2xl border border-zinc-700 hover:border-[#6556CD] transition-all duration-300 text-center group">
            <div className="w-20 h-20 rounded-full bg-[#6556CD] flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
              <i className={`${member.icon} text-3xl text-white`}></i>
            </div>
            <h3 className="text-white font-black text-xl mb-1">{member.name}</h3>
            <p className="text-[#6556CD] font-semibold text-sm mb-3">{member.role}</p>
            <p className="text-zinc-400 text-sm leading-relaxed">{member.desc}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-[#6556CD] rounded-2xl p-10 text-center">
        <h2 className="text-3xl font-black text-white mb-3">Have Questions?</h2>
        <p className="text-purple-200 mb-6 text-lg">We're always happy to hear from movie enthusiasts like you.</p>
        <Link
          to="/contactUs"
          className="inline-block px-8 py-4 bg-white text-[#6556CD] font-black rounded-xl hover:bg-zinc-100 transition-all duration-300 text-lg"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
};

export default About;
