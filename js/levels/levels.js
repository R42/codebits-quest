define(
  ['./js/levels/ground_floor', './js/levels/first_level'],
  function(GroundFloor, FirstLevel){

    var Levels = [
      GroundFloor,
      FirstLevel
    ]

    return Levels;
  }
);
