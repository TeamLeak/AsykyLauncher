"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  FiSettings,
  FiPlay,
  FiLayers,
  FiCpu,
  FiSliders,
  FiUser,
  FiX,
  FiCopy,
  FiPlus,
  FiUpload,
  FiCheckCircle,
  FiHome,
} from "react-icons/fi";
import { Switch } from "@heroui/switch";

import RangeSlider from "@/components/RangeSlider";

type Tab = "launch" | "mods" | "versions" | "jvm" | "customization";

interface Mod {
  id: number;
  name: string;
  required: boolean;
  enabled: boolean;
}

interface JVMParam {
  id: string;
  value: string;
}

interface Version {
  id: string;
  name: string;
  releaseDate: string;
  description: string;
}

export default function SettingsPage() {
  // Активная вкладка
  const [activeTab, setActiveTab] = useState<Tab>("launch");

  // Настройки памяти
  const [memory, setMemory] = useState({ min: 2, max: 8 });

  // JVM параметры
  const [jvmParams, setJvmParams] = useState<JVMParam[]>([
    { id: "1", value: "-XX:+UseG1GC" },
    { id: "2", value: "-XX:MaxGCPauseMillis=200" },
  ]);

  // Моды
  const [modsData] = useState<Mod[]>([
    { id: 1, name: "Core Mod", required: true, enabled: true },
    { id: 2, name: "Optimization Mod", required: true, enabled: true },
    { id: 3, name: "UI Enhancement", required: false, enabled: false },
    { id: 4, name: "Texture Pack", required: false, enabled: true },
  ]);
  const requiredMods = modsData.filter((mod) => mod.required);
  const optionalMods = modsData.filter((mod) => !mod.required);

  // Версии
  const [versions] = useState<Version[]>([
    {
      id: "v1",
      name: "1.0.0",
      releaseDate: "2021-01-01",
      description: "Первый релиз.",
    },
    {
      id: "v2",
      name: "1.1.0",
      releaseDate: "2021-06-15",
      description: "Небольшие улучшения.",
    },
    {
      id: "v3",
      name: "2.0.0",
      releaseDate: "2022-03-10",
      description: "Крупное обновление.",
    },
    {
      id: "v4",
      name: "Beta",
      releaseDate: "2022-12-01",
      description: "Экспериментальные функции.",
    },
  ]);
  const [activeVersion, setActiveVersion] = useState(versions[0].id);

  // Персонализация: скины
  const [skins] = useState<string[]>(["default", "skin1", "skin2"]);
  const [activeSkin, setActiveSkin] = useState("default");

  // Функции для JVM параметров
  const addJvmParam = () => {
    setJvmParams([...jvmParams, { id: Date.now().toString(), value: "" }]);
  };
  const removeJvmParam = (id: string) => {
    setJvmParams(jvmParams.filter((param) => param.id !== id));
  };

  // Ускоренные анимации
  const fastTransition = { type: "spring", stiffness: 120, damping: 20 };

  // Пункты меню сайдбара
  const menuItems: { key: Tab; label: string; icon: JSX.Element }[] = [
    {
      key: "launch",
      label: "Настройки запуска",
      icon: <FiPlay className="w-5 h-5 mr-3" />,
    },
    { key: "mods", label: "Моды", icon: <FiLayers className="w-5 h-5 mr-3" /> },
    {
      key: "versions",
      label: "Версии",
      icon: <FiCpu className="w-5 h-5 mr-3" />,
    },
    {
      key: "jvm",
      label: "JVM Параметры",
      icon: <FiSliders className="w-5 h-5 mr-3" />,
    },
    {
      key: "customization",
      label: "Персонализация",
      icon: <FiUser className="w-5 h-5 mr-3" />,
    },
  ];

  return (
    <div className="min-h-screen flex overflow-hidden bg-[#0d0d0d] relative">
      {/* SIDEBAR */}
      <motion.aside
        animate={{ x: 0 }}
        className="fixed left-0 top-0 bottom-0 w-64 bg-[#111111] border-r border-[#2a2a2a] p-6 overflow-hidden flex flex-col"
        initial={{ x: -300 }}
        transition={fastTransition}
      >
        {/* Меню */}
        <nav className="flex-1 space-y-2 relative">
          {menuItems.map((item) => (
            <motion.button
              key={item.key}
              className={`w-full flex items-center p-3 rounded-xl transition-colors relative overflow-hidden ${
                activeTab === item.key
                  ? "bg-[#1a1a1a] text-white"
                  : "text-gray-400 hover:bg-gray-800"
              }`}
              transition={fastTransition}
              whileHover={{ scale: 1.02 }}
              onClick={() => setActiveTab(item.key)}
            >
              {activeTab === item.key && (
                <motion.div
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-transparent"
                  initial={{ opacity: 0 }}
                />
              )}
              {item.icon}
              <span>{item.label}</span>
            </motion.button>
          ))}
        </nav>

        {/* Кнопка "Главная" внизу SIDEBAR */}
        <div className="mt-auto">
          <Link
            className="w-full flex items-center p-3 rounded-xl transition-colors text-gray-400 hover:bg-gray-800"
            href="/"
          >
            <FiHome className="w-5 h-5 mr-3" />
            <span>Главная</span>
          </Link>
        </div>
      </motion.aside>

      {/* Основной контент */}
      <main className="flex-1 p-10 overflow-y-auto ml-64">
        <LayoutGroup>
          <AnimatePresence mode="wait">
            {/* ▶️ Настройки запуска */}
            {activeTab === "launch" && (
              <motion.section
                key="launch"
                animate={{ opacity: 1, x: 0 }}
                className="bg-[#111111] p-8 rounded-3xl shadow-2xl border border-[#2a2a2a] relative mb-10"
                exit={{ opacity: 0, x: -50 }}
                initial={{ opacity: 0, x: 50 }}
                transition={fastTransition}
              >
                <h2 className="text-2xl text-white mb-6 font-bold">
                  Настройки запуска
                </h2>
                <div className="space-y-6">
                  <motion.div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-400 mb-3">
                        Путь к игре
                      </label>
                      <motion.div
                        className="flex items-center gap-2"
                        whileHover={{ scale: 1.01 }}
                      >
                        <input
                          className="w-full p-3 bg-[#1a1a1a] border-2 border-[#2a2a2a] rounded-xl text-gray-200"
                          placeholder="C:\Minecraft\RiseOfTheBlackSun"
                          type="text"
                        />
                        <button className="p-2 bg-purple-600 rounded-lg hover:bg-purple-700">
                          <FiSettings className="w-5 h-5" />
                        </button>
                      </motion.div>
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-3">
                        Параметры запуска
                      </label>
                      <div className="space-y-3">
                        {["--fullscreen", "--optimize", "--disable-mods"].map(
                          (param, i) => (
                            <motion.div
                              key={param}
                              animate={{ opacity: 1 }}
                              className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-lg border-2 border-[#2a2a2a]"
                              initial={{ opacity: 0 }}
                              transition={{ delay: i * 0.1 }}
                            >
                              <span className="text-gray-200">{param}</span>
                              <Switch />
                            </motion.div>
                          ),
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.section>
            )}

            {/* ▶️ Моды */}
            {activeTab === "mods" && (
              <motion.section
                key="mods"
                animate={{ opacity: 1, x: 0 }}
                className="bg-[#111111] p-8 rounded-3xl shadow-2xl border border-[#2a2a2a] relative mb-10"
                exit={{ opacity: 0, x: -50 }}
                initial={{ opacity: 0, x: 50 }}
                transition={fastTransition}
              >
                <h2 className="text-2xl text-white mb-6 font-bold">Моды</h2>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl text-purple-400 mb-4">
                      Обязательные моды
                    </h3>
                    <ul className="space-y-2">
                      {requiredMods.map((mod) => (
                        <li
                          key={mod.id}
                          className="flex items-center justify-between p-2 bg-[#1a1a1a] rounded-md border border-[#2a2a2a]"
                        >
                          <span className="text-gray-200">{mod.name}</span>
                          <span className="text-gray-400 text-sm">
                            Обязательно
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl text-purple-400 mb-4">
                      Дополнительные моды
                    </h3>
                    <ul className="space-y-2">
                      {optionalMods.map((mod) => (
                        <li
                          key={mod.id}
                          className="flex items-center justify-between p-2 bg-[#1a1a1a] rounded-md border border-[#2a2a2a]"
                        >
                          <span className="text-gray-200">{mod.name}</span>
                          <Switch isOn={mod.enabled} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.section>
            )}

            {/* ▶️ Версии */}
            {activeTab === "versions" && (
              <motion.section
                key="versions"
                animate={{ opacity: 1, x: 0 }}
                className="bg-[#111111] p-8 rounded-3xl shadow-2xl border border-[#2a2a2a] relative mb-10"
                exit={{ opacity: 0, x: -50 }}
                initial={{ opacity: 0, x: 50 }}
                transition={fastTransition}
              >
                <h2 className="text-2xl text-white mb-6 font-bold">Версии</h2>
                <ul className="space-y-4">
                  {versions.map((version) => (
                    <li
                      key={version.id}
                      className={`p-4 rounded-md border cursor-pointer transition-colors ${
                        activeVersion === version.id
                          ? "bg-purple-600 border-transparent"
                          : "bg-[#1a1a1a] border-[#2a2a2a] hover:bg-[#2a2a2a]"
                      }`}
                      onClick={() => setActiveVersion(version.id)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-semibold text-white">
                          {version.name}
                        </span>
                        {activeVersion === version.id && (
                          <FiCheckCircle className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <p className="text-sm text-gray-300">
                        Дата: {version.releaseDate}
                      </p>
                      <p className="text-sm text-gray-300">
                        {version.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </motion.section>
            )}

            {/* ▶️ JVM Параметры */}
            {activeTab === "jvm" && (
              <motion.section
                key="jvm"
                animate={{ opacity: 1, x: 0 }}
                className="bg-[#111111] p-8 rounded-3xl shadow-2xl border border-[#2a2a2a] relative mb-10"
                exit={{ opacity: 0, x: -50 }}
                initial={{ opacity: 0, x: 50 }}
                transition={fastTransition}
              >
                <h2 className="text-2xl text-white mb-6 font-bold">
                  JVM Параметры
                </h2>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl text-purple-400 mb-4">
                      Управление памятью
                    </h3>
                    <div className="p-6 bg-[#1a1a1a] rounded-xl border-2 border-[#2a2a2a]">
                      <RangeSlider
                        max={16}
                        min={1}
                        values={[memory.min, memory.max]}
                        onChange={([min, max]) => setMemory({ min, max })}
                      />
                      <div className="flex justify-between mt-4 text-gray-400">
                        <span>Min: {memory.min}GB</span>
                        <span>Max: {memory.max}GB</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl text-purple-400 mb-4">
                      Дополнительные параметры
                    </h3>
                    <div className="space-y-3">
                      {jvmParams.map((param, index) => (
                        <motion.div
                          key={param.id}
                          animate={{ opacity: 1 }}
                          className="flex items-center gap-2"
                          initial={{ opacity: 0 }}
                        >
                          <input
                            className="w-full p-3 bg-[#1a1a1a] border-2 border-[#2a2a2a] rounded-xl text-gray-200"
                            type="text"
                            value={param.value}
                            onChange={(e) => {
                              const newParams = [...jvmParams];

                              newParams[index].value = e.target.value;
                              setJvmParams(newParams);
                            }}
                          />
                          <button
                            className="p-2 hover:bg-gray-800 rounded-lg"
                            onClick={() =>
                              navigator.clipboard.writeText(param.value)
                            }
                          >
                            <FiCopy className="w-5 h-5 text-purple-500" />
                          </button>
                          <button
                            className="p-2 hover:bg-red-900/50 rounded-lg"
                            onClick={() => removeJvmParam(param.id)}
                          >
                            <FiX className="w-5 h-5 text-red-500" />
                          </button>
                        </motion.div>
                      ))}
                      <motion.button
                        className="flex items-center gap-2 text-purple-400 hover:text-purple-300"
                        whileHover={{ scale: 1.05 }}
                        onClick={addJvmParam}
                      >
                        <FiPlus className="w-5 h-5" />
                        Добавить параметр
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.section>
            )}

            {/* ▶️ Персонализация */}
            {activeTab === "customization" && (
              <motion.section
                key="customization"
                animate={{ opacity: 1, x: 0 }}
                className="bg-[#111111] p-8 rounded-3xl shadow-2xl border border-[#2a2a2a] relative mb-10"
                exit={{ opacity: 0, x: -50 }}
                initial={{ opacity: 0, x: 50 }}
                transition={fastTransition}
              >
                <h2 className="text-2xl text-white mb-6 font-bold">
                  Персонализация
                </h2>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl text-purple-400 mb-4">
                      История скинов
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      {skins.map((skin) => (
                        <motion.div
                          key={skin}
                          className={`relative cursor-pointer border-2 rounded-xl overflow-hidden ${
                            activeSkin === skin
                              ? "border-purple-500"
                              : "border-[#2a2a2a]"
                          }`}
                          whileHover={{ scale: 1.05 }}
                          onClick={() => setActiveSkin(skin)}
                        >
                          <img
                            alt={skin}
                            className="w-full h-32 object-cover"
                            src={`/skins/${skin}.png`}
                          />
                          {activeSkin === skin && (
                            <motion.div
                              animate={{ opacity: 1 }}
                              className="absolute inset-0 bg-purple-500/20"
                              initial={{ opacity: 0 }}
                            />
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl text-purple-400 mb-4">
                      Загрузка плаща
                    </h3>
                    <motion.div
                      className="border-2 border-dashed border-purple-500/30 rounded-xl p-6 text-center hover:border-purple-500/50 transition-colors cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="text-4xl mb-2 text-purple-500">
                        <FiUpload />
                      </div>
                      <p className="text-gray-400">
                        Перетащите файл сюда или кликните для загрузки
                      </p>
                    </motion.div>
                  </div>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </LayoutGroup>
      </main>
    </div>
  );
}
