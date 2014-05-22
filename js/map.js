define(
  [
    'jquery',
    'clock',
    'genericObject',
    'stage',
    'genericPopup',
    'configs',
    'ground_floor_level'
  ],
  function($, Clock, GenericObject, Stage, Popup, Configs, GroundFloorLevel){

    var element = $('<canvas>').prop('width', 800). prop('height', 300)[0];

    var actor;

    var map;

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

    function loadLevel(level){

      map = new Array(level.height);

      for(line = 0; line < level.map.length; ++line){

        map[line] = level.map[line].split("");
      }

      var mapObject;

      for(mapObjIdx = 0; mapObjIdx < level.objects.length; ++mapObjIdx){

        mapObject = level.objects[mapObjIdx];
        map[mapObject.y][mapObject.x] = mapObject.name;
      }
    }

    var Map = {

        initialize: function(user){

          loadLevel(GroundFloorLevel);

          actor = user;

        },

        draw: function(){

          var context = element.getContext('2d');

          // draw terrain

          for (var i = 0; i < map.length; i++) {

            var line = map[i];

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

        getBounds: function() {
          return {
            width: map[0].length,
            height: map.length
          };
        },

        getUserLocation: function(){

          return map[actor.getY()][actor.getX()];
        },

        getLocation: function(x, y){

          return map[y][x];
        }
    };

    return Map;

});
