import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ─────────────────────────────────────────────
// GoogleCallback.jsx
//
// Google redirects the user to /auth/google/callback
// with a ?code=... in the URL.
//
// This component:
//  1. Reads the code from the URL
//  2. Sends it to your backend to exchange for user info
//  3. Saves the user in localStorage
//  4. Redirects to home
// ─────────────────────────────────────────────
 
const GoogleCallback = () => {
  const navigate = useNavigate(); 

  useEffect(() => {
    const handleCallback = async () => {
      // Step 1: Get the ?code=... from the URL
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (!code) {
        // No code means something went wrong — go back to login
        navigate("/login");
        return;
      }

      try {
        // Step 2: Send the code to your backend
        // Your backend exchanges it for a Google access token
        // and returns the user's info
        const response = await fetch("http://localhost:5000/api/auth/google/callback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Google login failed");
        }

        // Step 3: Save user to localStorage (same format as normal login)
        localStorage.setItem("movix_user", JSON.stringify({
          id:    data.id,
          name:  data.name,
          email: data.email,
          role:  data.role,
          avatar: data.avatar_url,
        }));

        // Step 4: Go to homepage
        navigate("/");

      } catch (err) {
        console.error("Google OAuth error:", err.message);
        navigate("/login");
      }
    };

    handleCallback();
  }, [navigate]);

  // Show a loading spinner while processing
  return (
    <div className="min-h-screen w-full bg-[#0a0a0f] flex flex-col items-center justify-center gap-4">
      <div
        className="w-12 h-12 rounded-full border-4 border-white/10 border-t-[#6556CD]"
        style={{ animation: "spin 0.8s linear infinite" }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <p className="text-white/40 text-sm tracking-widest uppercase">
        Signing you in with Google...
      </p>
    </div>
  );
};

export default GoogleCallback;
