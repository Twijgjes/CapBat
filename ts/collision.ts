/// <reference path="utils.ts" />
/// <reference path="math.ts" />

module CapBat {

  // TODO: Add support for circle vs circle & circle vs polygon

  export interface Overlap {
    type: string;
    distance: number;
  }

  export interface Collision {
    overlap: Overlap;
    axis: Vec2;
  }

  export interface CollisionObject {
//    vertices: Vec2[];
    checkRadius: number;
    p: Vec2;
    sourceId: number;

    destroy();
  }

  export interface CollisionPair {
    pair: CollisionObject[];
  }

  export class Point implements CollisionObject {

    public checkRadius: number;
    public parent: Entity;
    public sourceId: number;
    public game: Game;
    public id: number;

    constructor( game, parent ){
      this.parent = parent;
      this.checkRadius = 1;
      this.game = game;
      this.sourceId = parent.id;
      this.id = this.game.assignId();
      this.game.collisionSolver.collidables.push( this );
    }

    public collide( collidor, collisionInfo ) {
      this.parent.destroy();
    }

    public destroy() {
      this.game.collisionSolver.collidables.splice( this.game.collisionSolver.collidables.indexOf( this ), 1 );
    }

    get p(): Vec2 {
      return Vec2.clone( this.parent.p );
    }
  }

  export class ConvexCollisionObject implements CollisionObject {

    private _vertices: Vec2[];
    public checkRadius: number;
    public parent: Entity;
    public sourceId: number;
    public game: Game;
    public id: number;
    public behavior: () => {};

    // Ok, feed this the vertices of a convex shape, in ANTICLOCKWISE ORDER! Or else I'll kill you.
    constructor( game, parent, vertices: Vec2[], checkRadius, behavior? : () => {} ){
      this._vertices = [];
      vertices.forEach((vert) => {
        this._vertices.push( Vec2.clone(vert) );
      });
      this.parent = parent;
      this.checkRadius = checkRadius;
      this.game = game;
      this.sourceId = parent.id;
      this.id = this.game.assignId();
      this.game.collisionSolver.collidables.push( this );
      if(behavior) this.behavior = behavior;
    }

    public collide( collidor, collisionInfo ) {
//      console.log( 'collision with:', collidor, 'info:', collisionInfo );
      if(this.behavior) this.behavior();
    }

    public destroy() {
      this.game.collisionSolver.collidables.splice( this.game.collisionSolver.collidables.indexOf( this ), 1 );
    }

    get vertices(): Vec2[] {
      var verts = [];
      this._vertices.forEach((vert) => {
        verts.push(Vec2.clone(vert).add(this.parent.p));
      });
      return verts;
    }

    get p(): Vec2 {
      return Vec2.clone(this.parent.p);
    }
  }

  export class CollisionSolver {

    public collidables: CollisionObject[];
    public game: Game;

    constructor ( game ) {
      console.log('collisionsolver initiated');
      this.collidables = [];
      this.game = game;
    }

    public update() {
      var collisions = [];
      // First do a rough check to see if objects are close.
      var closeEncounters = CollisionSolver.roughCheck( this.collidables );
      // Do a precise collision check for objects that are close enough for a possible collision
      closeEncounters.forEach(( pair ) => {
        var collision = CollisionSolver.solve( pair[0], pair[1] );
        if ( collision ) {
//          console.log(pair,'collided:', collision);
          pair[0].collide( pair[1], collision );
          pair[1].collide( pair[0], collision );
        }
      });
    }

    public static roughCheck( collisionObjects: CollisionObject[] ): CollisionPair[] {
      // check of object posities niet meer dan .roughdist uit elkaar zitten, zowel, in een nieuwe arr doen.
      var close = [];

      // This is where we'll take one object and match it with all the others.
      for ( var i = 0; i < collisionObjects.length; i++) {
        // The trick is, we'll do all the interactions in the first iteration, and then skip all the previous objects in the next one.
        for ( var n = i + 1; n < collisionObjects.length; n++) {
          if( n >= collisionObjects.length ) break;
          // If a projectile is from ship a, we don't want it to collide with ship a.
          if ( collisionObjects[i].sourceId != collisionObjects[n].sourceId ) {
            // Are the objects close enough? Then pair 'em and push 'em.
            if ( collisionObjects[i].p.distanceTo( collisionObjects[n].p ) < collisionObjects[i].checkRadius + collisionObjects[n].checkRadius ) {
              close.push( [collisionObjects[i], collisionObjects[n]] );
            }
          }
        }
      }
      return close;
    }

    // What do I want this to return to me?
    public static solve( shapeA, shapeB ): Collision {
      console.log('solving');
      var axes = this.getAxes(shapeA).concat(this.getAxes(shapeB));
      var overlap: Overlap = null;
      var smallestAxis: Vec2 = null;

      for ( var i = 0; i < axes.length; i++) {
        var projection1 = CollisionSolver.project(shapeA, axes[i]);
        var projection2 = CollisionSolver.project(shapeB, axes[i]);

        if ( !CollisionSolver.quickOverlap( projection1, projection2 ) ) {
          overlap = null;
          break;
        }

        // TODO: Make quickOverlap static so I can treat projections equally
        var o = CollisionSolver.overlapInfo( projection1, projection2 );
        if (!overlap || o.distance < overlap.distance ) {
          overlap = o;
          smallestAxis = axes[i];
        }
      }
      // TODO: Minimum Translation Vector returnen

      if ( !overlap ) return null;

      return {
        overlap: overlap,
        axis: smallestAxis
      };
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
      // TODO: Rotate the vertices
      var axes: Vec2[] = [];
      for(var i = 0; i < shape.vertices.length; i++) {
        var vert1 = shape.vertices[i];
        var vert2 = shape.vertices[i + 1 == shape.vertices.length ? 0 : i + 1];
        var edge = vert1.sub(vert2);
        axes.push( edge.perp().normalize() );
      }
      return axes;
    }

    // Returns true if there's an overlap
    public static quickOverlap( p1: Projection, p2: Projection ): boolean {
      // if the distance of one linestart to the other's line end is larger than both lines lengths combined, there is no collision.
      var totalLength = Math.max(p1.end, p2.end) - Math.min(p1.start, p2.start);
      return ( totalLength < ( p1.length + p2.length ) );
    }

    public static overlapInfo( p1: Projection, p2: Projection ): Overlap {
      // At this stage we already know the lines overlap. Now we gather more info.
      var totalLength = Math.max(p1.end, p2.end) - Math.min(p1.start, p2.start);

//      if ( totalLength > p1.length + p2.length ) {
//        // No collision
//        return {
//          type: 'NOCOLLISION',
//          distance: Math.min(p2.start - p1.end, p1.start - p2.end)
//        };
//      }

      if ( totalLength <= Math.max(p1.length, p2.length) ) {
        // Containment
        if (p1.length < p2.length) {
          return {
            type: 'CONTAINED',
            distance: p1.length // TODO: give direction and distance
          };
        } else {
          return {
            type: 'CONTAINS',
            distance: p2.length
          };
        }
      }

      if( p1.start <= p2.start ) {
        // this overlaps p from the left
        return {
          type: 'OVERLAP_LEFT',
          distance: p1.end - p2.start
        };
      } else if ( p1.start > p2.start ) {
        // this overlaps p from the right
        return {
          type: 'OVERLAP_RIGHT',
          distance: p2.end - p1.start
        };
      }

      return {
        type: 'FUCKUP',
        distance: -666
      };
    }

  }

  export class Projection {

    public length: number;

    constructor(public start: number, public end: number){
      this.length = this.end - this.start;
    }

  }

}