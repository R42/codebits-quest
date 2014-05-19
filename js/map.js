define(
  [
    'jquery',
    'clock',
    'genericObject',
    'stage',
    'genericPopup',
    'configs'
  ],
  function($, Clock, GenericObject, Stage, Popup, Configs){

    var element = $('<canvas>').prop('width', 800). prop('height', 300)[0];

    var actor;

    // Create a water vending machine
    var goWater = new GenericObject({
      actions : {
          thirst: -20,
          blader: 10
        },
      price:10,
      color:'rgb(0,206,209)',
      description: 'A water vending machine. Money: -10. Thirst: -20. Blader +10',
      popup: new Popup('A popup', [])
    });

    // Create a WC
    var goWC = new GenericObject({
      actions: {
        blader: 0
      },
      price: 0,
      color: 'rgb(255, 215, 0)',
      description: 'A place to take a leak. Blader: 0'
    });

    // Create the food corner
    var goFood = new GenericObject({
      actions: { hunger: 0 },
      price: 0,
      color: 'rgb(139, 69, 19)',
      description: 'The food corner. All your burguers and pizzas are belong to here.'
    });

    // Create a stage
    var baseDate = Clock.getBaseDate();
    var startDate1 = new Date(baseDate.toJSON());
    var endDate1 = new Date(baseDate.toJSON());
    endDate1.setHours(endDate1.getHours() + 3);
    var startDate2 = new Date(endDate1.toJSON());
    var endDate2 = new Date(endDate1.toJSON());
    endDate2.setHours(endDate2.getHours() + 3);
    var startDate3 = new Date(endDate2.toJSON());
    var endDate3 = new Date(endDate2.toJSON());
    endDate3.setHours(endDate3.getHours() + 3);
    var stage1 = new Stage(
      [
        {
          startDate: startDate1,
          endDate: endDate1,
          description: 'A hardware talk. Increases your hardware-fu!',
          actions: {
            hardware: 10
          }
        },
        {
          startDate: startDate2,
          endDate: endDate2,
          description: 'A mobile talk. All the things mobile here!',
          actions: {
            mobile: 10
          }
        },
        {
          startDate: startDate3,
          endDate: endDate3,
          description: 'Come and learn the internetz my padawan...',
          actions: {
            web: 10
          }
        }
      ]
    );
    var stage2 = new Stage(
      [
        {
          startDate: startDate1,
          endDate: endDate1,
          description: 'Come and learn the internetz my padawan...',
          actions: {
            web: 10
          }
        },
        {
          startDate: startDate2,
          endDate: endDate2,
          description: 'A hardware talk. Increases your hardware-fu!',
          actions: {
            hardware: 10
          }
        },
        {
          startDate: startDate3,
          endDate: endDate3,
          description: 'A mobile talk. All the things mobile here!',
          actions: {
            mobile: 10
          }
        }
      ]
    );
    var stage3 = new Stage(
      [
        {
          startDate: startDate1,
          endDate: endDate1,
          description: 'A mobile talk. All the things mobile here!',
          actions: {
            mobile: 10
          }
        },
        {
          startDate: startDate2,
          endDate: endDate2,
          description: 'Come and learn the internetz my padawan...',
          actions: {
            web: 10
          }
        },
        {
          startDate: startDate3,
          endDate: endDate3,
          description: 'A hardware talk. Increases your hardware-fu!',
          actions: {
            hardware: 10
          }
        }
      ]
    );
    var stage4 = new Stage(
      [
        {
          startDate: startDate1,
          endDate: endDate3,
          description: 'Learn all the things at once!',
          actions: {
            hardware: 2,
            mobile: 2,
            web: 2
          }
        }
      ]
    );

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
        /*case 'W': //WC
        case 'T': //Recinto
        case 'V': //Vending Machine
          return $('<span>').append(terrain).html();*/
      }

      drawBox(context, position, color);
    }

    var Map = {

        initialize: function(user){

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

    var map = [
      ['#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#'],
      ['#','.','.','.','.','.','.','.','.','.','.','.','#','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','#'],
      ['#','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','#'],
      ['#','.','.','.','.','.','.','.','.','.','.','.','#','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','#'],
      ['#','.','.','.','.','.','.','.','.','.','.','.','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#',stage1,'#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#'],
      ['#','.','.','.','.','.','.','.','.','.','.','.','#','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','#'],
      ['#','.','.','.','.','.','.','.','.','.','.','.','#','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','#'],
      ['#','.','.','.','.','.','.','.','.','.','.','.','#','.','.','.','.','.','.','.','.','c','.','.','.','.','c','.','.','.','.','.','.','.','c','.','.','.','.','c','.','.','.','.','.','.','.','.','.','#'],
      ['#','.','.','.','.','.','.','.','.','.','.','.','#','.','.','.','.','.','.','.','c','o','c','.','.','c','o','c','.','.',stage2,'.','.','c','o','c','.','.','c','o','c','.','.','.','.','.','.','.','.','#'],
      ['#','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','c','.','.','.','.','c','.','.','.','c','.','.','.','c','.','.','.','.','.','.','.','.','.','.','.','.','.','.','#'],
      ['#',goWater,'.','.','.','.','.','.','.','.','.','.','#','.','.','.','.','.','.','.','.','c','.','.','.','.','.','.','.','c','o','c','.','.','.','.','.','.','.','c','.','.','.','.','.','.','.','.','.','#'],
      ['#',goFood,'.','.','.','.','.','.','.','.','.','.','#','.','.','.','.','.','.','.','c','o','c','.','.','.','.','.','.','.','c','.','.','.','.','.','.','.','c','o','c','.','.','.','.','.','.','.','.','#'],
      ['#','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','c','.','.','.','.','.','.','.','c','o','c','.','.','.','.','.','.','.','c','.','.','.','.','.','.','.','.','.','#'],
      ['#','.','.','.','.','.','.','.','.','.','.','.','#','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.',stage3,'.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','#'],
      ['#','.','.','.','.','.','.','.','.','.','.','.','#','.','.','.','.','.','.','.','.','c','.','.','.','.','.','.','.','c','o','c','.','.','.','.','.','.','.','c','.','.','.','.','.','.','.','.','.','#'],
      ['#','.','.','.','.','.','.','.','.','.','.','.','#','V','.','.','.','.','.','.','c','o','c','.','.','.','.','.','.','.','c','.','.','.','.','.','.','.','c','o','c','.','.','.','.','.','.','.','.','#'],
      ['#','.','.','.','.','.','.','.','.','.','.','.','#','.','.','.','.','.','.','.','.','c','.','.','.','.','.','.','.','c','o','c','.','.','.','.','.','.','.','c','.','.','.','.','.','.','.','.','.','#'],
      ['#','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','c','.','.','.','.','c','.','.','.','c','.','.','.','c','.','.','.','.','c','.','.','.','.','.','.','.','.','.','#'],
      ['#','.','.','.','.','.','.','.','.','.','.','.','#','.','.','.','.','.','.','.','c','o','c','.','.','c','o','c','.','.',stage4,'.','.','c','o','c','.','.','c','o','c','.','.','.','.','.','.','.','.','#'],
      ['#','.','.','.','.','.','.','.','.','.','.','.','#','.','.','.','.','.','.','.','.','c','.','.','.','.','c','.','.','.','.','.','.','.','c','.','.','.','.','c','.','.','.','.','.','.','.','.','.','#'],
      ['#','.','.','.','.','.','.','.','.','.','.','.','#','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','#'],
      ['#','.','.','.','.','.','.','.','.','.','.','.','#','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','#'],
      ['#','.','.','.','.','.','.','.','.','.','.','.','#','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','#'],
      ['#','#','#','#','#','#','.','#','#','#','#','#','#','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','#'],
      ['#','#','#','#','#',goWC,'.','#','#','#','#','#','#','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','#'],
      ['#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#']
    ];

    return Map;

});
