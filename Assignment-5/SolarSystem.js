var Multiply = 10;
var SolarSystem = {
  Sun : {
    radius : .5,  
    distance : 0,
    year : 0,
    color : [ 1.0, 1.0, 0.0, 1.0 ]
  },
  Mercury : {
      radius: .5,
      distance: 0.387 * Multiply,
    year : 0.241,
    color : [ 1.0, 0.0, 0.0, 1.0 ]
  },
  Venus : {
    radius : 0.949,
    distance: 0.723 * Multiply,
    year : 0.615,
    color : [ 1.0, 0.0, 1.0, 1.0 ]
  },
  Earth : {
    radius : 1,
    distance: 1 * Multiply,
    year : 1,
    color : [ 0.0, 0.0, 1.0, 1.0 ]
  },
  Moon : {
    radius : 0.2724,
    distance: 0.00257 * Multiply * 50,
    year : 0.0748,
    color : [ 0.5, 0.5, 0.5, 1.0 ]
  },
  Mars : {
    radius : 0.532,
    distance: 1.52 * Multiply,
    year : 1.88,
    color : [ 1.0, 0.0, 0.0, 1.0 ]
  },
  Jupiter : {
    radius : 5,
    distance: 5.20 * 5,
    year : 11.9,
    color : [ 1.0, 153/255, 0.0, 1.0 ]
  },
  Saturn : {
    radius : 5,
    distance: 9.58 * 4,
    year : 29.4,
    color : [ 1.0, 1.0, 0.0, 1.0 ]
  },
  Uranus : {
    radius : 4.01,
    distance: 19.20 * 2.7,
    year : 83.7,
    color : [ 0.0, 0.1, 1.0, 1.0 ]
  },
  Neptune : {
    radius : 3.88,
    distance: 30.05 * 2.1,
    year : 163.7,
    color : [ 0.0, 0.0, 1.0, 1.0 ]
  },
  Pluto : {
    radius : 2,
    distance: 39.48 * 1.9,
    year : 247.9,
    color : [ 150/255, 75/255, 0.0, 1.0 ]
  }
};
