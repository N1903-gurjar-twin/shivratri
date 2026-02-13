"use client";
import { useEffect, useState } from "react";

export default function LovePage() {
  const [step, setStep] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);

  const quotes = [
    "Like Shiva & Parvati, may our love stay eternal ❤️",
    "Every moment with you feels magical ✨",
    "You are my peace and happiness.",
    "Life feels complete with you.",
  ];

  const images = ["/shiv.png", "/check.jfif"];

  const nextStep = (n: number) => setStep(n);

  useEffect(() => {
    if (step !== 7) return;

    const q = setInterval(
      () => setQuoteIndex((p) => (p + 1) % quotes.length),
      3000
    );

    const s = setInterval(
      () => setCurrentImage((p) => (p + 1) % images.length),
      5000
    );

    return () => {
      clearInterval(q);
      clearInterval(s);
    };
  }, [step]);

  const getPopup = () => {
    switch (step) {
      case 0:
        return {
          text: "Hey sweetheart ❤️\nDo you really love me?",
          buttons: [
            { label: "Yes ❤️", action: () => nextStep(1) },
            { label: "No 😜", action: () => nextStep(1) },
          ],
        };

      case 1:
        return {
          text: "Be honest 😄\nWho is more cute?",
          buttons: [
            { label: "You 😍", action: () => nextStep(2) },
            { label: "Me 😎", action: () => nextStep(2) },
          ],
        };

      case 2:
        return {
          text: "Choose lucky number 💖",
          grid: true,
          buttons: [
            { label: "1", action: () => nextStep(3) },
            { label: "2", action: () => nextStep(3) },
            { label: "3", action: () => nextStep(3) },
            { label: "4", action: () => nextStep(3) },
          ],
        };

      case 3:
        return {
          text: "Think again... Pakka? 😄",
          buttons: [{ label: "Pakka ❤️", action: () => nextStep(4) }],
        };

      case 4:
        return {
          text: "Kukoo loves you sooo much ❤️",
          buttons: [{ label: "Aww 💞", action: () => nextStep(5) }],
        };

      case 5:
        return {
          text: "2 dane khayogi baby? 😄",
          buttons: [{ label: "Haan 😂", action: () => nextStep(6) }],
        };

      case 6:
        return {
          text: "Ready for surprise?",
          buttons: [{ label: "Open ❤️", action: () => nextStep(7) }],
        };

      default:
        return null;
    }
  };

  const popupData = getPopup();

  return (
    <div className="container">

      {/* Floating hearts */}
      <div className="hearts">
        {[...Array(25)].map((_, i) => (
          <span key={i}></span>
        ))}
      </div>

      {popupData && (
        <Popup
          text={popupData.text}
          buttons={popupData.buttons}
          grid={popupData.grid}
        />
      )}

      {step === 7 && (
        <main className="mainReveal">
          <h1>🌙 Happy Mahashivratri 🌙</h1>
          <h2>For My Love ❤️</h2>

          <div key={quoteIndex} className="quote">
            {quotes[quoteIndex]}
          </div>

          <div className="slider">
            <img src={images[currentImage]} className="slideImage" />
          </div>
        </main>
      )}

      <style jsx>{`
        .container {
          min-height: 100vh;
          background: linear-gradient(120deg, #020024, #090979, #00d4ff);
          color: white;
          text-align: center;
          overflow: hidden;
          padding: 30px;
        }

        .mainReveal {
          animation: fadeIn 1.2s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .quote {
          margin: 20px;
          font-size: 20px;
          animation: fadeQuote 1s ease;
        }

        @keyframes fadeQuote {
          from { opacity:0; }
          to { opacity:1; }
        }

        .slider {
          max-width: 600px;
          margin: auto;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 0 40px rgba(255,255,255,0.7);
        }

        .slideImage {
          width: 100%;
          animation: zoomEffect 6s ease-in-out infinite alternate;
        }

        @keyframes zoomEffect {
          from { transform: scale(1); }
          to { transform: scale(1.18); }
        }

        /* floating hearts */
        .hearts span {
          position: absolute;
          bottom: -50px;
          width: 20px;
          height: 20px;
          background: red;
          transform: rotate(45deg);
          animation: rise 10s linear infinite;
          opacity: 0.7;
        }

        .hearts span::before,
        .hearts span::after {
          content: "";
          position: absolute;
          width: 20px;
          height: 20px;
          background: red;
          border-radius: 50%;
        }

        .hearts span::before { top:-10px; }
        .hearts span::after { left:-10px; }

        @keyframes rise {
          to {
            transform: translateY(-110vh) rotate(45deg);
          }
        }
      `}</style>
    </div>
  );
}

/* -------- Popup -------- */

function Popup({ text, buttons, grid }: any) {
  return (
    <>
      <div className="popup">
        <div className="popupBox">
          <h3 className="popupText">{text}</h3>

          <div className={grid ? "gridWrap" : "btnWrap"}>
            {buttons.map((b: any, i: number) => (
              <button
                key={i}
                className={grid ? "gridBtn" : "normalBtn"}
                onClick={b.action}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .popup {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(8px);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .popupBox {
          background: linear-gradient(145deg,#fff,#ffe4ec);
          padding: 35px;
          border-radius: 24px;
          width: 420px;
          max-width: 92%;
          text-align: center;
          animation: popIn .4s ease;
        }

        .popupText {
          font-size: 20px;
          margin-bottom: 20px;
          color: #222;
          white-space: pre-line;
        }

        .btnWrap {
          display:flex;
          justify-content:center;
          gap:12px;
          flex-wrap:wrap;
        }

        .gridWrap {
          display:grid;
          grid-template-columns: repeat(2,110px);
          gap:16px;
          justify-content:center;
        }

        .gridBtn {
          width:110px;
          height:110px;
          font-size:28px;
          border-radius:18px;
          border:none;
          cursor:pointer;
          background:linear-gradient(45deg,#ff4081,#ff80ab);
          color:white;
          transition:.3s;
        }

        .gridBtn:hover {
          transform:scale(1.1);
          box-shadow:0 10px 30px rgba(255,64,129,.5);
        }

        .normalBtn {
          padding:12px 22px;
          border-radius:30px;
          border:none;
          background:linear-gradient(45deg,#ff4081,#ff80ab);
          color:white;
          font-weight:600;
          cursor:pointer;
        }

        .normalBtn:hover {
          transform:scale(1.08);
        }

        @keyframes popIn {
          from { opacity:0; transform:scale(.7);}
          to { opacity:1; transform:scale(1);}
        }
      `}</style>
    </>
  );
}
