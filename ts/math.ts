/**
 * Created by roanh_000 on 21/05/2014.
 */
module CapBat {
  export class Math {
    public static getNormalBetweenVecs( from: CapBat.Math.Vec2, to: CapBat.Math.Vec2 ) {
      var fromV = new CapBat.Math.Vec2().clone(from),
          toV = new CapBat.Math.Vec2().clone(to);
    }

  }

  export module Math {
    export class Vec2 {

      public x: number;
      public y: number;

      constructor(x?: number, y?: number){
        this.x = x;
        this.y = y;
      }

      public add( v: CapBat.Math.Vec2 ) {
        this.x += v.x;
        this.y += v.y;
      }

      public sub( v: CapBat.Math.Vec2 ) {
        this.x += v.x;
        this.y += v.y;
      }

      public multiplyScalar( s: number ) {
        this.y *= s;
        this.x *= s;
      }

      public dot( v: CapBat.Math.Vec2 ) {
        // Whups, nuffin yet
        console.log( 'HEY! You still have to write this function.' );
      }

      public normalize( ) {
        var mag = 1 / this.magnitude();
        if ( mag != 0 ) {
          this.x *= mag;
          this.y *= mag;
        }
      }

      public magnitude( ) {
        return Math.sqrt( ( this.x * this.x ) + ( this.y * this.y ) );
      }

      public distanceTo( v: CapBat.Math.Vec2 ) {
        var va = new CapBat.Math.Vec2( v.x, v.y ),
            vb = new CapBat.Math.Vec2( this.x, this.y );

        va.sub( vb );
        return va.magnitude();
      }

      public negate( ) {
        this.x *= -1;
        this.y *= -1;
        return this;
      }

      public angleTo( v: CapBat.Math.Vec2 ) {
        var normal = CapBat.Math.getNormalBetweenVecs( v, this );
        return Math.atan2( normal.y, normal.x );
      }

      public placeAround( rot: number, v: CapBat.Math.Vec2, radius: number ) {
        this.x = v.x + Math.cos(rot) * radius;
        this.y = v.y + Math.sin(rot) * radius;
      }

      public set( v: CapBat.Math.Vec2 ) {
        this.x = v.x;
        this.y = v.y;
        return this;
      }

      public clone( v: CapBat.Math.Vec2 ) {
        this.set( v );
        return this;
      }
    }
  }
}