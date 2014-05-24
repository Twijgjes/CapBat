/**
* Created by roanh_000 on 21/05/2014.
*/
var CapBat;
(function (CapBat) {
    var Utils = (function () {
        function Utils() {
        }
        // Extend a with b.
        Utils.extend = function (a, b) {
            for (var key in b) {
                if (b.hasOwnProperty(key)) {
                    a[key] = b[key];
                }
            }
            return a;
        };
        return Utils;
    })();
    CapBat.Utils = Utils;
})(CapBat || (CapBat = {}));
//# sourceMappingURL=Utils.js.map
