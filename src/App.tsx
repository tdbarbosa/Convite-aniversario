/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Music2, 
  Pause, 
  Play, 
  Volume2, 
  Sun, 
  Bird as BirdIcon, 
  Edit3,
  Check,
  Leaf,
  Flower2,
  Trees
} from "lucide-react";

// Types
interface EventInfo {
  name: string;
  age: string;
  date: string;
  time: string;
  location: string;
  address: string;
  message: string;
}

// Components
const Butterfly = ({ delay = 0, color = "#ffcc00", scale = 1 }) => (
  <motion.div
    initial={{ x: -100, y: Math.random() * 800, opacity: 0 }}
    animate={{ 
      x: [-100, 200, 600, 1000, 1600],
      y: [0, -100, 150, -50, 200],
      opacity: [0, 1, 1, 1, 0],
      rotateZ: [0, 20, -20, 10, 0]
    }}
    transition={{ 
      duration: 10 + Math.random() * 15, 
      repeat: Infinity, 
      delay,
      ease: "easeInOut" 
    }}
    style={{ scale }}
    className="absolute pointer-events-none z-40"
  >
    <div className="relative w-8 h-8">
      {/* Left Wing */}
      <motion.div 
        animate={{ rotateY: [0, 80, 0] }}
        transition={{ duration: 0.15, repeat: Infinity }}
        className="absolute w-4 h-6 rounded-full left-0 origin-right shadow-sm"
        style={{ 
          background: `radial-gradient(circle at center, ${color}, white)`,
          filter: "drop-shadow(0 0 2px rgba(0,0,0,0.1))"
        }} 
      />
      {/* Right Wing */}
      <motion.div 
        animate={{ rotateY: [0, -80, 0] }}
        transition={{ duration: 0.15, repeat: Infinity }}
        className="absolute w-4 h-6 rounded-full left-4 origin-left shadow-sm"
        style={{ 
          background: `radial-gradient(circle at center, ${color}, white)`,
          filter: "drop-shadow(0 0 2px rgba(0,0,0,0.1))"
        }} 
      />
    </div>
  </motion.div>
);

const ColorSplatter = ({ color, top, left, size, delay = 0 }) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 0.2 }}
    transition={{ duration: 2, delay }}
    className="absolute pointer-events-none blur-3xl rounded-full"
    style={{ 
      backgroundColor: color, 
      top, 
      left, 
      width: size, 
      height: size,
      zIndex: 5
    }}
  />
);

const Bird = ({ delay = 0 }) => (
  <motion.div
    initial={{ x: -200, y: 100 + Math.random() * 300, opacity: 0 }}
    animate={{ 
      x: [0, 1400],
      y: [0, -50, 50, -20, 80],
      opacity: [0, 1, 1, 0.5, 0]
    }}
    transition={{ 
      duration: 12 + Math.random() * 8, 
      repeat: Infinity, 
      delay,
      ease: "linear" 
    }}
    className="absolute pointer-events-none z-10"
  >
    <BirdIcon size={24} className="text-stone-600 opacity-60" />
  </motion.div>
);

const FallingLeaf = ({ delay = 0 }: { delay?: number; key?: string | number }) => {
  const [randomX] = useState(() => Math.random() * 100);
  return (
    <motion.div
      initial={{ y: -50, left: `${randomX}%`, opacity: 0, rotate: 0 }}
      animate={{ 
        y: [null, 900], 
        x: [0, 40, -40, 40, 0],
        opacity: [0, 0.6, 0.6, 0],
        rotate: [0, 180, 360, 540, 720]
      }}
      transition={{ 
        duration: 20 + Math.random() * 10, 
        repeat: Infinity, 
        delay,
        ease: "linear" 
      }}
      className="absolute pointer-events-none z-10 text-green-500/20"
    >
      <Leaf size={18} fill="currentColor" />
    </motion.div>
  );
};

const BloomingFlower = ({ 
  top, 
  left, 
  delay = 0, 
  color = "text-pink-300/30" 
}: { 
  top: string; 
  left: string; 
  delay?: number; 
  color?: string; 
  key?: string | number;
}) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    whileInView={{ scale: [0, 1.1, 1], opacity: 1 }}
    animate={{ 
      rotate: [0, 5, -5, 0],
      scale: [1, 1.05, 1]
    }}
    transition={{ 
      scale: { delay, duration: 2 },
      rotate: { repeat: Infinity, duration: 5, ease: "easeInOut" },
      repeat: { repeat: Infinity, duration: 3, delay: 4 }
    }}
    className={`absolute pointer-events-none z-10 ${color}`}
    style={{ top, left }}
  >
    <Flower2 size={24} fill="currentColor" />
  </motion.div>
);

