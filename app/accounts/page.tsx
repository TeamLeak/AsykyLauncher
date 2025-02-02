"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiPlus, FiUser } from "react-icons/fi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Link } from "@heroui/link";

import { title } from "@/components/primitives";

export default function AccountsPage() {
  const router = useRouter();
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [profiles] = useState([
    {
      id: "1",
      name: "saintedlittle",
      avatar: "https://minotar.net/helm/saintedlittle/600.png",
    },
    {
      id: "2",
      name: "notch",
      avatar: "https://minotar.net/helm/notch/600.png",
    },
  ]);

  const handleProfileSelect = async (profileId: string) => {
    setIsLoading(true);
    setSelectedProfile(profileId);

    // Имитация запроса к API
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.push("/game");
    } catch (error) {
      console.error("Ошибка выбора профиля:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProfile = async () => {
    setIsLoading(true);

    // Имитация запроса на создание профиля
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.push("/login");
    } catch (error) {
      console.error("Ошибка создания профиля:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* Анимация загрузки */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 backdrop-blur-xl flex items-center justify-center z-50"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              className="h-20 w-20 border-4 border-purple-500 rounded-full border-t-transparent"
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Основной контент */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-12 relative z-10">
          {/* Заголовок */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
            initial={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className={`${title({ color: "violet" })} text-4xl`}>
              КТО ИГРАЕТ?
            </h2>
            <p className="text-gray-400 text-xl tracking-wide font-light">
              Выберите или создайте игровой профиль
            </p>
          </motion.div>
          {/* Сетка профилей */}
          <div className="flex items-center gap-8">
            {profiles.map((profile) => (
              <motion.div
                key={profile.id}
                className="relative group cursor-pointer"
                whileHover="hover"
                onClick={() => handleProfileSelect(profile.id)}
              >
                {/* Аватар профиля */}
                <motion.div
                  className="relative w-32 h-32 rounded-full border-2 border-purple-900/30 overflow-hidden shadow-xl"
                  variants={{
                    hover: {
                      scale: 1.05,
                      borderColor: "#8B5CF6",
                      boxShadow: "0 0 30px rgba(139, 92, 246, 0.3)",
                    },
                  }}
                >
                  <Image
                    alt={profile.name}
                    className="grayscale group-hover:grayscale-0 transition-all brightness-125"
                    layout="fill"
                    objectFit="cover"
                    src={profile.avatar}
                  />

                  {/* Наложение при наведении */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>

                {/* Имя профиля */}
                <motion.div
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                  variants={{
                    hover: { y: 5 },
                  }}
                >
                  <div className="bg-black/90 px-4 py-2 rounded-full text-purple-300 text-sm font-medium tracking-wide shadow-lg">
                    {profile.name}
                  </div>
                </motion.div>

                {/* Индикатор выбора */}
                {selectedProfile === profile.id && (
                  <div className="absolute top-2 right-2 bg-purple-600 w-6 h-6 rounded-full flex items-center justify-center shadow-md">
                    <FiUser className="text-white w-4 h-4" />
                  </div>
                )}
              </motion.div>
            ))}

            {/* Кнопка добавления */}
            <motion.button
              className="w-32 h-32 rounded-full bg-black/30 border-2 border-dashed border-purple-900/30 flex items-center justify-center hover:border-purple-500 transition-all group"
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              onClick={handleAddProfile}
            >
              <FiPlus className="text-purple-500 w-12 h-12 group-hover:text-purple-400 transition-colors" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
