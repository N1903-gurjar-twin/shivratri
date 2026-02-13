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
          text: "Do you remember our beautiful memories?",
          buttons: [{ label: "Of course", action: () => nextStep(2) }],
        };

      case 2:
        return {
          text: "Choose a lucky number 💖",
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
          text: "Kukoo loves you soooo much ❤️",
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
      {popupData && (
        <Popup
          text={popupData.text}
          buttons={popupData.buttons}
          grid={popupData.grid}
        />
      )}

      {step === 7 && (
        <main>
          <h1>🌙 Happy Mahashivratri 🌙</h1>
          <h2>For My Love ❤️</h2>

          <div className="quote">{quotes[quoteIndex]}</div>

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
        }

        .slider {
          max-width: 600px;
          margin: auto;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 0 30px rgba(255, 255, 255, 0.6);
        }

        .slideImage {
          width: 100%;
          animation: zoomEffect 5s ease-in-out infinite alternate;
        }

        @keyframes zoomEffect {
          from {
            transform: scale(1);
          }
          to {
            transform: scale(1.15);
          }
        }

        .quote {
          margin: 20px;
          font-size: 20px;
        }
      `}</style>
    </div>
  );
}

/* ---------------- Popup ---------------- */

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
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(6px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 999;
        }

        .popupBox {
          background: linear-gradient(145deg, #ffffff, #ffe4ec);
          padding: 35px;
          border-radius: 24px;
          width: 420px;
          max-width: 92%;
          text-align: center;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          animation: popIn 0.4s ease;
        }

        .popupText {
          font-size: 20px;
          margin-bottom: 20px;
          color: #222;
          white-space: pre-line;
        }

        .btnWrap {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px;
        }

        .gridWrap {
          display: grid;
          grid-template-columns: repeat(2, 110px);
          gap: 16px;
          justify-content: center;
        }

        .gridBtn {
          width: 110px;
          height: 110px;
          font-size: 30px;
          font-weight: bold;
          border-radius: 18px;
          border: none;
          cursor: pointer;
          background: linear-gradient(45deg, #ff4081, #ff80ab);
          color: white;
        }

        .normalBtn {
          padding: 12px 22px;
          border-radius: 30px;
          border: none;
          background: linear-gradient(45deg, #ff4081, #ff80ab);
          color: white;
          font-weight: 600;
          cursor: pointer;
        }

        @keyframes popIn {
          from {
            opacity: 0;
            transform: scale(0.7);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
}
