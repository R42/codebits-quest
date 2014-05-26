define([
  'configs',
  'map'
  ],
  function(Configs, Map){
    var Portal = function(linkId, destination, options){
      this.linkId = linkId;
      this.destination = destination;
    };

    Portal.prototype = {

      getType: function() {
        return 'portal';
      },

      draw: function(context, position) {
        context.fillStyle = '6699FF';
        context.fillRect(
          position.X * Configs.BLOCK_SIZE,
          position.Y * Configs.BLOCK_SIZE,
          Configs.BLOCK_SIZE,
          Configs.BLOCK_SIZE
        );
      },
    }

    return Portal;
  }
);
