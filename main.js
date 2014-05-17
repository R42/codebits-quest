requirejs.config({
  paths: {
    'jquery'         : 'lib/jquery-2.1.0.min',

    'engine'         : 'js/engine',
    'map'            : 'js/map',
    'user'           : 'js/user',
    'userStats'      : 'js/userStats',
    'genericObject'  : 'js/objects/genericObject',
    'stage'          : 'js/objects/stage',
    'clock'          : 'js/clock',
    'gameInformation': 'js/gameInformation',
    'layout'         : 'js/layout',
    'genericPopup'   : 'js/popups/genericPopup',
    'configs'        : 'js/configs'
  },

  shim: {
    'jquery': {
      exports: '$'
    }
  }
});

var e;
require(['engine'], function(Engine) {
  e = Engine;
  Engine.initialize();
  Engine.start();
});
