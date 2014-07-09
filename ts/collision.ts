module CapBat {

  interface Axis {

  }

  export class CollisionSolver {

    public static solve( shapeA, shapeB ): boolean {
      var axes = [];

      axes.forEach( (axis) => {
        var projection1 = shapeA.project(axis);
        var projection2 = shapeB.project(axis);

        if( !projection1.overlap( projection2 ) ) {
          // No overlap on one axis is automatic fail
          return false;
        }
      } );
      // Collision has happened!
      return true;
    }

  }

}