Scenes.RaceScene = cc.Scene.extend({
  race: null,
  onEnter: function() {
    this._super();
    this.race = new Model.Domain.Race();

    this.gameLayer = new Layers.RaceLayer();
    this.gameLayer.init(this.race);
    Model.Controls.resetInstance();
    Model.Controls.instance(this.gameLayer.bgSprite);
    this.hud = new Layers.HUD();
    this.hud.init(this.race.racer.maxHealth);
    this.update(0);
    this.addChild(this.gameLayer, 0);
    this.addChild(this.hud, 1);
    this.scheduleUpdate();
  },
  update: function(dt) {
    this.race.update(dt);
    var weapon = this.race.racer.weapon;
    console.log(weapon);
    this.hud.update(this.race.racer.health, weapon && weapon.sprite);

    var scenePosition = this.race.calculateCameraPosition();
    this.gameLayer.setPosition(scenePosition.x, scenePosition.y);
  },
});
