"use client";

export default function Home() {
  const scrollToWorks = () => {
    const section = document.getElementById("works");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToStory = () => {
    const section = document.getElementById("story");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main style={{ fontFamily: "sans-serif" }}>
            {/* Navigation */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          backgroundColor: "white",
          borderBottom: "1px solid #eee",
          padding: "15px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 1000,
        }}
      >
        <div style={{ fontWeight: "bold" }}>
          旅するヤモリのなな
        </div>

        <div style={{ display: "flex", gap: "20px", fontSize: "14px" }}>
          <a href="#story">Story</a>
          <a href="#works">Works</a>
          <a href="#vision">Vision</a>
        </div>
      </nav>

      {/* Hero */}
      <section
        style={{
          minHeight: "100vh",
          paddingTop: "120px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(to bottom right, #eef6ff, #ffffff)",
          padding: "20px",
          textAlign: "center",
        }}
      >
     <div style={{ maxWidth: "800px" }}>

  {/* ブランド名 */}
  <p
    style={{
      fontSize: "14px",
      letterSpacing: "3px",
      color: "#888",
      marginBottom: "10px",
    }}
  >
    旅するヤモリのなな
  </p>

  {/* 肩書きライン */}
  <p
    style={{
      color: "#0ea5e9",
      fontWeight: "bold",
      letterSpacing: "2px",
      marginBottom: "20px",
    }}
  >
    AI × ENGINEER × NURSE
  </p>

  {/* メインコピー */}
  <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>
    医療現場がわかる<br />AIエンジニア
  </h1>


          <p style={{ fontSize: "18px", color: "#555", marginBottom: "40px" }}>
            看護師としての現場経験を活かし、
            本当に使われる医療AIプロダクトをつくる。
          </p>

          <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
            <button
              onClick={scrollToWorks}
              style={{
                padding: "12px 24px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#0ea5e9",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Worksを見る
            </button>

            <button
              onClick={scrollToStory}
              style={{
                padding: "12px 24px",
                borderRadius: "8px",
                border: "2px solid #0ea5e9",
                backgroundColor: "white",
                color: "#0ea5e9",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Storyを見る
            </button>
          </div>
        </div>
      </section>

      {/* Story */}
      <section
        id="story"
        style={{
          padding: "100px 20px",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <h2 style={{ fontSize: "32px", marginBottom: "30px" }}>
          なぜ看護師からAIへ？
        </h2>

        <p style={{ marginBottom: "20px", lineHeight: "1.8" }}>
          医療現場では、多くの時間がアナログ作業や非効率な業務に費やされています。
          「もっと患者さんと向き合う時間がほしい」
          そう感じたことが、すべての始まりでした。
        </p>

        <p style={{ lineHeight: "1.8" }}>
          AIやプログラミングを学び始めたとき、
          “現場を知っている人間がテクノロジーを扱うこと”の価値に気づきました。
          医療のリアルを理解しているからこそ、机上の空論ではないプロダクトが作れる。
        </p>
      </section>

      {/* Works */}
      {/* Why Me */}
            {/* Vision */}
      <section
  　　　id="vision"

        style={{
          padding: "100px 20px",
          background: "linear-gradient(to bottom right, #f0f9ff, #ffffff)",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "32px", marginBottom: "30px" }}>
            医療 × AI の未来へ
          </h2>

          <p style={{ lineHeight: "1.8", marginBottom: "20px" }}>
            テクノロジーは、人の仕事を奪うためではなく、
            人が人に向き合う時間を増やすためにある。
          </p>

          <p style={{ lineHeight: "1.8" }}>
            医療現場の負担を減らし、
            看護師や医療者が本来の役割に集中できる環境をつくる。
            それが私の目指す未来です。
          </p>
        </div>
      </section>

      <section
        style={{
          padding: "100px 20px",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <h2 style={{ fontSize: "32px", marginBottom: "40px" }}>
          私だから作れるもの
        </h2>

        <div style={{ display: "grid", gap: "30px" }}>
          <div>
            <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>
              ① 医療現場のリアルを理解
            </h3>
            <p style={{ lineHeight: "1.8" }}>
              業務フロー、看護師の動き、現場の優先順位。
              実際に経験しているからこそ、理想論ではない設計ができる。
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>
              ② 看護師視点でのプロダクト設計
            </h3>
            <p style={{ lineHeight: "1.8" }}>
              現場で「本当に使われるか？」を基準に設計。
              IT目線ではなく、医療者目線で考える。
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>
              ③ AIを現場運用レベルへ落とし込む
            </h3>
            <p style={{ lineHeight: "1.8" }}>
              ただの実験的AIではなく、
              実際の業務改善に繋がる仕組みまで設計できる。
            </p>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer
        style={{
          padding: "40px 20px",
          textAlign: "center",
          backgroundColor: "#f8fafc",
          fontSize: "14px",
          color: "#666",
        }}
      >
        © 2026 旅するヤモリのなな  
        <br />
        AI × Engineer × Nurse
      </footer>

    </main>
  );
}
