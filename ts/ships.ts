/// <reference path="main.ts" />
/// <reference path="utils.ts" />
/// <reference path="foundation.ts" />
/// <reference path="shapes.ts" />
/// <reference path="weapons.ts" />
/// <reference path="effects.ts" />

module CapBat {

  export class Ship implements Drawable, DynamicEntity {

    public id: number;
    public game: Game;
    private _p: Vec2;
    private _v: Vec2;
    private _a: Vec2;
    public r: number;
    private _rV: number;
    private _rA: number;
    public c: Color;
    public _children: Drawable[];
    public throttle: number;

    constructor( game: Game, p: Vec2, v: Vec2, a: Vec2, r: number, rV: number, rA: number ) {
      this.game = game;
      this.id = this.game.assignId();
      this._p = p;
      this._v = v;
      this._a = a;
      this.r = r;
      this._rV = rV;
      this._rA = rA;
      this.c = new Color(100,100,100,1);
      this.throttle = 0;
      this.game.drawables.push( this );
      this.game.entities.push( this );
    }

    public update( speed: number ) {

    }

    public draw( canvas, context ) {

    }

    get p(): Vec2 { return Vec2.clone( this._p ); }
    set p( v: Vec2 ){ this._p.set( v ); }

    get v(): Vec2 { return Vec2.clone( this._v ); }
    set v( v: Vec2 ){ this._v.set( v ); }

    get a(): Vec2 { return Vec2.clone( this._a ); }
    set a( v: Vec2 ){ this._a.set( v ); }

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
      this.cooldown = 250;
      this.lastShot = new Date().getTime();
      this.initHull();
    }

    public draw( canvas, context ) {
      context.save();
      context.translate( this.p.x, this.p.y );
      context.rotate( this.r );
      this._children.forEach((child) => {
        child.draw( canvas, context );
      });
      context.restore();
    }

    public update( speed ) {

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
      return now >= this.lastShot + this.cooldown;

    }

