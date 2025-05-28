import { reactive, watch } from 'vue'
import { defineStore } from 'pinia'
import { DYNAMIC_IMAGES } from '@/constants/dynamicImages'
import type { GameState } from '@/types/GameState'

export const useGameStore = defineStore('game', () => {
  const gameState = reactive<GameState>({
    isButtonActive: false,
    isHitting: false,
    isWorking: false,
    isNewgame: false,
    isHidden: true,
    isLooser: false,
    isWinner: false,
    actionText: 'Привет,\nпроверим твою силу!',
  })

  const resetState = () => {
    return Object.assign(gameState, {
      isButtonActive: false,
      isHitting: false,
      isWorking: true,
      isNewgame: true,
      isWinner: false,
      isLooser: false,
    })
  }

  const runGame = (): void => {
    gameState.isHitting = true
    setTimeout(() => {
      gameState.isButtonActive = true
    }, 300)
    gameState.isHidden = false
  }

  const animatePower = (powerMeter: HTMLImageElement, power: number): void => {
    const totalSteps = 8
    const targetStep = Math.round((power / 100) * totalSteps)
    let currentStep = 0

    const interval = setInterval(() => {
      powerMeter.src = DYNAMIC_IMAGES.MEASURE[currentStep]
      currentStep++

      if (currentStep > targetStep) {
        clearInterval(interval)
        gameState.isHidden = true
        gameState.isNewgame = false
        gameState.isWinner = power > 90
        gameState.isLooser = power <= 90
      }
    }, 300)
  }

  const updateActionText = () => {
    if (gameState.isWinner)
      gameState.actionText = 'ВОТ ЭТО СИЛА! \nТы выбил главный приз! \nРубин!'
    else if (gameState.isLooser)
      gameState.actionText = 'Неплохо! \nПопробуйте ещё раз!'
    else if (gameState.isWorking)
      gameState.actionText = 'Жми на кнопку \nв нужный момент!'
    else gameState.actionText = 'Привет,\nпроверим твою силу!'
  }

  watch(
    [
      () => gameState.isWinner,
      () => gameState.isLooser,
      () => gameState.isWorking,
    ],
    updateActionText,
    { immediate: true },
  )

  return { animatePower, runGame, resetState, gameState, updateActionText }
})
