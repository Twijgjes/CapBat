/// <reference path="main.ts" />
/// <reference path="utils.ts" />

module CapBat {
  export class GameObject {
    private game: CapBat.Game;
    public id: number;

    constructor(gameRef: CapBat.Game) {
      this.game = gameRef;
      this.id = gameRef.assignId();
    }
  }

  export class Entity extends GameObject {

    private _p: Vec2;
    private _r: number;

    constructor(gameRef: CapBat.Game, pos: Vec2, rot: number) {
      super(gameRef);
      this._p = Vec2.clone( pos );
      this._r = rot;
    }

    public update( speed ) {

    }

    get p( ): Vec2 {
      return Vec2.clone(this._p);
    }

    set p( v: Vec2 ) {
      this._p.set(v);
    }

    get r( ): number {
      return this._r;
    }

    set r( r: number ) {
      this._r = r;
    }


  }

  export class Drawable extends Entity {

    private _c: Color;

    constructor(gameRef: CapBat.Game, pos: CapBat.Vec2, rot: number, color: Color){
      super(gameRef, pos, rot);
      this._c = color;
    }

    public draw( canvas, context ) {
      context.save();
      context.translate( this.p.x, this.p.y );
      context.rotate(this.r);
      context.fillStyle = this.c.getString();
      context.fillRect(-5, -5, 10, 10);
      context.restore();
    }

    get c(): Color {
      return new Color( this._c.r, this._c.g, this._c.b, this._c.a );
    }

    set c( color: Color ) {
      this._c = color;
    }
  }

  export class DrawableChild extends Drawable {

    public parent: Entity;

    constructor(gameRef: CapBat.Game, pos: CapBat.Vec2, rot: number, color: Color, parent: Entity) {
      super(gameRef, pos, rot, color);
      this.parent = parent;
    }

    public draw( canvas, context ){
      var pos = this.p.add(this.parent.p);
      context.save();
      context.translate( pos.x, pos.y );
      context.rotate(this.r);
      context.fillStyle = this.c.getString();
      context.fillRect(-5,-5,10, 10);
      context.restore();
    }
  }
}