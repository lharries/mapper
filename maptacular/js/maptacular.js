/**
 *
 * @param width size of the grid, in points along the x axis
 * @param height size of the grid, in points along the y axis
 * @param magnification the number by which you want to scale the chart.  The
 *        default is 1, meaning 1 px per point.
 * @returns A Grid object with the following API:
 *
 *  var my_grid = new Grid(100, 100);
 *  my_grid.get_point();
 *  my_grid.save_point(1, 2, true);
 *
 */
function Maptacular(width, height, magnification) {

  var self = this;

  this.init = function(width, height, magnification) {

    self.width = width;
    self.height = height;

    self.magnification = magnification;

    // The list of points we're going to be testing
    self.availablePoints = [];
    self.interestingPoints = [];

    // Setup the primary grid
    self.data = {
      version: 1,
      left: [],
      right: []
    };

    var modX = Math.floor(self.width * (self.magnification / 100));
    var modY = Math.floor(self.height * (self.magnification / 100));

    // Populate the primary grid and set the initial availablePoints
    ['left', 'right'].map(function(side){

      for (var i = 0; i < self.width; i++) {

        self.data[side][i] = [];

        for (var j = 0; j < self.height; j++) {

          self.data[side][i][j] = null;

          if (i % modX === 0 && j % modY === 0) {
            if (i !== self.width && j !== self.height) {
              self.availablePoints.push([i, j]);
            }
          }

        }

      }

    });

  };

  /**
   *
   * Given an array of coordinates, return a sub-grid of the area around said
   * coordinates.
   *
   */
  this.setPotentials = function() {

    console.log("Iterating downward for higher resolution");

    self.magnification = self.magnification / 2;

    self.interestingPoints.map(function(point){

      self.availablePoints.push([
        Math.floor(point[0] - (self.magnification / 100) * self.width),
        point[1]
      ]);
      self.availablePoints.push([
        Math.floor(point[0] + (self.magnification / 100) * self.width),
        point[1]
      ]);
      self.availablePoints.push([
        point[0],
        Math.floor(point[1] - (self.magnification / 100) * self.height)
      ]);
      self.availablePoints.push([
        point[0],
        Math.floor(point[1] + (self.magnification / 100) * self.height)
      ]);

      self.availablePoints.push([
          point[0] + (self.magnification / 100) * self.width,
          point[1] + (self.magnification / 100) * self.height
      ]);
      self.availablePoints.push([
          point[0] + (self.magnification / 100) * self.width,
          point[1] - (self.magnification / 100) * self.height
      ]);
      self.availablePoints.push([
          point[0] - (self.magnification / 100) * self.width,
          point[1] + (self.magnification / 100) * self.height
      ]);
      self.availablePoints.push([
          point[0] - (self.magnification / 100) * self.width,
          point[1] - (self.magnification / 100) * self.height
      ]);

    });

    // TODO: Remove duplicates
    // TODO: Remove negative values

    self.interestingPoints = [];

  };

  /**
   *
   * Use the magic of math to return a coordinate that is both random enough
   * not to be easily predicted by the user, and close enough to other known
   * problem spots to give us better resolution of the user's void spaces.
   *
   * @param side The eye we're dealing with
   *
   * @returns {[number, number]}
   *
   */
  this.getPoint = function(side) {
    if (!self.availablePoints.length) {
      if (!self.interestingPoints.length) {
        console.log("Perfect Vision!");
        return null;
      }
      self.setPotentials();
    }
    return self.availablePoints.splice(
        Math.floor(Math.random() * self.availablePoints.length),
        1
    )[0];
  };

  this.savePoint = function(side, x, y, value) {
    if (value === false) {
      self.interestingPoints.push([x, y]);
    }
    self.data[side][x][y] = value;
  };

  /**
   *
   * Use heatmapjs to draw a heat map over the space, and then grabs the binary
   * image data from the canvas to create an image, which is then passed to
   * jsPDF to generate a simple PDF.
   *
   * StackOverflow for reference:
   *   https://stackoverflow.com/a/15685877/231670
   *
   */
  this.download = function() {

    this.draw();

    var data = JSON.stringify(self.data);
    var left = document.getElementsByTagName("canvas")[0].toDataURL();
    var right = document.getElementsByTagName("canvas")[1].toDataURL();

    var doc = new jsPDF();
    doc.setFontSize(40);
    doc.text(0, 25, 'This is what I see');
    doc.addImage(left, 'PNG', 0, 50, 80, 80);
    doc.addImage(right, 'PNG', 85, 50, 80, 80);
    // doc.save();

  };

  this.draw = function() {

    var heatmaps = {
      left: h337.create({
        container: document.getElementById('left-eye'),
        radius: 10,
        maxOpacity: .5,
        minOpacity: 0,
        blur: .75,
        gradient: {
          '0': 'white',
          '1': 'black'
        }
      }),
      right: h337.create({
        container: document.getElementById('right-eye'),
        radius: 10,
        maxOpacity: .5,
        minOpacity: 0,
        blur: .75,
        gradient: {
          '0': 'white',
          '1': 'black'
        }
      })
    };

    ['left', 'right'].map(function(side) {
      for (var i = 0; i < self.width; i++) {
        for (var j = 0; j < self.height; j++) {
          if (self.data[side][i][j] !== null) {
            heatmaps[side].addData({
              x: i * 3,
              y: j * 3,
              value: 100,
              radius: 10
            });
          }
        }
      }
    });

  };

  this.init(width, height, magnification);

  return this;

}
