define(
  [
    'jquery',
    'clock',
    'genericObject',
    'stage'
  ],
  function($, Clock, GenericObject, Stage){

    var element = $('<div>');

    var actor;

    // Create a water vending machine
    var goWater = new GenericObject({
      thirst: -20,
      blader: 10
    }, 10, 'V', 'A water vending machine. Money: -10. Thirst: -20. Blader +10');

    // Create a WC
    var goWC = new GenericObject({
      blader: 0
    }, 0, 'W', 'A place to take a leak. Blader: 0');

    // Create the food corner
    var goFood = new GenericObject({
      hunger: 0
    }, 0, 'F', 'The food corner. All your burguers and pizzas are belong to here.');

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

    var map = [
      ['#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#'],
      ['#','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','#'],
      ['#','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','#'],
      ['#','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','#'],
      ['#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#',stage1,'#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#'],
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
      ['#','#','#','#','#','#',goWC,'#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#','#']
    ];

    function drawContainer(drawnMap){

      $(element).empty();

      for (var i = 0; i < drawnMap.length; i++) {
        var line = drawnMap[i];
        var stringLine = '';

        for (var j = 0; j < line.length; j++) {
          stringLine += drawnMap[i][j];
        }

        $(element).append(stringLine);
        $(element).append('<br/>');
      }
    }

    function drawActor(drawnMap){
      drawnMap[actor.y][actor.x] = '@';
    }

    function drawTerrain(terrain){
      if(typeof terrain === 'object'){
        return $('<span>').append(terrain.draw()).html();
      }
      switch(terrain){
        case '.':
        case '#':
        case 'o':
        case 'c':
          return terrain;
        case 'W':	//WC
        case 'T':	//Recinto
        case 'V': //Vending Machine
          return $('<span>').append(terrain).html();
      }
    }

    var Map = {

        initialize: function(user){

          actor = user;
        },

        draw: function(){

          var drawnMap = [];

          // draw terrain

          for (var i = 0; i < map.length; i++) {

            var line = map[i];

            drawnMap[i] = [];

            for (var j = 0; j < line.length; j++) {

                drawnMap[i][j] = drawTerrain(line[j]);
            }
          }

          // draw actors

          drawActor(drawnMap);

          // draw container

          drawContainer(drawnMap);

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

          return map[actor.y][actor.x];
        }
    };

    return Map;

});
