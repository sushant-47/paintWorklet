
/* define the worklet */
/* draws gradient as a fill or stroke style of an element */
function gradientWorker() {
	let we = this;
	console.log(we)
	class gradient {
		static get inputProperties() {
			return [];
		}
		paint(ctx, size, props) {
			// console.log(Image);
			var lingrad = ctx.createLinearGradient(0, 0, 60, 60);
			lingrad.addColorStop(0, '#00ABEB');
			lingrad.addColorStop(0.5, '#fff');
			lingrad.addColorStop(0.5, '#26C000');
			lingrad.addColorStop(1, '#fff');

			/* green circle */
			var radgrad = ctx.createRadialGradient(40, 40, 10, 50, 50, 30);
			radgrad.addColorStop(0, 'greenyellow');
			radgrad.addColorStop(0.8, 'green');
			radgrad.addColorStop(1, 'rgba(100, 159, 98, 0)');

			/* pink circle */
			var radgrad2 = ctx.createRadialGradient(100, 30, 10, 110, 30, 45);
			radgrad2.addColorStop(0, '#FF5F98');
			radgrad2.addColorStop(0.75, '#FF0188');
			radgrad2.addColorStop(1, 'rgba(255, 1, 136, 0)');

			/* yellow circle */
			var radgrad3 = ctx.createRadialGradient(20, 150, 10, 0, 150, 100);
			radgrad3.addColorStop(0, '#F4F201');
			radgrad3.addColorStop(0.8, '#E4C700');
			radgrad3.addColorStop(1, 'rgba(228, 199, 0, 0)');

			/* blue circle */
			var radgrad4 = ctx.createRadialGradient(105, 125, 15, 120, 125, 50);
			radgrad4.addColorStop(0, '#6cd5f1');
			radgrad4.addColorStop(0.8, '#00B5E2');
			radgrad4.addColorStop(1, 'rgba(0, 201, 255, 0)');

			ctx.fillStyle = radgrad3;
			ctx.fillRect(0, 0, 200, 200);

			ctx.fillStyle = radgrad;
			ctx.fillRect(0, 0, 200, 200);

			ctx.fillStyle = radgrad2;
			ctx.fillRect(0, 0, 200, 200);

			ctx.fillStyle = radgrad4;
			ctx.fillRect(0, 0, 200, 200);
		}
	}

	registerPaint('gradient', gradient);
}

/* register the worklet */
var fn = gradientWorker.toString();
// get javascript content from function content
var blob_part = fn.slice(fn.indexOf("{") + 1, fn.lastIndexOf("}"));
var blob = new Blob([blob_part], {type: 'application/javascript'});
var blob_url = URL.createObjectURL(blob);

CSS.paintWorklet.addModule(blob_url).finally(function() {
	URL.revokeObjectURL(blob_url);
});
