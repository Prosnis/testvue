<script setup lang="ts">
  import { ref, useTemplateRef } from 'vue'
  import { useGameStore } from '@/stores/GameStore'
  import { DYNAMIC_IMAGES } from '@/constants/dynamicImages'
  import PowerMeter from '@/components/PowerMeter.vue'
  import ScaleIndicator from '@/components/ScaleIndicator.vue'
  import RobotDisplay from '@/components/RobotDisplay.vue'
  import HitButton from '@/components/HitButton.vue'
  import type { ScaleIndicatorExposed } from '@/types/ScaleIndicatorExposed'

  const gameStore = useGameStore()

  const powerMeterElement = ref<HTMLImageElement | null>(null)
  const scaleRef = useTemplateRef<ScaleIndicatorExposed>('scaleRef')

  const startGame = () => {
    if (!powerMeterElement.value || !scaleRef.value) return

    gameStore.resetState()
    powerMeterElement.value.src = DYNAMIC_IMAGES.MEASURE[0]
    scaleRef.value.initialScale()
  }

  const calculateAndDisplayPower = () => {
    if (!scaleRef.value || !powerMeterElement.value) return
    gameStore.runGame()
    const power = scaleRef.value.getHitPower()
    scaleRef.value.displayHitPower()
    gameStore.animatePower(powerMeterElement.value, power)
  }
</script>

<template>
  <main class="main">
    <PowerMeter @elementIsReady="(el) => (powerMeterElement = el)" />

    <div class="control">
      <ScaleIndicator ref="scaleRef" />
      <HitButton
        @startGame="startGame"
        @calculateAndDisplayPower="calculateAndDisplayPower"
      />
      <RobotDisplay />
    </div>

    <div>
      <img
        src="@/assets/images/bottom_navigation.png"
        alt="навигация"
        class="nav"
      />
    </div>
  </main>
</template>

<style scoped>
  .main {
    width: 360px;
    height: 640px;

    margin: 0 auto;
    background-image: url('@/assets/images/bg_top.png');
    background-size: cover;

    position: relative;
  }

  .control {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    height: 166px;
  }

  .nav {
    position: absolute;
    bottom: 0;
  }
</style>
