/* globals ABLAST */
ABLAST.registerEnemy(
  // name
  'enemy2',
  // data
  {
    components: {
      enemy: {
        name: 'enemy2',
        bulletName: 'enemy-medium',
        color: '#FF5533',
        scale: 0.5,
        health: 3
      },
      'collision-helper': {
        debug: false,
        radius: 1.2
      },
      'gltf-model': {
        src: 'url(assets/models/corona/scene.gltf)',
      }
    },
    poolSize: 10
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
      this.actualShootingDelay = this.shootingDelay + Math.floor(this.shootingDelay * Math.random());

      el.addEventListener('model-loaded', function(event) {
        el.getObject3D('mesh').scale.set(sc, sc, sc);
      });
      this.lastShoot = undefined;
      this.willShootEmited = false;
    },
    tick: function (time, delta) {
      if (this.lastShoot == undefined ) {
        this.lastShoot = time;
      }
      else if (time - this.lastShoot > this.actualShootingDelay) {
        // don't shoot when behind the player
        var pos = this.el.getAttribute('position');
        if (pos.z < 0 && pos.y > 0) {
          this.el.components.enemy.shoot(time, delta);
          this.lastShoot = time;
          this.willShootEmited = false;
          this.actualShootingDelay = this.shootingDelay * (Math.random() < 0.7 ? 2 : 1);
        }
      }
      else if (!this.willShootEmited && time - this.lastShoot > this.actualShootingDelay - this.warmUpTime) {
        this.el.components.enemy.willShoot(time, delta, this.warmUpTime);
        this.willShootEmited = true;
      }
    },
    onHit: function (type) {}
  }
);
