import { useState } from "react";
import logo from "./assets/logo.png";

const LOGO_B64 = logo;

const theme = {
  light: {
    mode: "light",
    canvas: "linear-gradient(180deg, #fff8fb 0%, #f7f5ff 45%, #f5f7ff 100%)",
    bg: "#f8f7fb",
    bgSoft: "rgba(255,255,255,0.72)",
    surface: "rgba(255,255,255,0.88)",
    surface2: "#f4eff8",
    surface3: "#f8fbff",
    text: "#1f2333",
    text2: "#5d6479",
    text3: "#8f95a8",
    accent: "#6f63ff",
    accent2: "#ff8fb1",
    accent3: "#7dd3fc",
    accentSoft: "rgba(111,99,255,0.12)",
    border: "rgba(131, 113, 179, 0.12)",
    inputBorder: "rgba(131, 113, 179, 0.18)",
    green: "#24b47e",
    greenSoft: "rgba(36,180,126,0.14)",
    amber: "#f59e0b",
    amberSoft: "rgba(245,158,11,0.14)",
    red: "#ef6b73",
    redSoft: "rgba(239,107,115,0.14)",
    hero: "linear-gradient(155deg, rgba(255,255,255,0.95) 0%, rgba(255,241,247,0.98) 38%, rgba(241,240,255,0.98) 100%)",
    heroStrong: "linear-gradient(145deg, #6f63ff 0%, #9b6bff 46%, #ff8fb1 100%)",
    darkHero: "linear-gradient(145deg, #2e2a68 0%, #5b3fcf 42%, #8c5dff 100%)",
    shadow: "0 18px 44px rgba(172, 151, 214, 0.18)",
    shadowSoft: "0 10px 30px rgba(168, 149, 210, 0.12)",
    glow: "0 18px 45px rgba(111,99,255,0.25)",
    shellShadow: "0 28px 90px rgba(93, 81, 141, 0.18)",
    nav: "rgba(255,255,255,0.78)",
  },
  dark: {
    mode: "dark",
    canvas: "linear-gradient(180deg, #12131c 0%, #151727 48%, #181424 100%)",
    bg: "#171922",
    bgSoft: "rgba(23,25,34,0.78)",
    surface: "rgba(31,34,47,0.8)",
    surface2: "#202433",
    surface3: "#252a3b",
    text: "#f3f4fb",
    text2: "#b4b8ca",
    text3: "#7f859d",
    accent: "#8a7dff",
    accent2: "#ff8ab4",
    accent3: "#68d5ff",
    accentSoft: "rgba(138,125,255,0.16)",
    border: "rgba(255,255,255,0.08)",
    inputBorder: "rgba(255,255,255,0.12)",
    green: "#3fd6a1",
    greenSoft: "rgba(63,214,161,0.16)",
    amber: "#ffb34d",
    amberSoft: "rgba(255,179,77,0.16)",
    red: "#ff8a94",
    redSoft: "rgba(255,138,148,0.16)",
    hero: "linear-gradient(150deg, rgba(39,42,61,0.96) 0%, rgba(48,34,71,0.98) 44%, rgba(24,31,53,0.98) 100%)",
    heroStrong: "linear-gradient(145deg, #2e2a68 0%, #5b3fcf 42%, #8c5dff 100%)",
    darkHero: "linear-gradient(145deg, #24284a 0%, #4939a6 42%, #755cff 100%)",
    shadow: "0 20px 46px rgba(0,0,0,0.34)",
    shadowSoft: "0 12px 28px rgba(0,0,0,0.24)",
    glow: "0 20px 50px rgba(116,99,255,0.22)",
    shellShadow: "0 30px 95px rgba(0,0,0,0.45)",
    nav: "rgba(25,28,39,0.8)",
  },
};

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body, #root { min-height: 100%; }
  body { font-family: 'DM Sans', sans-serif; -webkit-font-smoothing: antialiased; background: #f6f4fb; }
  button, input, textarea, select { font: inherit; }
  button { transition: transform 180ms ease, box-shadow 220ms ease, opacity 220ms ease, background 220ms ease, color 220ms ease; }
  button:active { transform: scale(0.97); }
  input::placeholder, textarea::placeholder { color: rgba(145, 149, 168, 0.9); }
  ::-webkit-scrollbar { display: none; }
  @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.92); } }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes floatOrbA { 0%, 100% { transform: translate3d(0,0,0) scale(1); } 50% { transform: translate3d(18px,-12px,0) scale(1.08); } }
  @keyframes floatOrbB { 0%, 100% { transform: translate3d(0,0,0) scale(1); } 50% { transform: translate3d(-16px,16px,0) scale(0.94); } }
  .screen-enter { animation: fadeUp 420ms cubic-bezier(0.22, 1, 0.36, 1) both; }
  .chip-scroll { -ms-overflow-style: none; scrollbar-width: none; }
  .floating-panel { backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }
