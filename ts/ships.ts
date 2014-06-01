/// <reference path="main.ts" />
/// <reference path="utils.ts" />
/// <reference path="foundation.ts" />
/// <reference path="shapes.ts" />

module CapBat {
  export class Fighter extends Drawable {

    private _children: DrawableChild[];

    constructor(gameRef: CapBat.Game, pos: CapBat.Vec2, rot: number, color: Color) {
      super(gameRef, pos, rot , color);
      this._children = [];
      this._children.push(new Triangle(gameRef, new Vec2(0,0), 0, new Color(128, 128, 128, 1), this, [
        new Vec2(-5, -5),
        new Vec2(0 , 10),
        new Vec2(5 , -5)
      ]));
    }

    draw( canvas, context ) {
      context.save();
      context.translate( this.p.x, this.p.y );
      context.rotate( this.r );
      this._children.forEach((child) => {
        child.draw( canvas, context );
      });
      context.restore();
    }

    update( speed ) {
      this.r += .1;
    }
  }
}