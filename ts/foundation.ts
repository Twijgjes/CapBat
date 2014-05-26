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

    private c: string;

    constructor(gameRef: CapBat.Game, pos: CapBat.Vec2, color: string, parent: CapBat.Entity = null){
      super(gameRef, pos);
      this.c = color;
    }

    public draw( canvas, context ) {
      context.save();
      context.translate( this.p.x, this.p.y );
      context.fillStyle = this.c;
      context.fillRect(5, 5, 10, 10);
      context.restore();
    }
  }
}