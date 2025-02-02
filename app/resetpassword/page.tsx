"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";

import { title } from "@/components/primitives";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Логика сброса пароля
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
        {/* Логотип */}
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
              src="/logo.svg"
            />
          </div>
        </motion.div>

        {/* Форма сброса пароля */}
        <motion.div
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="bg-[#0d0d0d] p-8 lg:p-12 rounded-3xl w-full max-w-2xl relative overflow-hidden border border-purple-900/50 shadow-2xl"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          <motion.div
            animate={{ x: [0, 2, -1, 0], opacity: [0.3, 0.5, 0.3] }}
            className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent pointer-events-none"
            transition={{ duration: 2, repeat: Infinity }}
          />

          <div className="relative z-10 space-y-5">
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
                  Сброс пароля
                </p>
              </div>
            </motion.div>

            <form className="space-y-6" onSubmit={handleSubmit}>
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

              {/* Кнопка сброса */}
              <motion.button
                animate={{ opacity: 1, y: 0 }}
                className="w-full py-4 rounded-xl font-medium tracking-wider bg-gradient-to-r from-purple-600 to-pink-600 relative overflow-hidden group"
                disabled={isLoading}
                initial={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.6 }}
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
                      <span className="text-white">ОТПРАВИТЬ ССЫЛКУ</span>
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

              {/* Ссылки навигации */}
              <motion.div
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-3 text-sm"
                initial={{ opacity: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Link
                  className="text-purple-400 hover:text-purple-300 transition-colors flex items-center group"
                  href="/login"
                >
                  <FiArrowLeft className="mr-2 transition-transform group-hover:-translate-x-1" />
                  Вернуться к входу
                </Link>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
