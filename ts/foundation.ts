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
    get p( ): Vec2 {
      return Vec2.clone(this._p);
    }

    set p( v: Vec2 ) {
      this._p.set(v);
    }

    constructor(gameRef: CapBat.Game, pos: Vec2) {
      super(gameRef);
      this._p = Vec2.clone( pos );
    }

    public update( speed ) {

    }


  }

  export class Drawable extends Entity {

    private _c: Color;

    constructor(gameRef: CapBat.Game, pos: CapBat.Vec2, color: Color){
      super(gameRef, pos);
      this._c = color;
    }

    public draw( canvas, context ) {
      context.save();
      context.translate( this.p.x, this.p.y );
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

    private parent: Drawable;

    constructor(gameRef: CapBat.Game, pos: CapBat.Vec2, color: Color, parent: Drawable) {
      super(gameRef, pos, color);
      this.parent = parent;
    }

    public draw( canvas, context ){
      var pos = this.p.add(this.parent.p);
      context.save();
      context.translate( pos.x, pos.y );
      context.fillStyle = this.c.getString();
      context.fillRect(-5,-5,10, 10);
      context.restore();
    }
  }
}