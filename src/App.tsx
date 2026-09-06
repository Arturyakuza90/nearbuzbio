import { useCallback, useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  View counter (localStorage, starts at 72, +1 on every load)        */
/* ------------------------------------------------------------------ */
const VIEWS_KEY = "arbuzdev_profile_views";
const VIEWS_START = 72;
let viewsCommitted = false; // guards against double-run in React StrictMode

function readAndBumpViews(): number {
  if (typeof window === "undefined") return VIEWS_START;
  try {
    const raw = window.localStorage.getItem(VIEWS_KEY);
    const current = raw === null ? VIEWS_START : parseInt(raw, 10) || VIEWS_START;
    if (viewsCommitted) return current;
    const next = raw === null ? VIEWS_START : current + 1;
    window.localStorage.setItem(VIEWS_KEY, String(next));
    viewsCommitted = true;
    return next;
  } catch {
    return VIEWS_START;
  }
}

/* ------------------------------------------------------------------ */
/*  Pixel icons (inline SVG, crisp edges)                              */
/* ------------------------------------------------------------------ */
const px = { shapeRendering: "crispEdges" as const };

function SpeakerOnIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 16 16" fill="#fff" style={px}>
      <rect x="1" y="6" width="3" height="4" />
      <rect x="4" y="5" width="1" height="6" />
      <rect x="5" y="4" width="1" height="8" />
      <rect x="6" y="3" width="1" height="10" />
      <rect x="7" y="2" width="1" height="12" />
      <rect x="10" y="6" width="1" height="4" />
      <rect x="12" y="4" width="1" height="8" />
      <rect x="14" y="2" width="1" height="12" />
    </svg>
  );
}

function SpeakerOffIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 16 16" fill="#9a9a9a" style={px}>
      <rect x="1" y="6" width="3" height="4" />
      <rect x="4" y="5" width="1" height="6" />
      <rect x="5" y="4" width="1" height="8" />
      <rect x="6" y="3" width="1" height="10" />
      <rect x="7" y="2" width="1" height="12" />
      <rect x="10" y="5" width="1" height="1" />
      <rect x="11" y="6" width="1" height="1" />
      <rect x="12" y="7" width="1" height="2" />
      <rect x="11" y="9" width="1" height="1" />
      <rect x="10" y="10" width="1" height="1" />
      <rect x="14" y="5" width="1" height="1" />
      <rect x="13" y="6" width="1" height="1" />
      <rect x="13" y="9" width="1" height="1" />
      <rect x="14" y="10" width="1" height="1" />
    </svg>
  );
}

function VerifiedBadge() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" style={px} aria-label="verified">
      <rect x="4" y="1" width="8" height="1" fill="#fff" />
      <rect x="2" y="2" width="12" height="1" fill="#fff" />
      <rect x="1" y="4" width="14" height="8" fill="#fff" />
      <rect x="2" y="12" width="12" height="1" fill="#fff" />
      <rect x="4" y="13" width="8" height="1" fill="#fff" />
      <rect x="2" y="3" width="12" height="1" fill="#fff" />
      <rect x="5" y="8" width="1" height="1" fill="#000" />
      <rect x="6" y="9" width="1" height="1" fill="#000" />
      <rect x="7" y="8" width="1" height="1" fill="#000" />
      <rect x="8" y="7" width="1" height="1" fill="#000" />
      <rect x="9" y="6" width="1" height="1" fill="#000" />
      <rect x="10" y="5" width="1" height="1" fill="#000" />
    </svg>
  );
}

function DiamondBadge() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" style={px} aria-label="diamond">
      <rect x="4" y="2" width="8" height="1" fill="#bdbdbd" />
      <rect x="3" y="3" width="10" height="1" fill="#e6e6e6" />
      <rect x="2" y="4" width="12" height="2" fill="#bdbdbd" />
      <rect x="3" y="6" width="10" height="2" fill="#8f8f8f" />
      <rect x="4" y="8" width="8" height="2" fill="#7a7a7a" />
      <rect x="5" y="10" width="6" height="1" fill="#6a6a6a" />
      <rect x="6" y="11" width="4" height="1" fill="#5a5a5a" />
      <rect x="7" y="12" width="2" height="1" fill="#4a4a4a" />
      <rect x="5" y="3" width="2" height="1" fill="#fff" />
    </svg>
  );
}