`;

const mono = { fontFamily: "'JetBrains Mono', monospace" };
const display = { fontFamily: "'Plus Jakarta Sans', sans-serif" };

// ─── Shared UI ─────────────────────────────────────────────────────────────
function Card({ children, style = {}, t, elevated = false }) {
  return (
    <div className="floating-panel" style={{ background: t.surface, borderRadius: 28, border: `1px solid ${t.border}`, boxShadow: elevated ? `${t.shadow}, ${t.glow}` : t.shadowSoft, ...style }}>
      {children}
    </div>
  );
}

function ProgBar({ pct, color, track }) {
  return (
    <div style={{ height: 8, borderRadius: 999, background: track || "rgba(148,163,184,0.18)", overflow: "hidden", marginTop: 8 }}>
      <div style={{ width: `${pct}%`, height: "100%", borderRadius: 999, background: color, transition: "width 0.7s cubic-bezier(0.22,1,0.36,1)" }} />
    </div>
  );
}

function Badge({ children, color, bg, style = {} }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "6px 12px", borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: "0.03em", ...mono, background: bg, color, ...style }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: color, display: "inline-block" }} />
      {children}
    </span>
  );
}

function SectionLabel({ children, t, action }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, paddingInline: 2 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: t.text3, textTransform: "uppercase", letterSpacing: "0.12em" }}>{children}</div>
      {action ? <div style={{ fontSize: 12, color: t.accent, fontWeight: 700 }}>{action}</div> : null}
    </div>
  );
}

function IconWrap({ children, t, active = false, soft = false, color }) {
  return (
    <div style={{ width: 38, height: 38, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", color: color || (active ? "#fff" : t.text2), background: active ? "linear-gradient(135deg, #7a6cff 0%, #ff91bb 100%)" : soft ? t.surface2 : t.surface, boxShadow: active ? t.glow : "none" }}>
      {children}
    </div>
  );
}

function StatCard({ label, value, sub }) {
  return (
    <div style={{ padding: "14px 14px 12px", borderRadius: 22, background: "rgba(255,255,255,0.16)", backdropFilter: "blur(10px)" }}>
      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.62)", textTransform: "uppercase", letterSpacing: "0.12em" }}>{label}</div>
      <div style={{ fontSize: 23, fontWeight: 800, marginTop: 8, color: "#fff", letterSpacing: "-0.06em", ...mono }}>{value}</div>
      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.72)", marginTop: 5 }}>{sub}</div>
    </div>
  );
}

function TopBar({ label, title, t, right, subtitle }) {
  return (
    <div className="floating-panel" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, padding: "18px 20px 14px", background: t.bgSoft, position: "sticky", top: 0, zIndex: 20, backdropFilter: "blur(16px)" }}>
      <div>
        <div style={{ fontSize: 11, color: t.text3, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 5 }}>{label}</div>
        <div style={{ fontSize: 24, fontWeight: 800, color: t.text, letterSpacing: "-0.04em", ...display }}>{title}</div>
        {subtitle ? <div style={{ fontSize: 13, color: t.text3, marginTop: 4 }}>{subtitle}</div> : null}
      </div>
      {right}
    </div>
  );
}

// ─── Icons ──────────────────────────────────────────────────────────────────
const Icon = {
  Home: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
  Market: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>,
  Jobs: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>,
  Trust: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
  Rewards: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>,
  Sun: () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>,
  Moon: () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" /></svg>,
  Bell: () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>,
  Plus: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>,
  Search: () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>,
  TrendUp: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>,
  TrendDown: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6" /><polyline points="17 18 23 18 23 12" /></svg>,
  Eye: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>,
  EyeOff: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>,
  Back: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>,
  Check: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>,
};

function ThemeToggle({ isDark, toggleTheme, t, floating = false }) {
  return (
    <button onClick={toggleTheme} style={{ width: 42, height: 42, borderRadius: 18, border: `1px solid ${floating ? "rgba(255,255,255,0.16)" : t.border}`, background: floating ? (isDark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.5)") : t.surface, color: floating ? (isDark ? "#fff" : t.text) : t.text2, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: floating ? t.shadowSoft : "none", backdropFilter: "blur(14px)" }}>
      {isDark ? <Icon.Sun /> : <Icon.Moon />}
    </button>
  );
}

// ─── SPLASH SCREEN ──────────────────────────────────────────────────────────
function SplashScreen({ onGetStarted, isDark, toggleTheme, t }) {
  return (
    <div className="screen-enter" style={{ minHeight: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: isDark ? "linear-gradient(160deg, #0d0f1a 0%, #151727 50%, #1a1030 100%)" : "#ffffff", position: "relative", overflow: "hidden", padding: "36px 32px" }}>
      <div style={{ position: "absolute", width: 340, height: 340, borderRadius: "50%", background: isDark ? "radial-gradient(circle, rgba(111,99,255,0.12) 0%, transparent 70%)" : "radial-gradient(circle, rgba(111,99,255,0.07) 0%, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%, -60%)", pointerEvents: "none" }} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 2, width: "100%" }}>
        <img
          src={LOGO_B64}
          alt="NEXA"
          style={{ width: 220, height: 220, objectFit: "contain", filter: isDark ? "brightness(1.2) drop-shadow(0 0 24px rgba(111,99,255,0.35))" : "drop-shadow(0 8px 24px rgba(111,99,255,0.18))", animation: "fadeUp 600ms cubic-bezier(0.22,1,0.36,1) both" }}
        />
      </div>
      <div style={{ width: "100%", position: "relative", zIndex: 2 }}>
        <button onClick={onGetStarted} style={{ width: "100%", padding: "18px 0", background: "linear-gradient(135deg, #7a6cff 0%, #ff91bb 100%)", color: "#fff", border: "none", borderRadius: 22, fontSize: 16, fontWeight: 800, letterSpacing: "-0.02em", cursor: "pointer", boxShadow: "0 20px 40px rgba(131,106,255,0.34)" }}>
          Enter NEXA
        </button>
      </div>
    </div>
  );
}

// ─── LOGIN SCREEN ────────────────────────────────────────────────────────────
function LoginScreen({ onLogin, isDark, toggleTheme, t }) {
  const [tab, setTab] = useState("signin");
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const inputStyle = {
    width: "100%", padding: "15px 16px", borderRadius: 18,
    border: `1px solid ${t.inputBorder}`, background: t.surface3,
    color: t.text, fontSize: 15, outline: "none",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
  };

  return (
    <div className="screen-enter" style={{ minHeight: "100%", background: t.canvas, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: t.mode === "dark" ? "radial-gradient(circle at 18% 14%, rgba(138,125,255,0.22) 0%, transparent 30%)" : "radial-gradient(circle at 18% 14%, rgba(255,143,177,0.18) 0%, transparent 28%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,104,255,0.16) 0%, transparent 72%)", top: -80, right: -40, animation: "floatOrbA 9s ease-in-out infinite", pointerEvents: "none" }} />
      <div style={{ padding: "24px 22px 36px", minHeight: "100%", display: "flex", flexDirection: "column", position: "relative", zIndex: 2 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
          <span style={{ fontSize: 22, fontWeight: 800, color: t.text, letterSpacing: "-0.05em", ...display }}>NEXA</span>
          <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} t={t} />
        </div>
        <div style={{ display: "flex", background: t.surface2, borderRadius: 20, padding: 4, marginBottom: 28 }}>
          {["signin", "signup"].map((v) => (
            <button key={v} onClick={() => setTab(v)} style={{ flex: 1, padding: "11px 0", border: "none", borderRadius: 17, cursor: "pointer", fontSize: 14, fontWeight: 700, background: tab === v ? "linear-gradient(135deg, #7a6cff 0%, #ff91bb 100%)" : "transparent", color: tab === v ? "#fff" : t.text2, boxShadow: tab === v ? "0 10px 24px rgba(122,108,255,0.22)" : "none" }}>
              {v === "signin" ? "Sign In" : "Sign Up"}
            </button>
          ))}
        </div>
        <div style={{ marginBottom: 26 }}>
          <div style={{ fontSize: 26, fontWeight: 800, color: t.text, letterSpacing: "-0.05em", ...display }}>{tab === "signin" ? "Welcome back 👋" : "Join NEXA 🚀"}</div>
          <div style={{ fontSize: 14, color: t.text3, marginTop: 6 }}>{tab === "signin" ? "Sign in to your account to continue." : "Create your account and start contributing."}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
          {tab === "signup" && (
            <div>
              <label style={{ fontSize: 12, fontWeight: 700, color: t.text2, display: "block", marginBottom: 8 }}>Full Name</label>
              <input value={form.name} onChange={e => update("name", e.target.value)} type="text" placeholder="Alex Chen" style={inputStyle} />
            </div>
          )}
          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: t.text2, display: "block", marginBottom: 8 }}>Email Address</label>
            <input value={form.email} onChange={e => update("email", e.target.value)} type="email" placeholder="you@example.com" style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: t.text2, display: "block", marginBottom: 8 }}>Password</label>
            <div style={{ position: "relative" }}>
              <input value={form.password} onChange={e => update("password", e.target.value)} type={showPass ? "text" : "password"} placeholder="••••••••" style={{ ...inputStyle, paddingRight: 48 }} />
              <button onClick={() => setShowPass(s => !s)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", width: 34, height: 34, borderRadius: 14, background: "transparent", border: "none", cursor: "pointer", color: t.text3, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {showPass ? <Icon.EyeOff /> : <Icon.Eye />}
              </button>
            </div>
            {tab === "signin" && <div style={{ textAlign: "right", marginTop: 8 }}><span style={{ fontSize: 12, color: t.accent, fontWeight: 700, cursor: "pointer" }}>Forgot password?</span></div>}
          </div>
        </div>
        <button onClick={onLogin} style={{ width: "100%", padding: "17px 0", background: "linear-gradient(135deg, #7a6cff 0%, #ff91bb 100%)", color: "#fff", border: "none", borderRadius: 22, fontSize: 16, fontWeight: 800, cursor: "pointer", boxShadow: "0 18px 34px rgba(123,108,255,0.24)", marginBottom: 20 }}>
          {tab === "signin" ? "Sign In" : "Create Account"}
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ flex: 1, height: 1, background: t.border }} />
          <span style={{ fontSize: 11, color: t.text3, fontWeight: 600, letterSpacing: "0.08em" }}>OR CONTINUE WITH</span>
          <div style={{ flex: 1, height: 1, background: t.border }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
          {[["Google", "M18.77 7.46H14.5v2.67h2.47c-.09 1.47-.9 2.51-2.47 2.51-1.51 0-2.78-1.2-2.78-2.87 0-1.67 1.27-2.87 2.78-2.87.74 0 1.36.27 1.83.7l2.01-2.01C16.83 4.44 15.76 4 14.5 4 11.24 4 8.61 6.55 8.61 9.77s2.63 5.77 5.89 5.77c3.25 0 5.41-2.28 5.41-5.49 0-.37-.04-.74-.14-1.09z"], ["GitHub", "M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48l-.01-1.69c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85.004 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .27.18.58.69.48A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10z"]].map(([name, path]) => (
            <button key={name} style={{ padding: "13px 0", borderRadius: 18, border: `1px solid ${t.border}`, background: t.surface, color: t.text2, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill={t.text2}><path d={path} /></svg>
              {name}
            </button>
          ))}
        </div>
        <div style={{ textAlign: "center", fontSize: 13, color: t.text3 }}>
          {tab === "signin" ? <>No account? <span style={{ color: t.accent, fontWeight: 700, cursor: "pointer" }} onClick={() => setTab("signup")}>Sign up free</span></> : <>Already have an account? <span style={{ color: t.accent, fontWeight: 700, cursor: "pointer" }} onClick={() => setTab("signin")}>Sign in</span></>}
        </div>
      </div>
    </div>
  );
}

// ─── NEW TASK SCREEN ─────────────────────────────────────────────────────────
function NewTaskScreen({ t, onBack, onSubmit }) {
  const [form, setForm] = useState({ name: "", type: "ML Training", compute: "GPU", node: "Auto", priority: "Balanced", duration: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);
  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const selectStyle = {
    width: "100%", padding: "14px 16px", borderRadius: 18,
    border: `1px solid ${t.inputBorder}`, background: t.surface3,
    color: t.text, fontSize: 14, outline: "none", appearance: "none",
  };
  const inputStyle = { ...selectStyle };

  const handleSubmit = async () => {
    if (!form.name) { alert("Task name required"); return; }
    if (!form.duration) { alert("Duration required"); return; }

    try {
      const taskPayload = {
        task_name: form.name,
        task_type: form.type,
        compute_type: form.compute,
        node_preference: form.node,
        priority: form.priority,
        duration: form.duration,
        notes: form.notes,
        code: `print("Running ${form.type}")`
      };

      console.log("Sending task:", taskPayload);

      const response = await fetch("http://172.18.235.117:8000/create_task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskPayload)
      });

      const data = await response.json();
      console.log("Task created:", data);

      setSubmitted(true);
      setTimeout(() => {
        onSubmit({
          id: data.task_id || Date.now(),
          name: form.name,
          type: form.type,
          status: "Queued",
          progress: 0
        });
      }, 1200);
    } catch (error) {
      console.error("Task failed:", error);
      // Fallback: still add the task locally if API fails
      setSubmitted(true);
      setTimeout(() => {
        onSubmit({
          id: Date.now(),
          name: form.name,
          type: form.type,
          status: "Queued",
          progress: 0
        });
      }, 1200);
    }
  };

  if (submitted) {
    return (
      <div className="screen-enter" style={{ minHeight: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: t.canvas, padding: 32, gap: 20 }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg, #7a6cff, #ff91bb)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 20px 44px rgba(122,108,255,0.3)" }}>
          <Icon.Check />
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: t.text, ...display }}>Task Queued!</div>
          <div style={{ fontSize: 14, color: t.text3, marginTop: 8 }}>Your job is being scheduled on the NEXA network.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="screen-enter" style={{ minHeight: "100%", background: t.canvas }}>
      <div className="floating-panel" style={{ display: "flex", alignItems: "center", gap: 12, padding: "18px 20px 14px", background: t.bgSoft, position: "sticky", top: 0, zIndex: 20 }}>
        <button onClick={onBack} style={{ width: 40, height: 40, borderRadius: 16, border: `1px solid ${t.border}`, background: t.surface, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: t.text2 }}>
          <Icon.Back />
        </button>
        <div>
          <div style={{ fontSize: 11, color: t.text3, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em" }}>Tasks</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: t.text, letterSpacing: "-0.04em", ...display }}>New Task</div>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <Badge color={t.accent} bg={t.accentSoft}>Draft</Badge>
        </div>
      </div>

      <div style={{ padding: "16px 20px 36px", display: "flex", flexDirection: "column", gap: 20 }}>
        <Card t={t} style={{ padding: 20 }}>
          <SectionLabel t={t}>Task Details</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 700, color: t.text2, display: "block", marginBottom: 8 }}>Task Name</label>
              <input value={form.name} onChange={e => update("name", e.target.value)} type="text" placeholder="e.g. Diffusion Model Training v3" style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 700, color: t.text2, display: "block", marginBottom: 8 }}>Task Type</label>
              <select value={form.type} onChange={e => update("type", e.target.value)} style={selectStyle}>
                {["ML Training", "Fine-tuning", "Inference", "Data Processing", "Research / Simulation", "Other"].map(v => <option key={v}>{v}</option>)}
              </select>
            </div>
          </div>
        </Card>

        <Card t={t} style={{ padding: 20 }}>
          <SectionLabel t={t}>Compute Configuration</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
            {[["Compute Type", "compute", ["GPU", "CPU", "CPU + GPU", "TPU"]], ["Node Preference", "node", ["Auto", "titan-node-04", "gpu-workstation-12", "edge-node-22"]]].map(([label, key, options]) => (
              <div key={key}>
                <label style={{ fontSize: 11, fontWeight: 700, color: t.text2, display: "block", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</label>
                <select value={form[key]} onChange={e => update(key, e.target.value)} style={{ ...selectStyle, padding: "12px 12px" }}>
                  {options.map(v => <option key={v}>{v}</option>)}
                </select>
              </div>
            ))}
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: t.text2, display: "block", marginBottom: 8 }}>Estimated Duration</label>
            <input value={form.duration} onChange={e => update("duration", e.target.value)} type="text" placeholder="e.g. 4 hours, 30 minutes" style={inputStyle} />
          </div>
        </Card>

        <Card t={t} style={{ padding: 20 }}>
          <SectionLabel t={t}>Priority</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
            {[["Low", t.green, t.greenSoft], ["Balanced", t.accent, t.accentSoft], ["High", t.accent2, "rgba(255,143,177,0.14)"]].map(([level, color, bg]) => (
              <button key={level} onClick={() => update("priority", level)} style={{ padding: "14px 0", borderRadius: 20, border: `1.5px solid ${form.priority === level ? color : t.border}`, background: form.priority === level ? bg : t.surface3, color: form.priority === level ? color : t.text3, fontWeight: 700, fontSize: 13, cursor: "pointer", boxShadow: form.priority === level ? `0 8px 20px ${color}33` : "none" }}>{level}</button>
            ))}
          </div>
        </Card>

        <Card t={t} style={{ padding: 20 }}>
          <SectionLabel t={t}>Additional Notes</SectionLabel>
          <textarea value={form.notes} onChange={e => update("notes", e.target.value)} placeholder="Any specific requirements, dataset paths, environment variables..." rows={4} style={{ ...inputStyle, resize: "none", lineHeight: 1.6, paddingTop: 14 }} />
        </Card>

        <button onClick={handleSubmit} style={{ width: "100%", padding: "18px 0", background: "linear-gradient(135deg, #7a6cff 0%, #ff91bb 100%)", color: "#fff", border: "none", borderRadius: 22, fontSize: 16, fontWeight: 800, cursor: "pointer", boxShadow: "0 20px 40px rgba(131,106,255,0.30)", marginTop: 4 }}>
          Submit Task to Network
        </button>
        <button onClick={onBack} style={{ width: "100%", padding: "14px 0", background: "transparent", color: t.text3, border: `1px solid ${t.border}`, borderRadius: 22, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
          Cancel
        </button>
      </div>
    </div>
  );
}

// ─── DASHBOARD ───────────────────────────────────────────────────────────────
function DashboardScreen({ t, isDark, toggleTheme, navigate }) {
  const resources = [
    { name: "CPU load", val: "68%", pct: 68, color: "linear-gradient(90deg, #7a6cff, #8d7dff)" },
    { name: "GPU R", val: "82%", pct: 82, color: "linear-gradient(90deg, #ff8fb1, #9b6bff)" },
    { name: "Memory", val: "12.4 / 32 GB", pct: 39, color: "linear-gradient(90deg, #58d3ff, #58c0c7)" },
  ];
  return (
    <div className="screen-enter">
      <TopBar label="Home" title="Welcome, Anwita" t={t} right={<div style={{ display: "flex", gap: 8 }}><ThemeToggle isDark={isDark} toggleTheme={toggleTheme} t={t} /><button style={{ width: 42, height: 42, borderRadius: 18, border: `1px solid ${t.border}`, background: t.surface, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: t.text2 }}><Icon.Bell /></button></div>} />
      <div style={{ padding: "6px 16px 28px" }}>
        <Card t={t} elevated style={{ padding: 20, background: t.darkHero, color: "#fff", marginBottom: 16, overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 16% 18%, rgba(255,255,255,0.18) 0%, transparent 26%), radial-gradient(circle at 84% 70%, rgba(255,143,177,0.2) 0%, transparent 28%)" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
              <div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.72)", textTransform: "uppercase", letterSpacing: "0.12em" }}>NEXA network</div>
                <div style={{ fontSize: 24, fontWeight: 800, marginTop: 8, letterSpacing: "-0.05em", ...display }}>Human-friendly compute sharing</div>
              </div>
              <Badge color="#bbf7d0" bg="rgba(255,255,255,0.14)">Live</Badge>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
              <StatCard label="Peers" value="20+" sub="+12 today" />
              <StatCard label="Active" value="12+" sub="healthy nodes" />
              <StatCard label="Jobs" value="3+" sub="in progress" />
            </div>
          </div>
        </Card>

        <div style={{ marginBottom: 16 }}>
          <SectionLabel t={t} action="Live">Resource Usage</SectionLabel>
          <Card t={t} style={{ padding: 18 }}>
            {resources.map((item, index) => (
              <div key={item.name} style={{ marginBottom: index < resources.length - 1 ? 18 : 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{item.name}</span>
                  <span style={{ fontSize: 12, color: t.text2, ...mono }}>{item.val}</span>
                </div>
                <ProgBar pct={item.pct} color={item.color} />
              </div>
            ))}
          </Card>
        </div>

        <div style={{ marginBottom: 16 }}>
          <SectionLabel t={t}>Quick Actions</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <button onClick={() => navigate("newtask")} style={{ padding: "18px 16px", borderRadius: 24, border: "none", background: "linear-gradient(145deg, #7a6cff 0%, #ff91bb 100%)", color: "#fff", cursor: "pointer", textAlign: "left", boxShadow: "0 18px 34px rgba(123,108,255,0.24)" }}>
              <div style={{ fontSize: 14, fontWeight: 800 }}>Share Resources</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.78)", marginTop: 4 }}>Start contributing now</div>
            </button>
            <button onClick={() => navigate("market")} style={{ padding: "18px 16px", borderRadius: 24, border: `1px solid ${t.border}`, background: t.surface, color: t.text, cursor: "pointer", textAlign: "left", boxShadow: t.shadowSoft }}>
              <div style={{ fontSize: 14, fontWeight: 800 }}>Request Compute</div>
              <div style={{ fontSize: 12, color: t.text3, marginTop: 4 }}>Browse high-trust nodes</div>
            </button>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: 12 }}>
          <Card t={t} style={{ padding: 18 }}>
            <SectionLabel t={t}>Trust Snapshot</SectionLabel>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 66, height: 66, borderRadius: "50%", background: `conic-gradient(${t.green} 0% 87%, rgba(148,163,184,0.18) 87% 100%)`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", flexShrink: 0 }}>
                <div style={{ position: "absolute", inset: 7, borderRadius: "50%", background: t.surface }} />
                <span style={{ position: "relative", zIndex: 1, fontSize: 16, fontWeight: 800, color: t.text, ...mono }}>87</span>
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: t.text }}>Verified Provider</div>
                <div style={{ fontSize: 12, color: t.text3, marginTop: 5 }}>98.2% completion · 312 hrs uptime.</div>
              </div>
            </div>
          </Card>
          <Card t={t} style={{ padding: 18, background: t.mode === "dark" ? "rgba(104,213,255,0.08)" : "rgba(125,211,252,0.12)" }}>
            <div style={{ fontSize: 12, color: t.text3, textTransform: "uppercase", letterSpacing: "0.12em" }}>Rewards Today</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: t.text, marginTop: 8, letterSpacing: "-0.06em", ...mono }}>+120</div>
            <div style={{ fontSize: 12, color: t.text2, marginTop: 6 }}>Credits from active tasks</div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ─── MARKET ──────────────────────────────────────────────────────────────────
function MarketScreen({ t, navigate }) {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "GPU", "CPU", "Available", "High Trust"];
  const machines = [
    { name: "LAPTOP-0I4EAMMN", ip: "172.18.234.163", cpu: "8C", gpu: "None", ram: "64GB", status: "free", trust: 94, rating: 4.9 },
  ];
  return (
    <div className="screen-enter">
      <TopBar label="Marketplace" title="Browse Nodes" subtitle="Find the right blend of trust, cost, and raw compute." t={t} right={<button style={{ width: 42, height: 42, borderRadius: 18, border: `1px solid ${t.border}`, background: t.surface, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: t.text2 }}><Icon.Search /></button>} />
      <div style={{ padding: "6px 16px 28px" }}>
        <Card t={t} style={{ padding: 16, marginBottom: 14 }}>
          <div className="chip-scroll" style={{ display: "flex", gap: 10, overflowX: "auto" }}>
            {filters.map((item) => (
              <button key={item} onClick={() => setFilter(item)} style={{ padding: "10px 16px", borderRadius: 999, flexShrink: 0, border: "none", background: filter === item ? "linear-gradient(135deg, #7a6cff 0%, #ff91bb 100%)" : t.surface3, color: filter === item ? "#fff" : t.text2, cursor: "pointer", fontSize: 13, fontWeight: 700 }}>{item}</button>
            ))}
          </div>
        </Card>
        {machines.map((machine) => {
          const online = machine.status === "free";
          return (
            <Card key={machine.name} t={t} elevated style={{ padding: 18, marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: t.text }}>{machine.name}</div>
                  <div style={{ fontSize: 12, color: t.text3, marginTop: 4, ...mono }}>{machine.ip}</div>
                </div>
                <Badge color={online ? t.green : t.amber} bg={online ? t.greenSoft : t.amberSoft}>{online ? "Online" : "Busy"}</Badge>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
                {[["CPU", machine.cpu], ["GPU", machine.gpu], ["RAM", machine.ram]].map(([label, value]) => (
                  <div key={label} style={{ padding: "14px 12px", borderRadius: 20, background: t.surface3 }}>
                    <div style={{ fontSize: 10, color: t.text3, textTransform: "uppercase", letterSpacing: "0.12em" }}>{label}</div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: t.text, marginTop: 8, ...mono }}>{value}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 13, color: t.text2 }}>Rating {machine.rating} · Trust {machine.trust}</div>
                <button disabled={!online} style={{ minWidth: 94, padding: "11px 18px", borderRadius: 18, border: "none", background: online ? "linear-gradient(135deg, #7a6cff 0%, #ff91bb 100%)" : t.surface2, color: online ? "#fff" : t.text3, fontSize: 13, fontWeight: 800, cursor: online ? "pointer" : "default" }}>
                  {online ? "Book" : "Busy"}
                </button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ─── JOBS ────────────────────────────────────────────────────────────────────
function JobsScreen({ t, onNewTask, tasks }) {
  const statusColors = {
    Running: [t.accent, t.accentSoft],
    Queued: [t.amber, t.amberSoft],
    Done: [t.green, t.greenSoft]
  };

  return (
    <div className="screen-enter">
      <TopBar
        label="Tasks"
        title="Submission Flow"
        subtitle="Create, queue, and monitor jobs with less friction."
        t={t}
        right={
          <button onClick={onNewTask} style={{ display: "flex", alignItems: "center", gap: 8, padding: "11px 16px", borderRadius: 18, background: "linear-gradient(135deg, #7a6cff 0%, #ff91bb 100%)", color: "#fff", border: "none", fontSize: 13, fontWeight: 800, cursor: "pointer", boxShadow: "0 14px 28px rgba(122,108,255,0.18)" }}>
            <Icon.Plus /> New Task
          </button>
        }
      />
      <div style={{ padding: "6px 16px 28px" }}>
        {/* Composer Card */}
        <Card t={t} elevated style={{ padding: 18, marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 12, color: t.text3, textTransform: "uppercase", letterSpacing: "0.12em" }}>Task composer</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: t.text, marginTop: 6 }}>Ready to submit new compute work</div>
            </div>
            <Badge color={t.accent} bg={t.accentSoft}>Draft</Badge>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
            {[["Model type", "Diffusion"], ["Runtime", "~4 hours"], ["Compute", "A100 cluster"], ["Priority", "Balanced"]].map(([label, value]) => (
              <div key={label} style={{ padding: "14px 12px", borderRadius: 18, background: t.surface3 }}>
                <div style={{ fontSize: 10, color: t.text3, textTransform: "uppercase", letterSpacing: "0.12em" }}>{label}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginTop: 8 }}>{value}</div>
              </div>
            ))}
          </div>
          <button onClick={onNewTask} style={{ width: "100%", padding: "14px 0", borderRadius: 18, border: "none", background: "linear-gradient(135deg, #7a6cff 0%, #ff91bb 100%)", color: "#fff", fontWeight: 800, cursor: "pointer" }}>
            Create New Task
          </button>
        </Card>

        {/* Tasks List */}
        {tasks.length === 0 ? (
          <div style={{ textAlign: "center", padding: "32px 0", color: t.text3, fontSize: 14 }}>
            No tasks yet. Create your first task above!
          </div>
        ) : (
          tasks.map(task => {
            const [color, bg] = statusColors[task.status] || [t.accent, t.accentSoft];
            return (
              <Card key={task.id} t={t} style={{ padding: 18, marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: t.text }}>{task.name}</div>
                    <div style={{ fontSize: 12, color: t.text3, marginTop: 3 }}>{task.type}</div>
                  </div>
                  <Badge color={color} bg={bg}>{task.status}</Badge>
                </div>
                <ProgBar pct={task.progress} color="linear-gradient(90deg,#7a6cff,#9b6bff)" />
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}

// ─── TRUST ────────────────────────────────────────────────────────────────────
function TrustScreen({ t }) {
  const metrics = [
    { label: "Task Completion Rate", sub: "Last 90 days", val: "98.2%", pct: 98, color: "linear-gradient(90deg, #7a6cff, #9b6bff)" },
    { label: "Uptime", sub: "Monthly average", val: "99.6%", pct: 99, color: "linear-gradient(90deg, #7a6cff, #9b6bff)" },
    { label: "Execution Accuracy", sub: "Output correctness", val: "94.5%", pct: 94, color: "linear-gradient(90deg, #ff8fb1, #9b6bff)" },
    { label: "Response Time", sub: "Avg. job acceptance", val: "1.4s", pct: 88, color: "linear-gradient(90deg, #ffb34d, #ffcf70)" },
  ];
  const leaders = [
    { rank: 1, initials: "AS", name: "Anushka Sarkar", score: 98, color: t.amber, bg: "rgba(245,158,11,0.14)" },
  ];
  return (
    <div className="screen-enter">
      <TopBar label="Trust" title="Reliability Score" subtitle="Your reputation layer turns uptime into opportunity." t={t} />
      <div style={{ padding: "6px 16px 28px" }}>
        <Card t={t} elevated style={{ padding: 22, background: "linear-gradient(145deg, #3b2b8c 0%, #5b3fcf 44%, #8b62ff 100%)", color: "#fff", marginBottom: 16, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 16% 18%, rgba(255,255,255,0.14) 0%, transparent 28%), radial-gradient(circle at 82% 76%, rgba(255,145,185,0.18) 0%, transparent 26%)" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 18, position: "relative", zIndex: 1 }}>
            <div style={{ width: 88, height: 88, borderRadius: "50%", flexShrink: 0, background: "conic-gradient(#7df0d2 0% 87%, rgba(255,255,255,0.18) 87% 100%)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              <div style={{ position: "absolute", inset: 9, borderRadius: "50%", background: "linear-gradient(145deg, #4b35a8, #6f53e6)" }} />
              <span style={{ position: "relative", zIndex: 1, fontSize: 24, fontWeight: 800, color: "#fff", ...mono }}>87</span>
            </div>
            <div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.72)", textTransform: "uppercase", letterSpacing: "0.12em" }}>Your score</div>
              <div style={{ fontSize: 32, fontWeight: 800, marginTop: 6, letterSpacing: "-0.06em", ...mono }}>87 / 100</div>
              <div style={{ fontSize: 13, color: "#f3ddff", marginTop: 8, fontWeight: 700 }}>Verified Node Provider</div>
            </div>
          </div>
        </Card>

        <div style={{ marginBottom: 16 }}>
          <SectionLabel t={t}>Metrics Breakdown</SectionLabel>
          <Card t={t} style={{ padding: 18 }}>
            {metrics.map((metric, index) => (
              <div key={metric.label} style={{ marginBottom: index < metrics.length - 1 ? 18 : 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{metric.label}</div>
                    <div style={{ fontSize: 12, color: t.text3, marginTop: 4 }}>{metric.sub}</div>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: t.text, ...mono }}>{metric.val}</div>
                </div>
                <ProgBar pct={metric.pct} color={metric.color} />
              </div>
            ))}
          </Card>
        </div>

        <SectionLabel t={t}>Leaderboard</SectionLabel>
        <Card t={t} style={{ padding: 18 }}>
          {leaders.map((leader, index) => (
            <div key={leader.rank} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderTop: index > 0 ? `1px solid ${t.border}` : "none" }}>
              <div style={{ width: 24, textAlign: "center", fontSize: 13, color: t.text3, fontWeight: 800, ...mono }}>{leader.rank}</div>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: leader.bg, color: leader.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, flexShrink: 0 }}>{leader.initials}</div>
              <div style={{ flex: 1, fontSize: 14, fontWeight: 700, color: t.text }}>{leader.name}</div>
              <div style={{ fontSize: 12, color: t.text2, ...mono }}>{leader.score} pts</div>
            </div>
          ))}
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 12px", background: t.accentSoft, borderRadius: 20, marginTop: 10 }}>
            <div style={{ width: 24, textAlign: "center", fontSize: 13, color: t.accent, fontWeight: 800, ...mono }}>7</div>
            <div style={{ width: 40, height: 40, borderRadius: "50%", border: `2px solid ${t.accent}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: t.accent, flexShrink: 0 }}>AP</div>
            <div style={{ flex: 1, fontSize: 14, fontWeight: 800, color: t.text }}>Anwita Padhi (you)</div>
            <div style={{ fontSize: 12, color: t.accent, ...mono }}>87 pts</div>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─── REWARDS ──────────────────────────────────────────────────────────────────
