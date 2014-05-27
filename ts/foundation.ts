/// <reference path="Main.ts" />

module CapBat {
  export class GameObject {
    public game: CapBat.Game;
    public id: number;

    constructor(gameRef: CapBat.Game) {
      this.game = gameRef;
      this.id = gameRef.assignId();
    }
  }

  export class Entity extends GameObject {

    private p: CapBat.Vec2;

    constructor(gameRef: CapBat.Game, pos: CapBat.Vec2) {
      super(gameRef);
      this.p = CapBat.Vec2.returnClone( pos );
    }

    public update( speed ) {

    }

    get p(): Vec2 {
      return CapBat.Vec2.returnClone(this.p);
    }

    set p( v: Vec2 ) {
      this.p.set(v);
    }
  }

  export class Drawable extends Entity {

    private c: CapBat.Color;

    constructor(gameRef: CapBat.Game, pos: CapBat.Vec2, color: CapBat.Color){
      super(gameRef, pos);
      this.c = color;
    }

    public draw( canvas, context ) {
      context.save();
      context.translate( this.p.x, this.p.y );
      context.fillStyle = this.c;
      context.fillRect(-5, -5, 10, 10);
      context.restore();
    }

    get c(): string {
      return c.getString();
    }

    set c( color: string ) {
      this.c = color;
    }
  }

  export class DrawableChild extends Enitity {

    private parent: Drawable;

    constructor(gameRef: CapBat.Game, pos: CapBat.Vec2, color: string, parent: Drawable) {
      super(gameRef, pos, color);
      this.parent = parent;
    }

    public draw( canvas, context ){
      var pos = this.p.add(this.parent.p);
      context.save();
      context.translate( pos.x, pos.y );
      context.fillStyle = this.c;
      context.fillRect(-5,-5,10, 10);
      context.restore();
    }
  }
}