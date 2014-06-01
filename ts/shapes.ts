/// <reference path="main.ts" />
/// <reference path="utils.ts" />
/// <reference path="foundation.ts" />

module CapBat {

  export class Triangle extends DrawableChild {
    private _points: Vec2[];

    constructor(gameRef: CapBat.Game, pos: CapBat.Vec2, r: number, color: Color, parent: Entity, points: Vec2[]){
      super(gameRef, pos, r, color, parent);
      this._points = points;
    }

    public draw( canvas, context ){
      var pos = this.p.add(this.parent.p);
      context.save();
      context.translate( pos.x, pos.y );
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
}