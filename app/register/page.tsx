"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiMail,
  FiLock,
  FiUser,
  FiArrowRight,
  FiArrowLeft,
} from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";

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
    // Реальная логика регистрации должна быть здесь
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black/95 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Фоновые эффекты */}
      <motion.div
        animate={{ opacity: 0.1 }}
        className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-transparent"
        initial={{ opacity: 0 }}
        transition={{ duration: 2 }}
      />

      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
        {/* Блок с логотипом */}
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-full lg:w-1/2 xl:w-1/3 hidden lg:block"
          initial={{ opacity: 0, scale: 0.8 }}
          transition={{ delay: 0.5 }}
        >
          <div className="relative h-96 w-full">
            <Image
              priority
              alt="Rise of the Black Sun"
              className="glowing-shadow animate-float"
              layout="fill"
              objectFit="contain"
              src="/logo.svg" // Замените на ваш путь к логотипу
            />
          </div>

          {/* Анимированный градиентный фон */}
          <motion.div
            animate={{ rotate: 360 }}
            className="absolute top-1/2 left-1/2 w-64 h-64 -mt-32 -ml-32 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-full blur-3xl"
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        {/* Форма регистрации */}
        <motion.div
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="bg-[#0d0d0d] p-8 lg:p-12 rounded-3xl w-full max-w-2xl relative overflow-hidden border border-purple-900/50 shadow-2xl"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          {/* Глитч-эффект */}
          <motion.div
            animate={{ x: [0, 2, -1, 0], opacity: [0.3, 0.5, 0.3] }}
            className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent pointer-events-none"
            transition={{ duration: 2, repeat: Infinity }}
          />

          <div className="relative z-10 space-y-5">
            {/* Заголовок */}
            <motion.div
              animate={{ y: 0, opacity: 1 }}
              initial={{ y: -20, opacity: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="mb-6 text-center">
                <h1
                  className={`${title({ color: "violet" })} text-4xl lg:text-5xl mb-4`}
                >
                  RISE OF THE BLACK SUN
                </h1>
                <p className="text-gray-400 text-sm lg:text-base tracking-wider">
                  Создайте свой лаунч-аккаунт
                </p>
              </div>
            </motion.div>

            {/* Форма */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Поле Email */}
              <motion.div
                animate={{ x: 0, opacity: 1 }}
                initial={{ x: -20, opacity: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition-all duration-300" />
                  <div className="relative flex items-center bg-[#151515] rounded-xl border border-purple-900/30 focus-within:border-purple-500 transition-all">
                    <FiMail className="ml-4 text-purple-500 w-5 h-5" />
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
                animate={{ x: 0, opacity: 1 }}
                initial={{ x: -20, opacity: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition-all duration-300" />
                  <div className="relative flex items-center bg-[#151515] rounded-xl border border-purple-900/30 focus-within:border-purple-500 transition-all">
                    <FiUser className="ml-4 text-purple-500 w-5 h-5" />
                    <input
                      required
                      className="w-full px-4 py-3 bg-transparent text-gray-200 placeholder-gray-500 focus:outline-none"
                      placeholder="Игровое имя"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Пароли */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.div
                  animate={{ x: 0, opacity: 1 }}
                  initial={{ x: -20, opacity: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition-all duration-300" />
                    <div className="relative flex items-center bg-[#151515] rounded-xl border border-purple-900/30 focus-within:border-purple-500 transition-all">
                      <FiLock className="ml-4 text-purple-500 w-5 h-5" />
                      <input
                        required
                        className="w-full px-4 py-3 bg-transparent text-gray-200 placeholder-gray-500 focus:outline-none"
                        placeholder="Пароль"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ x: 0, opacity: 1 }}
                  initial={{ x: 20, opacity: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition-all duration-300" />
                    <div className="relative flex items-center bg-[#151515] rounded-xl border border-purple-900/30 focus-within:border-purple-500 transition-all">
                      <FiLock className="ml-4 text-purple-500 w-5 h-5" />
                      <input
                        required
                        className="w-full px-4 py-3 bg-transparent text-gray-200 placeholder-gray-500 focus:outline-none"
                        placeholder="Подтверждение"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Кнопка регистрации */}
              <motion.button
                animate={{ opacity: 1, y: 0 }}
                className="w-full py-4 rounded-xl font-medium tracking-wider bg-gradient-to-r from-purple-600 to-pink-600 relative overflow-hidden group"
                disabled={isLoading}
                initial={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.9 }}
                type="submit"
                whileHover={{ scale: 1.02 }}
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
                      <span className="text-white">АКТИВИРОВАТЬ АККАУНТ</span>
                      <FiArrowRight className="text-white transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </div>
                <motion.div
                  animate={{
                    x: isHovered ? ["-150%", "150%"] : "100%",
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent"
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.button>
            </form>

            {/* Ссылка на вход */}
            <motion.div
              animate={{ opacity: 1 }}
              className="text-center"
              initial={{ opacity: 0 }}
              transition={{ delay: 1.1 }}
            >
              <Link
                className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors group text-sm"
                href="/login"
              >
                <FiArrowLeft className="mr-2 transition-transform group-hover:-translate-x-1" />
                <span>Вернуться к авторизации</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Дополнительные эффекты */}
      <motion.div
        animate={{ rotate: 45 }}
        className="absolute top-20 left-40 w-96 h-96 bg-gradient-to-r from-purple-900/30 to-pink-900/30 blur-3xl rounded-full pointer-events-none"
        transition={{ duration: 20, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-purple-900/20 to-transparent blur-3xl pointer-events-none"
        transition={{ duration: 8, repeat: Infinity }}
      />
    </div>
  );
}
