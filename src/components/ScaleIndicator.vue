<script setup lang="ts">
import {ref, useTemplateRef } from 'vue'
import type { ScaleIndicatorExposed } from '@/types/ScaleIndicatorExposed'

const scaleMeter = useTemplateRef<HTMLElement>('scaleMeter')
const hitPower = ref<number | null>(null)

const getHitPower = () :number | null => {

  if (!scaleMeter.value || !scaleMeter.value.parentElement) return null

  const wrapperHeight = scaleMeter.value.parentElement.clientHeight
  hitPower.value = parseFloat(
    ((scaleMeter.value.clientHeight / wrapperHeight) * 100).toFixed(2)
  )
  return hitPower.value
}

const initialScale = () => {
  if (!scaleMeter.value) return

  scaleMeter.value.style.height = '0%'
  scaleMeter.value.style.animation = ''
  scaleMeter.value.classList.remove('control__indicator--animated')
  scaleMeter.value.classList.add('control__indicator--animated')
}

const displayHitPower = () => {
  if (!scaleMeter.value) return

  scaleMeter.value.style.animation = 'none'
  scaleMeter.value.style.height = `${hitPower.value}%`
}

defineExpose({
  initialScale,
  displayHitPower,
  getHitPower,
})
</script>

<template>
  <div class="control__scale">
    <img class="control__scale--image" src="@/assets/images//scale.png" alt="Шкала силы удара" />
    <div class="control__fill">
      <div class="control__indicator" ref="scaleMeter"></div>
    </div>
    <img class="control__scale-measure" src="@/assets/images/scale-1.png" alt="Мера силы удара" />
  </div>
</template>

<style scoped>
.control__scale {
  position: relative;
  width: 48px;
  height: 147px;
  margin-left: 23px;
  margin-top: auto;
}

.control__scale--image {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.control__fill {
  position: absolute;
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%);
  width: 34px;
  height: 145px;
  z-index: 2;
}

.control__indicator {
  width: 100%;
  background-color: #00d355;
  position: absolute;
  bottom: 0;
  transition: height 0.3s ease;
  animation: none;
  border-radius: 1px;
}

.control__indicator::before {
  content: '';
  position: absolute;
  top: -1px;
  left: -20%;
  height: 3px;
  width: 48px;
  background-color: white;
  border-radius: 2px;
  z-index: 1;
}

.control__indicator--animated {
  animation: fillAnimation 0.3s infinite alternate;
}

@keyframes fillAnimation {
  0% {
    height: 0%;
  }

  100% {
    height: 100%;
  }
}

.control__scale-measure {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
}
</style>
