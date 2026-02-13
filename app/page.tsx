"use client";
import { useEffect, useRef, useState } from "react";

export default function LovePage() {
  const [step, setStep] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const quotes = [
    "Like Shiva & Parvati, may our love stay eternal ❤️",
    "Every moment with you feels magical ✨",
    "You are my peace and happiness.",
    "Life feels complete with you.",
  ];

  const images = [
    "/shiv.png",
    "/check.jfif",
    "image1.jpeg",
    "image2.jpeg",
    "image3.jpeg",
    "image4.jpeg",
    "image5.jpeg",
    "image6.jpeg",
  ];

 const nextStep = (n: number) => {
  if (audioRef.current && audioRef.current.paused) {
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
  }

  setStep(n);
};


  /* Quotes + slideshow */
  useEffect(() => {
    if (step !== 7) return;

    const q = setInterval(
      () => setQuoteIndex((p) => (p + 1) % quotes.length),
      3000
    );

    const s = setInterval(
      () => setCurrentImage((p) => (p + 1) % images.length),
      4500
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
      <audio ref={audioRef} loop autoPlay>
        <source src="/music/Talks_1.mp3" type="audio/mpeg" />
      </audio>

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
          <div className="introText">
            A Special Surprise Just For You ✨
          </div>

          <h1>🌙 Happy Mahashivratri 🌙</h1>
          <h2>For My Love ❤️</h2>

          {/* Name stars */}
          <div className="starName">
            {"ARUSHI ❤️".split("").map((c, i) => (
              <span key={i}>{c}</span>
            ))}
          </div>

          <div key={quoteIndex} className="quote">
            {quotes[quoteIndex]}
          </div>

          <div key={currentImage} className="slider fadeSlide">
            <img src={images[currentImage]} className="slideImage" />
          </div>

          {/* Heart burst */}
          <div className="heartBurst">
            {[...Array(40)].map((_, i) => (
              <span key={i}></span>
            ))}
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
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Cinematic intro */
        .introText {
          font-size: 26px;
          margin-bottom: 20px;
          opacity: 0;
          animation: cinematic 3s ease forwards;
        }

        @keyframes cinematic {
          0% {
            opacity: 0;
            transform: scale(1.4);
          }
          60% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 1;
          }
        }

        .starName {
          font-size: 42px;
          letter-spacing: 6px;
          margin: 20px 0;
        }

        .starName span {
          opacity: 0;
          animation: starAppear 1s forwards;
        }

        @keyframes starAppear {
          to {
            opacity: 1;
            text-shadow: 0 0 10px #fff, 0 0 20px #0ff, 0 0 30px #f0f;
          }
        }

        .quote {
          margin: 20px;
          font-size: 20px;
          animation: fadeQuote 1s ease;
        }

        @keyframes fadeQuote {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .slider {
          max-width: 600px;
          margin: auto;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 0 40px rgba(255, 255, 255, 0.7);
        }

        .slideImage {
          width: 100%;
          animation: zoomEffect 6s ease-in-out infinite alternate;
        }

        @keyframes zoomEffect {
          from {
            transform: scale(1);
          }
          to {
            transform: scale(1.18);
          }
        }

        .fadeSlide {
          animation: fadeImg 1s ease;
        }

        @keyframes fadeImg {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        /* Floating hearts */
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

        .hearts span::before {
          top: -10px;
        }
        .hearts span::after {
          left: -10px;
        }

        @keyframes rise {
          to {
            transform: translateY(-110vh) rotate(45deg);
          }
        }

        /* Heart burst */
        .heartBurst span {
          position: absolute;
          width: 15px;
          height: 15px;
          background: red;
          transform: rotate(45deg);
          animation: burst 1.5s ease-out forwards;
        }

        @keyframes burst {
          to {
            opacity: 0;
            transform: translateY(-300px) rotate(45deg);
          }
        }
      `}</style>
    </div>
  );
}

/* Popup component unchanged */
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
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(8px);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .popupBox {
          background: linear-gradient(145deg, #fff, #ffe4ec);
          padding: 35px;
          border-radius: 24px;
          width: 420px;
          max-width: 92%;
          text-align: center;
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
          gap: 12px;
          flex-wrap: wrap;
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
          font-size: 28px;
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
