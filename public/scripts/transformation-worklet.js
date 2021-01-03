
/* define the worklet */
/* performs transformation functions on the canvas of an element */
function transformWorker() {
	class transformer {
		ctx;
		elsize;
		static get inputProperties() {
			return ['--pst-pattern'];
		}
		cartesian() {
			// set to classical cartesian system
			this.ctx.translate(0, this.elsize.height);
			this.ctx.scale(1, -1);
		}
		mark() {
			/* marks x-axis and y-axis of a cartesian coordinate system */
			this.ctx.moveTo(0, 0);
			this.ctx.lineTo(350, 0);
			this.ctx.moveTo(0, 0);
			this.ctx.lineTo(0, 350);
			this.ctx.stroke();
		}
		paint(ctx, size, props) {
			console.log(ctx)
			this.ctx = ctx;
			this.elsize = size;
			this.cartesian();
			ctx.beginPath();
			ctx.fillStyle = 'red';
			ctx.strokeStyle = 'red';
			this.mark();
			ctx.save();
			// draw a rectangle in normal cartesian system
			ctx.fillRect(40, 40, 100, 100);
			ctx.closePath();
			ctx.beginPath();
			// translate and rotate the origin
			ctx.translate(90, 90);
			ctx.fillStyle = 'blue';
			ctx.strokeStyle = 'blue';
			this.mark();
			ctx.closePath();
			ctx.beginPath();
			ctx.rotate(Math.PI * 45 / 180);
			ctx.fillStyle = 'green';
			ctx.strokeStyle = 'green';
			this.mark();
			ctx.closePath();
			ctx.beginPath();
			ctx.translate(-90, -90);
			this.mark();
			// draw the rotated rectangle
			// ctx.globalCompositeOperation = 'luminosity';
			ctx.fillRect(40, 40, 100, 100);
			ctx.closePath();
			ctx.restore(); // restore() causes the last saved state to pop off the stack			
		}
	}

	registerPaint('transformer', transformer);
}

/* register the worklet */
var fn = transformWorker.toString();
// get javascript content from function content
var blob_part = fn.slice(fn.indexOf("{") + 1, fn.lastIndexOf("}"));
var blob = new Blob([blob_part], {type: 'application/javascript'});
var blob_url = URL.createObjectURL(blob);

CSS.paintWorklet.addModule(blob_url).finally(function() {
	URL.revokeObjectURL(blob_url);
});
