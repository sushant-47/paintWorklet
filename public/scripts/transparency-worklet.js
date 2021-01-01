
/* define the worklet */
function transparencyWorker() {
	class radialCircle {
		static get inputProperties() {
			return [];
		}
		paint(ctx, size, props) {
			const rectWidth = 75, rectHeight = 75;
			ctx.globalAlpha = 0.9;
			ctx.fillStyle = "red";
			ctx.fillRect(25, 25, rectWidth, rectHeight);
			ctx.fillStyle = "yellow";
			ctx.fillRect(25 + rectWidth, 25, rectWidth, rectHeight);
			ctx.fillStyle = "green";
			ctx.fillRect(25, 25 + rectHeight, rectWidth, rectHeight);
			ctx.fillStyle = "blue";
			ctx.fillRect(25 + rectWidth, 25 + rectHeight, rectWidth, rectHeight);

			ctx.lineWidth = 15;
			// draw expanding circles
			for (var i=1; i < 6; i++) {
				ctx.strokeStyle = "rgba(255, 255, 255, " + (6 - i) / 6 +")";
				ctx.beginPath();
				ctx.arc(100, 100, 15 * i, 0, Math.PI * 2, false);
				ctx.stroke();
			}
		}
	}

	registerPaint('radialCircle', radialCircle);
}


/* register the worklet */
var fn = transparencyWorker.toString();
// get javascript content from function content
var blob_part = fn.slice(fn.indexOf("{") + 1, fn.lastIndexOf("}"));
var blob = new Blob([blob_part], {type: 'application/javascript'});
var blob_url = URL.createObjectURL(blob);

CSS.paintWorklet.addModule(blob_url).finally(function() {
	URL.revokeObjectURL(blob_url);
});