function RewardsScreen({ t }) {
  const stats = [["This Week", "20", "+18%"], ["This Month", "90", "+24%"], ["GPU Hours", "12h", "contributed"], ["Jobs Served", "5", "lifetime"]];
  const txns = [
    { label: "GPU Task: ML Model", time: "Today, 2:40", amount: "+120", positive: true },
  ];
  return (
    <div className="screen-enter">
      <TopBar label="Rewards" title="Credits" subtitle="A calmer, clearer view of what your contribution is earning." t={t} />
      <div style={{ padding: "6px 16px 28px" }}>
        <Card t={t} elevated style={{ padding: 22, marginBottom: 16, background: "linear-gradient(145deg, #31258a 0%, #5b3fcf 44%, #9a72ff 100%)", color: "#fff", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 18% 18%, rgba(255,255,255,0.16) 0%, transparent 28%), radial-gradient(circle at 88% 78%, rgba(255,145,185,0.22) 0%, transparent 26%)" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "0.12em" }}>Available credits</div>
            <div style={{ fontSize: 42, fontWeight: 800, marginTop: 8, letterSpacing: "-0.07em", ...mono }}>30</div>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.78)", marginTop: 6 }}>Approx 5400 INR</div>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button style={{ flex: 1, padding: 13, borderRadius: 18, border: "none", background: "linear-gradient(135deg, #7a6cff 0%, #ff91bb 100%)", color: "#fff", fontSize: 13, fontWeight: 800, cursor: "pointer" }}>Cash Out</button>
              <button style={{ flex: 1, padding: 13, borderRadius: 18, background: "linear-gradient(135deg, #7a6cff 0%, #ff91bb 100%)", color: "#fff", border: "none", fontSize: 13, fontWeight: 800, cursor: "pointer" }}>Redeem</button>
            </div>
          </div>
        </Card>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
          {stats.map(([label, value, change]) => (
            <Card key={label} t={t} style={{ padding: 16, borderRadius: 24 }}>
              <div style={{ fontSize: 10, color: t.text3, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 8 }}>{label}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: t.text, letterSpacing: "-0.05em", ...mono }}>{value}</div>
              <div style={{ fontSize: 11, color: change.startsWith("+") ? t.green : t.text3, marginTop: 5, fontWeight: 700 }}>{change}</div>
            </Card>
          ))}
        </div>
        <SectionLabel t={t}>Recent Transactions</SectionLabel>
        <Card t={t} style={{ padding: 18 }}>
          {txns.map((txn, index) => (
            <div key={txn.label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderTop: index > 0 ? `1px solid ${t.border}` : "none" }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: txn.positive ? t.greenSoft : t.redSoft, color: txn.positive ? t.green : t.red, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {txn.positive ? <Icon.TrendUp /> : <Icon.TrendDown />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{txn.label}</div>
                <div style={{ fontSize: 11, color: t.text3, marginTop: 4, ...mono }}>{txn.time}</div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 800, color: txn.positive ? t.green : t.red, ...mono }}>{txn.amount}</div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ─── BOTTOM NAV ──────────────────────────────────────────────────────────────
function BottomNav({ active, navigate, t }) {
  const tabs = [
    { id: "dashboard", label: "Home", IconCmp: Icon.Home },
    { id: "market", label: "Market", IconCmp: Icon.Market },
    { id: "jobs", label: "Tasks", IconCmp: Icon.Jobs },
    { id: "trust", label: "Trust", IconCmp: Icon.Trust },
    { id: "rewards", label: "Rewards", IconCmp: Icon.Rewards },
  ];
  return (
    <div style={{ padding: "10px 14px 16px", background: "transparent" }}>
      <nav className="floating-panel" style={{ minHeight: 78, background: t.nav, border: `1px solid ${t.border}`, borderRadius: 28, display: "flex", alignItems: "stretch", padding: "8px 6px", boxShadow: t.shadow }}>
        {tabs.map(({ id, label, IconCmp }) => {
          const selected = active === id;
          return (
            <button key={id} onClick={() => navigate(id)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, cursor: "pointer", border: "none", background: "transparent", color: selected ? t.accent : t.text3 }}>
              <IconWrap t={t} active={selected}><IconCmp /></IconWrap>
              <span style={{ fontSize: 10, fontWeight: selected ? 800 : 700 }}>{label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [page, setPage] = useState("splash"); // splash | login | app
  const [screen, setScreen] = useState("dashboard");
  const [tasks, setTasks] = useState([]);
  const t = isDark ? theme.dark : theme.light;
  const toggleTheme = () => setIsDark(v => !v);

  // ✅ Single unified navigate — handles all screens including "newtask"
  const navigate = (screenName) => {
    setScreen(screenName);
  };

  const handleAddTask = (newTask) => {
    setTasks(prev => [...prev, newTask]);
    navigate("jobs");
  };

  // ✅ screenMap now includes "newtask" — no showNewTask boolean needed
  const screenMap = {
    dashboard: (
      <DashboardScreen
        t={t}
        isDark={isDark}
        toggleTheme={toggleTheme}
        navigate={navigate}
      />
    ),
    market: (
      <MarketScreen t={t} navigate={navigate} />
    ),
    jobs: (
      <JobsScreen
        t={t}
        tasks={tasks}
        onNewTask={() => navigate("newtask")}
      />
    ),
    // ✅ THIS WAS MISSING — now added
    newtask: (
      <NewTaskScreen
        t={t}
        onBack={() => navigate("jobs")}
        onSubmit={handleAddTask}
      />
    ),
    trust: <TrustScreen t={t} />,
    rewards: <RewardsScreen t={t} />,
  };

  // Hide bottom nav on newtask screen
  const hideNav = screen === "newtask";

  return (
    <>
      <style>{globalStyles}</style>
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(180deg, #f6f7fb 0%, #eceef7 100%)", padding: 20 }}>
        <div style={{ width: "100%", maxWidth: 448, padding: 10, borderRadius: 48, background: "#232534", boxShadow: "0 24px 80px rgba(29,31,44,0.28)", position: "relative" }}>
          {/* Phone notch */}
          <div style={{ position: "absolute", top: 16, left: "50%", transform: "translateX(-50%)", width: 126, height: 28, borderRadius: 999, background: "#181a24", zIndex: 5 }} />
          <div style={{ width: "100%", height: "100vh", maxHeight: 932, display: "flex", flexDirection: "column", overflow: "hidden", background: t.bg, borderRadius: 38, border: "1px solid rgba(255,255,255,0.06)", position: "relative", transition: "background 0.35s ease" }}>
            {/* Ambient bg */}
            <div style={{ position: "absolute", inset: 0, background: t.mode === "dark" ? "radial-gradient(circle at 14% 12%, rgba(138,125,255,0.12) 0%, transparent 26%)" : "radial-gradient(circle at 14% 12%, rgba(255,143,177,0.14) 0%, transparent 26%)", pointerEvents: "none" }} />

            {page === "splash" && (
              <div style={{ flex: 1, overflowY: "auto" }}>
                <SplashScreen onGetStarted={() => setPage("login")} isDark={isDark} toggleTheme={toggleTheme} t={t} />
              </div>
            )}

            {page === "login" && (
              <div style={{ flex: 1, overflowY: "auto" }}>
                <LoginScreen onLogin={() => setPage("app")} isDark={isDark} toggleTheme={toggleTheme} t={t} />
              </div>
            )}

            {page === "app" && (
              <>
                <div style={{ flex: 1, overflowY: "auto", position: "relative", zIndex: 1 }}>
                  {screenMap[screen] || screenMap["dashboard"]}
                </div>
                {/* ✅ Hide bottom nav on newtask screen */}
                {!hideNav && (
                  <div style={{ position: "relative", zIndex: 2 }}>
                    <BottomNav active={screen} navigate={navigate} t={t} />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}