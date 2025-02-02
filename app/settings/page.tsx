"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiHexagon,
  FiSettings,
  FiPlay,
  FiLayers,
  FiCpu,
  FiSliders,
  FiUser,
} from "react-icons/fi";
import { title } from "@/components/primitives";

type Tab =
  | "launch"
  | "mods"
  | "versions"
  | "jvm"
  | "customization"
  | "account";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("launch");

  // Пример списка модов (активных и необязательных)
  const modsData = [
    { id: 1, name: "Mod A", enabled: true },
    { id: 2, name: "Mod B", enabled: false },
    { id: 3, name: "Mod C", enabled: true },
    { id: 4, name: "Optional Mod D", enabled: false },
  ];

  return (
    <div className="min-h-screen flex overflow-hidden bg-[#0d0d0d] relative">
      {/* Фоновая анимация */}
      <motion.div
        animate={{ opacity: 0.1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-transparent"
      />

      {/* Sidebar */}
      <motion.aside
        className="w-64 bg-[#111111] border-r border-[#2a2a2a] relative flex flex-col p-6"
        initial={{ x: -200 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", damping: 15, stiffness: 100 }}
      >
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <FiHexagon className="text-purple-500 w-8 h-8 mr-2" />
            <h1 className={title({ color: "violet" }) + " text-2xl neon-text"}>
              Rise of the Black Sun
            </h1>
          </div>
          <p className="text-gray-400 text-sm">Настройки проекта</p>
        </div>
        <nav className="flex-1 space-y-4">
          <motion.button
            onClick={() => setActiveTab("launch")}
            className={`w-full flex items-center p-2 rounded-lg transition-colors ${
              activeTab === "launch"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                : "text-gray-400 hover:bg-gray-800"
            }`}
            whileHover={{ scale: 1.02 }}
          >
            <FiPlay className="w-5 h-5 mr-3" />
            <span>Настройки запуска</span>
          </motion.button>
          <motion.button
            onClick={() => setActiveTab("mods")}
            className={`w-full flex items-center p-2 rounded-lg transition-colors ${
              activeTab === "mods"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                : "text-gray-400 hover:bg-gray-800"
            }`}
            whileHover={{ scale: 1.02 }}
          >
            <FiLayers className="w-5 h-5 mr-3" />
            <span>Активные моды</span>
          </motion.button>
          <motion.button
            onClick={() => setActiveTab("versions")}
            className={`w-full flex items-center p-2 rounded-lg transition-colors ${
              activeTab === "versions"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                : "text-gray-400 hover:bg-gray-800"
            }`}
            whileHover={{ scale: 1.02 }}
          >
            <FiCpu className="w-5 h-5 mr-3" />
            <span>Версии</span>
          </motion.button>
          <motion.button
            onClick={() => setActiveTab("jvm")}
            className={`w-full flex items-center p-2 rounded-lg transition-colors ${
              activeTab === "jvm"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                : "text-gray-400 hover:bg-gray-800"
            }`}
            whileHover={{ scale: 1.02 }}
          >
            <FiSliders className="w-5 h-5 mr-3" />
            <span>JVM параметры</span>
          </motion.button>
          <motion.button
            onClick={() => setActiveTab("customization")}
            className={`w-full flex items-center p-2 rounded-lg transition-colors ${
              activeTab === "customization"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                : "text-gray-400 hover:bg-gray-800"
            }`}
            whileHover={{ scale: 1.02 }}
          >
            <FiUser className="w-5 h-5 mr-3" />
            <span>Персонализация</span>
          </motion.button>
          <motion.button
            onClick={() => setActiveTab("account")}
            className={`w-full flex items-center p-2 rounded-lg transition-colors ${
              activeTab === "account"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                : "text-gray-400 hover:bg-gray-800"
            }`}
            whileHover={{ scale: 1.02 }}
          >
            <FiSettings className="w-5 h-5 mr-3" />
            <span>Аккаунт</span>
          </motion.button>
        </nav>
      </motion.aside>

      {/* Основной контент */}
      <main className="flex-1 p-10 overflow-y-auto">
        {activeTab === "launch" && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-[#111111] p-8 rounded-3xl shadow-2xl border border-[#2a2a2a] relative overflow-hidden mb-10"
          >
            {/* Глитч-эффект */}
            <motion.div
              animate={{
                x: [0, 2, -2, 0],
                y: [0, -1, 1, 0],
              }}
              className="absolute inset-0 border border-purple-500/30 pointer-events-none"
              transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
            />
            <h2 className="text-2xl text-white mb-4">Настройки запуска</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-1">
                  Путь к игре
                </label>
                <input
                  type="text"
                  placeholder="C:\Minecraft\RiseOfTheBlackSun"
                  className="w-full p-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">
                  Дополнительные параметры запуска
                </label>
                <input
                  type="text"
                  placeholder="--fullscreen --optimize"
                  className="w-full p-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none"
                />
              </div>
            </div>
          </motion.section>
        )}

        {activeTab === "mods" && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-[#111111] p-8 rounded-3xl shadow-2xl border border-[#2a2a2a] relative overflow-hidden mb-10"
          >
            <motion.div
              animate={{
                x: [0, 2, -2, 0],
                y: [0, -1, 1, 0],
              }}
              className="absolute inset-0 border border-purple-500/30 pointer-events-none"
              transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
            />
            <h2 className="text-2xl text-white mb-4">Активные моды</h2>
            <div className="space-y-4">
              {modsData.map((mod) => (
                <div
                  key={mod.id}
                  className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a]"
                >
                  <span className="text-gray-200">{mod.name}</span>
                  <button
                    className={`px-4 py-1 rounded text-sm transition-colors ${
                      mod.enabled
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-red-600 hover:bg-red-700"
                    }`}
                  >
                    {mod.enabled ? "ВКЛ" : "ВЫКЛ"}
                  </button>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {activeTab === "versions" && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-[#111111] p-8 rounded-3xl shadow-2xl border border-[#2a2a2a] relative overflow-hidden mb-10"
          >
            <motion.div
              animate={{
                x: [0, 2, -2, 0],
                y: [0, -1, 1, 0],
              }}
              className="absolute inset-0 border border-purple-500/30 pointer-events-none"
              transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
            />
            <h2 className="text-2xl text-white mb-4">Версии</h2>
            <div className="space-y-4">
              <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a]">
                <span className="text-gray-400">Версия сборки:</span>
                <span className="ml-2 text-white">1.0.0</span>
              </div>
              <div className="p-4 bg-[#1a1a1a] rounded-lg border border-[#2a2a2a]">
                <span className="text-gray-400">Версия Minecraft:</span>
                <span className="ml-2 text-white">1.19.4</span>
              </div>
            </div>
          </motion.section>
        )}

        {activeTab === "jvm" && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-[#111111] p-8 rounded-3xl shadow-2xl border border-[#2a2a2a] relative overflow-hidden mb-10"
          >
            <motion.div
              animate={{
                x: [0, 2, -2, 0],
                y: [0, -1, 1, 0],
              }}
              className="absolute inset-0 border border-purple-500/30 pointer-events-none"
              transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
            />
            <h2 className="text-2xl text-white mb-4">JVM Параметры</h2>
            <div className="space-y-4">
              <label className="block text-gray-400 mb-1">
                Дополнительные параметры JVM
              </label>
              <input
                type="text"
                placeholder="-Xmx4G -Xms2G"
                className="w-full p-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none"
              />
            </div>
          </motion.section>
        )}

        {activeTab === "customization" && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-[#111111] p-8 rounded-3xl shadow-2xl border border-[#2a2a2a] relative overflow-hidden mb-10"
          >
            <motion.div
              animate={{
                x: [0, 2, -2, 0],
                y: [0, -1, 1, 0],
              }}
              className="absolute inset-0 border border-purple-500/30 pointer-events-none"
              transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
            />
            <h2 className="text-2xl text-white mb-4">
              Персонализация игрока
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-gray-400 mb-1">
                  Сменить скин
                </label>
                <input
                  type="file"
                  className="w-full p-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-gray-200 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">
                  Сменить плащ
                </label>
                <input
                  type="file"
                  className="w-full p-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-gray-200 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">
                  Внутриигровое имя
                </label>
                <input
                  type="text"
                  placeholder="Ваш ник"
                  className="w-full p-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none"
                />
              </div>
            </div>
          </motion.section>
        )}

        {activeTab === "account" && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-[#111111] p-8 rounded-3xl shadow-2xl border border-[#2a2a2a] relative overflow-hidden"
          >
            <motion.div
              animate={{
                x: [0, 2, -2, 0],
                y: [0, -1, 1, 0],
              }}
              className="absolute inset-0 border border-purple-500/30 pointer-events-none"
              transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
            />
            <h2 className="text-2xl text-white mb-4">Настройки аккаунта</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="example@domain.com"
                  className="w-full p-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Пароль</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full p-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">
                  Новые параметры аккаунта
                </label>
                <input
                  type="text"
                  placeholder="Новый ник или информация"
                  className="w-full p-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none"
                />
              </div>
            </div>
          </motion.section>
        )}
      </main>
    </div>
  );
}
