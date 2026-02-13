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
          text: "Can I remove Pillow ❤️\nfrom your head?",
          buttons: [
            { label: "Yes 😍", action: () => nextStep(2) },
            { label: "No 😎", action: () => nextStep(2) },
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
          <div className="contentWrapper">
            <div className="textSection">
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
            </div>

            <div className="imageSection">
              <div key={currentImage} className="slider fadeSlide">
                <img src={images[currentImage]} className="slideImage" />
              </div>
            </div>
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
          background: linear-gradient(135deg, #1a0a1a 0%, #2d1b3d 25%, #3d1a2d 50%, #2a1a3a 75%, #1a0a2e 100%);
          color: white;
          text-align: center;
          overflow: hidden;
          padding: 30px;
          position: relative;
        }

        .container::before {
          content: "";
          position: fixed;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, rgba(255, 100, 150, 0.15) 0%, transparent 50%);
          pointer-events: none;
        }

        .mainReveal {
          animation: cinematicFadeIn 2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          z-index: 1;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        @keyframes cinematicFadeIn {
          from {
            opacity: 0;
            transform: translateY(60px);
            filter: blur(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        .contentWrapper {
          display: flex;
          flex-direction: column;
          gap: 20px;
          align-items: center;
          justify-content: center;
          height: 100%;
          padding: 20px;
        }

        .textSection {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 8px;
          text-align: center;
        }

        .imageSection {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        /* Cinematic intro */
        .introText {
          font-size: 20px;
          opacity: 0;
          animation: cinematicIntro 4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          font-weight: 300;
          letter-spacing: 2px;
          text-shadow: 0 0 30px rgba(255, 100, 150, 0.6), 0 0 60px rgba(255, 150, 200, 0.3);
        }

        @keyframes cinematicIntro {
          0% {
            opacity: 0;
            transform: scale(1.5) translateY(40px);
            filter: blur(15px);
          }
          50% {
            opacity: 0.7;
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
            filter: blur(0);
          }
        }

        h1 {
          font-size: 42px;
          margin: 0;
          text-shadow: 0 0 20px rgba(255, 150, 200, 0.8), 0 0 40px rgba(255, 100, 150, 0.5);
          animation: titleGlow 2s ease-in-out infinite;
          line-height: 1.2;
        }

        h2 {
          font-size: 28px;
          margin: 0;
          font-weight: 300;
          text-shadow: 0 0 15px rgba(255, 150, 200, 0.7);
        }

        @keyframes titleGlow {
          0%, 100% {
            text-shadow: 0 0 20px rgba(255, 150, 200, 0.8), 0 0 40px rgba(255, 100, 150, 0.5);
          }
          50% {
            text-shadow: 0 0 30px rgba(255, 200, 220, 1), 0 0 60px rgba(255, 150, 180, 0.7);
          }
        }

        .starName {
          font-size: 32px;
          letter-spacing: 3px;
          margin: 8px 0;
          font-weight: 300;
        }

        .starName span {
          opacity: 0;
          display: inline-block;
          animation: starAppearCinematic 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          text-shadow: 0 0 10px rgba(255, 100, 150, 0.8), 0 0 20px rgba(255, 150, 200, 0.5);
        }

        .starName span:nth-child(1) { animation-delay: 0.1s; }
        .starName span:nth-child(2) { animation-delay: 0.2s; }
        .starName span:nth-child(3) { animation-delay: 0.3s; }
        .starName span:nth-child(4) { animation-delay: 0.4s; }
        .starName span:nth-child(5) { animation-delay: 0.5s; }
        .starName span:nth-child(6) { animation-delay: 0.6s; }
        .starName span:nth-child(7) { animation-delay: 0.7s; }

        @keyframes starAppearCinematic {
          0% {
            opacity: 0;
            transform: translateY(30px);
            filter: blur(8px);
          }
          60% {
            opacity: 1;
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        .quote {
          margin: 8px 0;
          font-size: 16px;
          font-weight: 300;
          animation: quoteFlourish 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          text-shadow: 0 0 20px rgba(255, 150, 200, 0.6);
          line-height: 1.5;
        }

        @keyframes quoteFlourish {
          0% {
            opacity: 0;
            transform: translateY(20px);
            filter: blur(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        .slider {
          width: 280px;
          height: 360px;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 0 60px rgba(255, 100, 150, 0.6), 0 0 100px rgba(255, 150, 200, 0.3);
          border: 2px solid rgba(255, 150, 200, 0.4);
        }

        .slideImage {
          width: 100%;
          height: 100%;
          object-fit: cover;
          animation: cinemaZoom 7s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite alternate;
          display: block;
        }

        @keyframes cinemaZoom {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.15);
          }
        }

        .fadeSlide {
          animation: cinematicFade 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        @keyframes cinematicFade {
          0% {
            opacity: 0;
            filter: blur(10px);
          }
          100% {
            opacity: 1;
            filter: blur(0);
          }
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 36px;
          }

          .quote {
            font-size: 14px;
          }

          .slider {
            width: 260px;
            height: 340px;
          }
        }

        /* Floating hearts - more romantic */
        .hearts span {
          position: absolute;
          bottom: -50px;
          width: 24px;
          height: 24px;
          background: #ff6496;
          transform: rotate(45deg);
          animation: romanticRise 12s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
          opacity: 0.8;
          filter: drop-shadow(0 0 8px rgba(255, 100, 150, 0.6));
        }

        .hearts span::before,
        .hearts span::after {
          content: "";
          position: absolute;
          width: 24px;
          height: 24px;
          background: #ff6496;
          border-radius: 50%;
        }

        .hearts span::before {
          top: -12px;
        }
        .hearts span::after {
          left: -12px;
        }

        @keyframes romanticRise {
          0% {
            transform: translateY(0) rotate(45deg);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-110vh) rotate(45deg);
            opacity: 0;
          }
        }

        /* Heart burst - enhanced */
        .heartBurst span {
          position: absolute;
          width: 18px;
          height: 18px;
          background: #ff6496;
          transform: rotate(45deg);
          animation: cinematicBurst 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          filter: drop-shadow(0 0 6px rgba(255, 100, 150, 0.8));
        }

        @keyframes cinematicBurst {
          0% {
            opacity: 1;
            transform: translate(0, 0) rotate(45deg) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(var(--tx), var(--ty)) rotate(45deg) scale(0);
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
          background: rgba(10, 5, 20, 0.75);
          backdrop-filter: blur(15px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .popupBox {
          background: linear-gradient(145deg, rgba(255, 200, 220, 0.95), rgba(255, 180, 210, 0.95));
          padding: 45px;
          border-radius: 30px;
          width: 420px;
          max-width: 92%;
          text-align: center;
          animation: cinematicPopIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          box-shadow: 0 20px 60px rgba(255, 100, 150, 0.4), 0 0 40px rgba(255, 150, 200, 0.2);
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .popupText {
          font-size: 22px;
          margin-bottom: 28px;
          color: #5a1a3a;
          white-space: pre-line;
          font-weight: 400;
          line-height: 1.5;
        }

        .btnWrap {
          display: flex;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .gridWrap {
          display: grid;
          grid-template-columns: repeat(2, 110px);
          gap: 18px;
          justify-content: center;
        }

        .gridBtn {
          width: 110px;
          height: 110px;
          font-size: 28px;
          border-radius: 20px;
          border: none;
          cursor: pointer;
          background: linear-gradient(135deg, #ff4081 0%, #ff1493 100%);
          color: white;
          font-weight: 600;
          box-shadow: 0 8px 25px rgba(255, 64, 129, 0.4);
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .gridBtn:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 35px rgba(255, 64, 129, 0.6);
          background: linear-gradient(135deg, #ff1493 0%, #ff69b4 100%);
        }

        .gridBtn:active {
          transform: translateY(-2px);
        }

        .normalBtn {
          padding: 14px 32px;
          border-radius: 30px;
          border: none;
          background: linear-gradient(135deg, #ff4081 0%, #ff1493 100%);
          color: white;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 8px 25px rgba(255, 64, 129, 0.4);
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          font-size: 16px;
        }

        .normalBtn:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(255, 64, 129, 0.6);
          background: linear-gradient(135deg, #ff1493 0%, #ff69b4 100%);
        }

        .normalBtn:active {
          transform: translateY(-1px);
        }

        @keyframes cinematicPopIn {
          0% {
            opacity: 0;
            transform: scale(0.5) translateY(40px);
            filter: blur(10px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
            filter: blur(0);
          }
        }
      `}</style>
    </>
  );
}