    private initHull() {
      this._children.push( new Rect( this.game, new Vec2(-4,3), 0, new Color(170, 170, 170, 1), 8, 7));
      this._children.push( new Rect( this.game, new Vec2(-1,1), 0, new Color(50, 50, 200, 1), 2, 4));
//      this._children.push( new Triangle(game, new Vec2(0,0), 0, new Color(128, 128, 128, 1), [
//        new Vec2(-5, -5),
//        new Vec2(0 , 10),
//        new Vec2(5 , -5)
//      ]));
    }
  }

  export class Cruiser extends Ship {

    private _weapons: any[];

    constructor( game: Game, p: Vec2, v: Vec2, a: Vec2, r: number, rV: number, rA: number ) {
      super( game, p, v, a, r, rV, rA );
      this._children = [];
      this._weapons = [];

      var engineFlareLeft = new EngineFlare( this, new Vec2(-68, 102), 0, 20, new Color( 0,0,255,0 ) );
      this._children.push( engineFlareLeft );
      var engineFlareLeft = new EngineFlare( this, new Vec2(-57, 102), 0, 20, new Color( 0,0,255,0 ) );
      this._children.push( engineFlareLeft );
      var engineFlareLeft = new EngineFlare( this, new Vec2(48, 102), 0, 20, new Color( 0,0,255,0 ) );
      this._children.push( engineFlareLeft );
      var engineFlareLeft = new EngineFlare( this, new Vec2(37, 102), 0, 20, new Color( 0,0,255,0 ) );
      this._children.push( engineFlareLeft );
      this.initHull();

      var turrets = [
        new Vec2(40, -16),
        new Vec2(40, 8),
        new Vec2(40, 32),
        new Vec2(40, 56),
        new Vec2(-40, -16),
        new Vec2(-40, 8),
        new Vec2(-40, 32),
        new Vec2(-40, 56)
      ];

      turrets.forEach( (pos) => {
        var turret = new Turret( this.game, this, pos, 0 );
        this._children.push( turret );
        this._weapons.push( turret );
        this.game.entities.push( turret );
      });

      var flakCannon = new FlakCannon( this.game, this, new Vec2(0,-104), 0, 300 );
      this._children.push( flakCannon );
//      this._weapons.push( flakCannon );
      this.game.entities.push( flakCannon );

      this.game.controls.registerKey(32, () => { this.shoot() } );
      this.game.controls.registerKey(38, () => { this.move([0,-1]) } );
      this.game.controls.registerKey(40, () => { this.move([0,1]) } );
      this.game.controls.registerKey(37, () => { this.move([-1,0]) } );
      this.game.controls.registerKey(39, () => { this.move([1,0]) } );
      console.log( this.game );
      console.log( this );
    }

    public draw( canvas, context ) {
      context.save();
      context.translate( this.p.x, this.p.y );
      context.rotate( this.r );
//      context.scale( 5, 5 );
      this._children.forEach((child) => {
        child.draw( canvas, context );
      });
      context.restore();
    }

    public update( speed: number ) {
      this.v = this.v.add( this.a );
      this.p = this.p.add( this.v );
      this.a = new Vec2();
    }

    public move( direction: number[] ) {
      this.a = this.a.add( new Vec2(direction[0], direction[1]).multiplyScalar(.01) );
      if( direction[1] < 0 ) this.throttle = 1;
      if( direction[1] > 0 ) this.throttle = 0;
    }

    public shoot() {
      this._weapons.forEach( (weapon) => {
        weapon.shoot();
      } );
    }

    private initHull() {
      // Forward section left side
      this._children.push( new Rect( this.game, new Vec2(-8, -112), 0, new Color(195, 195, 195, 1), 16, 72 ) );
      this._children.push( new Rect( this.game, new Vec2(-24, -104), 0, new Color(160, 160, 160, 1), 16, 56 ) );
      this._children.push( new Rect( this.game, new Vec2(-32, -112), 0, new Color(195, 195, 195, 1), 8, 72 ) );
      this._children.push( new Triangle( this.game, new Vec2(-32, -112), 0, new Color(170, 170, 170, 1), [
        new Vec2(0, 0),
        new Vec2(0 , 49),
        new Vec2(-24 , 49)
      ] ) );
      this._children.push( new Rect( this.game, new Vec2(-56, -64), 0, new Color(170, 170, 170, 1), 24, 24 ) );
      // Forward section right side
      this._children.push( new Rect( this.game, new Vec2(8, -104), 0, new Color(160, 160, 160, 1), 16, 56 ) );
      this._children.push( new Rect( this.game, new Vec2(24, -112), 0, new Color(195, 195, 195, 1), 8, 72 ) );
      this._children.push( new Triangle( this.game, new Vec2(32, -112), 0, new Color(170, 170, 170, 1), [
        new Vec2(0, 0),
        new Vec2(0 , 49),
        new Vec2(24 , 49)
      ] ) );
      this._children.push( new Rect( this.game, new Vec2(32, -64), 0, new Color(170, 170, 170, 1), 24, 24 ) );

      // Left engine
      this._children.push( new Rect( this.game, new Vec2(-64, 56), 0, new Color(120, 120, 120, 1), 24, 32 ) );
      this._children.push( new Rect( this.game, new Vec2(-64, 80), 0, new Color(180, 180, 180, 1), 24, 24 ) );
      this._children.push( new Triangle( this.game, new Vec2(-72, 80), 0, new Color(170, 170, 170, 1), [
        new Vec2(0, 0),
        new Vec2(8 , 0),
        new Vec2(8 , 24)
      ] ) );

      // Right engine
      this._children.push( new Rect( this.game, new Vec2(40, 56), 0, new Color(120, 120, 120, 1), 24, 32 ) );
      this._children.push( new Rect( this.game, new Vec2(40, 80), 0, new Color(180, 180, 180, 1), 24, 24 ) );
      this._children.push( new Triangle( this.game, new Vec2(72, 80), 0, new Color(170, 170, 170, 1), [
        new Vec2(0, 0),
        new Vec2(-8 , 0),
        new Vec2(-8 , 24)
      ] ) );

      // Main section left side
      this._children.push( new Rect( this.game, new Vec2(-48, -41), 0, new Color(150, 150, 150, 1), 16, 18 ) );
      this._children.push( new Rect( this.game, new Vec2(-56, -24), 0, new Color(170, 170, 170, 1), 24, 41 ) );
      this._children.push( new Triangle( this.game, new Vec2(-56, -24), 0, new Color(170, 170, 170, 1), [
        new Vec2(0, 0),
        new Vec2(0 , 41),
        new Vec2(-32 , 41)
      ] ) );
      this._children.push( new Rect( this.game, new Vec2(-88, 16), 0, new Color(170, 170, 170, 1), 56, 40 ) );
      this._children.push( new Triangle( this.game, new Vec2(-88, 55), 0, new Color(170, 170, 170, 1), [
        new Vec2(0, 0),
        new Vec2(56 , 0),
        new Vec2(56 , 17)
      ] ) );

      // Main section right side
      this._children.push( new Rect( this.game, new Vec2(32, -41), 0, new Color(150, 150, 150, 1), 16, 18 ) );
      this._children.push( new Rect( this.game, new Vec2(32, -24), 0, new Color(170, 170, 170, 1), 24, 41 ) );
      this._children.push( new Triangle( this.game, new Vec2(56, -24), 0, new Color(170, 170, 170, 1), [
        new Vec2(0, 0),
        new Vec2(0 , 41),
        new Vec2(32 , 41)
      ] ) );
      this._children.push( new Rect( this.game, new Vec2(32, 16), 0, new Color(170, 170, 170, 1), 56, 40 ) );
      this._children.push( new Triangle( this.game, new Vec2(88, 55), 0, new Color(170, 170, 170, 1), [
        new Vec2(0, 0),
        new Vec2(-56 , 0),
        new Vec2(-56 , 17)
      ] ) );

      // Middle of aft section
      this._children.push( new Rect( this.game, new Vec2(-32, -24), 0, new Color(195, 195, 195, 1), 8, 96 ) );
      this._children.push( new Rect( this.game, new Vec2(-24, -16), 0, new Color(170, 170, 170, 1), 16, 88 ) );
      this._children.push( new Rect( this.game, new Vec2(-8, -24), 0, new Color(195, 195, 195, 1), 16, 96 ) );
      this._children.push( new Rect( this.game, new Vec2(24, -24), 0, new Color(195, 195, 195, 1), 8, 96 ) );
      this._children.push( new Rect( this.game, new Vec2(8, -16), 0, new Color(170, 170, 170, 1), 16, 88 ) );
      this._children.push( new Rect( this.game, new Vec2(-16, 71), 0, new Color(195, 195, 195, 1), 32, 8 ) );
    }
  }
}