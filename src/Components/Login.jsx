import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearMessages } from "../store/reducers/authSlice";

const OAUTH_CONFIG = {
  google: {
    clientId: "YOUR_GOOGLE_CLIENT_ID",
    redirectUri: "http://localhost:5173/auth/google/callback",
    scope: "openid email profile",
  },
};

const loginWithGoogle = () => {
  const { clientId, redirectUri, scope } = OAUTH_CONFIG.google;
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope,
    access_type: "offline",
    prompt: "select_account",
  });
  window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
};

const Login = () => {
  const navigate  = useNavigate();
  const dispatch  = useDispatch();
  const { loading, error: apiError, user } = useSelector((state) => state.auth);

  const [form, setForm]       = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [focused, setFocused] = useState("");
  const [errors, setErrors]   = useState({});

  // Redirect to home after successful login
  useEffect(() => {
    if (user) {
      dispatch(clearMessages());
      navigate("/home");
    }
  }, [user, navigate, dispatch]);

  const validate = () => {
    const e = {};
    if (!form.email.includes("@")) e.email = "Enter a valid email";
    if (form.password.length < 6)  e.password = "Password must be at least 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    dispatch(loginUser({ email: form.email, password: form.password }));
  };

  const socialButtons = [
    { label: "Google", icon: "ri-google-fill", color: "#EA4335", onClick: loginWithGoogle },
  ];

  return (
    <div className="min-h-screen w-full bg-[#0a0a0f] flex overflow-hidden relative">

      {/* Left cinematic panel */}
      <div className="flex-1 relative flex-col justify-end p-16 overflow-hidden hidden md:flex">
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: `linear-gradient(160deg, rgba(101,86,205,0.15) 0%, transparent 50%),
                         linear-gradient(to top, #0a0a0f 0%, rgba(0,0,0,0.3) 60%, transparent 100%)`,
          }}
        />
        <div
          className="absolute inset-0 bg-center bg-cover opacity-25"
          style={{
            backgroundImage: `url('https://image.tmdb.org/t/p/original/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg')`,
            animation: "slowZoom 20s ease-in-out infinite alternate",
          }}
        />
        <style>{`
          @keyframes slowZoom { from { transform: scale(1); } to { transform: scale(1.08); } }
          @keyframes spin      { to   { transform: rotate(360deg); } }
        `}</style>

        {/* Filmstrip */}
        <div className="absolute top-0 right-0 w-12 h-full bg-[rgba(101,86,205,0.08)] border-l border-[rgba(101,86,205,0.2)] flex flex-col items-center gap-3 py-5 z-[2]">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="w-6 h-[18px] rounded-sm border border-[rgba(101,86,205,0.4)] bg-black/60 flex-shrink-0" />
          ))}
        </div>

        <div className="relative z-[2]">
          <div className="flex gap-2 flex-wrap mb-8">
            {["Action","Drama","Sci-Fi","Thriller","Comedy","Horror"].map((g) => (
              <span key={g} className="text-[0.7rem] text-white/50 border border-white/10 px-3 py-1 rounded-full tracking-widest uppercase">{g}</span>
            ))}
          </div>
          <div className="text-white text-[5.5rem] leading-none tracking-[6px] font-black mb-2"
            style={{ fontFamily: "'Bebas Neue', cursive" }}>
            Movi<span className="text-[#6556CD]">X</span>
          </div>
          <div className="text-white/45 text-[0.95rem] font-light tracking-[3px] uppercase mb-12">
            Your Cinema Universe
          </div>
          <div className="flex gap-10">
            {[{ number: "10K+", label: "Titles" }, { number: "4K", label: "Quality" }, { number: "50+", label: "Genres" }].map((s) => (
              <div key={s.label} className="flex flex-col">
                <span className="text-[#6556CD] text-[2.2rem] leading-none tracking-[2px]" style={{ fontFamily: "'Bebas Neue', cursive" }}>{s.number}</span>
                <span className="text-white/35 text-[0.72rem] uppercase tracking-[2px] mt-1">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right login panel */}
      <div className="w-full md:w-[480px] min-h-screen bg-[#111118] border-l border-[rgba(101,86,205,0.15)] flex flex-col justify-center px-12 py-14 relative z-[1]">

        <h1 className="text-white text-[2.8rem] leading-none tracking-[3px] mb-1"
          style={{ fontFamily: "'Bebas Neue', cursive" }}>
          Welcome Back
        </h1>
        <p className="text-white/35 text-sm font-light mb-10 tracking-wide">
          Sign in to continue watching
        </p>

        {/* API error */}
        {apiError && (
          <div className="mb-5 p-3 bg-red-500/10 border border-red-500/30 rounded-[10px] text-red-400 text-sm flex items-center gap-2">
            <i className="ri-error-warning-line" /> {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className="mb-5">
            <label className={`block text-[0.7rem] font-medium uppercase tracking-[2px] mb-2 transition-colors duration-300 ${focused === "email" ? "text-[#6556CD]" : "text-white/40"}`}>
              Email Address
            </label>
            <div className="relative flex items-center">
              <i className={`ri-mail-line absolute left-3.5 text-base z-10 transition-colors duration-300 pointer-events-none ${focused === "email" ? "text-[#6556CD]" : "text-white/25"}`} />
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused("")}
                className={`w-full bg-white/[0.04] border rounded-[10px] pl-11 pr-4 py-3.5 text-white text-[0.95rem] font-light outline-none transition-all duration-300 placeholder:text-white/20 focus:border-[rgba(101,86,205,0.6)] focus:bg-[rgba(101,86,205,0.06)] focus:shadow-[0_0_0_3px_rgba(101,86,205,0.1)] ${errors.email ? "border-red-500/50" : "border-white/[0.08]"}`}
              />
            </div>
            {errors.email && (
              <div className="flex items-center gap-1 mt-1.5 text-red-400 text-[0.72rem]">
                <i className="ri-error-warning-line" /> {errors.email}
              </div>
            )}
          </div>

          {/* Password */}
          <div className="mb-2">
            <label className={`block text-[0.7rem] font-medium uppercase tracking-[2px] mb-2 transition-colors duration-300 ${focused === "password" ? "text-[#6556CD]" : "text-white/40"}`}>
              Password
            </label>
            <div className="relative flex items-center">
              <i className={`ri-lock-line absolute left-3.5 text-base z-10 transition-colors duration-300 pointer-events-none ${focused === "password" ? "text-[#6556CD]" : "text-white/25"}`} />
              <input
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                onFocus={() => setFocused("password")}
                onBlur={() => setFocused("")}
                className={`w-full bg-white/[0.04] border rounded-[10px] pl-11 pr-11 py-3.5 text-white text-[0.95rem] font-light outline-none transition-all duration-300 placeholder:text-white/20 focus:border-[rgba(101,86,205,0.6)] focus:bg-[rgba(101,86,205,0.06)] focus:shadow-[0_0_0_3px_rgba(101,86,205,0.1)] ${errors.password ? "border-red-500/50" : "border-white/[0.08]"}`}
              />
              <button
                type="button"
                onClick={() => setShowPass((p) => !p)}
                className="absolute right-3.5 text-white/25 hover:text-white/60 transition-colors duration-300 flex items-center bg-transparent border-none cursor-pointer"
              >
                <i className={showPass ? "ri-eye-off-line" : "ri-eye-line"} />
              </button>
            </div>
            {errors.password && (
              <div className="flex items-center gap-1 mt-1.5 text-red-400 text-[0.72rem]">
                <i className="ri-error-warning-line" /> {errors.password}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="block w-full text-right text-[0.78rem] text-[rgba(101,86,205,0.7)] hover:text-[#6556CD] transition-colors duration-200 mb-8 bg-transparent border-none cursor-pointer"
          >
            Forgot password?
          </button>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6556CD] hover:bg-[#7c6de0] disabled:opacity-70 disabled:cursor-not-allowed text-white rounded-[10px] py-4 flex items-center justify-center gap-2.5 tracking-[4px] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(101,86,205,0.4)] active:translate-y-0 cursor-pointer"
            style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "1.2rem" }}
          >
            {loading ? (
              <>
                <div className="w-[18px] h-[18px] border-2 border-white/30 border-t-white rounded-full"
                  style={{ animation: "spin 0.7s linear infinite" }} />
                Signing In
              </>
            ) : (
              <><i className="ri-play-fill text-lg" /> Sign In</>
            )}
          </button>
        </form>

        <div className="flex items-center gap-3 my-7">
          <div className="flex-1 h-px bg-white/[0.07]" />
          <span className="text-[0.72rem] text-white/25 tracking-[2px] uppercase">or continue with</span>
          <div className="flex-1 h-px bg-white/[0.07]" />
        </div>

        <div className="grid grid-cols-1 gap-2.5 mb-8">
          {socialButtons.map((s) => (
            <button
              key={s.label}
              type="button"
              onClick={s.onClick}
              className="flex items-center justify-center gap-2 py-3 bg-white/[0.04] border border-white/[0.08] rounded-[10px] text-white/60 hover:bg-white/[0.08] hover:border-white/[0.15] hover:text-white hover:-translate-y-px transition-all duration-300 text-sm cursor-pointer"
            >
              <i className={s.icon} style={s.color ? { color: s.color } : {}} />
              {s.label}
            </button>
          ))}
        </div>

        <p className="text-center text-[0.82rem] text-white/30">
          New to Movix?{" "}
          <Link to="/register" className="text-[#6556CD] hover:text-[#8b7ee0] font-medium transition-colors duration-200">
            Create account
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;
