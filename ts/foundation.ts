/// <reference path="main.ts" />
/// <reference path="utils.ts" />

// TODO: split up Entity and Drawable so they can be extended separately.

module CapBat {
  export interface GameObject {
    id: number;
    game: Game;

    // This is the constructor
//    new( game: Game );
  }

  export interface Entity {

    p: Vec2;
    r: number;

    // This constructor overloads the GameObject's
//    new(
//      p: Vec2,
//      r: number
//    );

    update( speed: number );
  }

  export interface DynamicEntity extends Entity {

    v: Vec2;
    a: Vec2;
    rV: number;
    rA: number;

//    new(
//      p: Vec2,
//      v: Vec2,
//      a: Vec2,
//      r: number,
//      rV: number,
//      rA: number
//    );

    update( speed: number );

  }

  export interface Drawable {

//    new(
//      game: Game,
//      c: Color
//    );

    draw( canvas, context );
  }
}