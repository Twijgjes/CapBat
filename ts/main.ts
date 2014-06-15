/// <reference path="utils.ts" />
/// <reference path="foundation.ts" />
/// <reference path="math.ts" />
/// <reference path="ships.ts" />
/// <reference path="shapes.ts" />
/// <reference path="controls.ts" />

module CapBat {
  var VERSION: string = '0.0.1';

  interface settings {
    canvas: any;
    context: any;
    WIDTH: number;
    HEIGHT: number;
    debug: boolean;
    speed: number;
  }

  export class Game {

    public isInitialized: boolean;
    public drawables: Drawable[];
    public entities: Entity[];
    private ids: number;
    private settings: settings;
    public controls: Controls;
    public camera: Camera;
    public debug: DebugBox[];

    constructor(userSettings) {
      this.drawables = [];
      this.entities = [];
      this.debug = [];
      this.settings = {
        canvas: null,
        context: null,
        WIDTH: null,
        HEIGHT: null,
        debug: null,
        speed: 0.1
      };
      this.settings = Utils.extend(this.settings, userSettings);
      this.controls = new Controls(this);
      this.ids = 1;
      this.camera = new Camera( this, new Vec2( this.settings.WIDTH / 2, this.settings.HEIGHT / 2), 0 );

      this.initGameState();

      var requestAnimFrame: (callback: () => void) => void = (function(){
        return window.requestAnimationFrame ||
          (<any>window).webkitRequestAnimationFrame ||
          (<any>window).mozRequestAnimationFrame ||
          (<any>window).oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function(callback){
            window.setTimeout(callback, 1000 / 60, new Date().getTime());
          };
      })();

      this.settings.context.mozImageSmoothingEnabled = false;
      this.settings.context.webkitImageSmoothingEnabled = false;
      this.settings.context.msImageSmoothingEnabled = false;
      this.settings.context.imageSmoothingEnabled = false;

      this.gameloop();
      this.isInitialized = true;
    }

    gameloop(){
      // Update
      this.controls.processKeys();
      this.entities.forEach((entity) => {
        entity.update( this.settings.speed );
      });

      // Render a frame
      this.prepContext();
      this.drawables.forEach((drawable)=> {
        drawable.draw( this.settings.canvas, this.settings.context )
      });
      this.debug.forEach((debug)=> {
        debug.draw( this.settings.canvas, this.settings.context )
      });
      this.settings.context.restore();

      // Request an animation frame
      requestAnimationFrame( this.gameloop.bind(this) );
    }

    public assignId() {
      return this.ids++;
    }

    public initGameState() {
      var points = [
        new Vec2(0, 5),
        new Vec2(5, -5),
        new Vec2(-5, -5)
      ];
      // X = Green
//      this.drawables.push( new Triangle( this, new Vec2( 200, 0 ), 0, new Color( 0, 255, 10, 1 ), points ) );
      // Y = Red
//      this.drawables.push( new Triangle( this, new Vec2( 0, 200 ), 0, new Color( 255, 10, 10, 1 ), points ) );
      // -X, -Y = blue
//      this.drawables.push( new Triangle( this, new Vec2( -200, -200 ), 0, new Color( 10, 10, 255, 1 ), points ) );
//      this.drawables.push( new Circle( this, new Vec2( 100, 100 ), 0, new Color( 1, 250, 1, 1 ), 50 ) );
//      var fighter = new Fighter( this, new Vec2(10,10), new Vec2(), new Vec2(), 0, 0, 0 );
//      this.drawables.push( fighter );
//      this.entities.push( fighter );
      var cruiser = new Cruiser( this, new Vec2(), new Vec2(), new Vec2(), 0, 0, 0 );
      this.drawables.push( cruiser );
      this.entities.push( cruiser );
    }

    private prepContext() {
      this.settings.context.save();
      this.settings.context.fillStyle = '#000000';
      this.settings.context.lineWidth = 0;
      this.settings.context.fillRect( 0, 0, this.settings.WIDTH, this.settings.HEIGHT );

      // put the 'camera' over the 0,0 point
      this.settings.context.translate( this.camera.p.x, this.camera.p.y );
      this.settings.context.rotate( this.camera.r );
    }
  }
}