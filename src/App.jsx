import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { Heart, Gift, Sparkles, PartyPopper, Camera } from "lucide-react";

const FloatingElement = ({
  children,
  delay = 0,
  duration = 5,
  x = 0,
  drift = 20,
}) => (
  <motion.div
    initial={{ y: "110vh", x, opacity: 0 }}
    animate={{
      y: "-20vh",
      opacity: [0, 1, 1, 0],
      x: [x, x + drift, x - drift, x],
    }}
    transition={{
      duration,
      repeat: Infinity,
      delay,
      ease: "linear",
    }}
    className="absolute pointer-events-none z-0"
  >
    {children}
  </motion.div>
);

const Balloon = ({ color }) => (
  <div className="relative flex flex-col items-center">
    <div
      className={`w-14 h-16 rounded-full ${color} shadow-lg relative backdrop-blur-sm border border-white/10`}
    >
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-inherit rotate-45" />
      <div className="absolute top-3 left-4 w-3 h-4 bg-white/20 rounded-full blur-[2px]" />
    </div>
    <div className="w-0.5 h-20 bg-gradient-to-b from-white/20 to-transparent" />
  </div>
);

const Light = ({ delay, size = 4, duration = 3 }) => (
  <motion.div
    animate={{
      opacity: [0.1, 0.4, 0.1],
      scale: [1, 1.5, 1],
    }}
    transition={{
      duration,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
    style={{ width: `${size}px`, height: `${size}px` }}
    className="rounded-full bg-accent/30 blur-[2px] shadow-[0_0_8px_rgba(0,210,255,0.4)]"
  />
);

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiParticles, setConfettiParticles] = useState([]);
  const [backgroundElements] = useState(() => {
    const balloons = [...Array(15)].map((_, i) => ({
      id: i,
      x: `${Math.random() * 100}vw`,
      delay: Math.random() * 15,
      duration: 12 + Math.random() * 8,
      color: ["bg-primary/60", "bg-secondary/60", "bg-accent/60"][i % 3],
      drift: (Math.random() - 0.5) * 30,
    }));
    const lights = [...Array(30)].map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      size: 2 + Math.random() * 4,
      duration: 2 + Math.random() * 2,
    }));
    return { balloons, lights };
  });

  const handleOpen = () => {
    const particles = [...Array(20)].map((_, i) => ({
      id: Math.random().toString(36).substr(2, 9),
      left: `${Math.random() * 100}%`,
      duration: 2 + Math.random() * 2,
      delay: Math.random() * 2,
      color: ["bg-primary", "bg-secondary", "bg-accent"][i % 3],
    }));
    setConfettiParticles(particles);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setShowConfetti(false);
  };

  useEffect(() => {
    let timer;
    if (isOpen) {
      timer = setTimeout(() => setShowConfetti(true), 500);
    }
    return () => clearTimeout(timer);
  }, [isOpen]);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden bg-[#050505]">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 blur-[120px] rounded-full" />

        {/* Floating Balloons - Only on Open */}
        {isOpen &&
          backgroundElements.balloons.map((b) => (
            <FloatingElement
              key={b.id}
              delay={b.delay}
              duration={b.duration}
              x={b.x}
              drift={b.drift}
            >
              <Balloon color={b.color} />
            </FloatingElement>
          ))}

        {/* Ambient Lights */}
        {backgroundElements.lights.map((l) => (
          <div
            key={l.id}
            className="absolute"
            style={{ top: l.top, left: l.left }}
          >
            <Light delay={l.delay} size={l.size} duration={l.duration} />
          </div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        {!isOpen ? (
          <motion.div
            layoutId="card"
            onClick={handleOpen}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="cursor-pointer group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-50 transition-opacity group-hover:opacity-100" />

            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 mx-auto"
            >
              <Gift size={40} className="text-primary" />
            </motion.div>

            <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Tap to Open
            </h1>
            <p className="text-white/60 text-center">
              A special surprise awaits you...
            </p>
          </motion.div>
        ) : (
          <motion.div
            layoutId="card"
            className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-secondary/5" />

            {/* Image Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white/5 border border-white/10 flex flex-col items-center justify-center group mb-6"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10" />
              <Camera
                size={48}
                className="text-white/20 group-hover:text-primary/40 transition-colors"
              />
              <span className="mt-4 text-white/30 font-medium group-hover:text-white/50 transition-colors">
                Your Image Here
              </span>

              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-4 right-4 z-20"
              >
                <Sparkles size={24} className="text-accent" />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center"
            >
              <motion.h2
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent"
              >
                Happy Birthday!
              </motion.h2>
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-white/80 leading-relaxed text-lg mb-8"
              >
                Wishing you a day filled with laughter, love, and endless joy.
                May all your dreams take flight today!
              </motion.p>

              <motion.button
                onClick={() => handleClose()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-primary to-secondary rounded-full font-bold text-white shadow-lg shadow-primary/25 transition-all hover:shadow-primary/40"
              >
                Close with Love
              </motion.button>
            </motion.div>

            {/* Confetti Animation Placeholder */}
            {showConfetti && (
              <div className="absolute inset-0 pointer-events-none">
                {confettiParticles.map((particle) => (
                  <motion.div
                    key={particle.id}
                    initial={{
                      top: "100%",
                      left: particle.left,
                      scale: 0,
                    }}
                    animate={{
                      top: "-20%",
                      left: particle.left,
                      scale: [0, 1, 0.5],
                      rotate: 360,
                    }}
                    transition={{
                      duration: particle.duration,
                      repeat: Infinity,
                      delay: particle.delay,
                    }}
                    className={`absolute w-3 h-3 rounded-full ${particle.color}`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default App;
