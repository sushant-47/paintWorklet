
CSS.registerProperty({
	name: '--march-offset',
	syntax: '<integer> | <number>',
	inherits: false,
	initialValue: 0
})
/* define the worklet */
/* draws marching ant border of an element */
function marchingWorker() {
	class marchDash {
		ctx;
		elsize;
		offset = 0;
		static get inputProperties() {
			return ['--march-offset'];
		}
		paint(ctx, size, props) {
			this.ctx = ctx;
			this.elsize = size;
			ctx.strokeStyle = 'blue';
			ctx.lineWidth = 2;
			// use animation instead of setInterval and setTimeout
			// window.setInterval(function() {
				this.offset = props.get('--march-offset').value;
				this.march();
			// }, 100);
		}

		march() {
			this.ctx.lineDashOffset = -this.offset;
			this.ctx.setLineDash([5, 3]);
			this.ctx.strokeRect(0, 0, this.elsize.width, this.elsize.height);
		}
	}

	registerPaint('marchDash', marchDash);
}


/* register the worklet */
var fn = marchingWorker.toString();
// get javascript content from function content
var blob_part = fn.slice(fn.indexOf("{") + 1, fn.lastIndexOf("}"));
var blob = new Blob([blob_part], {type: 'application/javascript'});
var blob_url = URL.createObjectURL(blob);

CSS.paintWorklet.addModule(blob_url).finally(function() {
	URL.revokeObjectURL(blob_url);
});
