
/* define the worklet */
function headerWorker() {
	class headerHighlight {
		static get inputProperties() {
			return [];
		}
		paint(ctx, size, props) {
			console.log(size);
			for (const [prop, val] of props) {
				console.log("property : ", prop, val);
			}

			ctx.lineWidth = 1.5;
		// drawing rectangles
			// ctx.fillRect(4, 4, size.width - 4, size.height - 4);     /* order: x, y, w, h */
			// ctx.fillStyle = 'rgb(200, 0, 0, 0.7)';
			// ctx.fillRect(10, 10, 80, 80);
			// ctx.clearRect(25, 25, 50, 50);
			// ctx.strokeRect(35, 35, 35, 35);
			// ctx.rect(10, 10, 150, 80);

		// drawing paths
			// ctx.fillStyle = 'red';
			ctx.strokeStyle = 'darkgreen';
			// ctx.beginPath();
			// ctx.lineTo(12, 13);
			// ctx.lineTo(100, 50);
			// // ctx.moveTo(100, 120);
			// ctx.lineTo(180, 180);
			// ctx.closePath();
			// ctx.stroke();
		
		// drawing circles and arcs
			// ctx.arcTo();  // for creating smooth rounded corners between two segments.
			ctx.arc(150, 90, 89, 0, Math.PI * 2);
			ctx.moveTo(200, 90);
			ctx.arc(150, 90, 50, 0, Math.PI, false);
			ctx.moveTo(130, 65);
			ctx.arc(125, 65, 5, 0, Math.PI * 2);
			ctx.moveTo(180, 65);
			ctx.arc(175, 65, 5, 0, Math.PI * 2);
			ctx.stroke();
		}
	}

	registerPaint('headerHighlight', headerHighlight);
}


/* register the worklet */
var fn = headerWorker.toString();
// get javascript content from function content
var blob_part = fn.slice(fn.indexOf("{") + 1, fn.lastIndexOf("}"));
var blob = new Blob([blob_part], {type: 'application/javascript'});
var blob_url = URL.createObjectURL(blob);

CSS.paintWorklet.addModule(blob_url);
