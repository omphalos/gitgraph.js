/***********************
 *    INITIALIZATION   *
 ***********************/

var config = {
  template: "metro"       // could be: "blackarrow" or "metro" or Template Object
  //, mode: "compact"     // special compact mode : hide messages & compact graph
};
var gitGraph = new GitGraph( config );

/***********************
 * BRANCHS AND COMMITS *
 ***********************/

// Create branch named "master"
var master = gitGraph.branch( "master" );

// Commit on HEAD Branch which is "master"
gitGraph.commit();

// Add few commits on master.
gitGraph.commit().commit();

// Create a new "dev" branch from "master"
var dev = gitGraph.branch( "dev" );
dev.commit();

// Commit again on "master"
master.commit();

// Advanced commit method with style and specific author (HEAD)
var commitConfig = {
  dotColor: "white",
  dotSize: 10,
  dotStrokeWidth: 10
};
gitGraph.commit( commitConfig );

/***********************
 *      CHECKOUT       *
 ***********************/

// Checkout on master branch for create "test" since master
//master.checkout();

/***********************
 *       DETAILS       *
 ***********************/

gitGraph.commit( "detail" ).commit();
dev.commit().commit(); // 2 default Commit on "dev"

/***********************
 *       MERGES        *
 ***********************/

master.checkout();

// Merge "dev" branch into HEAD (which is "master"), with a default message
dev.merge();

// Create a "test" branch and merge in into "master" with a custom message.
var test = gitGraph.branch( "test" );
test.commit();
test.merge( master );

// Then, continue committing on the "test" branch
test.commit();

/***********************
 *       EVENTS        *
 ***********************/

gitGraph.canvas.addEventListener( "commit:mouseover", function ( event ) {
  console.log( "You're over a commit.", "Here is a bunch of data ->", event.data );
} );
