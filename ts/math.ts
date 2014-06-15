/**
 * Created by roanh_000 on 21/05/2014.
 */
module CapBat {
  export class MathUtils {
    public static getNormalBetweenVecs( from: CapBat.Vec2, to: CapBat.Vec2 ) {
      var fromV = Vec2.clone(from),
          toV =  Vec2.clone(to);
      toV.sub( fromV );
      toV.normalize();

      return toV;
    }

  }
  export class Vec2 {

    public x: number;
    public y: number;

    constructor(x?: number, y?: number){
      this.x = x || 0;
      this.y = y || 0;
    }

    public add( v: Vec2 ): Vec2 {
      this.x += v.x;
      this.y += v.y;
      return this;
    }

    public sub( v:  Vec2 ): Vec2 {
      this.x -= v.x;
      this.y -= v.y;
      return this;
    }

    public multiplyScalar( s: number ): Vec2 {
      this.y *= s;
      this.x *= s;
      return this;
    }

    public normalize( ): Vec2 {
      var mag = 1 / this.magnitude();
      if ( mag != 0 ) {
        this.x *= mag;
        this.y *= mag;
      }
      return this;
    }

    public magnitude( ): number {
      return Math.sqrt( ( this.x * this.x ) + ( this.y * this.y ) );
    }

    public distanceTo( v: Vec2 ) {
      var va = new CapBat.Vec2( v.x, v.y ),
          vb = new CapBat.Vec2( this.x, this.y );

      va.sub( vb );
      return va.magnitude();
    }

    public negate( ): Vec2 {
      this.x *= -1;
      this.y *= -1;
      return this;
    }

    public angleTo( v: Vec2 ): number {
      var normal = MathUtils.getNormalBetweenVecs( this, v );
      return Math.atan2( normal.y, normal.x );
    }

    public placeAround( rot: number, v: CapBat.Vec2, radius: number ): Vec2 {
      this.x = v.x + Math.cos(rot) * radius;
      this.y = v.y + Math.sin(rot) * radius;
      return this;
    }

    public set( v: Vec2 ): Vec2 {
      this.x = v.x;
      this.y = v.y;
      return this;
    }

    public copy( v: Vec2 ): Vec2 {
      this.set( v );
      return this;
    }

    public static clone( v: Vec2 ): Vec2 {
      return new Vec2(v.x, v.y);
    }

    public static normalFromRadian( r: number ): Vec2 {
      var normal = new Vec2();
      normal.x = Math.cos(r);
      normal.y = Math.sin(r);
      return normal;
    }

//    public rotate( radians: number ): Vec2 {
//
//    }
  }
}