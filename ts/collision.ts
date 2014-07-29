/// <reference path="utils.ts" />
/// <reference path="math.ts" />

module CapBat {

  // TODO: Add support for circle vs circle & circle vs polygon

  export interface Overlap {
    type: string;
    direction: string;
    distance: number;
  }

  export class Projection {

    private _length: number;

    constructor(public start: number, public end: number){
      this._length = this.start - this.end;
    }

    public overlap( p ): Overlap {
      var totalLength = Math.max(this.end, p.end) - Math.min(this.start, p.start);

      if ( totalLength > this.length + p.length ) {
        // No collision
        var left = ;
        if ( p.start)
        return {
          type: 'NOCOLLISION',
          direction: '',
          distance: Math.min(p.start - this.end, this.start - p.end)
        };
      }

      if ( totalLength <= Math.max(this.length, p.length) ) {
        // Containment
        if (this.length < p.length) {
          return {
            type: 'CONTAINED',
            direction: '',
            distance: 0 // TODO: give direction and distance
          };
        } else {
          return {
            type: 'CONTAINS',
            direction: '',
            distance: 0
          };
        }
      }

      if( this.start <= p.start ) {
        // this overlaps p from the left
        return {
          type: 'OVERLAP',
          direction: 'LEFT',
          distance: this.end - p.start
        };
      } else if ( this.start > p.start ) {
        // this overlaps p from the right
        return {
          type: 'OVERLAP',
          direction: 'RIGHT',
          distance: p.end - this.start
        };
      }

      return {
        type: 'FUCKUP',
        direction: 'FUCKDOIKNOW',
        distance: -666
      };
    }

    static overlapDistance( p1, p2 ): number {
      var distance = 0;
      return distance;
    }

    get length(): number {
      return this._length;
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