 function SimpleLineChart(con) {
     // user defined properties
     this.canvas = document.getElementById(con.canvasId);
     this.minX = con.minX;
     this.minY = con.minY;
     this.maxX = con.maxX;
     this.maxY = con.maxY;

     // constants
     this.padding = 10;
     this.tickSize = 10;
     this.axisColor = "#555";
     this.pointRadius = 5;
     this.font = "12pt Calibri";

     this.fontHeight = 12;

     // relationships     
     this.context = this.canvas.getContext("2d");
     this.rangeX = this.maxX - this.minX;
     this.rangeY = this.maxY - this.minY;
     this.numYTicks = Math.round(this.rangeY / this.unitsPerTickY);
     this.x = this.padding * 2;
     this.y = this.padding * 2;
     this.width = this.canvas.width - this.x - this.padding * 2;
     this.height = this.canvas.height - this.y - this.padding - this.fontHeight;
     this.scaleX = this.width / this.rangeX;
     this.scaleY = this.height / this.rangeY;

     // draw x y axis and tick marks
     this.drawXAxis();


 }

 SimpleLineChart.prototype.getLongestValueWidth = function() {
     this.context.font = this.font;
     var longestValueWidth = 0;
     for (var n = 0; n <= this.numYTicks; n++) {
         var value = this.maxY - (n * this.unitsPerTickY);
         longestValueWidth = Math.max(longestValueWidth, this.context.measureText(value).width);
     }
     return longestValueWidth;
 };

 SimpleLineChart.prototype.drawXAxis = function() {
     var context = this.context;
     context.save();
     context.fillRect(this.x, this.y + this.height, this.width, 1);
     context.restore();
 };

 SimpleLineChart.prototype.drawYAxis = function() {
     var context = this.context;
     context.save();
     context.save();
     context.beginPath();
     context.moveTo(this.x, this.y);
     context.lineTo(this.x, this.y + this.height);
     context.strokeStyle = this.axisColor;
     context.lineWidth = 2;
     context.stroke();
     context.restore();


     context.restore();
 };

 SimpleLineChart.prototype.drawLine = function(data, color, width) {
     var context = this.context;
     context.save();
     this.transformContext();
     context.lineWidth = width;
     context.strokeStyle = color;
     context.fillStyle = color;
     context.beginPath();
     largestartx = data[0].x;

     context.moveTo((data[0].x - largestartx) * this.scaleX, data[0].y * this.scaleY);
     var i = 0;
     var hops = 0;

     for (var n = 0; n < data.length; n += 5) {
         var point = data[n];

         // draw segment
         context.lineTo(i, point.y * this.scaleY);
         context.stroke();
         context.closePath();

         // position for next segment
         context.beginPath();
         context.moveTo(i, point.y * this.scaleY);
         i++;
     }
     context.restore();
 };

 SimpleLineChart.prototype.transformContext = function() {
     var context = this.context;

     // move context to center of canvas
     this.context.translate(this.x, this.y + this.height);

     // invert the y scale so that that increments
     // as you move upwards
     context.scale(1, -1);
 };