import React, { useState } from "react";
import { Link } from "react-router-dom";

const ContactUs = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
  };

  return (
    <div className="w-screen h-[120vh] bg-[#1F1E24] text-white px-[5%] py-10">
      {/* Header Nav */}
      <nav className="flex items-center gap-4 mb-10 text-zinc-400">
        <Link
          to="/home"
          className="hover:text-[#6556CD] transition ri-home-line text-xl"
        />
        <span>/</span>
        <span className="text-white font-semibold">Contact Us</span>
      </nav>

      <div className="max-w-6xl mx-auto">
        {/* Page Title */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-black text-white mb-3">
            Get In <span className="text-[#6556CD]">Touch</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            Have a question, suggestion, or just want to talk movies? We'd love
            to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left — Info Cards */}
          <div className="flex flex-col gap-6">
            {[
              {
                icon: "ri-map-pin-line",
                title: "Our Location",
                desc: "LSM Campus, Pithoragarh\nUttarakhand, India",
              },
              {
                icon: "ri-mail-line",
                title: "Email Us",
                desc: "tiwarisaurabhst1@gamil.com\ntiwarisaurabhst2@gami.com",
              },
              {
                icon: "ri-phone-line",
                title: "Call Us",
                desc: "+91 9548352330\nMon - Fri, 9am - 6pm",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-5 bg-[#2a2930] p-6 rounded-2xl border border-zinc-700 hover:border-[#6556CD] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-[#6556CD] flex items-center justify-center shrink-0">
                  <i className={`${item.icon} text-xl text-white`}></i>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">
                    {item.title}
                  </h3>
                  {item.desc.split("\n").map((line, i) => (
                    <p key={i} className="text-zinc-400 text-sm">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            {/* Social Links */}
            <div className="bg-[#2a2930] p-6 rounded-2xl border border-zinc-700">
              <h3 className="text-white font-bold text-lg mb-4">Follow Us</h3>
              <div className="flex gap-4">
                {[
                  {
                    icon: "ri-twitter-x-fill",
                    href: "https://x.com/SaurabhTiw54447",
                  },
                  {
                    icon: "ri-instagram-fill",
                    href: "https://www.instagram.com/saurabh25_0_/?next=%2F",
                  },
                  {
                    icon: "ri-facebook-circle-fill",
                    href: "https://www.facebook.com/profile.php?id=100087566724723",
                  },
                  {
                    icon: "ri-youtube-fill",
                    href: "https://www.youtube.com/channel/UCTFfKnVDo5r_uYXdD3gsxTQ/posts?pvf=CAM%253D",
                  },
                ].map((s) => (
                  <a
                    key={s.icon}
                    href={s.href}
                    className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center hover:bg-[#6556CD] transition-all duration-300 text-white"
                  >
                    <i className={`${s.icon} text-lg`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="bg-[#2a2930] p-8 rounded-2xl border border-zinc-700">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-16">
                <div className="w-20 h-20 rounded-full bg-[#6556CD] flex items-center justify-center mb-6">
                  <i className="ri-check-line text-4xl text-white"></i>
                </div>
                <h2 className="text-3xl font-black text-white mb-3">
                  Message Sent!
                </h2>
                <p className="text-zinc-400 mb-6">
                  Thanks for reaching out,{" "}
                  <span className="text-[#6556CD] font-semibold">
                    {form.name}
                  </span>
                  ! We'll get back to you soon.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", subject: "", message: "" });
                  }}
                  className="px-6 py-3 bg-[#6556CD] rounded-lg font-semibold hover:bg-[#7c6de0] transition"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-black text-white mb-6">
                  Send a Message
                </h2>
                <div className="flex flex-col gap-5">
                  {/* Name & Email Row */}
                  <div className="flex gap-4">
                    {["name", "email"].map((field) => (
                      <div key={field} className="flex-1 flex flex-col gap-1">
                        <label className="text-zinc-400 text-sm capitalize">
                          {field}
                        </label>
                        <input
                          id={`contact-${field}`}
                          type={field === "email" ? "email" : "text"}
                          name={field}
                          value={form[field]}
                          onChange={handleChange}
                          onFocus={() => setFocused(field)}
                          onBlur={() => setFocused("")}
                          placeholder={
                            field === "name" ? "Your Name" : "your@email.com"
                          }
                          className={`bg-[#1F1E24] text-white px-4 py-3 rounded-lg border outline-none transition-all duration-200 text-sm ${
                            focused === field
                              ? "border-[#6556CD]"
                              : "border-zinc-600"
                          }`}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Subject */}
                  <div className="flex flex-col gap-1">
                    <label className="text-zinc-400 text-sm">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      onFocus={() => setFocused("subject")}
                      onBlur={() => setFocused("")}
                      placeholder="What's this about?"
                      className={`bg-[#1F1E24] text-white px-4 py-3 rounded-lg border outline-none transition-all duration-200 text-sm ${
                        focused === "subject"
                          ? "border-[#6556CD]"
                          : "border-zinc-600"
                      }`}
                    />
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1">
                    <label className="text-zinc-400 text-sm">Message</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused("")}
                      rows={5}
                      placeholder="Tell us what's on your mind..."
                      className={`bg-[#1F1E24] text-white px-4 py-3 rounded-lg border outline-none transition-all duration-200 text-sm resize-none ${
                        focused === "message"
                          ? "border-[#6556CD]"
                          : "border-zinc-600"
                      }`}
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="w-full py-4 bg-[#6556CD] hover:bg-[#7c6de0] rounded-lg font-bold text-white text-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <i className="ri-send-plane-fill"></i>
                    Send Message
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
