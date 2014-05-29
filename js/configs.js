define([], function(){

  var Configs = {

    SECONDS_PER_FRAME: 1, // seconds

    CANVAS_SIZE_WIDTH: 400,

    CANVAS_SIZE_HEIGHT: 400,

    // Graphics

    BLOCK_SIZE : 20,

    WALL_COLOR: '#2F4F4F',

    FLOOR_COLOR: '#F5FFFA',

    STAGES_COLOR: '#4B0082',

    TABLE_COLOR: '#FF0000',

    CHAIR_COLOR: '#00FF00',

    MAIN_ACTOR_COLOR: '#0000FF',

    WATER_VENDING_MACHINE_COLOR: '#00CED1',

    WC_COLOR: '#FFD700',

    FOOD_VENDING_MACHINE_COLOR: '#8B4513',

    PORTAL_COLOR: '#6699FF',

    // Game states

    GAME_MODE_PLAYING: 0,

    GAME_MODE_POPUP: 1,

    GAME_MODE_TITLE_SCREEN: 2,

    GAME_MODE_PAUSE: 3,

    // Viewport

    VIEWPORT_SIZE: 20,

    VIEWPORT_SAFE_ZONE: 5
  }

  return Configs;
})
