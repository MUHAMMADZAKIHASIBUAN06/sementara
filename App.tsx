
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronRight, Calendar, Image as ImageIcon, Sparkles, Stars, Cake, Send, MessageCircle, HelpCircle, Smile, ThumbsUp, ThumbsDown, BookOpen } from 'lucide-react';
import { AppState } from './types';
import { PARTNER_NAME, BIRTH_DATE, MEMORIES, GOMBALAN_LIST, RIDDLES, WA_TARGET, PRAYERS_LIST } from './constants';
import MusicPlayer from './components/MusicPlayer';
import { generateBirthdayPoem } from './services/geminiService';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.LOCKED);
  const [poem, setPoem] = useState<string>("");
  const [loadingPoem, setLoadingPoem] = useState(false);
  const [gombalIndex, setGombalIndex] = useState(0);
  const [showGombalAnswer, setShowGombalAnswer] = useState(false);
  const [riddleIndex, setRiddleIndex] = useState(0);
  const [showRiddleAnswer, setShowRiddleAnswer] = useState(false);
  const [waMessage, setWaMessage] = useState("");
  const [funnyReaction, setFunnyReaction] = useState("");
  
  const calculateAge = useCallback(() => {
    const today = new Date();
    const birth = new Date(BIRTH_DATE);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }, []);

  const handleStart = async () => {
    setState(AppState.HERO);
    setLoadingPoem(true);
    const age = calculateAge();
    const generatedPoem = await generateBirthdayPoem(PARTNER_NAME, age);
    setPoem(generatedPoem || `Selamat ulang tahun, ${PARTNER_NAME} tercinta.`);
    setLoadingPoem(false);
  };

  const nextState = () => {
    const states = Object.values(AppState);
    const currentIndex = states.indexOf(state);
    if (currentIndex < states.length - 1) {
      setState(states[currentIndex + 1]);
    }
  };

  const sendToWA = () => {
    const encodedMessage = encodeURIComponent(waMessage);
    window.open(`https://wa.me/${WA_TARGET}?text=${encodedMessage}`, '_blank');
  };

  const handleGombalChoice = (knewIt: boolean) => {
    setShowGombalAnswer(true);
    if (knewIt) {
      setFunnyReaction("Hehe, Sayang aku emang paling pinter nebak isi hatiku! ❤️");
    } else {
      setFunnyReaction("Sini Sayang, aku bisikin jawaban yang paling jujur dari hatiku...");
    }
  };

  const nextGombal = () => {
    if (gombalIndex < GOMBALAN_LIST.length - 1) {
      setGombalIndex(prev => prev + 1);
      setShowGombalAnswer(false);
      setFunnyReaction("");
    } else {
      nextState();
    }
  };

  return (
    <div className="min-h-screen bg-[#fff5f7] text-gray-800 selection:bg-pink-200 overflow-x-hidden">
      <MusicPlayer isStarted={state !== AppState.LOCKED} />
      
      <AnimatePresence mode="wait">
        {state === AppState.LOCKED && (
          <motion.div
            key="locked"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center min-h-screen p-4 text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="bg-white p-8 rounded-full shadow-2xl mb-8 cursor-pointer border-4 border-pink-100"
              onClick={handleStart}
            >
              <Heart size={64} className="text-pink-500 fill-pink-500" />
            </motion.div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Sebuah Hadiah Untuk Sayangku...
            </h1>
            <p className="text-gray-500 max-w-md mx-auto mb-8 italic">
              "Sentuh hatiku, dan biarkan dunia melihat betapa beruntungnya aku memilikimu Sayang."
            </p>
            <button
              onClick={handleStart}
              className="px-10 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-bold shadow-xl hover:shadow-2xl transition-all flex items-center gap-2 transform hover:scale-105"
            >
              Buka Kejutan Terindah <ChevronRight size={20} />
            </button>
          </motion.div>
        )}

        {state === AppState.HERO && (
          <motion.div
            key="hero"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center min-h-screen p-6 text-center"
          >
            <div className="relative mb-8">
              <motion.img
                src="https://picsum.photos/seed/dini_hero/400/400"
                alt={PARTNER_NAME}
                className="w-56 h-56 md:w-72 md:h-72 rounded-full border-8 border-white shadow-2xl object-cover"
                initial={{ scale: 0.5, rotate: -15 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              />
              <motion.div
                className="absolute -top-4 -right-4 bg-pink-500 p-4 rounded-full shadow-lg"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Heart className="text-white" size={24} fill="white" />
              </motion.div>
            </div>
            <h2 className="font-romantic text-5xl md:text-8xl text-pink-500 mb-4">Selamat Ulang Tahun</h2>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-gray-800 mb-6 drop-shadow-sm">{PARTNER_NAME}</h1>
            <p className="text-xl md:text-2xl text-gray-600 italic mb-10 max-w-2xl">
              "Cantikmu adalah melodi yang selalu ingin aku dengarkan, dan hari ini adalah simfoni terindah untukmu."
            </p>
            <button
              onClick={nextState}
              className="bg-white border-2 border-pink-300 px-12 py-4 rounded-full text-pink-500 font-bold hover:bg-pink-500 hover:text-white transition-all flex items-center gap-2 shadow-lg"
            >
              Lanjut ke Hatiku <ChevronRight />
            </button>
          </motion.div>
        )}

        {state === AppState.COUNTDOWN && (
          <motion.div
            key="countdown"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen flex flex-col items-center justify-center p-6 text-center"
          >
            <Calendar size={48} className="text-pink-400 mb-6" />
            <h2 className="text-3xl font-bold text-gray-700 mb-12 font-display">Satu Hari Yang Mengubah Segalanya</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl">
              <div className="bg-white p-8 rounded-[2rem] shadow-xl border-b-4 border-pink-400">
                <span className="block text-5xl font-black text-pink-500">14</span>
                <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Maret</span>
              </div>
              <div className="bg-white p-8 rounded-[2rem] shadow-xl border-b-4 border-pink-400">
                <span className="block text-5xl font-black text-pink-500">2007</span>
                <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Awal Indah</span>
              </div>
              <div className="bg-white p-8 rounded-[2rem] shadow-xl border-b-4 border-pink-400">
                <span className="block text-5xl font-black text-pink-500">{calculateAge()}</span>
                <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Tahun Cantik</span>
              </div>
              <div className="bg-white p-8 rounded-[2rem] shadow-xl border-b-4 border-pink-400">
                <span className="block text-5xl font-black text-pink-500">∞</span>
                <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Cinta Abadi</span>
              </div>
            </div>
            <button onClick={nextState} className="mt-16 bg-pink-500 text-white px-10 py-4 rounded-full flex items-center gap-2 shadow-xl font-bold hover:scale-105 transition-all">
              Buka Kenangan Kita <ChevronRight />
            </button>
          </motion.div>
        )}

        {state === AppState.MEMORIES && (
          <motion.div
            key="memories"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen p-8 max-w-6xl mx-auto flex flex-col items-center"
          >
            <div className="flex flex-col items-center gap-2 mb-12 text-center">
              <div className="p-3 bg-pink-100 rounded-full mb-2">
                <ImageIcon className="text-pink-500" />
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold">Galeri Cantik Adekk</h2>
              <p className="text-gray-500 italic mt-2">"Tersenyumlah Sayang, karena dunia berputar lewat senyummu."</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
              {MEMORIES.map((m, i) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="group relative overflow-hidden rounded-3xl shadow-2xl aspect-[3/4] cursor-pointer"
                >
                  <img src={m.url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 p-6 flex flex-col justify-end">
                    <Heart className="text-pink-500 mb-2" fill="currentColor" size={20} />
                    <p className="text-white text-lg font-romantic italic leading-tight">{m.caption}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <button onClick={nextState} className="mt-16 bg-pink-500 text-white px-10 py-4 rounded-full flex items-center gap-2 shadow-xl font-bold hover:bg-pink-600">
              Aku Punya Rayuan Maut... <Smile />
            </button>
          </motion.div>
        )}

        {state === AppState.GOMBALAN && (
          <motion.div
            key="gombalan"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="min-h-screen flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl max-w-2xl w-full border border-pink-50 relative min-h-[450px] flex flex-col justify-between">
              <div>
                <Heart size={50} className="text-pink-500 absolute -top-6 left-1/2 -translate-x-1/2 bg-white rounded-full p-2 shadow-md" fill="currentColor" />
                <h3 className="text-pink-400 font-bold uppercase tracking-[0.2em] text-xs mb-8 mt-6">Rayuan Untuk Sayang</h3>
                
                <motion.p
                  key={`q-${gombalIndex}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl md:text-3xl font-display font-bold text-gray-800 py-6 leading-relaxed"
                >
                  "{GOMBALAN_LIST[gombalIndex].question}"
                </motion.p>

                <AnimatePresence>
                  {showGombalAnswer && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-6 space-y-4"
                    >
                      <p className="text-sm font-bold text-pink-400 italic font-display">{funnyReaction}</p>
                      <div className="bg-gradient-to-br from-pink-50 to-white p-8 rounded-[2rem] border border-pink-100 shadow-inner">
                        <p className="text-2xl font-romantic text-gray-800 leading-relaxed italic">
                          {GOMBALAN_LIST[gombalIndex].answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <div className="flex flex-col gap-4 mt-10">
                {!showGombalAnswer ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={() => handleGombalChoice(true)}
                      className="bg-emerald-50 text-emerald-600 border-2 border-emerald-100 px-8 py-4 rounded-full font-bold hover:bg-emerald-500 hover:text-white transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <Stars size={18} /> Tau dong Sayang ❤️
                    </button>
                    <button
                      onClick={() => handleGombalChoice(false)}
                      className="bg-pink-50 text-pink-600 border-2 border-pink-100 px-8 py-4 rounded-full font-bold hover:bg-pink-500 hover:text-white transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <Sparkles size={18} /> Ga tau Sayang, bisikin... ✨
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={nextGombal}
                    className="bg-gray-800 text-white px-10 py-4 rounded-full font-bold hover:bg-black transition-all shadow-xl flex items-center justify-center gap-2 transform hover:scale-105"
                  >
                    {gombalIndex < GOMBALAN_LIST.length - 1 ? 'Rayuan Berikutnya' : 'Lanjut ke Tebak-tebakan Sayang'} <ChevronRight size={18} />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {state === AppState.RIDDLES && (
          <motion.div
            key="riddles"
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            className="min-h-screen flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="bg-white p-12 rounded-[3rem] shadow-2xl max-w-xl w-full relative min-h-[400px] flex flex-col justify-between border-l-8 border-pink-300">
              <div>
                <div className="p-3 bg-blue-50 w-fit mx-auto rounded-full mb-4">
                  <HelpCircle size={40} className="text-blue-500" />
                </div>
                <h3 className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-6">Teka-Teki Cinta Untuk Adekk</h3>
                <motion.p
                  key={`rq-${riddleIndex}`}
                  className="text-2xl md:text-3xl font-display font-bold mb-10 text-gray-800"
                >
                  {RIDDLES[riddleIndex].question}
                </motion.p>
                
                <AnimatePresence mode="wait">
                  {showRiddleAnswer && (
                    <motion.div
                      key="r-answer"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-blue-50 p-8 rounded-[2rem] mb-6 border border-blue-100 shadow-sm"
                    >
                      <p className="text-blue-700 font-bold text-xl italic font-romantic leading-relaxed">
                        "{RIDDLES[riddleIndex].answer}"
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex flex-col gap-4">
                {!showRiddleAnswer ? (
                  <button
                    onClick={() => setShowRiddleAnswer(true)}
                    className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                  >
                    Bisikin Sayang ✨ <Sparkles size={18} />
                  </button>
                ) : (
                  <div className="flex gap-4 justify-center">
                    {riddleIndex < RIDDLES.length - 1 ? (
                      <button
                        onClick={() => {
                          setRiddleIndex(prev => prev + 1);
                          setShowRiddleAnswer(false);
                        }}
                        className="bg-blue-100 text-blue-600 px-10 py-4 rounded-full font-bold flex-1 hover:bg-blue-200 transition-colors"
                      >
                        Tebakan Lagi
                      </button>
                    ) : (
                      <button
                        onClick={nextState}
                        className="bg-pink-500 text-white px-10 py-4 rounded-full font-bold shadow-lg flex-1 hover:bg-pink-600 transition-all flex items-center justify-center gap-2"
                      >
                        Lihat Harapanku... <ChevronRight size={18} />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {state === AppState.PRAYERS && (
          <motion.div
            key="prayers"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-h-screen flex flex-col items-center justify-center p-8 bg-white"
          >
            <div className="max-w-4xl w-full">
              <div className="flex flex-col items-center text-center mb-12">
                <div className="p-4 bg-pink-100 rounded-full mb-4">
                  <Stars className="text-pink-500" size={32} />
                </div>
                <h2 className="font-display text-4xl font-bold mb-4">Harapan & Doaku Untukmu Sayang</h2>
                <p className="text-gray-500 italic">"Langkah-langkah doa yang selalu aku langitkan untuk Adekk."</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PRAYERS_LIST.map((prayer, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="bg-[#fff5f7] p-8 rounded-3xl border border-pink-50 hover:shadow-xl transition-all"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-2 h-8 bg-pink-400 rounded-full"></div>
                      <h4 className="font-display font-bold text-xl">{prayer.title}</h4>
                    </div>
                    <p className="text-gray-600 leading-relaxed italic">"{prayer.text}"</p>
                  </motion.div>
                ))}
              </div>
              
              <div className="flex justify-center mt-12">
                <button
                  onClick={nextState}
                  className="bg-pink-500 text-white px-12 py-4 rounded-full font-bold shadow-xl hover:scale-105 transition-all flex items-center gap-2"
                >
                  Pesan Tulusku <Sparkles size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {state === AppState.AI_MESSAGE && (
          <motion.div
            key="ai_message"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-white/50"
          >
            <div className="bg-white p-10 md:p-16 rounded-[4rem] shadow-2xl max-w-3xl w-full border border-pink-50 relative overflow-hidden">
              <Sparkles className="absolute top-8 left-8 text-pink-200" size={40} />
              <div className="relative z-10">
                <h3 className="font-display text-4xl font-bold text-gray-800 mb-10">Puisi Cinta Untuk Sayang</h3>
                {loadingPoem ? (
                  <div className="flex flex-col items-center gap-6 py-16">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-pink-500"></div>
                    <p className="text-gray-400 animate-pulse font-display text-xl">Sedang melukiskan perasaan lewat kata-kata...</p>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xl md:text-2xl leading-relaxed text-gray-700 whitespace-pre-wrap font-romantic italic px-4"
                  >
                    {poem}
                  </motion.div>
                )}
              </div>
              <Sparkles className="absolute bottom-8 right-8 text-pink-200" size={40} />
            </div>
            <button onClick={nextState} className="mt-16 bg-pink-500 text-white px-12 py-4 rounded-full flex items-center gap-3 shadow-2xl font-bold hover:scale-105 transition-all">
              Mari Rayakan Hari Bahagiamu Adekk <Cake size={20} />
            </button>
          </motion.div>
        )}

        {state === AppState.CELEBRATION && (
          <motion.div
            key="celebration"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen flex flex-col items-center justify-center bg-[#fffcfd] p-6 text-center"
          >
            <motion.div
              animate={{ 
                rotate: [0, -5, 5, -5, 0],
                scale: [1, 1.05, 1, 1.05, 1]
              }}
              transition={{ repeat: Infinity, duration: 5 }}
              className="relative mb-12"
            >
              <Cake size={150} className="text-pink-500 drop-shadow-2xl" />
              <motion.div
                className="absolute -top-6 left-1/2 -translate-x-1/2"
                animate={{ 
                  y: [0, -15, 0],
                  scale: [1, 1.2, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <div className="w-6 h-12 bg-gradient-to-t from-yellow-500 to-orange-300 rounded-full blur-[3px]"></div>
              </motion.div>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-gray-800">Ucapkan Harapanmu...</h2>
            <p className="text-gray-500 text-xl italic mb-16 max-w-md mx-auto">
              "Pejamkan matamu Sayang, biarkan malaikat mencatat setiap doa tulusmu hari ini."
            </p>
            <button
              onClick={nextState}
              className="bg-white border-4 border-pink-500 text-pink-500 px-16 py-5 rounded-full text-2xl font-black shadow-2xl hover:bg-pink-500 hover:text-white transition-all transform hover:scale-110 active:scale-95"
            >
              TIUP LILINNYA! 🎂
            </button>
          </motion.div>
        )}

        {state === AppState.FINALE && (
          <motion.div
            key="finale"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-pink-500 to-rose-600 text-white text-center relative overflow-hidden"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="mb-10"
            >
              <Heart size={120} className="fill-white drop-shadow-2xl" />
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-display font-black mb-8 drop-shadow-lg">Aku Mencintaimu, Sayang!</h1>
            <p className="text-2xl md:text-3xl max-w-3xl mx-auto leading-relaxed mb-16 font-light italic px-4">
              Semoga di umur ke-{calculateAge()} ini, senyummu tak pernah pudar, bahagiamu tak pernah berakhir, dan cintamu selalu tertuju padaku. Aku akan selalu ada untuk menjagamu, Adekk.
            </p>
            <div className="flex flex-wrap justify-center gap-6 z-10">
              <button
                onClick={nextState}
                className="bg-white text-pink-600 px-12 py-5 rounded-full font-black text-xl shadow-[0_10px_30px_rgba(0,0,0,0.2)] flex items-center gap-3 hover:scale-110 transition-transform active:scale-95"
              >
                Balas <MessageCircle size={20} />
              </button>
              <button
                onClick={() => setState(AppState.HERO)}
                className="bg-pink-700/30 backdrop-blur-xl border-2 border-white/40 px-10 py-5 rounded-full font-bold text-lg hover:bg-white/20 transition-all"
              >
                Ulangi Perjalanan Kita
              </button>
            </div>
            
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-white/30"
                  initial={{ 
                    top: Math.random() * 100 + "%", 
                    left: Math.random() * 100 + "%",
                    scale: Math.random() * 2 
                  }}
                  animate={{ 
                    y: [0, -150, 0],
                    x: [0, Math.random() * 50 - 25, 0],
                    opacity: [0.1, 0.6, 0.1] 
                  }}
                  transition={{ 
                    duration: 4 + Math.random() * 6, 
                    repeat: Infinity 
                  }}
                >
                  <Heart fill="currentColor" size={Math.random() * 30 + 10} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {state === AppState.WHATSAPP_CHAT && (
          <motion.div
            key="whatsapp"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-h-screen flex items-center justify-center p-4 bg-[#e5ddd5]"
          >
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[85vh] border-4 border-white">
              <div className="bg-[#075e54] text-white p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden border-2 border-white/50">
                   <img src="https://picsum.photos/seed/dini_wa/100/100" alt="Adekk" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg">Sayang ❤️</h4>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-xs opacity-80">Menunggu pesan cintamu...</span>
                  </div>
                </div>
              </div>

              <div className="flex-1 p-6 overflow-y-auto space-y-5 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat">
                <div className="bg-[#dcf8c6] self-end p-4 rounded-2xl rounded-tr-none shadow-md max-w-[85%] ml-auto text-sm leading-relaxed">
                   Selamat ulang tahun ya Sayang! Semoga kamu suka sama kejutan kecil yang aku buat ini... Aku sayang banget sama Adekk! ❤️✨
                </div>
                <div className="bg-white self-start p-4 rounded-2xl rounded-tl-none shadow-md max-w-[85%] text-sm leading-relaxed">
                   Makasih banyak ya Sayang! Aku terharu banget liatnya, ini kado terindah yang pernah aku dapet. Kamu emang yang paling tau cara bikin aku bahagia 😍🎂
                </div>
                <div className="bg-[#dcf8c6] self-end p-4 rounded-2xl rounded-tr-none shadow-md max-w-[85%] ml-auto text-sm italic">
                   Satu lagi Sayang... Tulis dong apa yang mau kamu sampein ke aku hari ini? Aku tunggu ya!
                </div>
              </div>

              <div className="p-5 bg-[#f0f0f0] flex items-center gap-3">
                <textarea
                  value={waMessage}
                  onChange={(e) => setWaMessage(e.target.value)}
                  placeholder="Bisikkan cintamu di sini..."
                  className="flex-1 bg-white rounded-2xl px-6 py-4 text-sm focus:outline-none resize-none shadow-sm min-h-[60px]"
                  rows={1}
                />
                <button
                  onClick={sendToWA}
                  disabled={!waMessage.trim()}
                  className={`p-4 rounded-full transition-all shadow-lg ${waMessage.trim() ? 'bg-[#128c7e] text-white scale-110 active:scale-95' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                >
                  <Send size={24} />
                </button>
              </div>
            </div>
            
            <button 
              onClick={() => setState(AppState.FINALE)}
              className="fixed top-8 left-8 bg-black/40 backdrop-blur-md text-white p-3 rounded-full hover:bg-black/60 transition-all z-50 flex items-center gap-2"
            >
              <ChevronRight className="rotate-180" size={20} /> Kembali
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
