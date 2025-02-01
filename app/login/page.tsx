"use client"
import { useState, useEffect } from 'react';
import { motion, useTransform, useScroll, animate } from 'framer-motion';
import { FiMail, FiLock, FiArrowRight, FiHexagon } from 'react-icons/fi';
import { title } from "@/components/primitives";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRemember, setIsRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="flex items-center justify-center p-4 relative overflow-hidden">
      {/* Анимированный фон с частицами */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-transparent"
      />

      {/* Главная карточка с эффектом "жидкого металла" */}
      <motion.div
        initial={{
          opacity: 0,
          y: -100,
          rotateX: 90,
          scale: 0.8
        }}
        animate={{
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1
        }}
        transition={{
          type: "spring",
          damping: 15,
          stiffness: 100,
          duration: 1.5
        }}
        className="bg-[#111111] p-10 rounded-3xl w-full max-w-md relative overflow-hidden border border-[#2a2a2a] shadow-2xl"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Анимированный глитч-эффект */}
        <motion.div
          animate={{
            x: [0, 2, -2, 0],
            y: [0, -1, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "mirror"
          }}
          className="absolute inset-0 border-[1px] border-purple-500/30 pointer-events-none"
        />

        <div className="relative z-10 space-y-8">
          {/* Заголовок с эффектом неона */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <div className="mb-4 relative inline-block">
              <FiHexagon className="absolute -top-4 -left-4 text-purple-600/30 w-12 h-12" />
              <h1 className={title({ color: 'violet' }) + " text-4xl neon-text"}>RISE OF THE BLACK SUN</h1>
            </div>
            <p className="text-gray-400 mt-2 tracking-wider">Войдите, чтобы продолжить!</p>
          </motion.div>

          {/* Форма с кастомными инпутами */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000" />
                <div className="relative flex items-center bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] focus-within:border-purple-500 transition-all">
                  <FiMail className="ml-4 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-transparent text-gray-200 placeholder-gray-500 focus:outline-none"
                    placeholder="CREDENTIAL@DOMAIN"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000" />
                <div className="relative flex items-center bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] focus-within:border-purple-500 transition-all">
                  <FiLock className="ml-4 text-gray-400 w-5 h-5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-transparent text-gray-200 placeholder-gray-500 focus:outline-none"
                    placeholder="••••••••••"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex items-center justify-between"
            >
              <label className="flex items-center space-x-3 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={isRemember}
                    onChange={(e) => setIsRemember(e.target.checked)}
                    className="sr-only"
                  />
                  <div className="w-5 h-5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-sm flex items-center justify-center">
                    {isRemember && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-3 h-3 bg-purple-500"
                      />
                    )}
                  </div>
                </div>
                <span className="text-gray-400 text-sm tracking-wide">Запомнить меня</span>
              </label>

              <motion.a
                whileHover={{ x: 3 }}
                href="/register"
                className="text-sm bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
              >
                Регистрация
              </motion.a>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              whileHover={{
                scale: 1.02,
                background: 'linear-gradient(45deg, #8B5CF6, #EC4899)'
              }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-xl font-medium tracking-wider bg-gradient-to-r from-purple-600 to-pink-600 relative overflow-hidden"
            >
              <div className="relative z-10 flex items-center justify-center space-x-2">
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="h-6 w-6 border-2 border-white rounded-full border-t-transparent"
                  />
                ) : (
                  <>
                    <span className="text-white">ВОЙТИ В АККАУНТ</span>
                    <FiArrowRight className="text-white w-5 h-5" />
                  </>
                )}
              </div>
              <motion.div
                animate={{
                  x: isHovered ? ['-100%', '200%'] : '100%',
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
                className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"
              />
            </motion.button>
          </form>
        </div>
      </motion.div>

      {/* Декоративные элементы */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="absolute top-1/4 left-1/4 w-48 h-48 bg-purple-900/20 blur-3xl rounded-full"
      />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-pink-900/20 blur-3xl rounded-full"
      />
    </div>
  );
}