import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearMessages } from "../store/reducers/authSlice";

const InputField = ({
  id, label, type = "text", icon, placeholder,
  value, error, showToggle, showState, onToggle, onChange, focused, setFocused,
}) => (
  <div className="mb-4">
    <label
      className={`block text-[0.68rem] font-medium uppercase tracking-[2px] mb-2 transition-colors duration-300 ${
        focused === id ? "text-[#6556CD]" : "text-white/35"
      }`}
    >
      {label}
    </label>
    <div className="relative flex items-center">
      <i
        className={`${icon} absolute left-3.5 text-base pointer-events-none transition-colors duration-300 ${
          focused === id ? "text-[#6556CD]" : "text-white/20"
        }`}
      />
      <input
        type={showState !== undefined ? (showState ? "text" : type) : type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
        onFocus={() => setFocused(id)}
        onBlur={() => setFocused("")}
        className={`w-full bg-white/[0.04] border rounded-[10px] pl-11 pr-11 py-3 text-white text-sm font-light outline-none transition-all duration-300 placeholder:text-white/15 focus:border-[rgba(101,86,205,0.6)] focus:bg-[rgba(101,86,205,0.06)] focus:shadow-[0_0_0_3px_rgba(101,86,205,0.1)] ${
          error ? "border-red-500/50" : "border-white/[0.08]"
        }`}
      />
      {showToggle && (
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3.5 text-white/25 hover:text-white/60 transition-colors duration-200 bg-transparent border-none cursor-pointer"
        >
          <i className={showState ? "ri-eye-off-line" : "ri-eye-line"} />
        </button>
      )}
    </div>
    {error && (
      <div className="flex items-center gap-1 mt-1.5 text-red-400 text-[0.72rem]">
        <i className="ri-error-warning-line" /> {error}
      </div>
    )}
  </div>
);

const Register = () => {
  const navigate   = useNavigate();
  const dispatch   = useDispatch();
  const { loading, error: apiError, success } = useSelector((state) => state.auth);

  const [step, setStep]           = useState(1);
  const [focused, setFocused]     = useState("");
  const [showPass, setShowPass]   = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", password: "", confirm: "",
    avatar: null, preview: null, genre: [],
  });
  const [errors, setErrors] = useState({});

  // Redirect to login after successful registration
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch(clearMessages());
        navigate("/login");
      }, 1500);
    }
  }, [success, navigate, dispatch]);

  // Cleanup preview object URL
  useEffect(() => {
    return () => {
      if (form.preview) URL.revokeObjectURL(form.preview);
    };
  }, [form.preview]);

  const genres = [
    "Action", "Drama", "Comedy", "Horror",
    "Sci-Fi", "Thriller", "Romance", "Animation",
    "Documentary", "Fantasy",
  ];

  const handleFieldChange = (id, value) => {
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const toggleGenre = (g) => {
    setForm((prev) => ({
      ...prev,
      genre: prev.genre.includes(g)
        ? prev.genre.filter((x) => x !== g)
        : [...prev.genre, g],
    }));
  };

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm((prev) => ({
      ...prev,
      avatar: file,
      preview: URL.createObjectURL(file),
    }));
  };

  const validateStep1 = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.includes("@")) e.email = "Valid email required";
    if (form.password.length < 6) e.password = "Min 6 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords don't match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e = {};
    if (form.genre.length === 0) e.genre = "Please select at least one genre";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) setStep(2);
  };

  const handleSubmit = async () => {
    if (!validateStep2()) return;

    // Build FormData so avatar file + genres can be sent together
    const formData = new FormData();
    formData.append("name",     form.name);
    formData.append("email",    form.email);
    formData.append("password", form.password);
    formData.append("genres",   JSON.stringify(form.genre));
    if (form.avatar) {
      formData.append("avatar", form.avatar);
    }

    dispatch(registerUser(formData));
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0a0f] flex overflow-hidden">

      {/* Left panel */}
      <div className="hidden md:flex w-[420px] min-h-screen bg-[#0d0c18] border-r border-[rgba(101,86,205,0.15)] flex-col justify-between p-14 relative z-10">
        <div>
          <div
            className="text-white text-6xl leading-none tracking-[5px] font-black mb-1"
            style={{ fontFamily: "'Bebas Neue', cursive" }}
          >
            Movie<span className="text-[#6556CD]">X</span>
          </div>
          <div className="text-white/30 text-[0.78rem] tracking-[3px] uppercase mb-10">
            Your Cinema Universe
          </div>

          {/* Step indicators */}
          <div className="flex flex-col">
            {[
              { n: 1, title: "Your Details",  desc: "Name, email & password" },
              { n: 2, title: "Preferences",   desc: "Avatar & favourite genres" },
            ].map((s, idx) => (
              <div key={s.n}>
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-9 h-9 rounded-full border-2 flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all duration-300 ${
                        step > s.n
                          ? "bg-[#6556CD] border-[#6556CD] text-white"
                          : step === s.n
                          ? "border-[#6556CD] text-[#6556CD] shadow-[0_0_0_4px_rgba(101,86,205,0.15)]"
                          : "border-[rgba(101,86,205,0.3)] text-white/30"
                      }`}
                    >
                      {step > s.n ? <i className="ri-check-line text-sm" /> : s.n}
                    </div>
                    {idx < 1 && (
                      <div
                        className={`w-0.5 h-12 my-1 transition-all duration-300 ${
                          step > s.n ? "bg-[rgba(101,86,205,0.6)]" : "bg-[rgba(101,86,205,0.15)]"
                        }`}
                      />
                    )}
                  </div>
                  <div className="pt-1.5">
                    <div
                      className={`text-sm font-medium transition-colors duration-300 ${
                        step > s.n
                          ? "text-[rgba(101,86,205,0.8)]"
                          : step === s.n
                          ? "text-white"
                          : "text-white/25"
                      }`}
                    >
                      {s.title}
                    </div>
                    <div className="text-[0.72rem] text-white/30 mt-0.5 tracking-wide">
                      {s.desc}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative grid */}
        <div className="grid grid-cols-3 gap-1.5 opacity-15 rounded-xl overflow-hidden mt-8">
          {["#6556CD","#3d3480","#4a3d99","#2d2760","#7c6de0","#534ab7","#8b7ee0","#3c3489","#6556CD"].map((c, i) => (
            <div key={i} className="h-[70px] rounded-md" style={{ background: c }} />
          ))}
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex flex-col justify-center items-center px-8 py-12 relative z-10">
        <div className="w-full max-w-[500px]">

          {/* Progress bar */}
          <div className="w-full h-[3px] bg-white/[0.07] rounded-full mb-8 overflow-hidden">
            <div
              className="h-full bg-[#6556CD] rounded-full transition-all duration-500"
              style={{ width: step === 1 ? "50%" : "100%" }}
            />
          </div>

          {/* Success message */}
          {success && (
            <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-[10px] text-green-400 text-sm flex items-center gap-2">
              <i className="ri-check-line" /> {success} Redirecting to login...
            </div>
          )}

          {/* API error */}
          {apiError && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-[10px] text-red-400 text-sm flex items-center gap-2">
              <i className="ri-error-warning-line" /> {apiError}
            </div>
          )}

          {/* ── STEP 1 ── */}
          {step === 1 && (
            <div key="step1">
              <h1
                className="text-white text-[2.6rem] leading-none tracking-[3px] mb-1"
                style={{ fontFamily: "'Bebas Neue', cursive" }}
              >
                Create Account
              </h1>
              <p className="text-white/30 text-sm font-light mb-6">
                Step 1 of 2 — Your details
              </p>

              <InputField id="name"     label="Full Name"        icon="ri-user-line"   placeholder="John Doe"         value={form.name}     error={errors.name}     onChange={handleFieldChange} focused={focused} setFocused={setFocused} />
              <InputField id="email"    label="Email Address"    icon="ri-mail-line"   placeholder="you@example.com"  value={form.email}    error={errors.email}    onChange={handleFieldChange} focused={focused} setFocused={setFocused} />
              <InputField id="password" label="Password"         icon="ri-lock-line"   placeholder="Min 6 characters" value={form.password} error={errors.password} onChange={handleFieldChange} focused={focused} setFocused={setFocused} type="password" showToggle showState={showPass}    onToggle={() => setShowPass((p) => !p)} />
              <InputField id="confirm"  label="Confirm Password" icon="ri-lock-2-line" placeholder="Repeat password"  value={form.confirm}  error={errors.confirm}  onChange={handleFieldChange} focused={focused} setFocused={setFocused} type="password" showToggle showState={showConfirm} onToggle={() => setShowConfirm((p) => !p)} />

              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-white/[0.07]" />
                <span className="text-[0.7rem] text-white/25 tracking-[2px] uppercase">or sign up with</span>
                <div className="flex-1 h-px bg-white/[0.07]" />
              </div>

              <div className="grid grid-cols-2 gap-2.5 mb-5">
                <button type="button" className="flex items-center justify-center gap-2 py-3 bg-white/[0.04] border border-white/[0.08] rounded-[10px] text-white/55 hover:bg-white/[0.08] hover:text-white hover:-translate-y-px transition-all duration-200 text-sm cursor-pointer">
                  <i className="ri-google-fill" style={{ color: "#EA4335" }} /> Google
                </button>
                <button type="button" className="flex items-center justify-center gap-2 py-3 bg-white/[0.04] border border-white/[0.08] rounded-[10px] text-white/55 hover:bg-white/[0.08] hover:text-white hover:-translate-y-px transition-all duration-200 text-sm cursor-pointer">
                  <i className="ri-github-fill" /> GitHub
                </button>
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="w-full bg-[#6556CD] hover:bg-[#7c6de0] text-white rounded-[10px] py-3.5 flex items-center justify-center gap-2 tracking-[3px] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(101,86,205,0.4)] cursor-pointer"
                style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "1.15rem" }}
              >
                Continue <i className="ri-arrow-right-line" />
              </button>

              <p className="text-center text-[0.82rem] text-white/28 mt-5">
                Already have an account?{" "}
                <Link to="/login" className="text-[#6556CD] hover:text-[#8b7ee0] font-medium transition-colors duration-200">
                  Sign In
                </Link>
              </p>
            </div>
          )}

          {/* ── STEP 2 ── */}
          {step === 2 && (
            <div key="step2">
              <h1
                className="text-white text-[2.6rem] leading-none tracking-[3px] mb-1"
                style={{ fontFamily: "'Bebas Neue', cursive" }}
              >
                Almost Done
              </h1>
              <p className="text-white/30 text-sm font-light mb-6">
                Step 2 of 2 — Personalize your experience
              </p>

              {/* Avatar upload */}
              <div className="flex items-center gap-4 mb-6">
                <label
                  htmlFor="avatar-input"
                  className="w-[72px] h-[72px] rounded-full border-2 border-dashed border-[rgba(101,86,205,0.4)] bg-[rgba(101,86,205,0.06)] flex items-center justify-center cursor-pointer overflow-hidden flex-shrink-0 hover:border-[#6556CD] hover:bg-[rgba(101,86,205,0.12)] transition-all duration-300"
                >
                  {form.preview
                    ? <img src={form.preview} alt="avatar" className="w-full h-full object-cover" />
                    : <i className="ri-camera-line text-[1.6rem] text-[rgba(101,86,205,0.5)]" />
                  }
                </label>
                <input id="avatar-input" type="file" accept="image/*" className="hidden" onChange={handleAvatar} />
                <div>
                  <p className="text-white/50 text-sm mb-1">Upload a profile photo</p>
                  <span className="text-white/22 text-[0.7rem]">JPG, PNG or GIF · Max 2MB</span>
                </div>
              </div>

              {/* Genre picker */}
              <p className="text-[0.68rem] font-medium text-white/35 uppercase tracking-[2px] mb-2.5">
                Favourite Genres (pick any)
              </p>
              <div className="flex flex-wrap gap-2 mb-2">
                {genres.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => toggleGenre(g)}
                    className={`text-[0.78rem] px-3.5 py-1.5 rounded-full border cursor-pointer transition-all duration-200 ${
                      form.genre.includes(g)
                        ? "bg-[rgba(101,86,205,0.2)] border-[#6556CD] text-white"
                        : "border-white/10 text-white/40 hover:border-[rgba(101,86,205,0.5)] hover:text-white/70"
                    }`}
                  >
                    {form.genre.includes(g) && <i className="ri-check-line mr-1 text-xs" />}
                    {g}
                  </button>
                ))}
              </div>

              {errors.genre && (
                <div className="flex items-center gap-1 mb-4 text-red-400 text-[0.72rem]">
                  <i className="ri-error-warning-line" /> {errors.genre}
                </div>
              )}

              <div className="flex gap-2.5 mt-5">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1.5 px-5 py-3.5 bg-white/[0.05] border border-white/10 rounded-[10px] text-white/50 hover:bg-white/[0.09] hover:text-white transition-all duration-300 text-sm cursor-pointer"
                >
                  <i className="ri-arrow-left-line" /> Back
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 bg-[#6556CD] hover:bg-[#7c6de0] disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-[10px] py-3.5 flex items-center justify-center gap-2 tracking-[3px] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(101,86,205,0.4)] cursor-pointer"
                  style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "1.15rem" }}
                >
                  {loading ? (
                    <>
                      <div className="w-[18px] h-[18px] border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <><i className="ri-movie-fill" /> Create Account</>
                  )}
                </button>
              </div>

              <p className="text-center text-[0.82rem] text-white/28 mt-5">
                Already have an account?{" "}
                <Link to="/login" className="text-[#6556CD] hover:text-[#8b7ee0] font-medium transition-colors duration-200">
                  Sign In
                </Link>
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Register;
