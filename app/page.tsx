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

  /* Popup Content Controller */
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

      {/* Floating hearts */}
      <div className="hearts">
        {[...Array(20)].map((_, i) => (
          <span key={i}></span>
        ))}
      </div>

      {/* Popup */}
      {popupData && (
        <Popup
          text={popupData.text}
          buttons={popupData.buttons}
          grid={popupData.grid}
        />
      )}

      {/* Final Page */}
      {step === 7 && (
        <main>
          <h1>🌙 Happy Mahashivratri 🌙</h1>
          <h2>For My Love Arushi Yadav Gurjar ❤️</h2>

          <div className="quote">{quotes[quoteIndex]}</div>

          <div className="slider">
            <img src={images[currentImage]} className="slideImage" />
          </div>

          <p className="footer">
            May Lord Shiva bless our love forever 💞
          </p>
        </main>
      )}

      <style jsx>{`
        .container {
          min-height: 100vh;
          background: linear-gradient(120deg, #020024, #090979, #00d4ff);
          color: white;
          text-align: center;
          padding: 20px;
          overflow: hidden;
        }

        /* Popup Overlay */
        .popup {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 999;
        }

        /* Popup Box */
        .popupBox {
          background: linear-gradient(145deg, #ffffff, #ffe6f0);
          color: #222;
          padding: 30px;
          border-radius: 18px;
          width: 340px;
          max-width: 90%;
          text-align: center;
          box-shadow: 0 10px 40px rgba(0,0,0,0.4);
          animation: popIn 0.35s ease;
        }

        /* Normal buttons */
        .btnWrap {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          margin-top: 15px;
        }

        /* Grid numbers */
        .gridWrap {
          display: grid;
          grid-template-columns: repeat(2, 70px);
          gap: 12px;
          justify-content: center;
          margin-top: 15px;
        }

        .gridBtn {
          width: 70px;
          height: 70px;
          font-size: 22px;
          border-radius: 12px;
          background: linear-gradient(45deg, #ff4081, #ff80ab);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        button {
          padding: 10px 18px;
          border-radius: 25px;
          border: none;
          background: linear-gradient(45deg, #ff4081, #ff80ab);
          color: white;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          transition: 0.2s;
        }

        button:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }

        @keyframes popIn {
          from { transform: scale(.75); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .slider {
          width: 90%;
          max-width: 650px;
          margin: auto;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 0 30px rgba(255,255,255,0.6);
        }

        .slideImage {
          width: 100%;
          animation: zoomEffect 5s ease-in-out infinite alternate;
        }

        @keyframes zoomEffect {
          from { transform: scale(1); }
          to { transform: scale(1.15); }
        }

        .quote { margin:20px; font-size:20px; }

        .hearts span {
          position:absolute;
          bottom:-50px;
          width:20px;
          height:20px;
          background:red;
          transform:rotate(45deg);
          animation:rise 10s linear infinite;
        }

        @keyframes rise {
          to { transform:translateY(-110vh) rotate(45deg); }
        }
      `}</style>
    </div>
  );
}

function Popup({ text, buttons, grid }: any) {
  return (
    <div className="popup">
      <div className="popupBox">
        <h3 style={{ whiteSpace: "pre-line" }}>{text}</h3>

        <div className={grid ? "gridWrap" : "btnWrap"}>
          {buttons.map((b: any, i: number) => (
            <button
              key={i}
              className={grid ? "gridBtn" : ""}
              onClick={b.action}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
