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

    var element = $('<canvas>').prop('width', Configs.CANVAS_SIZE_WIDTH). prop('height', Configs.CANVAS_SIZE_HEIGHT)[0];

    var actor;

    var levels;

    var currentLevel;

    // frame around the actor

    var viewPort = { x: 0, y: 0 };

    function isVisible(position){
      if(position.X >= viewPort.x &&
        position.X <= viewPort.x + Configs.VIEWPORT_SIZE &&
        position.Y >= viewPort.y &&
        position.Y <= viewPort.y + Configs.VIEWPORT_SIZE){

        return true;
      }
    }

    function getViewPortRelativePosition(position){
      return {
        X: position.X - viewPort.x,
        Y: position.Y - viewPort.y
      };
    }

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
      var position = {X:actor.getX(), Y:actor.getY()};

      if(!isVisible(position))
        return;

      position = getViewPortRelativePosition(position);

      drawBox(context, position, Configs.MAIN_ACTOR_COLOR);
    }

    function drawTerrain(terrain, context, position){

      if(!isVisible(position))
        return;

      position = getViewPortRelativePosition(position);

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
          color = Configs.TABLE_COLOR;
          break;
        case 'c':
          color = Configs.CHAIR_COLOR;
      }

      drawBox(context, position, color);
    }

    function clearCanvas(context){
      context.clearRect(0, 0, Configs.CANVAS_SIZE_WIDTH, Configs.CANVAS_SIZE_HEIGHT);
    }

    function loadLevels(){

      levels = {
        names: new Array(Levels.length),
        index: new Array(Levels.length)
      }

      for(i = 0; i < Levels.length; ++i){
        var level = loadLevel(Levels[i]);

        levels.names[Levels[i].identifier] = level;
        levels.index[i] = level;
      }

      currentLevel = levels.index[0];
    }

    function loadLevel(level){

      ret = {
        map: new Array(level.height),
        portals: new Array(level.portals.length)
      }

      for(line = 0; line < level.map.length; ++line){

        ret.map[line] = level.map[line].split("");
      }

      var mapObject;

      for(mapObjIdx = 0; mapObjIdx < level.objects.length; ++mapObjIdx){

        mapObject = level.objects[mapObjIdx];
        ret.map[mapObject.y][mapObject.x] = mapObject.name;
      }

      // all about portals
      var portalObj;

      for(portalObjIdx = 0; portalObjIdx < level.portals.length; ++portalObjIdx){
        portalObj = level.portals[portalObjIdx];
        ret.map[portalObj.y][portalObj.x] = portalObj.portal;
        ret.portals[portalObjIdx] = portalObj;
      }

      return ret;
    }

    function updateViewPort() {

      var actorPosition = { X:actor.getX(), Y:actor.getY() }

      // calculate viewport center
      var center = (Configs.VIEWPORT_SIZE % 2) == 0?
                    Configs.VIEWPORT_SIZE/2:
                    Math.floor(Configs.VIEWPORT_SIZE/2) + 1;

      // if actor is within the safe zone no update needed
      var actorRelativePosition = getViewPortRelativePosition(actorPosition)

      var actorXOffset = actorRelativePosition.X - center;
      if(Math.abs(actorXOffset) > Configs.VIEWPORT_SAFE_ZONE){
        //outside of safe zone for x. correct
        viewPort.x = actor.getX() - center + (actorXOffset > 0? -Configs.VIEWPORT_SAFE_ZONE: Configs.VIEWPORT_SAFE_ZONE);
      }

      var actorYOffset = actorRelativePosition.Y - center;
      if(Math.abs(actorYOffset) > Configs.VIEWPORT_SAFE_ZONE){
        //outside of safe zone for y. correct
        viewPort.y = actor.getY() - center + (actorYOffset > 0? -Configs.VIEWPORT_SAFE_ZONE: Configs.VIEWPORT_SAFE_ZONE);
      }

      if(viewPort.x < 0) viewPort.x = 0;
      if(viewPort.y < 0) viewPort.y = 0;

      // fixes X
      if(currentLevel.map[actorPosition.Y].length > Configs.VIEWPORT_SIZE){
        if(viewPort.x + Configs.VIEWPORT_SIZE > currentLevel.map[actorPosition.Y].length){
          viewPort.x = currentLevel.map[actorPosition.Y].length - Configs.VIEWPORT_SIZE;
        }
      }
      // fixes Y
      if(currentLevel.map.length > Configs.VIEWPORT_SIZE){
        if(viewPort.y + Configs.VIEWPORT_SIZE > currentLevel.map.length){
          viewPort.y = currentLevel.map.length - Configs.VIEWPORT_SIZE;
        }
      }
    }

    var Map = {

        initialize: function(user){
          loadLevels();
          actor = user;
        },

        draw: function(){
          var context = element.getContext('2d');

          clearCanvas(context);

          updateViewPort();

          // draw terrain
          for (var i = 0; i < currentLevel.map.length; i++) {
            var line = currentLevel.map[i];
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

          return currentLevel.map[actor.getY()][actor.getX()];
        },

        getLocation: function(x, y){

          return currentLevel.map[y][x];
        },

        travelTo: function(levelIdentifier, portalLink){

          nextLevel = levels.names[levelIdentifier];
          if(nextLevel){
            for(portalIdx = 0; portalIdx < nextLevel.portals.length; ++portalIdx){
              var portal = nextLevel.portals[portalIdx];
              if(portal.portal.linkId == portalLink){
                viewPort.x = 0;
                viewPort.y = 0;
                currentLevel = nextLevel;
                actor.initialize({
                  x: portal.x, y: portal.y
                });
              }
            }
          }
          console.log('travelling');
        }
    };

    return Map;

});
