"use client";

import { useEffect, useRef } from "react";

/* ─── ECG + Sprite-animated Walking Gecko ─── */
const GECKO_FRAMES = ["/gecko1.svg", "/gecko2.svg", "/gecko3.svg", "/gecko4.svg", "/gecko5.svg"];

function EcgWithGecko() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imgRef     = useRef<HTMLImageElement>(null);
  const state      = useRef({ x: 0, dir: 1 as 1 | -1, t: 0, frame: 0 });
  const rafRef     = useRef<number>(0);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const img     = imgRef.current;
    if (!wrapper || !img) return;

    const SPEED      = 75;   // px/s
    const GECKO_W    = 72;
    const FRAME_RATE = 8;    // frames per second for sprite cycling

    let last = 0;

    const tick = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;

      const s = state.current;
      s.t += dt;
      s.x += SPEED * s.dir * dt;

      const parentW = wrapper.parentElement?.clientWidth ?? 480;
      if (s.dir === 1  && s.x >= parentW - GECKO_W) { s.dir = -1; s.x = parentW - GECKO_W; }
      if (s.dir === -1 && s.x <= 0)                  { s.dir =  1; s.x = 0; }

      // Cycle through 5 sprite frames
      const frameIdx = Math.floor(s.t * FRAME_RATE) % GECKO_FRAMES.length;
      if (frameIdx !== s.frame) {
        s.frame = frameIdx;
        img.src = GECKO_FRAMES[frameIdx];
      }

      // Subtle vertical bob
      const bob = Math.sin(s.t * 14) * 2;
      wrapper.style.transform = `translateX(${s.x}px) translateY(${bob}px)`;
      img.style.transform     = `rotate(${s.dir === 1 ? 90 : -90}deg)`;

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div style={{ position: "relative", maxWidth: "480px", margin: "0 auto 28px", height: "80px" }}>
      {/* ECG baseline */}
      <svg viewBox="0 0 560 70"
        style={{ width: "100%", height: "100%", overflow: "visible", display: "block" }}
        aria-hidden
      >
        <polyline
          className="ecg-line"
          points="0,35 80,35 110,8 135,62 158,2 180,68 202,35 300,35 330,20 350,35 560,35"
          fill="none" stroke="#0d9488" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round" opacity="0.5"
        />
      </svg>

      {/* Walking gecko sprite */}
      <div ref={wrapperRef} style={{
        position: "absolute", bottom: "16px", left: 0,
        width: "72px", willChange: "transform", pointerEvents: "none",
      }}>
        <img
          ref={imgRef}
          src={GECKO_FRAMES[0]}
          alt="" aria-hidden
          style={{
            width: "72px", height: "72px",
            display: "block", objectFit: "contain",
            filter: "drop-shadow(0 3px 8px rgba(13,148,136,0.35))",
            transformOrigin: "center center",
          }}
        />
      </div>
    </div>
  );
}

/* ─── Badge ─── */
type Color = "teal" | "rose" | "blue";
function Badge({ text, color }: { text: string; color: Color }) {
  const p: Record<Color, { bg: string; fg: string; border: string }> = {
    teal: { bg: "rgba(13,148,136,0.09)",  fg: "#0d9488", border: "rgba(13,148,136,0.25)" },
    rose: { bg: "rgba(244,63,94,0.08)",   fg: "#f43f5e", border: "rgba(244,63,94,0.22)" },
    blue: { bg: "rgba(59,130,246,0.08)",  fg: "#3b82f6", border: "rgba(59,130,246,0.22)" },
  };
  const c = p[color];
  return (
    <span style={{
      backgroundColor: c.bg, color: c.fg, border: `1px solid ${c.border}`,
      padding: "4px 13px", borderRadius: "999px",
      fontSize: "12px", fontWeight: 700, letterSpacing: "0.03em",
    }}>
      {text}
    </span>
  );
}

