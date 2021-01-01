
/* define the worklet */
function cornerWorker() {
	class roundedCorner {
		static get inputProperties() {
			return [];
		}
		paint(ctx, size, props) {
			console.log(size);
			for (const [prop, val] of props) {
				console.log("property : ", prop, val);
			}

			ctx.lineWidth = 1.5;
		// drawing circles and arcs
			// ctx.arcTo();  // for creating smooth rounded corners between two segments.
			// creates an arc between two lines : first line between starting point and first control point, second line between first and second control points
			// The arc's connecting line will go in whatever direction it must to meet the specified radius.
			// for small arcs use starting point that is neither too near nor too far from the first control point but on the same first line connecting the two
			// for bigger arcs use farther starting point.
			const p0 = { x: 100, y: 122  };
			const p1 = { x: 90,  y: 130 };
			const p2 = { x: 80,  y: 20  };

			ctx.beginPath();
			ctx.moveTo(p0.x, p0.y);
			ctx.arcTo(p1.x, p1.y, p2.x, p2.y, 10);
			ctx.lineTo(p2.x, p2.y);
			ctx.stroke();

		}
	}

	registerPaint('roundedCorner', roundedCorner);
}


/* register the worklet */
var fn = cornerWorker.toString();
// get javascript content from function content
var blob_part = fn.slice(fn.indexOf("{") + 1, fn.lastIndexOf("}"));
var blob = new Blob([blob_part], {type: 'application/javascript'});
var blob_url = URL.createObjectURL(blob);

CSS.paintWorklet.addModule(blob_url).finally(function() {
	URL.revokeObjectURL(blob_url);
});
