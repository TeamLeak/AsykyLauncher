"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiMail,
  FiLock,
  FiUser,
  FiArrowRight,
  FiHexagon,
} from "react-icons/fi";

import { title } from "@/components/primitives";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Имитируем асинхронную регистрацию
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

        <div className="relative z-10 space-y-8">
          {/* Заголовок с эффектом неона */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.3 }}
          >
            <div className="mb-4 relative inline-block">
              <FiHexagon className="absolute -top-4 -left-4 text-purple-600/30 w-12 h-12" />
              <h1
                className={title({ color: "violet" }) + " text-4xl neon-text"}
              >
                RISE OF THE BLACK SUN
              </h1>
            </div>
            <p className="text-gray-400 mt-2 tracking-wider">
              Создайте аккаунт, чтобы начать!
            </p>
          </motion.div>

          {/* Форма регистрации */}
          <form className="space-y-8" onSubmit={handleSubmit}>
            {/* Поле Email */}
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

            {/* Поле Имя пользователя */}
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -20 }}
              transition={{ delay: 0.6 }}
            >
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000" />
                <div className="relative flex items-center bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] focus-within:border-purple-500 transition-all">
                  <FiUser className="ml-4 text-gray-400 w-5 h-5" />
                  <input
                    required
                    className="w-full px-4 py-3 bg-transparent text-gray-200 placeholder-gray-500 focus:outline-none"
                    placeholder="Имя пользователя"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
            </motion.div>

            {/* Поле Пароль */}
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

            {/* Поле Повтор пароля */}
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -20 }}
              transition={{ delay: 0.8 }}
            >
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000" />
                <div className="relative flex items-center bg-[#1a1a1a] rounded-lg border border-[#2a2a2a] focus-within:border-purple-500 transition-all">
                  <FiLock className="ml-4 text-gray-400 w-5 h-5" />
                  <input
                    required
                    className="w-full px-4 py-3 bg-transparent text-gray-200 placeholder-gray-500 focus:outline-none"
                    placeholder="Повторите пароль"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
            </motion.div>

            <motion.button
              animate={{ opacity: 1, y: 0 }}
              className="w-full py-4 rounded-xl font-medium tracking-wider bg-gradient-to-r from-purple-600 to-pink-600 relative overflow-hidden"
              disabled={isLoading}
              initial={{ opacity: 0, y: 20 }}
              transition={{ delay: 1.0 }}
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
                    <span className="text-white">ЗАРЕГИСТРИРОВАТЬСЯ</span>
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
