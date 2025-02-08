// /components/RangeSlider.tsx
"use client";

import { useRef, useEffect } from "react";

interface RangeSliderProps {
  /** Минимальное значение */
  min: number;
  /** Максимальное значение */
  max: number;
  /** Текущий диапазон значений: [минимум, максимум] */
  values: [number, number];
  /** Функция, вызываемая при изменении диапазона */
  onChange: (values: [number, number]) => void;
}

export default function RangeSlider({
  min,
  max,
  values,
  onChange,
}: RangeSliderProps) {
  const [minVal, maxVal] = values;
  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);
  const range = useRef<HTMLDivElement>(null);

  // Функция для получения процентного соотношения от текущего значения
  const getPercent = (value: number) => {
    return ((value - min) / (max - min)) * 100;
  };

  // Обновляем стиль выделенной области трека при изменении значений
  useEffect(() => {
    if (minValRef.current && maxValRef.current && range.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(maxVal);

      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, maxVal, min, max]);

  return (
    <div className="relative w-full">
      {/* Фон трека */}
      <div className="absolute top-1/2 transform -translate-y-1/2 h-1 w-full bg-gray-300 rounded" />
      {/* Выделенная область (между ползунками) */}
      <div
        ref={range}
        className="absolute top-1/2 transform -translate-y-1/2 h-1 bg-purple-500 rounded"
      />

      {/* Ползунок для нижнего значения */}
      <input
        ref={minValRef}
        className="absolute w-full pointer-events-none appearance-none"
        max={max}
        min={min}
        style={{ zIndex: 3 }}
        type="range"
        value={minVal}
        onChange={(e) => {
          const value = Math.min(Number(e.target.value), maxVal - 1);

          onChange([value, maxVal]);
        }}
      />

      {/* Ползунок для верхнего значения */}
      <input
        ref={maxValRef}
        className="absolute w-full pointer-events-none appearance-none"
        max={max}
        min={min}
        style={{ zIndex: 4 }}
        type="range"
        value={maxVal}
        onChange={(e) => {
          const value = Math.max(Number(e.target.value), minVal + 1);

          onChange([minVal, value]);
        }}
      />

      {/* Стилизация ползунков (кроссбраузерно) */}
      <style jsx>{`
        input[type="range"] {
          -webkit-appearance: none;
          position: absolute;
          width: 100%;
          height: 0;
          pointer-events: all;
          background: transparent;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #fff;
          border: 2px solid #a855f7; /* Цвет из палитры Tailwind: purple-500 */
          cursor: pointer;
          margin-top: -6px; /* Для центрирования относительно трека */
        }
        input[type="range"]::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #fff;
          border: 2px solid #a855f7;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
