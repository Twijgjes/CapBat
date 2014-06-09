/// <reference path="main.ts" />
/// <reference path="utils.ts" />
/// <reference path="foundation.ts" />
/// <reference path="shapes.ts" />
/// <reference path="ships.ts" />

module CapBat {
  export class Bullet implements DynamicEntity, Drawable {

    public id: number;
    public game: Game;
    private _p: Vec2;
    private _v: Vec2;
    private _a: Vec2;
    private _r: number;
    private _rV: number;
    private _rA: number;
    public c: Color;

    constructor( game: Game, p: Vec2, v: Vec2, a: Vec2, r: number, rV: number, rA: number ) {
      this.game = game;
      this.id = this.game.assignId();
      this._p = p;
      this._v = v;
      this._a = a;
      this._r = r;
      this._rV = rV;
      this._rA = rA;
      this.c = new Color(255,225,0,1);
    }

    update( speed: number ) {
      this._v.add( this._a );
      this._p.add( this._v );
      this._rV += this._rA;
      this._r += this._rV;
    }

    draw( canvas, context ) {
      context.save();
      context.translate( this.p.x, this.p.y );
      context.rotate( this.r );
      var grd = context.createLinearGradient(0, 10, 0, 0);
      grd.addColorStop(0, this.c.getString());
      this.c.a = 0;
      grd.addColorStop(1, this.c.getString());
      this.c.a = 1;
      context.fillStyle = grd;
      context.fillRect(0, 0, 1, 10);
      context.restore();
    }

    get p(): Vec2 { return Vec2.clone( this._p ); }
    set p( v: Vec2 ){ this._p.set( v ); }

    get v(): Vec2 { return Vec2.clone( this._v ); }
    set v( v: Vec2 ){ this._v.set( v ); }

    get a(): Vec2 { return Vec2.clone( this._a ); }
    set a( v: Vec2 ){ this._a.set( v ); }

    get r(): number { var r = this._r; return r; }
    set r( rotation: number ){ this._r = rotation; }

    get rV(): number { var rV = this._rV; return rV; }
    set rV( rotationVelocity: number ){ this._rV = rotationVelocity; }

    get rA(): number { var rA = this._rA; return rA; }
    set rA( rotationAcceleration: number ){ this._rA = rotationAcceleration; }
  }
}