'use client'
import { cn } from "@/utils/cn";
import { useEffect, useState } from "react";

const icons = ['👋', '💢', '🌼', '🕸', '🤢', '✨', '👀', '🎂']

type CellType = { icon: string, matched: boolean }

function Cell({ cell, onClick, showFrontView = false }: { cell: CellType, onClick: () => void, index: number, showFrontView?: boolean }) {
  const [fliped, setFlipped] = useState(false);


  useEffect(() => {

  }, [])

  function flip() {
    setFlipped(!fliped)
    onClick()
  }

  return (
    <button
      onClick={flip}
      className={cn(
        "bg-stone-200 rounded -scale-x-100 aspect-square flex items-center justify-center text-4xl duration-200 transition-all ease-in-out",
        !showFrontView && "scale-x-100 bg-stone-700",
        cell?.matched && "bg-green-400"
      )}>
      {showFrontView ? cell?.icon : '?'}
    </button>
  )
}
export default function Home() {
  const [cells, setCells] = useState<CellType[]>(Array(16).fill(null)); //
  const [isViewAll, setIsViewAll] = useState(false)
  const [currentOpened, setCurrentOpened] = useState<number[]>([])


  useEffect(() => {
    startGame()
  }, [])

  const startGame = () => {
    const iconsSorted = [...icons, ...icons].sort(() => 0.5 - Math.random())
    setCells(iconsSorted.map(icon => ({ icon, matched: false })))
    setCurrentOpened([])
    setIsViewAll(true)
    setTimeout(() => {
      setIsViewAll(false)
    }, 1000)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full max-w-xs flex flex-col items-center gap-y-5">
        <div className="grid grid-cols-4 gap-2 w-full">
          {cells.map((cell, index) => (
            <Cell
              cell={cell}
              index={index}
              key={index}
              showFrontView={isViewAll || currentOpened.includes(index) || cell?.matched}
              onClick={() => {
                if (cell.matched) return
                setCurrentOpened(c => [...c, index])

                if (currentOpened.length === 1 && cells[currentOpened[0]]?.icon === cells[index].icon) {
                  setCells((cells) => {
                    cells[currentOpened[0]].matched = true;
                    cells[index].matched = true;
                    return cells
                  })
                }

                if (currentOpened.length === 1) {
                  setTimeout(() => {
                    setCurrentOpened([])
                  }, 500)
                }
              }}
            />
          ))}
        </div>
        <button className="bg-blue-500 text-white rounded-full px-5 py-3" onClick={startGame}>
          Start New Game
        </button>
      </div>
    </main>
  );
}
