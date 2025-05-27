<script setup lang="ts">
import { useGameStore } from '@/stores/GameStore'
import { DYNAMIC_IMAGES } from '@/constants/dynamicImages'
import { computed } from 'vue'

const gameStore = useGameStore()

defineEmits<{
  (e : 'startGame'): void
  (e : 'calculateAndDisplayPower'): void
}>()

const buttonText = computed(() => (gameStore.gameState.isNewgame ? 'УДАР' : 'НОВАЯ ИГРА'))

const buttonVisualDisplay = computed(() =>
  gameStore.gameState.isButtonActive
    ? DYNAMIC_IMAGES.BUTTON.ACTIVE
    : DYNAMIC_IMAGES.BUTTON.INACTIVE,
)

const hammerClasses = computed(() => ({
  active: gameStore.gameState.isWorking && !gameStore.gameState.isHitting,
  hit: gameStore.gameState.isHitting,
}))

const buttonClasses = computed(() =>
  gameStore.gameState.isNewgame ? 'control__hit-button--punch' : 'control__hit-button--newgame',
)
</script>

<template>
  <div class="control__hit">
    <div class="control__button-visual">
      <img class="control__button-image" :src="buttonVisualDisplay" alt="Кнопка" />
      <img
        class="control__hammer"
        :class="hammerClasses"
        src="@/assets/images/hammer.png"
        alt="Молот"
      />
    </div>

    <span v-show="gameStore.gameState.isHidden" class="control__text">
      {{ gameStore.gameState.actionText }}</span
    >

    <button
      v-show="gameStore.gameState.isHidden"
      :class="buttonClasses"
      @click="
        gameStore.gameState.isNewgame ? $emit('calculateAndDisplayPower') : $emit('startGame')
      "
    >
      {{ buttonText }}
    </button>
  </div>
</template>

<style scoped>
.control__hit {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 5px;
  font-weight: 700;
}

.control__button-visual {
  position: relative;
  width: 124px;
  height: 68px;
}

.control__button-image {
  width: 100%;
}

.control__hammer {
  width: 100%;
  position: absolute;
  transform: rotate(-43deg);
  top: -50%;
  left: 55%;
  transition: all 0.5s;
}

.control__hammer.active {
  transform: rotate(0deg);
  top: -100%;
  left: 65%;
}

.control__hammer.hit {
  transform: rotate(-90deg);
  top: -90%;
  left: 20%;
  transition: all 0.6s;
}

.control__text {
  color: white;
  font-size: 14px;
  white-space: pre-line;
  line-height: 1.2;
}

.control__hit-button--newgame {
  width: 172px;
  height: 36px;
  border: 1px solid white;
  border-radius: 4px;
  color: white;
  background-color: #ff42e0;
  font-weight: 700;
  cursor: pointer;
  font-family: inherit;
  margin-top: auto;
}

.control__hit-button--punch {
  width: 172px;
  height: 36px;
  border: 1px solid #bb20a2;
  border-radius: 4px;
  color: #bb20a2;
  background-color: #ffdf35;
  font-weight: 700;
  cursor: pointer;
  font-family: inherit;
  margin-top: auto;
}
</style>
