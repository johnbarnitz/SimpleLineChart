# SimpleLineChart.js
SimpleLineChart is a small HTML Canvas based Line Chart. The main goal is to be able to create line charts with minimal amounts of client-side calculations.  Code was inspired by  the tutorial by [Ashwani Tyagi]

### Using SimpleLineChart
The SimpleLineChart Object takes one parameter an associative array with the following keys:
  - **canvasId:**   id of canvas element to draw on
  - **minX:**   Minimum value of x axis to be displayed, or 0 to show from origin
  - **minY:**   Minimum value of x axis to be displayed, or 0 to show from origin
  - **maxX:**   Maximum X value in dataset, this must be calculated server side
  - **maxY:**   Maximum Y value in dataset, this must be calculated server side

There is one function:

 drawLine(data, color, width) 
  - data: This is the x and y plot points of what the line chart should look like.
    - Data is  array of hashes, each with indexes x,y: Example:
*	     [{"y": 5.0, "x": 1430658300000}, {"y": 4.0, "x": 1430829900000}]
 - color: HTML color of line
 - width: Width of line

