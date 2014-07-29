/// <reference path="utils.ts" />
/// <reference path="math.ts" />

module CapBat {

  // TODO: Add support for circle vs circle & circle vs polygon

  export class Projection {

    constructor(public ls: number, public le: number){}

    public overlap( p ) {
      // See if this projection overlaps with the given one
      if( this.ls > p.le || this.le < p.ls ){
        return false;
      } else {
        // Checken op cases. Left || right || containment

      }
    }
  }

  export class CollisionSolver {

    public static solve( shapeA, shapeB ): boolean {
      var axes = [];
      axes.push(this.getAxes(shapeA));
      axes.push(this.getAxes(shapeB));
      var overlap: number = null;
      var smallestAxis: Vec2 = null;

      axes.forEach( (axis) => {
        var projection1 = shapeA.project(axis);
        var projection2 = shapeB.project(axis);

        if( !projection1.overlap( projection2 ) ) {
          // No overlap on one axis is automatic fail
          return false;
        } else {
          var o = projection1.overlapDistance( projection2 );
          if (!overlap || o < overlap ) {
            overlap = o;
            smallest = axis;
          }
        }
      } );
      // Collision has happened!
      // TODO: Minimum Translation Vector returnen
      return true;
    }

    public static project(shape, axis): Projection {
      var min = axis.dot(shape.vertices[0]);
      var max = min;
      for( var i = 1; i < shape.vertices.length; i++) {
        var p = axis.dot(shape.vertices[i]);
        if( p < min ) min = p;
        else if ( p > max ) max = p;
      }
      return new Projection(min, max);
    }

    public static getAxes( shape ): Vec2[] {
      var axes: Vec2[] = [];
      for(var i = 0; i < shape.vertices.length; i++) {
        var vert1 = shape.vertices[i];
        var vert2 = shape.vertices[i + 1 == shape.vertices.length ? 0 : i + 1];
        var edge = vert1.sub(vert2);
        axes.push( edge.perp().normalize() );
      }
      return axes;
    }

  }

}