<script setup>
import { ref, watch } from 'vue'
import { DYNAMIC_IMAGES } from '@/constants/dynamicImages'
import { useGameStore } from '@/stores/GameStore'

const gameStore = useGameStore()

const powerMeter = ref(null)

const emit = defineEmits(['update:modelValue'])

watch(
  powerMeter,
  (newVal) => {
    if (newVal) {
      emit('update:modelValue', newVal)
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="meter">
    <div class="meter__measure">
      <img
        src="@/assets/images/measure_main.png"
        loading="lazy"
        alt="Силомер"
        class="measure__image"
      />
      <div class="meter__power">
        <img 
          :src="DYNAMIC_IMAGES.MEASURE[0]" 
          alt="Шкала силы" 
          ref="powerMeter" 
        />
        <div class="meter__ruby">
          <img 
            src="@/assets/images/ruby.png" 
            alt="Рубин" 
            class="meter__ruby-image" 
          />
        </div>
        <div 
          v-if="gameStore.gameState.isWinner" 
          class="meter__glow"
        >
          <img 
            src="@/assets/images/layer_glow.png" 
            alt="Свечение" 
            class="meter__glow-image" 
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.meter__ruby {
  position: absolute;
  width: 68px;
  height: 68px;
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}

.meter__glow {
  position: absolute;
  width: 123px;
  height: 123px;
  top: -3%;
  left: 19%;
  transform: rotate(-135deg);
  z-index: 1;
}

.meter__glow-image,.meter__ruby-image,.measure__image {
  width: 100%;
}

.meter__power {
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translateX(-50%);
  transition: all 2s ease-in;
}

.meter {
  display: flex;
}

.meter__measure {
  margin: 92px auto 0;
  position: relative;
}
</style>
