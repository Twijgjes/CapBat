/**
* Created by roanh_000 on 21/05/2014.
*/
var CapBat;
(function (CapBat) {
    var Math = (function () {
        function Math() {
        }
        Math.getNormalBetweenVecs = function (from, to) {
            var fromV = new CapBat.Math.Vec2().clone(from), toV = new CapBat.Math.Vec2().clone(to);
        };
        return Math;
    })();
    CapBat.Math = Math;

    (function (Math) {
        var Vec2 = (function () {
            function Vec2(x, y) {
                this.x = x;
                this.y = y;
            }
            Vec2.prototype.add = function (v) {
                this.x += v.x;
                this.y += v.y;
            };

            Vec2.prototype.sub = function (v) {
                this.x += v.x;
                this.y += v.y;
            };

            Vec2.prototype.multiplyScalar = function (s) {
                this.y *= s;
                this.x *= s;
            };

            Vec2.prototype.dot = function (v) {
                // Whups, nuffin yet
                console.log('HEY! You still have to write this function.');
            };

            Vec2.prototype.normalize = function () {
                var mag = 1 / this.magnitude();
                if (mag != 0) {
                    this.x *= mag;
                    this.y *= mag;
                }
            };

            Vec2.prototype.magnitude = function () {
                return Math.sqrt((this.x * this.x) + (this.y * this.y));
            };

            Vec2.prototype.distanceTo = function (v) {
                var va = new CapBat.Math.Vec2(v.x, v.y), vb = new CapBat.Math.Vec2(this.x, this.y);

                va.sub(vb);
                return va.magnitude();
            };

            Vec2.prototype.negate = function () {
                this.x *= -1;
                this.y *= -1;
                return this;
            };

            Vec2.prototype.angleTo = function (v) {
                var normal = CapBat.Math.getNormalBetweenVecs(v, this);
                return Math.atan2(normal.y, normal.x);
            };

            Vec2.prototype.placeAround = function (rot, v, radius) {
                this.x = v.x + Math.cos(rot) * radius;
                this.y = v.y + Math.sin(rot) * radius;
            };

            Vec2.prototype.set = function (v) {
                this.x = v.x;
                this.y = v.y;
                return this;
            };

            Vec2.prototype.clone = function (v) {
                this.set(v);
                return this;
            };
            return Vec2;
        })();
        Math.Vec2 = Vec2;
    })(CapBat.Math || (CapBat.Math = {}));
    var Math = CapBat.Math;
})(CapBat || (CapBat = {}));
//# sourceMappingURL=math.js.map
