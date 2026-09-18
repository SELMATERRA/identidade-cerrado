"use client";

import { useState } from "react";

interface Animal {
  name: string;
  symbol: string;
}

interface Card extends Animal {
  id: number;
  pairId: string;
  flipped: boolean;
  matched: boolean;
}

const animals: Animal[] = [
  { name: "Lobo-guará", symbol: "🐺" },
  { name: "Arara-canindé", symbol: "🦜" },
  { name: "Tamanduá-bandeira", symbol: "🐾" },
  { name: "Tatu-canastra", symbol: "🛡️" },
  { name: "Ema", symbol: "🪶" },
  { name: "Onça-pintada", symbol: "🐆" }
];

function shuffle<T>(items: T[]): T[] {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled;
}

function createDeck(): Card[] {
  return shuffle(
    animals.flatMap((animal, animalIndex) =>
      [0, 1].map((copy) => ({
        ...animal,
        id: Number(`${animalIndex}${copy}`),
        pairId: animal.name,
        flipped: false,
        matched: false
      }))
    )
  );
}

export function MemoryGame() {
  const [cards, setCards] = useState<Card[]>(() => createDeck());
  const [selected, setSelected] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [checkingPair, setCheckingPair] = useState(false);

  const matchedPairs = cards.filter((card) => card.matched).length / 2;
  const finished = matchedPairs === animals.length;

  function handleCardClick(index: number) {
    const card = cards[index];

    if (card.flipped || card.matched || checkingPair || selected.length === 2) {
      return;
    }

    const updatedCards = cards.map((currentCard, currentIndex) =>
      currentIndex === index ? { ...currentCard, flipped: true } : currentCard
    );
    const nextSelected = [...selected, index];

    setCards(updatedCards);
    setSelected(nextSelected);

    if (nextSelected.length !== 2) {
      return;
    }

    setMoves((currentMoves) => currentMoves + 1);
    setCheckingPair(true);

    const [firstIndex, secondIndex] = nextSelected;
    const isMatch = updatedCards[firstIndex].pairId === updatedCards[secondIndex].pairId;

    window.setTimeout(
      () => {
        setCards((currentCards) =>
          currentCards.map((currentCard, currentIndex) => {
            if (currentIndex !== firstIndex && currentIndex !== secondIndex) {
              return currentCard;
            }

            return isMatch
              ? { ...currentCard, matched: true }
              : { ...currentCard, flipped: false };
          })
        );
        setSelected([]);
        setCheckingPair(false);
      },
      isMatch ? 450 : 900
    );
  }

  function restartGame() {
    setCards(createDeck());
    setSelected([]);
    setMoves(0);
    setCheckingPair(false);
  }

  return (
    <section
      aria-labelledby="memory-game-title"
      className="rounded-2xl bg-gradient-to-b from-cerrado-50 to-white p-4 shadow-sm sm:p-6"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 id="memory-game-title" className="text-xl font-bold text-cerrado-800">
            Jogo da Memória: Animais do Cerrado
          </h3>
          <p className="mt-1 text-sm text-cerrado-700">
            Encontre os seis pares e conheça alguns moradores do nosso bioma.
          </p>
        </div>

        <button
          type="button"
          onClick={restartGame}
          className="w-full rounded-lg bg-cerrado-700 px-4 py-2 font-semibold text-white transition hover:bg-cerrado-800 focus:outline-none focus:ring-2 focus:ring-cerrado-500 focus:ring-offset-2 sm:w-auto"
        >
          Jogar novamente
        </button>
      </div>

      <div className="my-4 flex flex-wrap gap-2 text-sm font-medium text-cerrado-800">
        <span className="rounded-full bg-white px-3 py-1 shadow-sm">
          Pares: {matchedPairs} de {animals.length}
        </span>
        <span className="rounded-full bg-white px-3 py-1 shadow-sm">
          Jogadas: {moves}
        </span>
      </div>

      {finished && (
        <div
          role="status"
          className="mb-4 rounded-xl border border-cerrado-200 bg-white p-4 text-center"
        >
          <p className="text-lg font-bold text-cerrado-800">Parabéns! Você encontrou todos os animais!</p>
          <p className="mt-1 text-sm text-cerrado-700">
            Foram {moves} jogadas. Que tal tentar novamente?
          </p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3">
        {cards.map((card, index) => {
          const visible = card.flipped || card.matched;

          return (
            <button
              key={card.id}
              type="button"
              onClick={() => handleCardClick(index)}
              disabled={card.matched}
              aria-label={
                visible
                  ? `${card.name}${card.matched ? ", par encontrado" : ""}`
                  : "Carta virada"
              }
              className={`flex aspect-[4/5] min-h-24 flex-col items-center justify-center rounded-xl border-2 p-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-cerrado-500 focus:ring-offset-2 ${
                visible
                  ? "border-cerrado-300 bg-white shadow-sm"
                  : "border-cerrado-700 bg-cerrado-700 text-white hover:-translate-y-0.5 hover:bg-cerrado-800"
              } ${card.matched ? "opacity-75" : ""}`}
            >
              {visible ? (
                <>
                  <span aria-hidden="true" className="text-3xl sm:text-4xl">
                    {card.symbol}
                  </span>
                  <span className="mt-2 text-center text-xs font-semibold leading-tight text-cerrado-900 sm:text-sm">
                    {card.name}
                  </span>
                </>
              ) : (
                <>
                  <span aria-hidden="true" className="text-3xl font-bold">
                    ?
                  </span>
                  <span className="mt-1 text-xs font-semibold">Turminha do Cerrado</span>
                </>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
