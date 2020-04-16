/* globals ABLAST */

ABLAST.registerEnemy(
  // name
  'enemy_start',
  // data
  {
    components: {
      enemy: {
        name: 'enemy_start',
        color: '#FFB911',
        scale: 0.9,
        health: 1
      },
      'collision-helper': {
        debug: false,
        radius: 1.2
      },
      'gltf-model': {
        src: 'url(assets/models/corona/scene.gltf)',
      }
    },
    poolSize: 1
  },
  // implementation
  {
    init: function () {
      this.shootingDelay = 2500;
      this.warmUpTime = 2500;
      this.reset();
    },
    reset: function () {
      var el = this.el;
      var sc = this.data.scale;
      console.log(sc);
      el.addEventListener('model-loaded', function(event) {
        el.getObject3D('mesh').scale.set(sc, sc, sc);
      });
      this.lastShoot = undefined;
      this.willShootEmited = false;
    },
    tick: function (time, delta) {
      this.el.components.enemy.willShoot(time, delta, this.warmUpTime);
    },
    onHit: function (type) {}
  }
);
