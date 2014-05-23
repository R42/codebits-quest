define(
  [
    'jquery',
    'clock',
    'genericObject',
    'stage',
    'genericPopup'
  ],
  function($, Clock, GenericObject, Stage, Popup){

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

    var Map = {
      identifier: 'grdfloor',
      map: [
        '######################################',              //0
        '#...........#........................#',
        '#....................................#',
        '#...........#........................#',
        '#...........##################.###################',
        '#...........#....................................#',  //5
        '#...........#....................................#',
        '#...........#........c....c.......c....c.........#',
        '#...........#.......coc..coc.....coc..coc........#',
        '#....................c....c...c...c..............#',
        '#...........#........c.......coc.......c.........#',  //10
        '#...........#.......coc.......c.......coc........#',
        '#....................c.......coc.......c.........#',
        '#...........#....................................#',
        '#...........#........c.......coc.......c.........#',
        '#...........#.......coc.......c.......coc........#',  //15
        '#...........#........c.......coc.......c.........#',
        '#....................c....c...c...c....c.........#',
        '#...........#.......coc..coc.....coc..coc........#',
        '#...........#........c....c.......c....c.........#',
        '#...........#....................................#',  //20
        '#...........#....................................#',
        '#...........#....................................#',
        '######.######....................................#',
        '#####..######....................................#',
        '##################################################'  //25
      ],

      objects: [
        { name: stage1,   x:30,  y:4},
        { name: stage2,   x:30,  y:8},
        { name: stage3,   x:30,  y:13},
        { name: stage4,   x:30,  y:18},

        { name: goWater,  x:1,   y:10},
        { name: goFood,   x:1,   y:11},
        { name: goWC,     x:5,   y:24}
      ],

      width: 50,

      height: 25
    }

    return Map;
  }
)
