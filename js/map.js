define(
  [
    'jquery',
    'clock',
    'genericObject',
    'stage',
    'genericPopup',
    'configs',
    'levels'
  ],
  function($, Clock, GenericObject, Stage, Popup, Configs, Levels){

    var element = $('<canvas>').prop('width', 800). prop('height', 300)[0];

    var actor;

    var levels;

    var currentLevel;

    function drawBox(context, position, color){
      context.fillStyle = color;
      context.fillRect(
        position.X * Configs.BLOCK_SIZE,
        position.Y * Configs.BLOCK_SIZE,
        Configs.BLOCK_SIZE,
        Configs.BLOCK_SIZE
      );
    }

    function drawActor(context){
      drawBox(context, {X:actor.getX(), Y:actor.getY()}, 'rgb(0,0,255)');
      //drawnMap[actor.getY()][actor.getX()] = '@';
    }

    function drawTerrain(terrain, context, position){

      if(typeof terrain === 'object'){
        terrain.draw(context, position);
        return;
      }

      var color;
      switch(terrain){
        case '.':
          color = Configs.FLOOR_COLOR;
          break;
        case '#':
          color = Configs.WALL_COLOR;
          break;
        case 'o':
          color = 'rgb(255,0,0)';
          break;
        case 'c':
          color = 'rgb(0,255,0)';
      }

      drawBox(context, position, color);
    }

    function loadLevels(){

      levels = {
        names: new Array(Levels.length),
        index: new Array(Levels.length)
      }

      for(i = 0; i < Levels.length; ++i){
        var level = loadLevel(Levels[i]);

        levels.names[level.identifier] = level;
        levels.index[i] = level;
      }

      currentLevel = levels.index[0];
    }

    function loadLevel(level){

      ret = new Array(level.height);
      for(line = 0; line < level.map.length; ++line){

        ret[line] = level.map[line].split("");
      }

      var mapObject;

      for(mapObjIdx = 0; mapObjIdx < level.objects.length; ++mapObjIdx){

        mapObject = level.objects[mapObjIdx];
        ret[mapObject.y][mapObject.x] = mapObject.name;
      }

      return ret;
    }

    var Map = {

        initialize: function(user){
          loadLevels();
          actor = user;
        },

        draw: function(){
          var context = element.getContext('2d');
          // draw terrain
          for (var i = 0; i < currentLevel.length; i++) {
            var line = currentLevel[i];
            for (var j = 0; j < line.length; j++) {
              drawTerrain(line[j], context, {X:j, Y:i});
            }
          }

          // draw actors
          drawActor(context);
        },

        getContainer: function(){

          return element;
        },

        getUserLocation: function(){

          return currentLevel[actor.getY()][actor.getX()];
        },

        getLocation: function(x, y){

          return currentLevel[y][x];
        },

        travelTo: function(levelIdentifier, portalLink){

          var level = levels[levelIdentifier];

          currentLevel = level;
        }
    };

    return Map;

});
