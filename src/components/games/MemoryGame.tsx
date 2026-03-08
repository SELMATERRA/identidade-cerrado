"use client";

import { useMemo, useState } from "react";

const animals = ["🦜", "🦊", "🐺", "🦥", "🐢", "🦉"];

interface Card {
  id: number;
  value: string;
  flipped: boolean;
  matched: boolean;
}

function shuffle<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

export function MemoryGame() {
  const initialCards = useMemo<Card[]>(() => {
    const deck = shuffle([...animals, ...animals]).map((value, index) => ({
      id: index,
      value,
      flipped: false,
      matched: false
    }));
    return deck;
  }, []);

  const [cards, setCards] = useState<Card[]>(initialCards);
  const [selected, setSelected] = useState<number[]>([]);

  function handleCardClick(index: number) {
    const card = cards[index];
    if (card.flipped || card.matched || selected.length === 2) return;

    const updated = cards.map((c, i) => (i === index ? { ...c, flipped: true } : c));
    const nextSelected = [...selected, index];

    setCards(updated);
    setSelected(nextSelected);

    if (nextSelected.length === 2) {
      const [first, second] = nextSelected;
      if (updated[first].value === updated[second].value) {
        setTimeout(() => {
          setCards((current) =>
            current.map((c, i) => (i === first || i === second ? { ...c, matched: true } : c))
          );
          setSelected([]);
        }, 300);
      } else {
        setTimeout(() => {
          setCards((current) =>
            current.map((c, i) => (i === first || i === second ? { ...c, flipped: false } : c))
          );
          setSelected([]);
        }, 700);
      }
    }
  }

  return (
    <div>
      <h3 className="mb-3 text-lg font-semibold text-cerrado-800">Jogo da Memória: Animais do Cerrado</h3>
      <div className="grid grid-cols-4 gap-3">
        {cards.map((card, index) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(index)}
            className="aspect-square rounded-lg border border-cerrado-200 bg-white text-2xl"
          >
            {card.flipped || card.matched ? card.value : "?"}
          </button>
        ))}
      </div>
    </div>
  );
}
