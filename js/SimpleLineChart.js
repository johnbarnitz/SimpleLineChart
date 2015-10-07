          function LineChart(con) {
            // user defined properties
            this.canvas = document.getElementById(con.canvasId);
            this.minX = con.minX;
            this.minY = con.minY;
            this.maxX = con.maxX;
            this.maxY = con.maxY;
            this.unitsPerTickX = con.unitsPerTickX;
            this.unitsPerTickY = con.unitsPerTickY;
 
            // constants
            this.padding = 10;
            this.tickSize = 10;
            this.axisColor = "#555";
            this.pointRadius = 5;
            this.font = "12pt Calibri";
 
            this.fontHeight = 12;
 
            // relationships     
            this.context = this.canvas.getContext("2d");
            this.rangeX = this.maxX - this.minY;
            this.rangeY = this.maxY - this.minY;
            this.numXTicks = Math.round(this.rangeX / this.unitsPerTickX);
            this.numYTicks = Math.round(this.rangeY / this.unitsPerTickY);
//            this.x = this.getLongestValueWidth() + this.padding * 2;
            this.x = 0;
            this.y = this.padding * 2;
            this.width = this.canvas.width - this.x - this.padding * 2;
            this.height = this.canvas.height - this.y - this.padding - this.fontHeight;
            this.scaleX = this.width / this.rangeX;
            this.scaleY = this.height / this.rangeY;
 
            // draw x y axis and tick marks
            this.drawXAxis();

            
            
        }
 
        LineChart.prototype.getLongestValueWidth = function () {
            this.context.font = this.font;
            var longestValueWidth = 0;
            for (var n = 0; n <= this.numYTicks; n++) {
                var value = this.maxY - (n * this.unitsPerTickY);
                longestValueWidth = Math.max(longestValueWidth, this.context.measureText(value).width);
            }
            return longestValueWidth;
        };
 
        LineChart.prototype.drawXAxis = function () {
            var context = this.context;
            context.save();
//            context.beginPath();
//            context.moveTo(this.x, this.y + this.height);
//            context.lineTo(this.x + this.width, this.y + this.height);
//            context.strokeStyle = this.axisColor;
//            context.lineWidth = 2;
//            context.stroke();
			context.fillRect(this.x, this.y +this.height, this.width, 1); 
            context.restore();
        };
 
        LineChart.prototype.drawYAxis = function () {
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
 
        LineChart.prototype.drawLine = function (data, color, width) {
            var context = this.context;
            context.save();
            this.transformContext();
            context.lineWidth = width;
            context.strokeStyle = color;
            context.fillStyle = color;
            context.beginPath();
            largestartx = data[0].x;
       
            context.moveTo((data[0].x -largestartx) * this.scaleX, data[0].y * this.scaleY); 
            var i = 0;
            var hops = Math.ceil(data.length/this.width);     
            console.log("Start draw");
            for (var n = 0; n < data.length; n+=hops) {
                var point = data[n];
 
                // draw segment
//                context.lineTo((point.x - largestartx) * this.scaleX, point.y * this.scaleY);
                context.lineTo(i, point.y * this.scaleY);
                context.stroke();
                context.closePath();

                // position for next segment
                context.beginPath();
                context.moveTo(i, point.y * this.scaleY);
                i++;
            }
            context.restore();
            console.log("End Draw");
        };
 
        LineChart.prototype.transformContext = function () {
            var context = this.context;
 
            // move context to center of canvas
            this.context.translate(this.x, this.y + this.height);
 
            // invert the y scale so that that increments
            // as you move upwards
            context.scale(1, -1);
        };