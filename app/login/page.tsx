"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiArrowRight, FiHexagon, FiGithub } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { title } from "@/components/primitives";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        animate={{ opacity: 0.1 }}
        className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-transparent"
        initial={{ opacity: 0 }}
        transition={{ duration: 2 }}
      />

      {/* Главная карточка с эффектом "жидкого металла" */}
      <motion.div
        animate={{
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
        }}
        className="bg-[#111111] p-10 rounded-3xl w-full max-w-md relative overflow-hidden border border-[#2a2a2a] shadow-2xl"
        initial={{
          opacity: 0,
          y: -100,
          rotateX: 90,
          scale: 0.8,
        }}
        transition={{
          type: "spring",
          damping: 15,
          stiffness: 100,
          duration: 1.5,
        }}
        onHoverEnd={() => setIsHovered(false)}
        onHoverStart={() => setIsHovered(true)}
      >
        {/* Анимированный глитч-эффект */}
        <motion.div
          animate={{
            x: [0, 2, -2, 0],
            y: [0, -1, 1, 0],
          }}
          className="absolute inset-0 border-[1px] border-purple-500/30 pointer-events-none"
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />

        <div className="relative z-10 space-y-5">
          {/* Заголовок с эффектом неона */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.3 }}
          >
            <div className="mb-4 relative inline-block">
              <FiHexagon className="absolute -top-4 -left-4 text-purple-600/30 w-12 h-12" />
              <h1 className={title({ color: "violet" }) + " text-4xl neon-text"}>
                RISE OF THE BLACK SUN
              </h1>
            </div>
            <p className="text-gray-400 mt-2 tracking-wider">
              Войдите, чтобы продолжить!
            </p>
          </motion.div>

          {/* Форма с кастомными инпутами */}
          <form className="space-y-8" onSubmit={handleSubmit}>
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -20 }}
              transition={{ delay: 0.5 }}
            >
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000" />
                <div className="relative flex items-center bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] focus-within:border-purple-500 transition-all">
                  <FiMail className="ml-4 text-gray-400 w-5 h-5" />
                  <input
                    required
                    className="w-full px-4 py-3 bg-transparent text-gray-200 placeholder-gray-500 focus:outline-none"
                    placeholder="CREDENTIAL@DOMAIN"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -20 }}
              transition={{ delay: 0.7 }}
            >
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000" />
                <div className="relative flex items-center bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] focus-within:border-purple-500 transition-all">
                  <FiLock className="ml-4 text-gray-400 w-5 h-5" />
                  <input
                    required
                    className="w-full px-4 py-3 bg-transparent text-gray-200 placeholder-gray-500 focus:outline-none"
                    placeholder="••••••••••"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ opacity: 1 }}
              className="flex items-center justify-between"
              initial={{ opacity: 0 }}
              transition={{ delay: 0.9 }}
            >
              <label className="flex items-center space-x-3 cursor-pointer">
                <div className="relative">
                  <input
                    checked={isRemember}
                    className="sr-only"
                    type="checkbox"
                    onChange={(e) => setIsRemember(e.target.checked)}
                  />
                  <div className="w-5 h-5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-sm flex items-center justify-center">
                    {isRemember && (
                      <motion.div
                        animate={{ scale: 1 }}
                        className="w-3 h-3 bg-purple-500"
                        initial={{ scale: 0 }}
                      />
                    )}
                  </div>
                </div>
                <span className="text-gray-400 text-sm tracking-wide">
                  Запомнить
                </span>
              </label>
              <div className="flex gap-3">
                <motion.a
                  className="text-sm bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
                  href="/resetpassword"
                  whileHover={{ x: 3 }}
                >
                  Забыли пароль?
                </motion.a>
                <motion.a
                  className="text-sm bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
                  href="/register"
                  whileHover={{ x: 3 }}
                >
                  Регистрация
                </motion.a>
              </div>
            </motion.div>

            <motion.button
              animate={{ opacity: 1, y: 0 }}
              className="w-full py-4 rounded-xl font-medium tracking-wider bg-gradient-to-r from-purple-600 to-pink-600 relative overflow-hidden"
              disabled={isLoading}
              initial={{ opacity: 0, y: 20 }}
              transition={{ delay: 1.1 }}
              type="submit"
              whileHover={{
                scale: 1.02,
                background: "linear-gradient(45deg, #8B5CF6, #EC4899)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative z-10 flex items-center justify-center space-x-2">
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    className="h-6 w-6 border-2 border-white rounded-full border-t-transparent"
                    transition={{ duration: 1, repeat: Infinity }}
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
                  x: isHovered ? ["-100%", "200%"] : "100%",
                }}
                className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              />
            </motion.button>
          </form>

          {/* Разделитель */}
          <motion.div
            animate={{ opacity: 1 }}
            className="relative"
            initial={{ opacity: 0 }}
            transition={{ delay: 1.3 }}
          >
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#111111] text-gray-400">
                или войти через
              </span>
            </div>
          </motion.div>

          {/* Кнопки социальных сетей */}
          <motion.div
            animate={{ opacity: 1 }}
            className="flex flex-col gap-3"
            initial={{ opacity: 0 }}
            transition={{ delay: 1.5 }}
          >
            <motion.button
              className="w-full py-3 rounded-xl font-medium tracking-wider bg-[#4285F4] relative overflow-hidden flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
            >
              <FcGoogle className="w-5 h-5 bg-white rounded-full" />
              <span className="text-white">Google</span>
            </motion.button>

            <motion.button
              className="w-full py-3 rounded-xl font-medium tracking-wider bg-[#333] relative overflow-hidden flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
            >
              <FiGithub className="w-5 h-5 text-white" />
              <span className="text-white">GitHub</span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Декоративные элементы */}
      <motion.div
        animate={{ scale: 1 }}
        className="absolute top-1/4 left-1/4 w-48 h-48 bg-purple-900/20 blur-3xl rounded-full"
        initial={{ scale: 0 }}
      />
      <motion.div
        animate={{ scale: 1 }}
        className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-pink-900/20 blur-3xl rounded-full"
        initial={{ scale: 0 }}
        transition={{ delay: 0.5 }}
      />
    </div>
  );
}