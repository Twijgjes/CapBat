/**
* Created by roanh_000 on 21/05/2014.
**/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="Main.ts" />
var CapBat;
(function (CapBat) {
    var GameObject = (function () {
        function GameObject(gameRef) {
            this.game = gameRef;
            this.id = gameRef.assignId();
        }
        return GameObject;
    })();
    CapBat.GameObject = GameObject;

    var Entity = (function (_super) {
        __extends(Entity, _super);
        function Entity(gameRef, pos) {
            _super.call(this, gameRef);
            this.p = pos.copy();
        }
        return Entity;
    })(GameObject);
    CapBat.Entity = Entity;
})(CapBat || (CapBat = {}));
//# sourceMappingURL=foundation.js.map
