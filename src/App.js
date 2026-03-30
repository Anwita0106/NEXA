import { useState } from "react";

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
    inputBorder: "rgba(131, 113, 179, 0.16)",
    green: "#24b47e",
    greenSoft: "rgba(36,180,126,0.14)",
    amber: "#f59e0b",
    amberSoft: "rgba(245,158,11,0.14)",
    red: "#ef6b73",
    redSoft: "rgba(239,107,115,0.14)",
    hero:
      "linear-gradient(155deg, rgba(255,255,255,0.95) 0%, rgba(255,241,247,0.98) 38%, rgba(241,240,255,0.98) 100%)",
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
    inputBorder: "rgba(255,255,255,0.1)",
    green: "#3fd6a1",
    greenSoft: "rgba(63,214,161,0.16)",
    amber: "#ffb34d",
    amberSoft: "rgba(255,179,77,0.16)",
    red: "#ff8a94",
    redSoft: "rgba(255,138,148,0.16)",
    hero:
      "linear-gradient(150deg, rgba(39,42,61,0.96) 0%, rgba(48,34,71,0.98) 44%, rgba(24,31,53,0.98) 100%)",
    heroStrong: "linear-gradient(145deg, #2e2a68 0%, #5b3fcf 42%, #8c5dff 100%)",
    darkHero: "linear-gradient(145deg, #24284a 0%, #4939a6 42%, #755cff 100%)",
    shadow: "0 20px 46px rgba(0, 0, 0, 0.34)",
    shadowSoft: "0 12px 28px rgba(0, 0, 0, 0.24)",
    glow: "0 20px 50px rgba(116, 99, 255, 0.22)",
    shellShadow: "0 30px 95px rgba(0, 0, 0, 0.45)",
    nav: "rgba(25,28,39,0.8)",
  },
};

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body, #root { min-height: 100%; }
  body {
    font-family: 'DM Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #f6f4fb;
  }
  button, input { font: inherit; }
  button { transition: transform 180ms ease, box-shadow 220ms ease, opacity 220ms ease, background 220ms ease, color 220ms ease; }
  button:active { transform: scale(0.98); }
  input::placeholder { color: rgba(145, 149, 168, 0.9); }
  ::-webkit-scrollbar { display: none; }

  @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.92); } }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes floatOrbA { 0%, 100% { transform: translate3d(0, 0, 0) scale(1); } 50% { transform: translate3d(18px, -12px, 0) scale(1.08); } }
  @keyframes floatOrbB { 0%, 100% { transform: translate3d(0, 0, 0) scale(1); } 50% { transform: translate3d(-16px, 16px, 0) scale(0.94); } }

  .screen-enter { animation: fadeUp 420ms cubic-bezier(0.22, 1, 0.36, 1) both; }
  .chip-scroll { -ms-overflow-style: none; scrollbar-width: none; }
  .floating-panel { backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }
