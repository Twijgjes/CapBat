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

    public static trim( min: number, max: number, n: number ){
      if(n > max)
        return n = max;
      if(n < min)
        return n = min;
    }
  }

  export class Color {

    constructor(
      private r: number = 255,
      private g: number = 255,
      private b: number = 255,
      private a: number = 1
    ) {}

    public getString(){
      return 'rgba('+this.r+','+this.g+','+this.b+','+this.a+')';
    }

    public add(color: Color){
      this.r += color.r;
      this.g += color.g;
      this.b += color.b;
      this.a += color.a;
      this.normalize();
    }

    public sub(color: Color){
      this.r -= color.r;
      this.g -= color.g;
      this.b -= color.b;
      this.a -= color.a;
      this.normalize();
    }



    private normalize() {
      this.r = Utils.trim(0, 255, this.r);
      this.g = Utils.trim(0, 255, this.g);
      this.b = Utils.trim(0, 255, this.b);
      this.a = Utils.trim(0, 1, this.a);
    }

  }
}