function SkullBadge() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" style={px} aria-label="skull">
      <rect x="5" y="2" width="6" height="1" fill="#d0d0d0" />
      <rect x="4" y="3" width="8" height="1" fill="#d0d0d0" />
      <rect x="3" y="4" width="10" height="5" fill="#d0d0d0" />
      <rect x="4" y="9" width="8" height="2" fill="#d0d0d0" />
      <rect x="5" y="11" width="6" height="1" fill="#d0d0d0" />
      <rect x="5" y="12" width="1" height="2" fill="#d0d0d0" />
      <rect x="7" y="12" width="2" height="2" fill="#d0d0d0" />
      <rect x="10" y="12" width="1" height="2" fill="#d0d0d0" />
      <rect x="5" y="5" width="2" height="2" fill="#000" />
      <rect x="9" y="5" width="2" height="2" fill="#000" />
      <rect x="7" y="8" width="2" height="1" fill="#000" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="#cfcfcf" style={px}>
      <rect x="5" y="4" width="6" height="1" />
      <rect x="3" y="5" width="2" height="1" />
      <rect x="11" y="5" width="2" height="1" />
      <rect x="1" y="6" width="2" height="1" />
      <rect x="13" y="6" width="2" height="1" />
      <rect x="0" y="7" width="1" height="2" />
      <rect x="15" y="7" width="1" height="2" />
      <rect x="1" y="9" width="2" height="1" />
      <rect x="13" y="9" width="2" height="1" />
      <rect x="3" y="10" width="2" height="1" />
      <rect x="11" y="10" width="2" height="1" />
      <rect x="5" y="11" width="6" height="1" />
      <rect x="6" y="6" width="4" height="4" />
      <rect x="7" y="7" width="1" height="1" fill="#000" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="#cfcfcf" style={px}>
      <rect x="6" y="1" width="4" height="1" />
      <rect x="4" y="2" width="8" height="1" />
      <rect x="3" y="3" width="10" height="4" />
      <rect x="4" y="7" width="8" height="1" />
      <rect x="5" y="8" width="6" height="1" />
      <rect x="6" y="9" width="4" height="2" />
      <rect x="7" y="11" width="2" height="3" />
      <rect x="6" y="4" width="4" height="2" fill="#000" />
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.32 4.37A19.8 19.8 0 0 0 15.4 2.85a13.7 13.7 0 0 0-.63 1.29 18.3 18.3 0 0 0-5.53 0 13 13 0 0 0-.64-1.29 19.7 19.7 0 0 0-4.93 1.52C.57 9.05-.27 13.6.15 18.08a19.9 19.9 0 0 0 6.04 3.06c.49-.66.92-1.37 1.29-2.1-.71-.27-1.39-.6-2.03-.98l.5-.39a14.2 14.2 0 0 0 12.1 0l.5.39c-.65.39-1.33.71-2.04.98.37.74.8 1.44 1.29 2.1a19.8 19.8 0 0 0 6.05-3.06c.5-5.2-.84-9.7-3.53-13.71ZM8.02 15.33c-1.18 0-2.16-1.08-2.16-2.42 0-1.33.95-2.42 2.16-2.42 1.2 0 2.18 1.09 2.16 2.42 0 1.34-.96 2.42-2.16 2.42Zm7.96 0c-1.18 0-2.15-1.08-2.15-2.42 0-1.33.95-2.42 2.15-2.42 1.21 0 2.18 1.09 2.16 2.42 0 1.34-.95 2.42-2.16 2.42Z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Intro: Fake BSOD -> Glitch -> Terminal hack -> Click to unlock     */
/* ------------------------------------------------------------------ */
type Stage = "bsod" | "glitch" | "hack" | "unlocking" | "done";

const HACK_LINES = [
  "> root@arbuztype:~# ./breach --target=localhost",
  "> bypassing kernel guard ............ OK",
  "> injecting payload [██████████] 100%",
  "",
  "Hacked by arbuztype...",
  "Send a message to Discord: @ddddeaddddd to unlock your system.",
];

