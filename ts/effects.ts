/// <reference path="main.ts" />
/// <reference path="foundation.ts" />

module CapBat {

  export class EngineFlare implements Entity, Drawable {

    public game: Game;
    public id: number;
    public intensity: number;
    private _c: Color;
    private _p: Vec2;
    public r;
    public width: number;

    constructor( game: Game, position: Vec2, rotation: number, width: number, color: Color ){
      this.game = game;
      this.id = game.assignId();
      this.intensity = 1;
      this._p = position;
      this.r = rotation;
      this.width = width;
      this._c = color;
    }

    public draw( canvas, context ) {
      context.save();
      context.translate( this.p.x, this.p.y );
      context.scale(1,5);
      context.rotate( this.r );

      // TODO: Fix this shit.
      var grd = context.createRadialGradient( this.width / 2, 0, 2, this.width / 2, 0, this.width / 2 );
      grd.addColorStop(0, 'rgba(220, 220, 255, 0.8)');
//      this.c.a = 0;
      grd.addColorStop(1, this.c.getString());

      context.fillStyle = grd;
      context.fillRect( 0, 0, this.width, this.width );
      context.restore();
    }

    public update( speed: number ) {

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
      context.fillStyle = this.c.getString();
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