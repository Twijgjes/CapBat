/**
* Created by Roan on 20-May-14.
*/
/// <reference path="Utils.ts" />
var CapBat;
(function (CapBat) {
    var VERSION = '0.0.1';

    var Game = (function () {
        function Game(userSettings) {
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

            this.settings = CapBat.Utils.extend(this.settings, userSettings);

            this.isInitialized = true;
        }
        Game.prototype.assignId = function () {
            return this.ids++;
        };
        return Game;
    })();
    CapBat.Game = Game;
})(CapBat || (CapBat = {}));
//# sourceMappingURL=Main.js.map
