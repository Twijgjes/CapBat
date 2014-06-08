/// <reference path="main.ts" />
/// <reference path="utils.ts" />
/// <reference path="foundation.ts" />

module CapBat {

  export class Shape implements GameObject, Entity, Drawable {

    public id: number;
    public game: Game;
    private _p: Vec2;
    private _r: number;
    private _c: Color;

    constructor( game: Game, p: Vec2, r: number, c: Color ) {
      this.game = game;
      this.id = game.assignId();
      this._p = p;
      this._r = r;
      this._c = c;
    }

    update( speed: number ) {

    }

    draw( canvas, context ) {

    }

    get p(): Vec2 { return Vec2.clone( this._p ); }
    set p( v: Vec2 ){ this._p.set( v ); }

    get r(): number { return this._r; }
    set r( rotation: number ){ this._r = rotation; }

    get c(): Color { return Color.clone( this._c ); }
    set c( color: Color ){ this._c.set( color ); }
  }

  export class Triangle extends Shape {

    private _points: Vec2[];

    constructor(game: CapBat.Game, pos: CapBat.Vec2, r: number, color: Color, points: Vec2[]){
      super( game, pos, r, color );
      this._points = points;
    }

    public draw( canvas, context ){
      context.save();
      context.translate( this.p.x, this.p.y );
      context.rotate( this.r );
      context.fillStyle = this.c.getString();
      context.beginPath();
      context.moveTo(this._points[0].x, this._points[0].y);
      context.lineTo(this._points[1].x, this._points[1].y);
      context.lineTo(this._points[2].x, this._points[2].y);
      context.lineTo(this._points[0].x, this._points[0].y);
      context.closePath();
      context.fill();
      context.restore();
    }
  }

  export class Square extends Shape {

    public width: number;
    public height: number;

    constructor(game: CapBat.Game, pos: CapBat.Vec2, r: number, color: Color, width: number, height: number ){
      super( game, pos, r, color );
      this.width = width;
      this.height = height;
    }

    public draw( canvas, context ){
      context.save();
      context.translate( this.p.x, this.p.y );
      context.rotate( this.r );
      context.fillStyle = this.c.getString();
      context.fillRect(  );
      context.restore();
    }
  }
}