function useTypewriter(active: boolean, lines: string[], speed = 28) {
  const [typed, setTyped] = useState<string[]>([]);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!active) return;
    let line = 0;
    let char = 0;
    let cancelled = false;
    const out: string[] = [""];

    const tick = () => {
      if (cancelled) return;
      if (line >= lines.length) {
        setFinished(true);
        return;
      }
      const target = lines[line];
      if (char < target.length) {
        out[line] = target.slice(0, char + 1);
        char++;
        setTyped([...out]);
        const jitter = Math.random() * 30;
        window.setTimeout(tick, speed + jitter);
      } else {
        line++;
        char = 0;
        if (line < lines.length) out.push("");
        setTyped([...out]);
        window.setTimeout(tick, target === "" ? 80 : 260);
      }
    };
    const start = window.setTimeout(tick, 350);
    return () => {
      cancelled = true;
      window.clearTimeout(start);
    };
  }, [active, lines, speed]);

  return { typed, finished };
}

function BsodScreen({ glitching }: { glitching: boolean }) {
  return (
    <div className={`bsod absolute inset-0 text-white ${glitching ? "glitching" : ""}`}>
      <div className="h-full w-full flex items-center justify-center px-6 sm:px-16">
        <div className="max-w-3xl w-full">
          <div className="text-[110px] sm:text-[150px] leading-none font-light mb-6 select-none">
            :(
          </div>
          <p className="text-xl sm:text-3xl font-light leading-snug mb-8">
            Your PC ran into a problem and needs to restart. We&apos;re just collecting
            some error info, and then we&apos;ll restart for you.
          </p>
          <p className="text-xl sm:text-3xl font-light mb-10">
            <BsodProgress /> complete
          </p>
          <div className="flex gap-5 items-start">
            <div className="bg-white p-1 shrink-0 hidden sm:block">
              <svg width="96" height="96" viewBox="0 0 21 21" style={px}>
                <rect width="21" height="21" fill="#fff" />
                {[
                  [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [8, 0], [10, 0], [14, 0], [15, 0], [16, 0], [17, 0], [18, 0], [19, 0], [20, 0],
                  [0, 1], [6, 1], [9, 1], [12, 1], [14, 1], [20, 1],
                  [0, 2], [2, 2], [3, 2], [4, 2], [6, 2], [8, 2], [11, 2], [14, 2], [16, 2], [17, 2], [18, 2], [20, 2],
                  [0, 3], [2, 3], [3, 3], [4, 3], [6, 3], [10, 3], [12, 3], [14, 3], [16, 3], [17, 3], [18, 3], [20, 3],
                  [0, 4], [2, 4], [3, 4], [4, 4], [6, 4], [8, 4], [9, 4], [14, 4], [16, 4], [17, 4], [18, 4], [20, 4],
                  [0, 5], [6, 5], [11, 5], [12, 5], [14, 5], [20, 5],
                  [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [8, 6], [10, 6], [12, 6], [14, 6], [15, 6], [16, 6], [17, 6], [18, 6], [19, 6], [20, 6],
                  [9, 7], [11, 7],
                  [0, 8], [2, 8], [4, 8], [5, 8], [6, 8], [9, 8], [10, 8], [13, 8], [15, 8], [17, 8], [19, 8],
                  [1, 9], [3, 9], [7, 9], [8, 9], [12, 9], [14, 9], [18, 9], [20, 9],
                  [0, 10], [2, 10], [5, 10], [6, 10], [10, 10], [11, 10], [13, 10], [16, 10], [17, 10],
                  [1, 11], [4, 11], [8, 11], [9, 11], [12, 11], [15, 11], [19, 11], [20, 11],
                  [0, 12], [3, 12], [6, 12], [7, 12], [11, 12], [13, 12], [14, 12], [17, 12], [18, 12],
                  [8, 13], [10, 13], [12, 13], [16, 13], [20, 13],
                  [0, 14], [1, 14], [2, 14], [3, 14], [4, 14], [5, 14], [6, 14], [9, 14], [11, 14], [14, 14], [18, 14],
                  [0, 15], [6, 15], [8, 15], [13, 15], [15, 15], [16, 15], [19, 15],
                  [0, 16], [2, 16], [3, 16], [4, 16], [6, 16], [8, 16], [9, 16], [10, 16], [11, 16], [12, 16], [14, 16], [17, 16], [20, 16],
                  [0, 17], [2, 17], [3, 17], [4, 17], [6, 17], [10, 17], [13, 17], [16, 17], [18, 17],
                  [0, 18], [2, 18], [3, 18], [4, 18], [6, 18], [8, 18], [11, 18], [12, 18], [15, 18], [19, 18], [20, 18],
                  [0, 19], [6, 19], [9, 19], [14, 19], [17, 19],
                  [0, 20], [1, 20], [2, 20], [3, 20], [4, 20], [5, 20], [6, 20], [8, 20], [10, 20], [12, 20], [13, 20], [16, 20], [18, 20], [20, 20],
                ].map(([x, y]) => (
                  <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="#000" />
                ))}
              </svg>
            </div>
            <div className="text-xs sm:text-sm leading-relaxed font-light">
              <p className="mb-3">
                For more information about this issue and possible fixes, visit
                https://www.windows.com/stopcode
              </p>
              <p className="mb-1">If you call a support person, give them this info:</p>
              <p>Stop code: CRITICAL_PROCESS_DIED</p>
              <p>What failed: arbuz.sys</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BsodProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => {
      setPct((p) => (p >= 100 ? 100 : p + Math.floor(Math.random() * 9) + 3));
    }, 220);
    return () => window.clearInterval(id);
  }, []);
  return <span>{Math.min(pct, 100)}%</span>;
}

function HackScreen({ onUnlock }: { onUnlock: () => void }) {
  const { typed, finished } = useTypewriter(true, HACK_LINES);
  return (
    <div
      className="absolute inset-0 bg-black cursor-pointer select-none flicker"
      onClick={onUnlock}
      role="button"
      aria-label="Click anywhere to unlock"
    >
      <div className="scanlines" />
      <div className="h-full w-full flex items-center justify-center px-6">
        <div className="terminal font-pixel text-2xl sm:text-4xl leading-relaxed w-full max-w-4xl">
          {typed.map((line, i) => {
            const isLast = i === typed.length - 1;
            const emphasized = i >= 4;
            return (
              <div key={i} className={emphasized ? "text-3xl sm:text-5xl mt-1" : "opacity-80"}>
                {line}
                {isLast && !finished && <span className="cursor" />}
                {line === "" && !isLast && <span>&nbsp;</span>}
              </div>
            );
          })}
          {finished && (
            <div className="mt-10 text-xl sm:text-2xl opacity-80">
              <span className="pulse-soft">[ CLICK ANYWHERE TO UNLOCK SYSTEM ]</span>
              <span className="cursor" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Profile card                                                       */
/* ------------------------------------------------------------------ */
function ProfileCard({ views }: { views: number }) {
  return (
    <div className="glass-card fade-in-card w-[min(92vw,760px)] px-6 sm:px-9 py-6 sm:py-7">
      <div className="flex items-center gap-5 sm:gap-8">
        {/* Avatar */}
        <div className="avatar-ring shrink-0 w-[92px] h-[92px] sm:w-[120px] sm:h-[120px] rounded-full overflow-hidden bg-black">
          <img
            src="avatar.png"
            alt="ArbuzDev avatar"
            className="w-full h-full object-cover grayscale-[0.4] contrast-110"
            draggable={false}
          />
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="font-pixel text-white text-4xl sm:text-5xl leading-none tracking-wide text-shadow-dark">
              ne_arbuz
            </h1>
            <div className="flex items-center gap-1.5 mt-1" title="badges">
              <VerifiedBadge />
              <DiamondBadge />
              <SkullBadge />
            </div>
          </div>

          <p className="font-pixel text-white/45 text-lg sm:text-xl mt-1 leading-none tracking-wide">
            hentai • 1pos geek • sleep zzz~°~
          </p>

          {/* Stats line: [👁️ 13] | [📍 Finland] */}
          <div className="flex items-center gap-2.5 mt-3.5 font-pixel text-lg sm:text-xl text-white/80">
            <span className="badge inline-flex items-center gap-1.5 px-2.5 py-0.5 leading-none">
              <EyeIcon />
              <span className="pt-[2px]">{views}</span>
            </span>
            <span className="text-white/25">|</span>
            <span className="badge inline-flex items-center gap-1.5 px-2.5 py-0.5 leading-none">
              <PinIcon />
              <span className="pt-[2px]">Finland</span>
            </span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      {/* Links */}
      <div className="mt-5 flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
        <button
          type="button"
          onClick={() => navigator.clipboard?.writeText("ddddeaddddd").catch(() => {})}
          className="link-btn inline-flex items-center justify-center gap-2 min-w-[150px] px-4 py-1.5 font-pixel text-xl leading-none cursor-pointer"
          title="Discord: @ddddeaddddd (click to copy)"
        >
          <DiscordIcon />
          <span className="pt-[2px]">@ddddeaddddd</span>
        </button>

        <a
          href="https://t.me/uewuq"
          target="_blank"
          rel="noreferrer noopener"
          className="donate-btn inline-flex items-center justify-center gap-2 min-w-[150px] px-4 py-1.5 font-pixel text-xl leading-none tracking-wider"
        >
          <span className="text-white/60">$</span>
          <span className="pt-[2px]">Telegram</span>
        </a>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  App                                                                */
/* ------------------------------------------------------------------ */
export default function App() {
  const [stage, setStage] = useState<Stage>("bsod");
  const [muted, setMuted] = useState(true);
  const [views] = useState<number>(() => readAndBumpViews());
  const videoRef = useRef<HTMLVideoElement>(null);

  // Stage 1 -> Stage 2 after exactly 3 seconds (0.9s glitch, then terminal)
  useEffect(() => {
    const toGlitch = window.setTimeout(() => setStage("glitch"), 3000);
    const toHack = window.setTimeout(() => setStage("hack"), 3900);
    return () => {
      window.clearTimeout(toGlitch);
      window.clearTimeout(toHack);
    };
  }, []);

  // Background video: start muted + looping on load so it's already rolling
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.loop = true;
    v.play().catch(() => {});
  }, []);

  // Stage 3: unlock click -> unmute video with its own audio, fade card in
  const handleUnlock = useCallback(() => {
    if (stage !== "hack") return;
    const v = videoRef.current;
    if (v) {
      v.muted = false;
      v.volume = 1;
      v.play().catch(() => {});
    }
    setMuted(false);
    setStage("unlocking");
    window.setTimeout(() => setStage("done"), 700);
  }, [stage]);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    const next = !v.muted;
    v.muted = next;
    if (!next) v.play().catch(() => {});
    setMuted(next);
  }, []);

  const showOverlay = stage !== "done";
  const showCard = stage === "unlocking" || stage === "done";

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      {/* Background layers */}
      <div className="bg-fallback" />
      <video
        ref={videoRef}
        className="bg-video"
        src="background.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />
      <div className="bg-vignette" />
      <div className="bg-noise" />

      {/* Top-left pixel speaker toggle */}
      <button
        type="button"
        onClick={toggleMute}
        aria-label={muted ? "Unmute background" : "Mute background"}
        title={muted ? "Unmute" : "Mute"}
        className="speaker-btn fixed top-4 left-4 z-40 w-12 h-12 flex items-center justify-center cursor-pointer"
      >
        {muted ? <SpeakerOffIcon /> : <SpeakerOnIcon />}
      </button>

      {/* Profile card */}
      {showCard && (
        <main className="relative z-10 h-full w-full flex items-center justify-center p-4">
          <ProfileCard views={views} />
        </main>
      )}

      {/* Intro overlay */}
      {showOverlay && (
        <div
          className={`fixed inset-0 z-50 overflow-hidden ${
            stage === "unlocking" ? "overlay-out pointer-events-none" : ""
          }`}
        >
          {(stage === "bsod" || stage === "glitch") && (
            <>
              <BsodScreen glitching={stage === "glitch"} />
              {stage === "glitch" && <div className="glitch-bars" />}
            </>
          )}
          {(stage === "hack" || stage === "unlocking") && <HackScreen onUnlock={handleUnlock} />}
        </div>
      )}
    </div>
  );
}
