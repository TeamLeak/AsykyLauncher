// /components/Switch.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface SwitchProps {
  /** Значение переключателя (если используется в контролируемом режиме) */
  isOn?: boolean;
  /** Флаг, блокирующий изменение состояния */
  disabled?: boolean;
  /** Callback, вызываемый при изменении состояния */
  onChange?: (value: boolean) => void;
}

export default function Switch({
  isOn: controlledOn,
  disabled = false,
  onChange,
}: SwitchProps) {
  // Если пропс isOn не передан – используем внутреннее состояние
  const [internalOn, setInternalOn] = useState(false);
  const isControlled = controlledOn !== undefined;
  const isOn = isControlled ? controlledOn : internalOn;

  const toggle = () => {
    if (disabled) return;
    if (isControlled) {
      onChange && onChange(!controlledOn);
    } else {
      setInternalOn(!internalOn);
      onChange && onChange(!internalOn);
    }
  };

  return (
    <div
      className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors
        ${
          disabled
            ? "bg-gray-600 cursor-not-allowed"
            : isOn
              ? "bg-purple-500"
              : "bg-gray-300"
        }`}
      onClick={toggle}
    >
      <motion.div
        layout
        className="w-4 h-4 bg-white rounded-full shadow-md"
        style={{ x: isOn ? 24 : 0 }}
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
      />
    </div>
  );
}