const EditableField = ({ 
  value, 
  onSave, 
  label, 
  icon: Icon,
  className = "" 
}: { 
  value: string; 
  onSave: (val: string) => void; 
  label: string;
  icon?: any;
  className?: string;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const handleSave = () => {
    onSave(tempValue);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className={`flex flex-col gap-1 ${className}`}>
        <label className="text-xs uppercase tracking-widest text-stone-400 font-sans">{label}</label>
        <div className="flex items-center gap-2">
          <input
            autoFocus
            type="text"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className="bg-white/50 border-b-2 border-stone-300 focus:border-stone-500 outline-none px-2 py-1 font-serif text-lg w-full"
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          />
          <button onClick={handleSave} className="text-green-600 hover:scale-110 transition-transform">
            <Check size={20} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`group cursor-pointer flex items-center gap-3 hover:bg-stone-100/50 p-2 rounded-lg transition-all ${className}`}
      onClick={() => setIsEditing(true)}
    >
      {Icon && <Icon size={20} className="text-stone-400 group-hover:text-stone-600" />}
      <div className="flex-1">
        {label && <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400 mb-0.5">{label}</p>}
        <p className="font-serif text-lg text-stone-800 leading-tight">
          {value || <span className="italic text-stone-300 underline decoration-dotted">Toque para editar</span>}
        </p>
      </div>
      <Edit3 size={14} className="text-stone-300 opacity-0 group-hover:opacity-100" />
    </div>
  );
};

export default function App() {
  const [eventInfo, setEventInfo] = useState<EventInfo>({
    name: "Fernanda",
    age: "2",
    date: "20 de Junho de 2026",
    time: "15:00",
    location: "Sítio Primavera",
    address: "Rua das Flores, 123 - Vale das Cores",
    message: "O maior pintor do mundo, está pintando a minha história!"
  });

  const [videoId, setVideoId] = useState("y9S8_z8S5_o");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLIFrameElement>(null);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center overflow-hidden font-sans">
      {/* Background Layer: Forest */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/src/assets/images/painterly_forest_sunlight_1779026591316.png" 
          alt="Floresta" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]" />
      </div>

      {/* Sun Icon */}
      <div className="absolute top-10 right-10 z-20 opacity-40">
        <motion.div 
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", delay: 0.5 }}
          className="relative"
        >
          <Sun className="text-yellow-400 fill-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.6)] animate-spin-slow" size={64} />
        </motion.div>
      </div>

      {/* Butterflies and birds */}
      <Butterfly delay={2} color="#ff3e3e" scale={1.2} />
      <Butterfly delay={5} color="#3b82f6" scale={0.8} />
      <Butterfly delay={8} color="#ec4899" scale={1.3} />
      <Butterfly delay={11} color="#10b981" scale={1.1} />
      <Bird delay={0} />
      <Bird delay={6} />

      {/* Nature Elements */}
      {[...Array(6)].map((_, i) => (
        <FallingLeaf key={`leaf-${i}`} delay={i * 4} />
      ))}
      <BloomingFlower top="5%" left="5%" delay={0.5} />
      <BloomingFlower top="15%" left="90%" delay={1.2} color="text-yellow-300/30" />
      <BloomingFlower top="85%" left="10%" delay={2} color="text-blue-300/20" />
      <BloomingFlower top="90%" left="80%" delay={0.8} color="text-green-300/30" />
      <BloomingFlower top="40%" left="2%" delay={3} color="text-red-300/20" />
      <BloomingFlower top="60%" left="95%" delay={1.5} />

      {/* Main Content Card */}
      <div className="relative z-30 container max-w-lg mx-auto px-6 py-10 min-h-screen flex flex-col justify-center">
        
        {/* Floating Jesus - Out of the box to remove the "rectangle" look */}
        <div className="relative z-50 -mb-24 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative"
            >
                {/* Divine Glow behind Jesus */}
                <div className="absolute inset-0 bg-yellow-100/50 blur-3xl rounded-full scale-125" />
                
                <motion.img 
                  src="/src/assets/images/jesus_painter_user_choice_1779106586711.png" 
                  alt="Jesus Pintor" 
                  className="h-72 w-auto relative z-10 mix-blend-multiply"
                  animate={{ 
                    y: [0, -12, 0],
                    rotate: [0, 1, -1, 0],
                    scale: [1, 1.03, 1]
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                />
            </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-md rounded-[50px] shadow-[0_40px_100px_rgba(0,0,0,0.15)] relative overflow-hidden flex flex-col border-8 border-white"
        >
          {/* Card Top Section - Pure white and more padding for the floating element */}
          <div className="pt-28 pb-6 px-8 text-center relative overflow-hidden">
             {/* Subtle Rainbow decoration */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-80 opacity-20 pointer-events-none flex flex-col items-center">
                <div className="w-96 h-96 border-[15px] border-red-200 rounded-full" />
                <div className="absolute top-4 w-80 h-80 border-[15px] border-orange-200 rounded-full" />
                <div className="absolute top-8 w-64 h-64 border-[15px] border-yellow-200 rounded-full" />
                <div className="absolute top-12 w-48 h-48 border-[15px] border-green-200 rounded-full" />
             </div>
 
             <h1 className="font-display text-4xl text-pink-500 leading-tight mb-2 relative z-10 drop-shadow-sm">
                O Maior Pintor do Mundo
             </h1>
             <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.5 }}
             >
               <EditableField 
                  label="Mensagem"
                  value={eventInfo.message}
                  onSave={(val) => setEventInfo(prev => ({ ...prev, message: val }))}
                  className="justify-center text-center italic text-stone-400 text-sm px-6"
                />
             </motion.div>
          </div>
 
          {/* Card Bottom: Greenish Section */}
          <div className="bg-gradient-to-t from-green-50 to-white px-8 py-10 space-y-6 relative border-t-4 border-dashed border-stone-100">
             {/* Playful side badge for name/age - Overlapping the division */}
             <div className="flex justify-center gap-4 -mt-16 mb-8 relative z-20">
                <motion.div 
                  whileHover={{ scale: 1.05, rotate: -3 }}
                  className="bg-white p-4 rounded-3xl border-4 border-pink-100 shadow-xl rotate-[-2deg]"
                >
                  <EditableField 
                    label="Nome"
                    value={eventInfo.name}
                    onSave={(val) => setEventInfo(prev => ({ ...prev, name: val }))}
                    className="text-center"
                  />
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05, rotate: 3 }}
                  className="bg-white p-4 rounded-3xl border-4 border-green-100 shadow-xl rotate-[3deg]"
                >
                  <EditableField 
                    label="Anos"
                    value={eventInfo.age}
                    onSave={(val) => setEventInfo(prev => ({ ...prev, age: val }))}
                    className="text-center"
                  />
                </motion.div>
             </div>
 
             <div className="space-y-4">
                <EditableField 
                  icon={Sun}
                  label="Data Celebração"
                  value={eventInfo.date}
                  onSave={(val) => setEventInfo(prev => ({ ...prev, date: val }))}
                  className="bg-white shadow-sm border border-stone-100 rounded-2xl"
                />
                <EditableField 
                  icon={Clock}
                  label="Horário Floral"
                  value={eventInfo.time}
                  onSave={(val) => setEventInfo(prev => ({ ...prev, time: val }))}
                  className="bg-white shadow-sm border border-stone-100 rounded-2xl"
                />
                <EditableField 
                  icon={Trees}
                  label="Jardim da Festa"
                  value={eventInfo.location}
                  onSave={(val) => setEventInfo(prev => ({ ...prev, location: val }))}
                  className="bg-white shadow-sm border border-stone-100 rounded-2xl"
                />
                <EditableField 
                  icon={Edit3}
                  label="Endereço / Localização"
                  value={eventInfo.address}
                  onSave={(val) => setEventInfo(prev => ({ ...prev, address: val }))}
                  className="bg-white shadow-sm border border-stone-100 rounded-2xl"
                />
             </div>
             
             <div className="text-center pt-4 opacity-30 text-[10px] uppercase font-bold tracking-widest text-pink-500">
                ✨ Pintando uma linda história ✨
             </div>
          </div>
        </motion.div>
      </div>

      {/* Floating hearts & sparkles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: 0, x: Math.random() * 1000, opacity: 0, scale: 0 }}
          animate={{ 
            y: -500, 
            opacity: [0, 0.8, 0],
            scale: [0, 1.2, 0.5],
            x: `+=${Math.random() * 100 - 50}`
          }}
          transition={{ duration: 8, repeat: Infinity, delay: i * 1.5 }}
          className="absolute pointer-events-none text-xl"
          style={{ color: i % 2 === 0 ? "#f9a8d4" : "#fef08a" }}
        >
          {i % 2 === 0 ? "❤" : "✨"}
        </motion.div>
      ))}

      {/* Music Player & Settings */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {isPlaying && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-pink-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg mb-1"
          >
            Sintonizado na Música 🎵
          </motion.div>
        )}
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              const newId = prompt("Insira o ID do vídeo do YouTube (ex: mI9M9eM8L60):", videoId);
              if (newId) setVideoId(newId);
            }}
            className="bg-white/80 p-3 rounded-full shadow-lg border border-pink-100 text-pink-500 hover:bg-pink-50 transition-colors"
            title="Trocar Música"
          >
            <Music2 size={24} />
          </button>
          
          <button 
            onClick={togglePlay}
            className="w-14 h-14 bg-pink-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all outline-none"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
          </button>
        </div>
        
        <div className="hidden">
          <iframe 
            ref={audioRef}
            src={`https://www.youtube.com/embed/${videoId}?autoplay=${isPlaying ? 1 : 0}&loop=1&playlist=${videoId}&enablejsapi=1`}
            allow="autoplay"
          />
        </div>
      </div>
      
      <div className="fixed bottom-6 left-6 z-50">
        <div className="bg-white/80 p-2 rounded-lg shadow-sm border border-pink-100 text-[10px] text-pink-400 font-bold uppercase tracking-tighter">
          Edite os campos clicando neles
        </div>
      </div>
    </div>
  );
}

// Add a slow spin animation for the sun icon
const style = document.createElement('style');
style.textContent = `
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .animate-spin-slow {
    animation: spin-slow 12s linear infinite;
  }
`;
document.head.appendChild(style);
