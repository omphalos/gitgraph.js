describe( "Gitgraph.js", function () {

  var gitGraph, master, develop, canvas;

  beforeEach( function () {
    document.body = document.createElement( "body" );
    canvas = document.createElement( "canvas" );
  } );

  describe( "Gitgraph", function () {

    it( "should load the right template", function () {
      gitGraph = new GitGraph( { canvas: canvas, template: "blackarrow" } );

      expect( gitGraph.template ).toEqual( gitGraph.newTemplate( "blackarrow" ) );
    } );

  } );

  describe( "Branch", function () {

    beforeEach( function () {
      gitGraph = new GitGraph( { canvas: canvas, template: "metro" } );

      master = gitGraph.branch( "master" );
      develop = gitGraph.branch( "develop" );
    } );

    it( "shoud have a name", function () {
      expect( gitGraph.branchs[ 0 ].name ).toEqual( "master" );
    } );

    it( "should be HEAD on develop", function () {
      expect( gitGraph.HEAD ).toEqual( develop );
    } );

    it( "should have the first color of template theme", function () {
      expect( master.color ).toEqual( gitGraph.template.colors[ 0 ] );
    } );

    it( "should have the color of branch template", function () {
      gitGraph = new GitGraph( { canvas: canvas, template: "blackarrow" } );
      master = gitGraph.branch( "master" );

      expect( master.color ).toEqual( gitGraph.template.branch.color );
    } );

    it( "should have the right column number", function () {
      expect( master.column ).toEqual( 0 );
      expect( develop.column ).toEqual( 1 );
    } );

    it( "should have the right commits count", function () {
      master.commit().commit().commit();

      expect( master.commits.length ).toEqual( 3 );
    } );

  } );

  describe( "Commit", function () {

    beforeEach( function () {
      gitGraph = new GitGraph( { canvas: canvas, template: "metro" } );

      master = gitGraph.branch( "master" );
      master.commit().commit();
      develop = gitGraph.branch( "develop" );
      develop.commit();
      master.commit();
      gitGraph.commit();
    } );

    it( "should have a pretty color", function () {
      expect( master.commits[ 2 ].dotColor ).toEqual( gitGraph.template.colors[ 0 ] );
    } );

    it( "should have the right position", function () {
      // Commit on master
      expect( master.commits[ 2 ].x ).toEqual( 0 );
      expect( master.commits[ 2 ].y ).toEqual( 160 );

      // Commit on develop
      expect( develop.commits[ 1 ].x ).toEqual( 50 );
      expect( develop.commits[ 1 ].y ).toEqual( 240 );
    } );

  } );

} );
