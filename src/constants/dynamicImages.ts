export const DYNAMIC_IMAGES = {
  MEASURE: Array.from({ length: 9 }, (_, i) => `/testvue/images/measure/power_${i}.png`),
  ROBOT: {
    DEFAULT: '/testvue/images/robot/robot_1.png',
    WINNER: '/testvue/images/robot/robot_3.png',
    LOOSER: '/testvue/images/robot/robot_2.png',
  },
  BUTTON: {
    ACTIVE: '/testvue/images/button/button_active.png',
    INACTIVE: '/testvue/images/button/button.png',
  },
} as const
