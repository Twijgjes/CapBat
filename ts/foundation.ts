/**
 * Created by roanh_000 on 21/05/2014.
 **/

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

    private p: CapBat.Math.Vec2;

    constructor(gameRef: CapBat.Game, pos: CapBat.Math.Vec2) {
      super(gameRef);
      this.p = pos.copy();
    }
  }
}