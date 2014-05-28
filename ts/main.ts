/// <reference path="utils.ts" />
/// <reference path="foundation.ts" />
/// <reference path="math.ts" />

module CapBat {
  var VERSION: string = '0.0.1';

  export class Game {

    public isInitialized: boolean;
    public drawables: Drawable[];
    public entities: Entity[];
    private ids: number;
    private settings: {};

    constructor(userSettings) {
      this.drawables = [];
      this.entities = [];
      this.settings = {
        canvas: null,
        context: null,
        WIDTH: null,
        HEIGHT: null,
        debug: null,
        speed: 0.1
      };
      this.settings = Utils.extend(this.settings, userSettings);

      this.initGameState();

      window.requestAnimFrame = ( function ( callback ) {
        return window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function( callback ) {
            window.setTimeout(callback, 1000 / 60);
          };
      })();

      this.gameloop();
      this.isInitialized = true;
    }

    gameloop(){
      // Update
      this.entities.forEach((entity) => {
        entity.update( this.settings.speed );
      });

      // Render a frame
      this.clearContext();
      this.drawables.forEach((drawable)=> {
        drawable.draw( this.settings.canvas, this.settings.context )
      });
      this.settings.context.restore();

      // Request an animation frame
      requestAnimationFrame( this.gameloop.bind(this) );
    }

    public assignId() {
      return this.ids++;
    }

    public initGameState() {
      this.drawables.push( new Drawable( this, new Vec2( 50, 50 ), new Color( 10, 10, 10, 1 ) ) );
      this.drawables.push( new Drawable( this, new Vec2( 100, 100 ), new Color( 100, 100, 100, 1 ) ) );
    }

    private clearContext() {
      this.settings.context.fillStyle = '#000000';
      this.settings.context.fillRect( 0, 0, this.settings.WIDTH, this.settings.HEIGHT );
      this.settings.context.save();
      // put the 'camera' over the 0,0 point
      this.settings.context.translate( this.settings.WIDTH * .5, this.settings.HEIGHT * .5);
    }
  }
}