/// <reference path="main.ts" />
/// <reference path="foundation.ts" />

module CapBat {

  export class EngineFlare implements Entity, Drawable {

    public game: Game;
    public ship: Ship;
    public id: number;
    public intensity: number;
    private _c: Color;
    private _p: Vec2;
    public r;
    public width: number;

    constructor( ship: Ship, position: Vec2, rotation: number, width: number, color: Color ){
      this.ship = ship;
      this.game = ship.game;
      this.id = this.game.assignId();
      this.intensity = 0;
      this._p = position;
      this.r = rotation;
      this.width = width;
      this._c = color;
      this.game.entities.push( this );
    }

    public draw( canvas, context ) {
      context.save();
      context.translate( this.p.x, this.p.y );
      context.scale(1,5 * this.intensity);
      context.rotate( this.r );

      var grd = context.createRadialGradient( this.width / 2, 0, 2, this.width / 2, 0, this.width / 2 );
      grd.addColorStop(0, 'rgba(220, 220, 255, 0.8)');
      var store = this.c.a;
      this.c.a = .7;
      grd.addColorStop(.6, this.c.getString());
      this.c.a = store;
      grd.addColorStop(1, this.c.getString());

      context.fillStyle = grd;
      context.fillRect( 0, 0, this.width, this.width );
      context.restore();
    }

    public update( speed: number ) {
      if( this.ship.throttle > 0) {
        this.intensity = Math.min( this.intensity += ( .2 * speed ), 1 );
        return;
      }
      this.intensity = Math.max( this.intensity -= ( .2 * speed ), 0 );
    }

    destroy() {
      this.game.entities.splice( this.game.entities.indexOf( this ), 1 );
    }

    get p(): Vec2 { return Vec2.clone( this._p ); }
    set p( v: Vec2 ){ this._p.set( v ); }

    get c(): Color { return Color.clone( this._c ); }
    set c( color: Color ){ this._c.set( color ); }

  }

  export class ThrusterFlare implements Entity, Drawable {

    public game: Game;
    public ship: Ship;
    public id: number;
    public intensity: number;
    private _c: Color;
    private _p: Vec2;
    public width: number;
    public r: number;

    constructor( ship: Ship, position: Vec2, rotation: number, width: number, color: Color ){
      this.ship = ship;
      this.game = ship.game;
      this.id = this.game.assignId();
      this.intensity = 0;
      this._p = position;
      this.r = rotation;
      this.width = width;
      this._c = color;
      this.game.entities.push( this );
    }

    public draw( canvas, context ) {
      context.save();
      context.translate( this.p.x, this.p.y );
      context.rotate( this.r );

      var grd = context.createLinearGradient(  );
      grd.addColorStop(0, 'rgba(220, 220, 255, 0.8)');
      var store = this.c.a;
      this.c.a = .7;
      grd.addColorStop(.6, this.c.getString());
      this.c.a = store;
      grd.addColorStop(1, this.c.getString());

      context.fillStyle = grd;
      context.fillRect( 0, 0, this.width, this.width * 2 );
      context.restore();
    }

    public update( speed: number ) {
      if( this.ship.throttle > 0) {
        this.intensity = Math.min( this.intensity += ( .2 * speed ), 1 );
        return;
      }
      this.intensity = Math.max( this.intensity -= ( .2 * speed ), 0 );
    }

    destroy() {
      this.game.entities.splice( this.game.entities.indexOf( this ), 1 );
    }

    get p(): Vec2 { return Vec2.clone( this._p ); }
    set p( v: Vec2 ){ this._p.set( v ); }

    get c(): Color { return Color.clone( this._c ); }
    set c( color: Color ){ this._c.set( color ); }

  }

  export class Explosion implements Entity, Drawable {

    public game: Game;
    public id: number;
    private _p: Vec2;
    public r: number;
    public radius: number;
    private _c: Color;
    private _epoch: number;
    private _lifetime: number;
    private _life: number;

    constructor( game: Game, position: Vec2, radius: number ) {
      this.game = game;
      this.id = game.assignId();
      this._p = position;
      this.r = 0;
      this.radius = radius;
      this._c = new Color(255, 100, 0, .8);
      this._epoch = new Date().getTime();
      this._lifetime = 500;
      this._life = 0;
      this.game.drawables.push( this );
      this.game.entities.push( this );
      console.log('an explosion was created');
    }

    update( speed: number ) {
      this._life = ( ( new Date().getTime() - this._epoch ) / this._lifetime );
      if( this._life >= 1 ) this.destroy();
    }

    draw( canvas, context ) {
      var radius = this.radius * this._life;
      context.save();
      context.translate( this.p.x, this.p.y );
      context.rotate( this.r );
      context.beginPath();
      // TODO: fixme
      var grd = context.createRadialGradient( radius, 0, 2, radius, 0, radius );
      grd.addColorStop(0, this.c.getString());
      grd.addColorStop(.9, this.c.getString());
      this.c.a = 0;
      grd.addColorStop(1, this.c.getString());
      this.c.a = 1;
      context.fillStyle = grd;
      context.arc( 0, 0, radius, 0, Math.PI * 2, false );
      context.fill();
      context.restore();
    }

    destroy() {
      this.game.drawables.splice( this.game.drawables.indexOf( this ), 1 );
      this.game.entities.splice( this.game.entities.indexOf( this ), 1 );
    }

    get p(): Vec2 { return Vec2.clone( this._p ); }
    set p( v: Vec2 ){ this._p.set( v ); }

    get c(): Color { return Color.clone( this._c ); }
    set c( color: Color ){ this._c.set( color ); }
  }
}