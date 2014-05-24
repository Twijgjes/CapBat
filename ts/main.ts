/**
 * Created by Roan on 20-May-14.
 */
/// <reference path="Utils.ts" />

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

      this.isInitialized = true;
    }

    public assignId(){
      return this.ids++;
    }
  }
}