`;

const mono = { fontFamily: "'JetBrains Mono', monospace" };
const display = { fontFamily: "'Plus Jakarta Sans', sans-serif" };

function Card({ children, style = {}, t, elevated = false }) {
  return (
    <div
      className="floating-panel"
      style={{
        background: t.surface,
        borderRadius: 28,
        border: `1px solid ${t.border}`,
        boxShadow: elevated ? `${t.shadow}, ${t.glow}` : t.shadowSoft,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function ProgBar({ pct, color, track }) {
  return (
    <div style={{ height: 8, borderRadius: 999, background: track || "rgba(148, 163, 184, 0.18)", overflow: "hidden", marginTop: 8 }}>
      <div style={{ width: `${pct}%`, height: "100%", borderRadius: 999, background: color, transition: "width 0.7s cubic-bezier(0.22, 1, 0.36, 1)" }} />
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
};

function NexaLogo({ size = 42, glow = false }) {
  return (
    <div style={{ width: size, height: size, borderRadius: size * 0.34, background: "linear-gradient(145deg, #7568ff 0%, #a463ff 45%, #ff90b7 100%)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: glow ? "0 18px 44px rgba(132, 112, 255, 0.34)" : "0 8px 20px rgba(132,112,255,0.16)", flexShrink: 0 }}>
      <svg width={size * 0.56} height={size * 0.56} viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="9" height="9" rx="2.6" fill="rgba(255,255,255,0.94)" />
        <rect x="13" y="2" width="9" height="9" rx="2.6" fill="rgba(255,255,255,0.52)" />
        <rect x="2" y="13" width="9" height="9" rx="2.6" fill="rgba(255,255,255,0.52)" />
        <rect x="13" y="13" width="9" height="9" rx="2.6" fill="rgba(255,255,255,0.94)" />
      </svg>
    </div>
  );
}

function ThemeToggle({ isDark, toggleTheme, t, floating = false }) {
  return (
    <button onClick={toggleTheme} style={{ width: 42, height: 42, borderRadius: 18, border: `1px solid ${floating ? "rgba(255,255,255,0.16)" : t.border}`, background: floating ? (isDark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.5)") : t.surface, color: floating ? (isDark ? "#fff" : t.text) : t.text2, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: floating ? t.shadowSoft : "none", backdropFilter: "blur(14px)" }}>
      {isDark ? <Icon.Sun /> : <Icon.Moon />}
    </button>
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

function StatCard({ label, value, sub }) {
  return (
    <div style={{ padding: "14px 14px 12px", borderRadius: 22, background: "rgba(255,255,255,0.16)", backdropFilter: "blur(10px)" }}>
      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.62)", textTransform: "uppercase", letterSpacing: "0.12em" }}>{label}</div>
      <div style={{ fontSize: 23, fontWeight: 800, marginTop: 8, color: "#fff", letterSpacing: "-0.06em", ...mono }}>{value}</div>
      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.72)", marginTop: 5 }}>{sub}</div>
    </div>
  );
}

function InputField({ label, type = "text", placeholder, showToggle, showPass, setShowPass, t }) {
  return (
    <div>
      <label style={{ fontSize: 12, fontWeight: 700, color: t.text2, display: "block", marginBottom: 8, letterSpacing: "0.02em" }}>{label}</label>
      <div style={{ position: "relative" }}>
        <input type={showToggle ? (showPass ? "text" : "password") : type} placeholder={placeholder} style={{ width: "100%", padding: showToggle ? "15px 46px 15px 16px" : "15px 16px", borderRadius: 18, border: `1px solid ${t.inputBorder}`, background: t.surface3, color: t.text, fontSize: 15, outline: "none", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)" }} />
        {showToggle ? (
          <button onClick={() => setShowPass((s) => !s)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", width: 34, height: 34, borderRadius: 14, background: "transparent", border: "none", cursor: "pointer", color: t.text3, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {showPass ? <Icon.EyeOff /> : <Icon.Eye />}
          </button>
        ) : null}
      </div>
    </div>
  );
}

function SplashScreen({ onGetStarted, isDark, toggleTheme, t }) {
  return (
    <div className="screen-enter" style={{ minHeight: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", background: t.hero, position: "relative", overflow: "hidden", padding: "22px 26px 32px" }}>
      <div style={{ position: "absolute", inset: 0, background: t.mode === "dark" ? "radial-gradient(circle at 18% 14%, rgba(138,125,255,0.22) 0%, transparent 30%), radial-gradient(circle at 82% 78%, rgba(255,138,180,0.18) 0%, transparent 26%)" : "radial-gradient(circle at 18% 14%, rgba(255,143,177,0.22) 0%, transparent 28%), radial-gradient(circle at 82% 78%, rgba(111,99,255,0.16) 0%, transparent 28%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 290, height: 290, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,104,255,0.18) 0%, transparent 72%)", top: -90, right: -50, animation: "floatOrbA 9s ease-in-out infinite", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 240, height: 240, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,145,185,0.16) 0%, transparent 72%)", bottom: 50, left: -70, animation: "floatOrbB 10s ease-in-out infinite", pointerEvents: "none" }} />
      <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 2 }}>
        <Badge color={t.accent} bg={t.accentSoft} style={{ padding: "8px 14px" }}>NEXA mobile</Badge>
        <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} t={t} floating />
      </div>
      <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "center", position: "relative", zIndex: 2 }}>
        <div style={{ width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}><NexaLogo size={96} glow /></div>
          <div style={{ textAlign: "center", marginBottom: 18 }}>
            <div style={{ fontSize: 54, fontWeight: 800, color: t.text, letterSpacing: "-0.07em", lineHeight: 1, ...display }}>NEXA</div>
            <div style={{ fontSize: 16, color: t.text2, lineHeight: 1.7, maxWidth: 280, margin: "14px auto 0" }}>Decentralized compute sharing designed to feel effortless for people who need power now.</div>
          </div>
          <Card t={t} elevated style={{ padding: 18, background: t.mode === "dark" ? "rgba(29,32,46,0.7)" : "rgba(255,255,255,0.72)", marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <div>
                <div style={{ fontSize: 12, color: t.text3, textTransform: "uppercase", letterSpacing: "0.1em" }}>Live network</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: t.text, marginTop: 4 }}>Sharing compute at human scale</div>
              </div>
              <Badge color={t.green} bg={t.greenSoft}>Online</Badge>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
              {[["Nodes", "2,847", "ready"], ["Countries", "48", "connected"], ["Jobs", "348", "running"]].map(([label, value, sub]) => (
                <div key={label} style={{ padding: "14px 12px", borderRadius: 20, background: t.surface3 }}>
                  <div style={{ fontSize: 10, color: t.text3, textTransform: "uppercase", letterSpacing: "0.12em" }}>{label}</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: t.text, marginTop: 8, ...mono }}>{value}</div>
                  <div style={{ fontSize: 11, color: t.text3, marginTop: 4 }}>{sub}</div>
                </div>
              ))}
            </div>
          </Card>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            {[["Instant GPU access", t.accent], ["Trusted peer network", t.accent2], ["Soft rewards flow", t.green]].map(([label, color]) => (
              <div key={label} style={{ padding: "8px 14px", borderRadius: 999, background: t.surface, boxShadow: t.shadowSoft, color: t.text2, fontSize: 12, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: color, animation: "pulse 2s infinite" }} />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ width: "100%", position: "relative", zIndex: 2 }}>
        <button onClick={onGetStarted} style={{ width: "100%", padding: "18px 0", background: "linear-gradient(135deg, #7a6cff 0%, #ff91bb 100%)", color: "#fff", border: "none", borderRadius: 22, fontSize: 16, fontWeight: 800, letterSpacing: "-0.02em", cursor: "pointer", boxShadow: "0 20px 40px rgba(131, 106, 255, 0.34)" }}>Enter NEXA</button>
        <div style={{ textAlign: "center", marginTop: 14, fontSize: 12, color: t.text3 }}>Connect your GPU, submit work, and grow trust without friction.</div>
      </div>
    </div>
  );
}

function LoginScreen({ onLogin, t }) {
  return (
    <div className="screen-enter" style={{ minHeight: "100%", background: t.canvas, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: t.mode === "dark" ? "radial-gradient(circle at 18% 14%, rgba(138,125,255,0.22) 0%, transparent 30%), radial-gradient(circle at 82% 78%, rgba(255,138,180,0.18) 0%, transparent 26%)" : "radial-gradient(circle at 18% 14%, rgba(255,143,177,0.18) 0%, transparent 28%), radial-gradient(circle at 82% 78%, rgba(111,99,255,0.12) 0%, transparent 28%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,104,255,0.16) 0%, transparent 72%)", top: -80, right: -40, animation: "floatOrbA 9s ease-in-out infinite", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,145,185,0.12) 0%, transparent 72%)", bottom: 70, left: -50, animation: "floatOrbB 10s ease-in-out infinite", pointerEvents: "none" }} />
      <div style={{ padding: "24px 22px 30px", minHeight: "100%", display: "flex", flexDirection: "column", position: "relative", zIndex: 2 }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: "100%", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28, minHeight: "68vh", transform: "translateY(18px)" }}>
            <NexaLogo size={104} glow />
            <div style={{ fontSize: 58, fontWeight: 800, color: t.text, letterSpacing: "-0.08em", lineHeight: 1, ...display }}>NEXA</div>
            <button onClick={onLogin} style={{ width: "100%", maxWidth: 240, padding: "18px 0", background: "linear-gradient(135deg, #7a6cff 0%, #ff91bb 100%)", color: "#fff", border: "none", borderRadius: 22, fontSize: 16, fontWeight: 800, cursor: "pointer", boxShadow: "0 18px 34px rgba(123, 108, 255, 0.24)" }}>Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
}
function DashboardScreen({ t, isDark, toggleTheme, navigate }) {
  const resources = [
    { name: "CPU load", val: "68%", pct: 68, color: "linear-gradient(90deg, #7a6cff, #8d7dff)" },
    { name: "GPU - RTX 3080", val: "82%", pct: 82, color: "linear-gradient(90deg, #ff8fb1, #9b6bff)" },
    { name: "Memory", val: "12.4 / 32 GB", pct: 39, color: "linear-gradient(90deg, #58d3ff, #58c0c7)" },
  ];

  return (
    <div className="screen-enter">
      <TopBar label="Dashboard" title="Welcome Alex" t={t} right={<div style={{ display: "flex", gap: 8, alignItems: "center" }}><ThemeToggle isDark={isDark} toggleTheme={toggleTheme} t={t} /><button style={{ width: 42, height: 42, borderRadius: 18, border: `1px solid ${t.border}`, background: t.surface, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: t.text2 }}><Icon.Bell /></button></div>} />
      <div style={{ padding: "6px 16px 28px" }}>
        <Card t={t} elevated style={{ padding: 20, background: t.darkHero, color: "#fff", marginBottom: 16, overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 16% 18%, rgba(255,255,255,0.18) 0%, transparent 26%), radial-gradient(circle at 84% 70%, rgba(255,143,177,0.2) 0%, transparent 28%)" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}><div><div style={{ fontSize: 11, color: "rgba(255,255,255,0.72)", textTransform: "uppercase", letterSpacing: "0.12em" }}>NEXA network</div><div style={{ fontSize: 26, fontWeight: 800, marginTop: 8, letterSpacing: "-0.05em", ...display }}>Human-friendly compute sharing</div></div><Badge color="#bbf7d0" bg="rgba(255,255,255,0.14)">Live</Badge></div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}><StatCard label="Peers" value="2,847" sub="+12 today" /><StatCard label="Active" value="1,204" sub="healthy nodes" /><StatCard label="Jobs" value="348" sub="in progress" /></div>
          </div>
        </Card>
        <div style={{ marginBottom: 16 }}><SectionLabel t={t} action="Live">Resource Usage</SectionLabel><Card t={t} style={{ padding: 18 }}>{resources.map((item, index) => <div key={item.name} style={{ marginBottom: index < resources.length - 1 ? 18 : 0 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{item.name}</span><span style={{ fontSize: 12, color: t.text2, ...mono }}>{item.val}</span></div><ProgBar pct={item.pct} color={item.color} /></div>)}</Card></div>
        <div style={{ marginBottom: 16 }}><SectionLabel t={t}>Quick Actions</SectionLabel><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}><button onClick={() => navigate("jobs")} style={{ padding: "18px 16px", borderRadius: 24, border: "none", background: "linear-gradient(145deg, #7a6cff 0%, #ff91bb 100%)", color: "#fff", cursor: "pointer", textAlign: "left", boxShadow: "0 18px 34px rgba(123,108,255,0.24)" }}><div style={{ fontSize: 14, fontWeight: 800 }}>Share Resources</div><div style={{ fontSize: 12, color: "rgba(255,255,255,0.78)", marginTop: 4 }}>Start contributing now</div></button><button onClick={() => navigate("market")} style={{ padding: "18px 16px", borderRadius: 24, border: `1px solid ${t.border}`, background: t.surface, color: t.text, cursor: "pointer", textAlign: "left", boxShadow: t.shadowSoft }}><div style={{ fontSize: 14, fontWeight: 800 }}>Request Compute</div><div style={{ fontSize: 12, color: t.text3, marginTop: 4 }}>Browse high-trust nodes</div></button></div></div>
        <div style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: 12 }}><Card t={t} style={{ padding: 18 }}><SectionLabel t={t}>Trust Snapshot</SectionLabel><div style={{ display: "flex", alignItems: "center", gap: 14 }}><div style={{ width: 66, height: 66, borderRadius: "50%", background: `conic-gradient(${t.green} 0% 87%, rgba(148,163,184,0.18) 87% 100%)`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", flexShrink: 0 }}><div style={{ position: "absolute", inset: 7, borderRadius: "50%", background: t.surface }} /><span style={{ position: "relative", zIndex: 1, fontSize: 16, fontWeight: 800, color: t.text, ...mono }}>87</span></div><div><div style={{ fontSize: 15, fontWeight: 700, color: t.text }}>Verified Provider</div><div style={{ fontSize: 12, color: t.text3, marginTop: 5 }}>98.2% completion and 312 hours uptime.</div></div></div></Card><Card t={t} style={{ padding: 18, background: t.mode === "dark" ? "rgba(104,213,255,0.08)" : "rgba(125,211,252,0.12)" }}><div style={{ fontSize: 12, color: t.text3, textTransform: "uppercase", letterSpacing: "0.12em" }}>Rewards Today</div><div style={{ fontSize: 32, fontWeight: 800, color: t.text, marginTop: 8, letterSpacing: "-0.06em", ...mono }}>+120</div><div style={{ fontSize: 12, color: t.text2, marginTop: 6 }}>Credits from active tasks</div></Card></div>
      </div>
    </div>
  );
}

function MarketScreen({ t }) {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "GPU", "CPU", "Available", "High Trust"];
  const machines = [
    { name: "titan-node-04", owner: "@research_lab_berlin", cpu: "64c", gpu: "A100", ram: "256GB", status: "Online", trust: 94, rating: 4.9 },
    { name: "gpu-workstation-12", owner: "@alex_ml", cpu: "16c", gpu: "RTX 4090", ram: "64GB", status: "Online", trust: 88, rating: 4.7 },
    { name: "cpu-cluster-07", owner: "@datacentre_sg", cpu: "128c", gpu: "None", ram: "512GB", status: "Busy", trust: 91, rating: 4.8 },
    { name: "edge-node-22", owner: "@priya_dev", cpu: "8c", gpu: "RTX 3070", ram: "32GB", status: "Online", trust: 79, rating: 4.5 },
  ];
  return (
    <div className="screen-enter">
      <TopBar label="Marketplace" title="Browse Nodes" subtitle="Find the right blend of trust, cost, and raw compute." t={t} right={<button style={{ width: 42, height: 42, borderRadius: 18, border: `1px solid ${t.border}`, background: t.surface, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: t.text2 }}><Icon.Search /></button>} />
      <div style={{ padding: "6px 16px 28px" }}>
        <Card t={t} style={{ padding: 16, marginBottom: 14, background: t.mode === "dark" ? "rgba(138,125,255,0.12)" : "rgba(255,255,255,0.84)" }}><div className="chip-scroll" style={{ display: "flex", gap: 10, overflowX: "auto" }}>{filters.map((item) => <button key={item} onClick={() => setFilter(item)} style={{ padding: "10px 16px", borderRadius: 999, flexShrink: 0, border: "none", background: filter === item ? "linear-gradient(135deg, #7a6cff 0%, #ff91bb 100%)" : t.surface3, color: filter === item ? "#fff" : t.text2, cursor: "pointer", fontSize: 13, fontWeight: 700, boxShadow: filter === item ? "0 14px 28px rgba(122,108,255,0.22)" : "none" }}>{item}</button>)}</div></Card>
        {machines.map((machine) => { const online = machine.status === "Online"; return <Card key={machine.name} t={t} elevated style={{ padding: 18, marginBottom: 14 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 14 }}><div><div style={{ fontSize: 16, fontWeight: 800, color: t.text }}>{machine.name}</div><div style={{ fontSize: 12, color: t.text3, marginTop: 4, ...mono }}>{machine.owner}</div></div><Badge color={online ? t.green : t.amber} bg={online ? t.greenSoft : t.amberSoft}>{machine.status}</Badge></div><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>{[["CPU", machine.cpu], ["GPU", machine.gpu], ["RAM", machine.ram]].map(([label, value]) => <div key={label} style={{ padding: "14px 12px", borderRadius: 20, background: t.surface3 }}><div style={{ fontSize: 10, color: t.text3, textTransform: "uppercase", letterSpacing: "0.12em" }}>{label}</div><div style={{ fontSize: 13, fontWeight: 800, color: t.text, marginTop: 8, ...mono }}>{value}</div></div>)}</div><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}><div><div style={{ fontSize: 13, color: t.text2 }}>Rating {machine.rating} - Trust {machine.trust}</div><div style={{ fontSize: 11, color: t.text3, marginTop: 4 }}>Smooth booking flow for production and experiments.</div></div><button disabled={!online} style={{ minWidth: 94, padding: "11px 18px", borderRadius: 18, border: "none", background: online ? "linear-gradient(135deg, #7a6cff 0%, #ff91bb 100%)" : t.surface2, color: online ? "#fff" : t.text3, fontSize: 13, fontWeight: 800, cursor: online ? "pointer" : "default", boxShadow: online ? "0 14px 28px rgba(122,108,255,0.18)" : "none" }}>{online ? "Book" : "Busy"}</button></div></Card>; })}
      </div>
    </div>
  );
}
function JobsScreen({ t }) {
  const sections = [
    { label: "Running", jobs: [
      { name: "Diffusion Model Training", type: "ML Training - GPU", node: "titan-node-04", runtime: "2h 14m", status: "Running", pct: 64, color: "linear-gradient(90deg, #7a6cff, #9b6bff)" },
      { name: "Protein Fold Simulation", type: "Research - CPU Cluster", node: "cpu-cluster-07", runtime: "5h 02m", status: "Running", pct: 31, color: "linear-gradient(90deg, #ff8fb1, #9b6bff)" },
    ]},
    { label: "Queued", jobs: [
      { name: "LLM Fine-tuning Batch", type: "NLP - GPU", node: "Pending", runtime: "~18 min", status: "Queued", pct: null, color: "linear-gradient(90deg, #ffb34d, #ffd66e)" },
    ]},
    { label: "Completed", jobs: [
      { name: "Image Classifier v2", type: "CV Training - GPU", node: "gpu-ws-12", runtime: "3h 44m", status: "Done", pct: 100, color: "linear-gradient(90deg, #22c55e, #6ee7b7)" },
    ]},
  ];
  const statusColors = { Running: [t.accent, t.accentSoft], Queued: [t.amber, t.amberSoft], Done: [t.green, t.greenSoft] };
  return (
    <div className="screen-enter">
      <TopBar label="Tasks" title="Submission Flow" subtitle="Create, queue, and monitor jobs with less friction." t={t} right={<button style={{ display: "flex", alignItems: "center", gap: 8, padding: "11px 16px", borderRadius: 18, background: "linear-gradient(135deg, #7a6cff 0%, #ff91bb 100%)", color: "#fff", border: "none", fontSize: 13, fontWeight: 800, cursor: "pointer", boxShadow: "0 14px 28px rgba(122,108,255,0.18)" }}><Icon.Plus /> New Task</button>} />
      <div style={{ padding: "6px 16px 28px" }}>
        <Card t={t} elevated style={{ padding: 18, background: t.mode === "dark" ? "rgba(138,125,255,0.12)" : "rgba(255,255,255,0.88)", marginBottom: 16 }}><div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 14 }}><div><div style={{ fontSize: 12, color: t.text3, textTransform: "uppercase", letterSpacing: "0.12em" }}>Task composer</div><div style={{ fontSize: 18, fontWeight: 800, color: t.text, marginTop: 6 }}>Ready to submit new compute work</div></div><Badge color={t.accent} bg={t.accentSoft}>Draft</Badge></div><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>{[["Model type", "Diffusion"], ["Runtime", "~4 hours"], ["Compute", "A100 cluster"], ["Priority", "Balanced"]].map(([label, value]) => <div key={label} style={{ padding: "14px 12px", borderRadius: 18, background: t.surface3 }}><div style={{ fontSize: 10, color: t.text3, textTransform: "uppercase", letterSpacing: "0.12em" }}>{label}</div><div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginTop: 8 }}>{value}</div></div>)}</div><button style={{ width: "100%", padding: "14px 0", borderRadius: 18, border: "none", background: "linear-gradient(135deg, #7a6cff 0%, #ff91bb 100%)", color: "#fff", fontWeight: 800, cursor: "pointer" }}>Continue Draft</button></Card>
        {sections.map(({ label, jobs }) => <div key={label} style={{ marginBottom: 16 }}><SectionLabel t={t}>{label}</SectionLabel>{jobs.map((job) => { const [statusColor, statusBg] = statusColors[job.status]; return <Card key={job.name} t={t} style={{ padding: 18, marginBottom: 12 }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 14 }}><div><div style={{ fontSize: 15, fontWeight: 800, color: t.text }}>{job.name}</div><div style={{ fontSize: 12, color: t.text3, marginTop: 4, ...mono }}>{job.type}</div></div><Badge color={statusColor} bg={statusBg}>{job.status}</Badge></div><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: job.pct !== null ? 14 : 0 }}>{[["Node", job.node], ["Runtime", job.runtime]].map(([key, value]) => <div key={key} style={{ padding: "12px 12px", borderRadius: 18, background: t.surface3 }}><div style={{ fontSize: 10, color: t.text3, textTransform: "uppercase", letterSpacing: "0.12em" }}>{key}</div><div style={{ fontSize: 13, fontWeight: 700, color: t.text, marginTop: 7 }}>{value}</div></div>)}</div>{job.pct !== null ? <><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}><span style={{ fontSize: 12, color: t.text3 }}>Progress</span><span style={{ fontSize: 12, color: t.text2, ...mono }}>{job.pct}%</span></div><ProgBar pct={job.pct} color={job.color} /></> : null}</Card>; })}</div>)}
      </div>
    </div>
  );
}

function TrustScreen({ t }) {
  const metrics = [
    { label: "Task Completion Rate", sub: "Last 90 days", val: "98.2%", pct: 98, color: "linear-gradient(90deg, #7a6cff, #9b6bff)" },
    { label: "Uptime", sub: "Monthly average", val: "99.6%", pct: 99, color: "linear-gradient(90deg, #7a6cff, #9b6bff)" },
    { label: "Execution Accuracy", sub: "Output correctness", val: "94.5%", pct: 94, color: "linear-gradient(90deg, #ff8fb1, #9b6bff)" },
    { label: "Response Time", sub: "Avg. job acceptance", val: "1.4s", pct: 88, color: "linear-gradient(90deg, #ffb34d, #ffcf70)" },
  ];
  const leaders = [
    { rank: 1, initials: "RK", name: "ram_krishna_ml", score: 98, color: t.amber, bg: "rgba(245,158,11,0.14)" },
    { rank: 2, initials: "ZW", name: "zara_workstation", score: 95, color: t.accent2, bg: "rgba(255,138,180,0.14)" },
    { rank: 3, initials: "PM", name: "priya_ml_nodes", score: 92, color: t.accent, bg: "rgba(122,108,255,0.12)" },
  ];
  return (
    <div className="screen-enter">
      <TopBar label="Trust" title="Reliability Score" subtitle="Your reputation layer turns uptime into opportunity." t={t} />
      <div style={{ padding: "6px 16px 28px" }}>
        <Card t={t} elevated style={{ padding: 22, background: "linear-gradient(145deg, #3b2b8c 0%, #5b3fcf 44%, #8b62ff 100%)", color: "#fff", marginBottom: 16, position: "relative", overflow: "hidden" }}><div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 16% 18%, rgba(255,255,255,0.14) 0%, transparent 28%), radial-gradient(circle at 82% 76%, rgba(255,145,185,0.18) 0%, transparent 26%)" }} /><div style={{ display: "flex", alignItems: "center", gap: 18, position: "relative", zIndex: 1 }}><div style={{ width: 88, height: 88, borderRadius: "50%", flexShrink: 0, background: "conic-gradient(#7df0d2 0% 87%, rgba(255,255,255,0.18) 87% 100%)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}><div style={{ position: "absolute", inset: 9, borderRadius: "50%", background: "linear-gradient(145deg, #4b35a8, #6f53e6)" }} /><span style={{ position: "relative", zIndex: 1, fontSize: 24, fontWeight: 800, color: "#fff", ...mono }}>87</span></div><div><div style={{ fontSize: 11, color: "rgba(255,255,255,0.72)", textTransform: "uppercase", letterSpacing: "0.12em" }}>Your score</div><div style={{ fontSize: 32, fontWeight: 800, marginTop: 6, letterSpacing: "-0.06em", ...mono }}>87 / 100</div><div style={{ fontSize: 13, color: "#f3ddff", marginTop: 8, fontWeight: 700 }}>Verified Node Provider</div></div></div></Card>
        <div style={{ marginBottom: 16 }}><SectionLabel t={t}>Metrics Breakdown</SectionLabel><Card t={t} style={{ padding: 18 }}>{metrics.map((metric, index) => <div key={metric.label} style={{ marginBottom: index < metrics.length - 1 ? 18 : 0 }}><div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}><div><div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{metric.label}</div><div style={{ fontSize: 12, color: t.text3, marginTop: 4 }}>{metric.sub}</div></div><div style={{ fontSize: 13, fontWeight: 800, color: t.text, ...mono }}>{metric.val}</div></div><ProgBar pct={metric.pct} color={metric.color} /></div>)}</Card></div>
        <SectionLabel t={t}>Leaderboard</SectionLabel>
        <Card t={t} style={{ padding: 18 }}>{leaders.map((leader, index) => <div key={leader.rank} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderTop: index > 0 ? `1px solid ${t.border}` : "none" }}><div style={{ width: 24, textAlign: "center", fontSize: 13, color: t.text3, fontWeight: 800, ...mono }}>{leader.rank}</div><div style={{ width: 40, height: 40, borderRadius: "50%", background: leader.bg, color: leader.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, flexShrink: 0 }}>{leader.initials}</div><div style={{ flex: 1, fontSize: 14, fontWeight: 700, color: t.text }}>{leader.name}</div><div style={{ fontSize: 12, color: t.text2, ...mono }}>{leader.score} pts</div></div>)}<div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 12px", background: t.accentSoft, borderRadius: 20, marginTop: 10 }}><div style={{ width: 24, textAlign: "center", fontSize: 13, color: t.accent, fontWeight: 800, ...mono }}>7</div><div style={{ width: 40, height: 40, borderRadius: "50%", border: `2px solid ${t.accent}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: t.accent, flexShrink: 0 }}>AC</div><div style={{ flex: 1, fontSize: 14, fontWeight: 800, color: t.text }}>alex_chen (you)</div><div style={{ fontSize: 12, color: t.accent, ...mono }}>87 pts</div></div></Card>
      </div>
    </div>
  );
}
function RewardsScreen({ t }) {
  const stats = [["This Week", "240", "+18%"], ["This Month", "980", "+24%"], ["GPU Hours", "312h", "contributed"], ["Jobs Served", "61", "lifetime"]];
  const txns = [
    { label: "GPU Task: Diffusion Model", time: "Today, 14:22", amount: "+120", positive: true },
    { label: "CPU Task: Data Pipeline", time: "Yesterday, 09:14", amount: "+55", positive: true },
    { label: "Redeemed for Compute", time: "Mar 28, 11:05", amount: "-200", positive: false },
  ];
  return (
    <div className="screen-enter">
      <TopBar label="Rewards" title="Credits" subtitle="A calmer, clearer view of what your contribution is earning." t={t} />
      <div style={{ padding: "6px 16px 28px" }}>
        <Card t={t} elevated style={{ padding: 22, marginBottom: 16, background: "linear-gradient(145deg, #31258a 0%, #5b3fcf 44%, #9a72ff 100%)", color: "#fff", position: "relative", overflow: "hidden" }}><div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 18% 18%, rgba(255,255,255,0.16) 0%, transparent 28%), radial-gradient(circle at 88% 78%, rgba(255,145,185,0.22) 0%, transparent 26%)" }} /><div style={{ position: "relative", zIndex: 1 }}><div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "0.12em" }}>Available credits</div><div style={{ fontSize: 42, fontWeight: 800, marginTop: 8, letterSpacing: "-0.07em", ...mono }}>2,840</div><div style={{ fontSize: 14, color: "rgba(255,255,255,0.78)", marginTop: 6 }}>Approx. $28.40 USD</div><div style={{ display: "flex", gap: 10, marginTop: 20 }}><button style={{ flex: 1, padding: 13, borderRadius: 18, border: "none", background: "linear-gradient(135deg, #7a6cff 0%, #ff91bb 100%)", color: "#fff", fontSize: 13, fontWeight: 800, cursor: "pointer" }}>Cash Out</button><button style={{ flex: 1, padding: 13, borderRadius: 18, background: "linear-gradient(135deg, #7a6cff 0%, #ff91bb 100%)", color: "#fff", border: "none", fontSize: 13, fontWeight: 800, cursor: "pointer" }}>Redeem</button></div></div></Card>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>{stats.map(([label, value, change]) => <Card key={label} t={t} style={{ padding: 16, borderRadius: 24 }}><div style={{ fontSize: 10, color: t.text3, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 8 }}>{label}</div><div style={{ fontSize: 24, fontWeight: 800, color: t.text, letterSpacing: "-0.05em", ...mono }}>{value}</div><div style={{ fontSize: 11, color: change.startsWith("+") ? t.green : t.text3, marginTop: 5, fontWeight: 700 }}>{change}</div></Card>)}</div>
        <SectionLabel t={t}>Recent Transactions</SectionLabel>
        <Card t={t} style={{ padding: 18 }}>{txns.map((txn, index) => <div key={txn.label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderTop: index > 0 ? `1px solid ${t.border}` : "none" }}><div style={{ width: 40, height: 40, borderRadius: "50%", background: txn.positive ? t.greenSoft : t.redSoft, color: txn.positive ? t.green : t.red, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{txn.positive ? <Icon.TrendUp /> : <Icon.TrendDown />}</div><div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{txn.label}</div><div style={{ fontSize: 11, color: t.text3, marginTop: 4, ...mono }}>{txn.time}</div></div><div style={{ fontSize: 14, fontWeight: 800, color: txn.positive ? t.green : t.red, ...mono }}>{txn.amount}</div></div>)}</Card>
      </div>
    </div>
  );
}

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
          return <button key={id} onClick={() => navigate(id)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, cursor: "pointer", border: "none", background: "transparent", color: selected ? t.accent : t.text3, position: "relative" }}><IconWrap t={t} active={selected}><IconCmp /></IconWrap><span style={{ fontSize: 10, fontWeight: selected ? 800 : 700 }}>{label}</span></button>;
        })}
      </nav>
    </div>
  );
}

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [page, setPage] = useState("login");
  const [screen, setScreen] = useState("dashboard");
  const t = isDark ? theme.dark : theme.light;
  const toggleTheme = () => setIsDark((value) => !value);
  const screenMap = {
    dashboard: <DashboardScreen t={t} isDark={isDark} toggleTheme={toggleTheme} navigate={setScreen} />,
    market: <MarketScreen t={t} />,
    jobs: <JobsScreen t={t} />,
    trust: <TrustScreen t={t} />,
    rewards: <RewardsScreen t={t} />,
  };
  return (
    <>
      <style>{globalStyles}</style>
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(180deg, #f6f7fb 0%, #eceef7 100%)", padding: 20 }}>
        <div style={{ width: "100%", maxWidth: 448, padding: 10, borderRadius: 48, background: "#232534", boxShadow: "0 24px 80px rgba(29, 31, 44, 0.28)", position: "relative" }}>
          <div style={{ position: "absolute", top: 16, left: "50%", transform: "translateX(-50%)", width: 126, height: 28, borderRadius: 999, background: "#181a24", zIndex: 5 }} />
          <div style={{ width: "100%", height: "100vh", maxHeight: 932, display: "flex", flexDirection: "column", overflow: "hidden", background: t.bg, borderRadius: 38, border: "1px solid rgba(255,255,255,0.06)", position: "relative", transition: "background 0.35s ease, box-shadow 0.35s ease" }}>
            <div style={{ position: "absolute", inset: 0, background: t.mode === "dark" ? "radial-gradient(circle at 14% 12%, rgba(138,125,255,0.12) 0%, transparent 26%), radial-gradient(circle at 86% 86%, rgba(255,138,180,0.08) 0%, transparent 24%)" : "radial-gradient(circle at 14% 12%, rgba(255,143,177,0.14) 0%, transparent 26%), radial-gradient(circle at 86% 86%, rgba(111,99,255,0.1) 0%, transparent 24%)", pointerEvents: "none" }} />
            {page === "splash" ? <div style={{ flex: 1, overflowY: "auto" }}><SplashScreen onGetStarted={() => setPage("login")} isDark={isDark} toggleTheme={toggleTheme} t={t} /></div> : null}
            {page === "login" ? <div style={{ flex: 1, overflowY: "auto" }}><LoginScreen onLogin={() => setPage("app")} t={t} /></div> : null}
            {page === "app" ? <><div style={{ flex: 1, overflowY: "auto", position: "relative", zIndex: 1 }}>{screenMap[screen]}</div><div style={{ position: "relative", zIndex: 2 }}><BottomNav active={screen} navigate={setScreen} t={t} /></div></> : null}
          </div>
        </div>
      </div>
    </>
  );
}

