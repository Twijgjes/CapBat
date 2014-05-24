/**
 * Created by roanh_000 on 21/05/2014.
 */
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
  }
}