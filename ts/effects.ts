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
      context.rotate( this.r );
      // TODO: Fix this shit.
      var grd = context.createRadialGradient(this.width / 2, 0, 1, this.width / 2, this.width * 2 * this.intensity, this.width / 2);
      grd.addColorStop(0, this.c.getString());
      this.c.a = 0;
      grd.addColorStop(1, this.c.getString());
      this.c.a = 1;
      context.fillStyle = grd;
      context.fillRect( 0, 0, this.width, this.width * 2 );
      context.restore();
    }

    public update( speed: number ) {

    }

    get p(): Vec2 { return Vec2.clone( this._p ); }
    set p( v: Vec2 ){ this._p.set( v ); }

    get c(): Color { return Color.clone( this._c ); }
    set c( color: Color ){ this._c.set( color ); }

  }
}