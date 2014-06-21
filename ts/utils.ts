/// <reference path="main.ts" />
/// <reference path="math.ts" />
/// <reference path="foundation.ts" />

module CapBat {
  export class Utils {

    // Extend a with b.
    public static extend(a, b) {
      for(var key in b) {
        if(b.hasOwnProperty(key)) {
          a[key] = b[key];
        }
      }
      return a;
    }

    public static trim( min: number, max: number, n: number ){
      if(n > max)
        return n = max;
      if(n < min)
        return n = min;
    }
  }

  export class Color {

    constructor(
      public r: number = 255,
      public g: number = 255,
      public b: number = 255,
      public a: number = 1
    ) {}

    public getString(): string {
      return 'rgba('+this.r+','+this.g+','+this.b+','+this.a+')';
    }

    public add(color: Color) {
      this.r += color.r;
      this.g += color.g;
      this.b += color.b;
      this.a += color.a;
      this.normalize();
    }

    public sub(color: Color) {
      this.r -= color.r;
      this.g -= color.g;
      this.b -= color.b;
      this.a -= color.a;
      this.normalize();
    }

    public set( color: Color ){
      this.r = color.r;
      this.g = color.g;
      this.b = color.b;
      this.a = color.a;
    }

    public static clone( color: Color ) {
      return new Color( color.r, color.g, color.b, color.a );
    }

    private normalize() {
      this.r = Utils.trim(0, 255, this.r);
      this.g = Utils.trim(0, 255, this.g);
      this.b = Utils.trim(0, 255, this.b);
      this.a = Utils.trim(0, 1, this.a);
    }

  }

  export class DebugBox implements Entity, Drawable {

    public game: Game;
    public id: number;
    public p: Vec2;
    public r: number;

    constructor( game: Game, position: Vec2 ) {
      this.game = game;
      this.id = game.assignId();
      this.p = position;
      this.r = 0;
      this.game.debug.push( this );
    }

    update( speed: number ) {

    }

    draw( canvas, context ) {
      context.save();
      context.translate( this.p.x, this.p.y );
      context.rotate( this.r );
      context.fillStyle = 'rgba(0,0,255,1)';
      context.fillRect( 0, 0, 5, 5 );
      context.restore();
    }
  }

  interface Star {
    position: number[];
    color: Color;
    radius: number;
  }

  export class StarForge implements Drawable, GameObject {

    public game: Game;
    public id: number;
    private _amount: number;
    private _range: number;
    private _stars: Star[];

    constructor( game: Game, amount: number ) {
      this.game = game;
      this.id = game.assignId();
      this._amount = amount;
      this._range = 4000;
      this._stars = [];
      this.generateStars();
    }

    public draw( canvas, context ) {
      this._stars.forEach( (star) => {
        context.beginPath();
        context.fillStyle = star.color.getString();
//        context.fillRect(star.position[0], star.position[1], 1, 1);
        context.arc(star.position[0], star.position[1], star.radius, 0, Math.PI * 2);
        context.fill();
      });
    }

    private generateStars() {
      for( var i = 0; i < this._amount; i++) {
        var pos = [
          (Math.random() * this._range) - (this._range/2),
          (Math.random() * this._range) - (this._range/2)
        ];
        var r = 200 + Math.round(Math.random() * 55);
        var g = 150 + Math.round(Math.random() * 105);
        var b = 230 + Math.round(Math.random() * 25);
        this._stars.push( {
          position: pos,
          color: new Color( r, g, b, 1 ),
          radius: ( Math.random() * 2 )
        } );
      }
    }

  }
}