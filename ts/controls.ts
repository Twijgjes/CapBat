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

    constructor( game: Game) {
      this.game = game;
      this.id = game.assignId();
      document.addEventListener( 'keydown' , this.onKeyDown.bind( this ), false );
      document.addEventListener( 'keyup' , this.onKeyUp.bind( this ), false );
      this.keys = [];
    }

    public registerKey(key: number, callback: () => void) {
      this.keys[key] = new KeyMap(callback);
    }

    private onKeyDown(e) {
      event.preventDefault();
      if(this.keys[e.keyCode]) this.keys[e.keyCode].active = true;
      console.log(e.keyCode);
    }

    private onKeyUp(e) {
      event.preventDefault();
      if(this.keys[e.keyCode]) this.keys[e.keyCode].active = false;
    }

    public processKeys() {
      for (var i = 0; i < this.keys.length; i++){
        if(this.keys[i] && this.keys[i].active) this.keys[i].callback();
      }
    }
  }
}