/// <reference path="main.ts" />
/// <reference path="utils.ts" />
/// <reference path="foundation.ts" />
/// <reference path="shapes.ts" />
/// <reference path="ships.ts" />

module CapBat {

  export class KeyMap {
    active: boolean;
    callback: () => void;

    constructor( callback: () => void, active: boolean = false ) {
      this.callback = callback;
    }
  }

  export class Controls implements GameObject {

    private keys: KeyMap[];
    public game: Game;
    public id: number;
    public mouseScreenPos: Vec2;
    public mouseWorldPos: Vec2;

    constructor( game: Game) {
      this.game = game;
      this.id = game.assignId();
      document.addEventListener( 'keydown' , this.onKeyDown.bind( this ), false );
      document.addEventListener( 'keyup' , this.onKeyUp.bind( this ), false );
      document.addEventListener( 'mousemove' , this.onMouseMove.bind( this ), false );
      document.addEventListener( 'mouseup' , this.onMouseUp.bind( this ), false );
      this.keys = [];
      this.mouseScreenPos = new Vec2();
      this.mouseWorldPos = new Vec2();
    }

    public registerKey(key: number, callback: () => void) {
      this.keys[key] = new KeyMap(callback);
    }

    private onKeyDown(e) {
      e.preventDefault();
      if(this.keys[e.keyCode]) this.keys[e.keyCode].active = true;
      console.log(e.keyCode);
    }

    private onKeyUp(e) {
      e.preventDefault();
      if(this.keys[e.keyCode]) this.keys[e.keyCode].active = false;
    }

    private onMouseMove(e) {
      e.preventDefault();
      this.mouseScreenPos.x = e.pageX;
      this.mouseScreenPos.y = e.pageY;
      this.mouseWorldPos.x = e.pageX - this.game.camera.p.x;
      this.mouseWorldPos.y = e.pageY - this.game.camera.p.y;
    }

    private onMouseUp(e) {
      console.log('screen position is ', this.mouseScreenPos, 'world position is ', this.mouseWorldPos);
    }

    public processKeys() {
      for (var i = 0; i < this.keys.length; i++){
        if(this.keys[i] && this.keys[i].active) this.keys[i].callback();
      }
    }
  }

  export class Camera implements GameObject, Entity {

    public game: Game;
    public id: number;
    private _p: Vec2;
    public r: number;

    constructor( game: Game, position: Vec2, rotation: number) {
      this.game = game;
      this.id = game.assignId();
      this._p = Vec2.clone(position);
      this.r = rotation;
    }

    public update( speed: number ) {

    }

    public destroy() {

    }

    get p(): Vec2 { return Vec2.clone( this._p ); }
    set p( v: Vec2 ){ this._p.set( v ); }
  }
}