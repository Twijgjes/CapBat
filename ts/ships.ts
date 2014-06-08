/// <reference path="main.ts" />
/// <reference path="utils.ts" />
/// <reference path="foundation.ts" />
/// <reference path="shapes.ts" />

module CapBat {

  export class Ship implements Drawable, DynamicEntity {

    public id: number;
    public game: Game;
    private _p: Vec2;
    private _v: Vec2;
    private _a: Vec2;
    private _r: number;
    private _rV: number;
    private _rA: number;
    public c: Color;
    public _children: Shape[];

    constructor( game: Game, p: Vec2, v: Vec2, a: Vec2, r: number, rV: number, rA: number ) {
      this.game = game;
      this.id = game.assignId();
      this._p = p;
      this._v = v;
      this._a = a;
      this._r = r;
      this._rV = rV;
      this._rA = rA;
      this.c = new Color(100,100,100,1);
    }

    update( speed: number ){

    }

    draw( canvas, context ) {

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

  export class Fighter extends Ship {

    constructor( game: Game, p: Vec2, v: Vec2, a: Vec2, r: number, rV: number, rA: number ) {
      super( game, p, v, a, r, rV, rA );
      this._children = [];
      this._children.push( new Triangle(game, new Vec2(0,0), 0, new Color(128, 128, 128, 1), [
        new Vec2(-5, -5),
        new Vec2(0 , 10),
        new Vec2(5 , -5)
      ]));
      this.game.controls.registerKey(32, this.shoot);
    }

    draw( canvas, context ) {
      context.save();
      context.translate( this.p.x, this.p.y );
      context.rotate( this.r );
      this._children.forEach((child) => {
        child.draw( canvas, context );
      });
      context.restore();
    }

    update( speed ) {
      this.r += .1;
    }

    public shoot() {
      console.log('pew! pew!');
    }
  }
}