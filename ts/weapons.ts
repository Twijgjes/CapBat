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
      this.game.drawables.push( this );
      this.game.entities.push( this );
    }

    update( speed: number ) {
      var distance = this.p.magnitude();
      if( distance >= 8000 || distance <= -8000 ) this.destroy();
      this._v.add( this._a );
      this._p.add( this._v );
      this._rV += this._rA;
      this._r += this._rV;
    }

    draw( canvas, context ) {
      context.save();
      context.translate( this.p.x, this.p.y );
      context.rotate( this.r );
      var grd = context.createLinearGradient(10, 0, 0, 0);
      grd.addColorStop(0, this.c.getString());
      this.c.a = 0;
      grd.addColorStop(1, this.c.getString());
      this.c.a = 1;
      context.fillStyle = grd;
      context.fillRect(0, 0, 10, 1);
      context.restore();
    }

    destroy() {
      this.game.drawables.splice( this.game.drawables.indexOf( this ), 1 );
      this.game.entities.splice( this.game.entities.indexOf( this ), 1 );
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

  export class Turret implements Entity, Drawable {

    public game: Game;
    public id: number;
    private _p: Vec2;
    public r: number;
    private _children: Drawable[];
    public target: Vec2 = null;
    public parent: Ship;
    private _offset: number[];
    private gunSelector: number = 0;

    constructor( game: Game, parent: Ship, position: Vec2, rotation: number ) {
      this.game = game;
      this.id = game.assignId();
      this._p = position;
      this.r = rotation;
      this._children = [];
      this.parent = parent;
      this._offset = [ .01, -.01 ];
      this.target = this.game.controls.mouseWorldPos;

      this._children.push( new Circle( this.game, new Vec2(), 0, new Color( 150, 150, 150, 1 ), 4 ) );
      this._children.push( new Rect( this.game, new Vec2(3, -2 ), 0, new Color( 110, 110, 110, 1 ), 7, 1 ) );
      this._children.push( new Rect( this.game, new Vec2(3, 1 ), 0, new Color( 110, 110, 110, 1 ), 7, 1 ) );
    }

    public draw( canvas, context) {
      context.save();
      context.translate( this.p.x, this.p.y );
      context.rotate( this.r );
      this._children.forEach((child) => {
        child.draw( canvas, context );
      });
      context.restore();
    }

    public update( speed: number ) {
      if(this.target) {
        var rotation = new Vec2().angleTo( this.p );
        var worldPos = new Vec2().placeAround( rotation, this.parent.p, this.p.magnitude() );
        this.r = worldPos.angleTo( this.target );
      }
//      this.r -= .01;
    }

    public shoot( ) {
      var rotation = new Vec2().angleTo( this.p ) - this._offset[this.gunSelector];
      var bulletSpawn = new Vec2().placeAround( rotation, this.parent.p, this.p.magnitude() );
      var bullet = new Bullet( this.game, bulletSpawn, Vec2.normalFromRadian(this.r + this.parent.r).multiplyScalar(7), new Vec2(), this.r, 0, 0);

      this.gunSelector = 1 - this.gunSelector;
    }

    calculateWorldPos() {

    }

    get p(): Vec2 { return Vec2.clone( this._p ); }
    set p( v: Vec2 ){ this._p.set( v ); }
  }
}