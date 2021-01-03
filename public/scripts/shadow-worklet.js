
/* define the worklet */
/* draws shadow around an element */
function shadowWorker() {
	class shadow {
		static get inputProperties() {
			return [];
		}
		paint(ctx, size, props) {
			ctx.shadowOffsetX = 3;
			ctx.shadowOffsetY = 3;
			ctx.shadowBlur = 4;
			ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
			// ctx.fillText("Hello World", 20, 20);  // function not in PaintWorkletContext2D
			ctx.fillStyle = 'yellow';
			ctx.fillRect(0, 0, 150, 150);
		}
	}

	registerPaint('shadow', shadow);
}

/* register the worklet */
var fn = shadowWorker.toString();
// get javascript content from function content
var blob_part = fn.slice(fn.indexOf("{") + 1, fn.lastIndexOf("}"));
var blob = new Blob([blob_part], {type: 'application/javascript'});
var blob_url = URL.createObjectURL(blob);

CSS.paintWorklet.addModule(blob_url).finally(function() {
	URL.revokeObjectURL(blob_url);
});
