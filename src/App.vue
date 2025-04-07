<script setup>
import { ref, computed,onMounted } from 'vue'

import robot1 from '@/assets/images/robot_1.png'
import robot2 from '@/assets/images/robot_2.png'

import buttonActive from '@/assets/images/button_active.png'
import button from '@/assets/images/button.png'

import scale_0 from '@/assets/images/measure/power_0.png'



const powerMeter = ref(null)
const scale = ref(null)
const actionText = ref('Привет,\nпроверим твою силу!')
const hitPower = ref(null)
const isButtonActive = ref(false)
const isHitting = ref(false)
const isWorking = ref(false)
const isNewgame = ref(false)
const isHidden = ref(true)
const isLooser = ref(false)
const isWinner = ref(false)


const powerImages = [];


const start = () => {
  isButtonActive.value = false
  isHitting.value = false
  isWorking.value = true
  isNewgame.value = true
  isWinner.value = false
  isLooser.value = false

  scale.value.style.height = '0%'
  scale.value.style.animation = ''

  powerMeter.value.src = scale_0
  scale.value.classList.remove('control__indicator--animated')
  scale.value.classList.add('control__indicator--animated')
}

const getPower = () => {
  const wrapperHeight = scale.value.parentElement.clientHeight
  hitPower.value = parseFloat((scale.value.clientHeight / wrapperHeight).toFixed(2) * 100)
  scale.value.style.animation = 'none'
  scale.value.style.height = `${hitPower.value}%`
  console.log(hitPower.value)
  isHitting.value = true
  setTimeout(() => {
    isButtonActive.value = true
  }, 300)
  isHidden.value = false
  animatePower(hitPower.value)
}

function animatePower(power) {
  const totalSteps = 8
  const targetStep = Math.round((power / 100) * totalSteps)
  let currentStep = 0

  const interval = setInterval(() => {
    powerMeter.value.src = powerImages[currentStep];
    currentStep++

    if (currentStep > targetStep) {
      clearInterval(interval)
      isHidden.value = true
      isNewgame.value = false
      if (power >= 90) {
        isWinner.value = true
      } else {
        isLooser.value = true
      }
    }
  }, 300)
}

const text = computed(() => {
  switch (true) {
    case isWinner.value:
      return 'ВОТ ЭТО СИЛА! \nТы выбил главный приз! \nРубин!'
    case isLooser.value:
      return 'Неплохо! \nПопробуйте ещё раз!'
    case isWorking.value:
      return 'Жми на кнопку \nв нужный момент!'
    default:
      return actionText.value
  }
})


onMounted(() => {
  for (let i = 0; i < 9; i++) {
  powerImages.push(`/testvue/measure/power_${i}.png`);
}
})
</script>

<template>
  <main class="main">
    <div class="meter">
      <div class="meter__measure">
        <img
          src="@/assets/images/measure_main.png"
          loading="lazy"
          alt="Силомер"
          class="measure__image"
        />
        <div class="meter__power">
          <img src="@/assets/images/measure/power_0.png" alt="Шкала силы" ref="powerMeter" />
          <div class="meter__ruby">
            <img src="@/assets/images/ruby.png" alt="" class="meter__ruby-image" />
          </div>
          <div v-if="isWinner" class="meter__glow">
            <img src="@/assets/images/layer_glow.png" alt="" class="meter__glow-image" />
          </div>
        </div>
      </div>
    </div>

    <div class="control">
      <div class="control__scale">
        <img
          class="control__scale--image"
          src="@/assets/images//scale.png"
          alt="Шкала силы удара"
        />
        <div class="control__fill">
          <div class="control__indicator" ref="scale"></div>
        </div>
        <img
          class="control__scale-measure"
          src="@/assets/images/scale-1.png"
          alt="Мера силы удара"
        />
      </div>

      <div class="control__hit">
        <div class="control__button-visual">
          <img
            class="control__button-image"
            :src="
              isButtonActive
                ? buttonActive
                : button
            "
            alt="Кнопка"
          />
          <img
            class="control__hammer"
            :class="{
              active: isWorking && !isHitting,
              hit: isHitting,
            }"
            src="@/assets/images/hammer.png"
            alt="Молот"
          />
        </div>

        <span v-show="isHidden" class="control__text"> {{ text }}</span>

        <button
          v-show="isHidden"
          :class="isNewgame ? 'control__hit-button--punch' : 'control__hit-button--newgame'"
          @click="isNewgame ? getPower() : start()"
        >
          {{ isNewgame ? 'УДАР!' : 'НОВАЯ ИГРА' }}
        </button>
      </div>

      <div class="control__robot">
        <img
          v-if="isWinner"
          class="control__robot-image"
          src="@/assets/images/robot_3.png"
          alt="Робот"
        />
        <img
          v-else
          class="control__robot-image"
          :src="isHitting ? robot2 : robot1"
          alt="Робот"
        />
      </div>
    </div>

    <div>
      <img src="@/assets/images/bottom_navigation.png" alt="навигация" class="nav" />
    </div>
  </main>
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

.meter__glow-image {
  width: 100%;
}

.meter__ruby-image {
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

.measure__image {
  width: 100%;
}

/* meter */

.control {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  height: 166px;
}

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

/* hit */

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

.control__robot {
  display: flex;
}

.control__robot-image {
  margin-top: auto;
  width: 100%;
}

.nav {
  position: absolute;
  bottom: 0;
}

.main {
  width: 360px;
  height: 640px;

  margin: 0 auto;
  background-image: url('@/assets/images/bg_top.png');
  background-size: cover;
  background-position: 0 84px;
  position: relative;
}
</style>