/* ─── Feature point ─── */
function Feature({ label, desc }: { label: string; desc: string }) {
  return (
    <div style={{
      border: "1px solid var(--border)", borderRadius: "10px",
      padding: "14px 16px", backgroundColor: "var(--teal-pale)",
    }}>
      <div style={{ fontWeight: 700, fontSize: "13px", color: "var(--teal)", marginBottom: "4px" }}>✓ {label}</div>
      <div style={{ fontSize: "12px", color: "var(--body)" }}>{desc}</div>
    </div>
  );
}

/* ─── Section label ─── */
function Label({ n, name }: { n: string; name: string }) {
  return (
    <p style={{ color: "var(--teal)", fontSize: "12px", letterSpacing: "0.18em", marginBottom: "20px", fontWeight: 400 }}>
      — {n} / {name}
    </p>
  );
}

/* ─── Heading ─── */
function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 900, color: "var(--text)", lineHeight: 1.25, marginBottom: "48px" }}>
      {children}
    </h2>
  );
}

/* ─── Work card ─── */
function WorkCard({ children, delay }: { children: React.ReactNode; delay?: boolean }) {
  return (
    <div
      className={`animate-on-scroll${delay ? " delay-100" : ""}`}
      style={{
        backgroundColor: "#fff", borderRadius: "16px", padding: "44px",
        marginBottom: "24px", border: "1px solid var(--border)",
        boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
        transition: "box-shadow 0.3s, border-color 0.3s, transform 0.25s",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.boxShadow = "0 8px 40px rgba(13,148,136,0.14)";
        el.style.borderColor = "rgba(13,148,136,0.35)";
        el.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.boxShadow = "0 2px 16px rgba(0,0,0,0.04)";
        el.style.borderColor = "var(--border)";
        el.style.transform = "translateY(0)";
      }}
    >
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════
   Main
══════════════════════════════════════════ */
export default function Home() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!navRef.current) return;
      const scrolled = window.scrollY > 60;
      navRef.current.style.backgroundColor = scrolled ? "rgba(255,255,255,0.92)" : "transparent";
      navRef.current.style.boxShadow = scrolled ? "0 1px 0 var(--border)" : "none";
    };
    window.addEventListener("scroll", onScroll);

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".animate-on-scroll").forEach((el) => io.observe(el));

    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);

  return (
    <main>

      {/* ══ Nav ══ */}
      <nav ref={navRef} style={{
        position: "fixed", top: 0, width: "100%", zIndex: 1000,
        padding: "18px 48px", display: "flex", justifyContent: "space-between", alignItems: "center",
        backdropFilter: "blur(14px)", transition: "background-color 0.4s, box-shadow 0.4s",
      }}>
        <div style={{ color: "var(--teal)", fontWeight: 900, fontSize: "15px", letterSpacing: "0.05em" }}>
          ✦ Nana
        </div>
        <div style={{ display: "flex", gap: "32px", fontSize: "13px" }}>
          {(["Story", "Works", "Vision"] as const).map((s) => (
            <a key={s} href={`#${s.toLowerCase()}`} style={{
              color: "var(--body)", textDecoration: "none",
              letterSpacing: "0.05em", transition: "color 0.2s",
            }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--teal)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--body)")}
            >{s}</a>
          ))}
        </div>
      </nav>

      {/* ══ Hero ══ */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        padding: "120px 24px 80px", textAlign: "center",
        background: "linear-gradient(160deg, #f0fdf9 0%, #ffffff 50%, #fff1f2 100%)",
        position: "relative", overflow: "hidden",
      }}>
        {/* Decorative blobs */}
        <div aria-hidden style={{
          position: "absolute", top: "-80px", right: "-80px",
          width: "360px", height: "360px",
          backgroundColor: "rgba(13,148,136,0.07)",
          borderRadius: "60% 40% 55% 45% / 45% 55% 40% 60%",
        }} className="blob-morph" />
        <div aria-hidden style={{
          position: "absolute", bottom: "-60px", left: "-60px",
          width: "280px", height: "280px",
          backgroundColor: "rgba(244,63,94,0.06)",
          borderRadius: "45% 55% 60% 40% / 60% 40% 55% 45%",
        }} className="blob-morph" />

        <div style={{ position: "relative", maxWidth: "720px" }}>
          {/* Brand name */}
          <p style={{ fontSize: "13px", letterSpacing: "0.18em", color: "var(--body)", marginBottom: "14px" }}>
            旅するヤモリのなな
          </p>

          {/* Pill */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            border: "1px solid rgba(13,148,136,0.3)",
            borderRadius: "999px", padding: "6px 18px",
            marginBottom: "28px", fontSize: "12px",
            letterSpacing: "0.12em", color: "var(--teal)",
          }}>
            <span className="pulse-dot" style={{
              width: "6px", height: "6px", borderRadius: "50%",
              backgroundColor: "var(--teal)", display: "inline-block",
            }} />
            AI × ENGINEER × NURSE
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: "clamp(38px, 8vw, 72px)", fontWeight: 900,
            lineHeight: 1.2, marginBottom: "16px",
            color: "var(--text)", letterSpacing: "-0.02em",
          }}>
            医療現場がわかる
            <br />
            <span style={{
              background: "linear-gradient(90deg, #0d9488 0%, #0ea5e9 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              AIエンジニア
            </span>
          </h1>

          {/* ECG line + walking gecko */}
          <EcgWithGecko />

          <p style={{ color: "var(--body)", fontSize: "17px", lineHeight: 1.9, marginBottom: "44px" }}>
            看護師としての現場経験を活かし、<br />
            本当に使われる医療AIプロダクトをつくる。
          </p>

          {/* Stats row */}
          <div style={{
            display: "flex", justifyContent: "center", gap: "40px",
            marginBottom: "48px", flexWrap: "wrap",
          }}>
            {[
              { num: "5年", label: "看護師経験" },
              { num: "2本", label: "開発プロダクト" },
              { num: "33件", label: "実装テスト" },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "28px", fontWeight: 900, color: "var(--teal)", lineHeight: 1 }}>{s.num}</div>
                <div style={{ fontSize: "12px", color: "var(--muted)", marginTop: "4px", letterSpacing: "0.05em" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#works" style={{
              padding: "13px 30px", borderRadius: "10px",
              backgroundColor: "var(--teal)", color: "#fff",
              fontWeight: 700, fontSize: "14px", textDecoration: "none",
              transition: "opacity 0.2s, transform 0.2s",
            }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.88"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; }}
            >Works を見る</a>
            <a href="#story" style={{
              padding: "13px 30px", borderRadius: "10px",
              border: "1.5px solid var(--teal)", color: "var(--teal)",
              fontWeight: 700, fontSize: "14px", textDecoration: "none",
              transition: "background-color 0.2s, transform 0.2s",
            }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--teal-pale)"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; }}
            >Story を見る</a>
          </div>
        </div>
      </section>

      {/* ══ Story ══ */}
      <section id="story" style={{ padding: "110px 24px", maxWidth: "800px", margin: "0 auto" }}>
        <div className="animate-on-scroll">
          <Label n="01" name="STORY" />
          <H2>なぜ看護師から<br />AIへ？</H2>
        </div>
        <div className="animate-on-scroll delay-100">
          <p style={{ fontSize: "17px", lineHeight: 2, color: "var(--body)", marginBottom: "28px" }}>
            医療現場では、多くの時間がアナログ作業や非効率な業務に費やされています。
            「もっと患者さんと向き合う時間がほしい」——
            そう感じたことが、すべての始まりでした。
          </p>
          <div style={{
            borderLeft: "3px solid var(--teal)", paddingLeft: "24px",
            margin: "36px 0", borderRadius: "0 4px 4px 0",
          }}>
            <p style={{ fontSize: "18px", fontWeight: 700, color: "var(--text)", lineHeight: 1.8 }}>
              「現場を知っている人間がテクノロジーを扱うこと」の価値に気づきました。
            </p>
          </div>
          <p style={{ fontSize: "17px", lineHeight: 2, color: "var(--body)" }}>
            医療のリアルを理解しているからこそ、机上の空論ではないプロダクトが作れる。
            看護師 × AIエンジニアという唯一の交点から、医療を変えていきます。
          </p>
        </div>
      </section>

      {/* ══ Works ══ */}
      <section id="works" style={{ padding: "110px 24px", backgroundColor: "var(--teal-pale)" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div className="animate-on-scroll">
            <Label n="02" name="WORKS" />
            <H2>Works</H2>
            <p style={{ color: "var(--muted)", marginBottom: "56px", fontSize: "15px", marginTop: "-32px" }}>
              医療現場の課題解決に向けて開発したプロダクト
            </p>
          </div>

          {/* Work 1 */}
          <WorkCard>
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
              <Badge text="Python / Streamlit" color="blue" />
              <Badge text="小規模施設向け" color="teal" />
            </div>
            <h3 style={{ fontSize: "22px", fontWeight: 700, color: "var(--text)", marginBottom: "14px" }}>
              看護施設向け シフト自動作成システム
            </h3>
            <p style={{ lineHeight: 1.9, color: "var(--body)", marginBottom: "28px", fontSize: "15px" }}>
              現場の声から生まれた、法令遵守・公平性を両立するシフト自動生成ツール。
              正社員・パートの勤務区分や希望休を考慮しながら、4週9休制など施設独自のルールに対応した月次シフトをワンクリックで生成。
              Excelへのエクスポートにも対応し、小規模施設でもすぐに導入できる設計。
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(175px, 1fr))", gap: "12px" }}>
              {[
                { label: "柔軟なルール設定", desc: "4週9休など施設基準に対応" },
                { label: "希望休 100%尊重",  desc: "スコアリングで公平に反映" },
                { label: "Excel出力",        desc: "色分け印刷対応" },
                { label: "テスト33件",       desc: "品質を担保した実装" },
              ].map((item) => <Feature key={item.label} {...item} />)}
            </div>
          </WorkCard>

          {/* Work 2 */}
          <WorkCard delay>
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
              <Badge text="React Native / Expo" color="blue" />
              <Badge text="看護師向け" color="rose" />
            </div>
            <h3 style={{ fontSize: "22px", fontWeight: 700, color: "var(--text)", marginBottom: "14px" }}>
              ナスログ — 看護師向け疲労可視化アプリ
            </h3>
            <p style={{ lineHeight: 1.9, color: "var(--body)", marginBottom: "28px", fontSize: "15px" }}>
              身体・精神・睡眠の3軸で疲労を可視化するセルフケアアプリ。
              夜勤・日勤・夜勤明けなどシフト種別に応じた補正を加えたCFS（複合疲労スコア）を算出。
              現役看護師が自身の経験をもとに設計し、根拠ある疲労管理をシンプルなUIで実現。
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(175px, 1fr))", gap: "12px", marginBottom: "28px" }}>
              {[
                { label: "3軸スコア",   desc: "身体・精神・睡眠を統合評価" },
                { label: "シフト補正",  desc: "夜勤明けなど4種別に対応" },
                { label: "履歴グラフ",  desc: "過去の疲労推移を可視化" },
                { label: "ローカル保存", desc: "データは端末内のみ" },
              ].map((item) => <Feature key={item.label} {...item} />)}
            </div>
            <a href="https://dist-ecru-psi-88.vercel.app" target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "11px 22px", borderRadius: "9px",
                border: "1.5px solid var(--teal)", color: "var(--teal)",
                textDecoration: "none", fontWeight: 700, fontSize: "13px",
                transition: "background-color 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--teal-pale)"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; }}
            >アプリを見る →</a>
          </WorkCard>
        </div>
      </section>

      {/* ══ Values ══ */}
      <section style={{ padding: "110px 24px", maxWidth: "800px", margin: "0 auto" }}>
        <div className="animate-on-scroll">
          <Label n="03" name="VALUE" />
          <H2>私だから作れるもの</H2>
        </div>
        {[
          { num: "01", title: "医療現場のリアルを理解",        body: "業務フロー、看護師の動き、現場の優先順位。実際に経験しているからこそ、理想論ではない設計ができる。" },
          { num: "02", title: "看護師視点でのプロダクト設計",  body: "現場で「本当に使われるか？」を基準に設計。IT目線ではなく、医療者目線で考える。" },
          { num: "03", title: "AIを現場運用レベルへ落とし込む", body: "ただの実験的AIではなく、実際の業務改善に繋がる仕組みまで設計できる。" },
        ].map((item, i) => (
          <div key={item.num}
            className={`animate-on-scroll delay-${(i + 1) * 100}`}
            style={{
              display: "grid", gridTemplateColumns: "68px 1fr", gap: "28px",
              alignItems: "start", padding: "44px 0",
              borderBottom: i < 2 ? "1px solid var(--border)" : "none",
            }}
          >
            <div style={{
              fontSize: "44px", fontWeight: 900, lineHeight: 1,
              color: "rgba(13,148,136,0.2)", letterSpacing: "-0.03em",
            }}>{item.num}</div>
            <div>
              <h3 style={{ fontSize: "20px", fontWeight: 700, color: "var(--text)", marginBottom: "12px" }}>
                {item.title}
              </h3>
              <p style={{ lineHeight: 1.9, color: "var(--body)", fontSize: "15px" }}>{item.body}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ══ Vision ── (inverted / deep teal) ══ */}
      <section id="vision" style={{
        padding: "110px 24px",
        background: "linear-gradient(135deg, #0f766e 0%, #0d9488 50%, #0ea5e9 100%)",
      }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div className="animate-on-scroll">
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", letterSpacing: "0.18em", marginBottom: "20px" }}>
              — 04 / VISION
            </p>
            <h2 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 900, color: "#fff", lineHeight: 1.25, marginBottom: "48px" }}>
              医療 × AI の未来へ
            </h2>
          </div>
          <div className="animate-on-scroll delay-100">
            <blockquote style={{
              borderLeft: "3px solid rgba(255,255,255,0.5)",
              paddingLeft: "28px", marginBottom: "36px",
              fontSize: "20px", fontWeight: 700, lineHeight: 1.8, color: "#fff",
            }}>
              テクノロジーは、人の仕事を奪うためではなく、<br />
              人が人に向き合う時間を増やすためにある。
            </blockquote>
            <p style={{ lineHeight: 2, color: "rgba(255,255,255,0.8)", fontSize: "17px" }}>
              医療現場の負担を減らし、看護師や医療者が本来の役割に集中できる環境をつくる。
              それが私の目指す未来です。
            </p>
          </div>
        </div>
      </section>

      {/* ══ Footer ══ */}
      <footer style={{ padding: "52px 24px", textAlign: "center", borderTop: "1px solid var(--border)" }}>
        <div style={{ color: "var(--teal)", fontWeight: 900, letterSpacing: "0.06em", marginBottom: "6px", fontSize: "15px" }}>
          ✦ 旅するヤモリのなな
        </div>
        <div style={{ color: "var(--muted)", fontSize: "12px", letterSpacing: "0.12em" }}>
          AI × ENGINEER × NURSE
        </div>
        <div style={{ color: "var(--border)", fontSize: "12px", marginTop: "20px" }}>
          © 2026 Nana. All rights reserved.
        </div>
      </footer>

    </main>
  );
}
