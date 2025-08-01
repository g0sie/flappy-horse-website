// screen
const pageHeight = window.innerHeight - 7 * 16 - 2;
export const SCREEN_HEIGHT = 720;
export const SCREEN_WIDTH = isLandscape()
  ? 1280
  : (window.innerWidth * 720) / pageHeight;

// physics
export const GRAVITY = 800;
export const VELOCITY = -300;

// horse
export const JUMP_VELOCITY = -420;
export const HORSE_INITIAL_POSITION = {
  x: SCREEN_WIDTH / 10,
  y: (SCREEN_HEIGHT - JUMP_VELOCITY) / 2,
};

// fingers
export const IS_PRIDE_MONTH = new Date().getMonth() === 5;
export const FINGERS_TO_RENDER = 6;
export const FINGER_VERTICAL_GAP = 200;
export const FINGER_HORIZONTAL_DISTANCE = 450;
export const FIRST_FINGER_POSITION_X = Math.min(SCREEN_WIDTH, 480);
export const FINGER_MIN_DISTANCE_FROM_TOP_OF_SCREEN = 80;

// font
export const MENU_FONT = "VT323";

function isLandscape() {
  return window.innerWidth > pageHeight;
}
