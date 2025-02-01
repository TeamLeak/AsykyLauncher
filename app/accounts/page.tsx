"use client";
import { motion } from "framer-motion";
import { FiSettings, FiLogIn, FiUser } from "react-icons/fi";
import Image from "next/image";

import { title } from "@/components/primitives";

export default function AccountsPage() {
  return (
    <div className="min-h-screen bg-black/95 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Фоновые эффекты */}
      <motion.div
        animate={{ opacity: 0.1 }}
        className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-transparent"
        initial={{ opacity: 0 }}
        transition={{ duration: 2 }}
      />

      <div className="container mx-auto max-w-2xl">
        <motion.div
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="bg-[#0d0d0d] p-8 rounded-3xl relative overflow-hidden border border-blue-900/50 shadow-2xl"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          {/* Заголовок */}
          <motion.div
            animate={{ y: 0, opacity: 1 }}
            initial={{ y: -20, opacity: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className={`${title({ color: "blue" })} text-3xl mb-6`}>
              STEAM
            </h1>
          </motion.div>

          {/* Основной контент */}
          <div className="space-y-6">
            {/* Профиль */}
            <motion.div
              animate={{ x: 0, opacity: 1 }}
              className="flex items-center gap-4 p-4 bg-[#151515] rounded-xl border border-blue-900/30"
              initial={{ x: -20, opacity: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="relative h-12 w-12">
                <Image
                  alt="User Avatar"
                  className="rounded-full"
                  layout="fill"
                  objectFit="cover"
                  src="/steam-avatar.png"
                />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-100">
                  Kro_Player
                </h3>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full" />
                  <span className="text-sm text-green-400">Kro играет?</span>
                </div>
              </div>
            </motion.div>

            {/* Кнопки действий */}
            <motion.div
              animate={{ opacity: 1 }}
              className="grid gap-4"
              initial={{ opacity: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.button
                className="w-full py-3 px-6 flex items-center gap-3 bg-[#17212B] hover:bg-[#1f2a37] rounded-xl transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FiLogIn className="text-blue-400 w-5 h-5" />
                <span className="text-gray-100">Войти в аккаунт</span>
              </motion.button>

              <motion.button
                className="w-full py-3 px-6 flex items-center gap-3 bg-[#17212B] hover:bg-[#1f2a37] rounded-xl transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FiUser className="text-blue-400 w-5 h-5" />
                <span className="text-gray-100">Сменить профиль</span>
              </motion.button>

              <motion.button
                className="w-full py-3 px-6 flex items-center gap-3 bg-[#17212B] hover:bg-[#1f2a37] rounded-xl transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FiSettings className="text-blue-400 w-5 h-5" />
                <span className="text-gray-100">Настройки</span>
              </motion.button>
            </motion.div>
          </div>

          {/* Декоративные элементы */}
          <motion.div
            animate={{ rotate: 45 }}
            className="absolute top-1/2 left-1/2 w-64 h-64 -mt-32 -ml-32 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 rounded-full blur-3xl"
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </div>

      {/* Дополнительные фоновые эффекты */}
      <motion.div
        animate={{ rotate: 360 }}
        className="absolute top-20 left-40 w-96 h-96 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 blur-3xl rounded-full pointer-events-none"
        transition={{ duration: 20, repeat: Infinity, repeatType: "mirror" }}
      />
    </div>
  );
}
