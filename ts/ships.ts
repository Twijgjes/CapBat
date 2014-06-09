/// <reference path="main.ts" />
/// <reference path="utils.ts" />
/// <reference path="foundation.ts" />
/// <reference path="shapes.ts" />
/// <reference path="weapons.ts" />

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
      this.id = this.game.assignId();
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

    private cooldown: number;
    private lastShot: number;

    constructor( game: Game, p: Vec2, v: Vec2, a: Vec2, r: number, rV: number, rA: number ) {
      super( game, p, v, a, r, rV, rA );
      this._children = [];
      this._children.push( new Triangle(game, new Vec2(0,0), 0, new Color(128, 128, 128, 1), [
        new Vec2(-5, -5),
        new Vec2(0 , 10),
        new Vec2(5 , -5)
      ]));
      this.game.controls.registerKey(32, () => { this.shoot() } );
      console.log( this.game );
      console.log( this );
      this.cooldown = 250;
      this.lastShot = new Date().getTime();
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
      //this.r += .1;
    }

    public shoot() {
      if (!this.cooledDown()) return;
      console.log('pew! pew!');
      var bullet = new Bullet( this.game, this.p, new Vec2(0,1), new Vec2(), this.r, 0, 0);
      this.game.drawables.push(bullet);
      this.game.entities.push(bullet);
    }

    private cooledDown() {
      var now =  new Date().getTime();
      if ( now >= this.lastShot + this.cooldown ) {
        var difference = now - (this.lastShot + this.cooldown);
        this.lastShot = now - difference;
        return true;
      }
      return false;
    }
  }

  export class Cruiser extends Ship {

    constructor( game: Game, p: Vec2, v: Vec2, a: Vec2, r: number, rV: number, rA: number ) {
      super( game, p, v, a, r, rV, rA );
      this._children = [];

//      this._children.push( new Rect( this.game, new Vec2(1, 1), 0, new Color(255, 0, 0, 1), 2, 2 ) );
//      this._children.push( new Rect( this.game, new Vec2(-1, -1), 0, new Color(0, 255, 0, 1), 2, 2 ) );
//      this._children.push( new Rect( this.game, new Vec2(0,0), 0, new Color(0, 0, 255, 1), 20, 20 ) );

      this._children.push( new Rect( this.game, new Vec2(-2, -28), 0, new Color(195, 195, 195, 1), 4, 18 ) );
      this._children.push( new Rect( this.game, new Vec2(-6, -26), 0, new Color(160, 160, 160, 1), 4, 14 ) );
      this._children.push( new Rect( this.game, new Vec2(-8, -28), 0, new Color(195, 195, 195, 1), 2, 18 ) );
      this._children.push( new Triangle( this.game, new Vec2(-8, -28), 0, new Color(170, 170, 170, 1), [
        new Vec2(0, 0),
        new Vec2(0 , 12),
        new Vec2(-6 , 12)
      ] ) );
      this._children.push( new Rect( this.game, new Vec2(-14, -16), 0, new Color(170, 170, 170, 1), 6, 6 ) );
      // Start main middle section
      this._children.push( new Rect( this.game, new Vec2(-12, -10), 0, new Color(170, 170, 170, 1), 4, 4 ) );
      this._children.push( new Rect( this.game, new Vec2(-14, -6), 0, new Color(170, 170, 170, 1), 6, 10 ) );
      this._children.push( new Triangle( this.game, new Vec2(-14, -6), 0, new Color(170, 170, 170, 1), [
        new Vec2(0, 0),
        new Vec2(0 , 10),
        new Vec2(-8 , 10)
      ] ) );
      this._children.push( new Rect( this.game, new Vec2(-22, 4), 0, new Color(170, 170, 170, 1), 14, 10 ) );
      this._children.push( new Triangle( this.game, new Vec2(-22, 14), 0, new Color(170, 170, 170, 1), [
        new Vec2(0, 0),
        new Vec2(14 , 0),
        new Vec2(14 , 4)
      ] ) );
      this._children.push( new Rect( this.game, new Vec2(-8, -6), 0, new Color(195, 195, 195, 1), 2, 24 ) );
      this._children.push( new Rect( this.game, new Vec2(-6, -4), 0, new Color(170, 170, 170, 1), 4, 22 ) );
      this._children.push( new Rect( this.game, new Vec2(-2, -6), 0, new Color(195, 195, 195, 1), 4, 24 ) );
      this._children.push( new Rect( this.game, new Vec2(-4, 18), 0, new Color(195, 195, 195, 1), 8, 2 ) );
      // Left engine
      this._children.push( new Rect( this.game, new Vec2(-16, 14), 0, new Color(140, 140, 140, 1), 6, 8 ) );
      this._children.push( new Rect( this.game, new Vec2(-16, 20), 0, new Color(195, 195, 195, 1), 6, 6 ) );
      this._children.push( new Triangle( this.game, new Vec2(-18, 20), 0, new Color(195, 195, 195, 1), [
        new Vec2(0, 0),
        new Vec2(2 , 0),
        new Vec2(2 , 6)
      ] ) );

      this.game.controls.registerKey(32, () => { this.shoot() } );
      console.log( this.game );
      console.log( this );
    }

    draw( canvas, context ) {
      context.save();
      context.translate( this.p.x, this.p.y );
      context.rotate( this.r );
      context.scale( 3, 3 );
      this._children.forEach((child) => {
        child.draw( canvas, context );
      });
      context.restore();
    }

    update( speed ) {
      this.r += .01;
    }

    public shoot() {

    }
  }
}