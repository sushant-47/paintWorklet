
CSS.registerProperty({
	name: '--clock-hour',
	syntax: '<integer>',
	inherits: false,
	initialValue: 0
})
CSS.registerProperty({
	name: '--clock-min',
	syntax: '<integer>',
	inherits: false,
	initialValue: 0
})
CSS.registerProperty({
	name: '--clock-sec',
	syntax: '<integer>',
	inherits: false,
	initialValue: 0
})
/* define the worklet */
/* updates hour min and sec hand on each second */
function clockWorker() {
	class clock {
		ctx;
		elsize;
		center;
		props;
		rad = { outer: 100, inner: 90 };
		rot = {h: 0, m: 0, s: 0};  // from 12
		static get inputProperties() {
			return ['--clock-hour', '--clock-min', '--clock-sec'];
		}
		calculateRotations() {
			this.rot = {
				h: Math.PI * (this.props.get("--clock-hour").value - 12 + (this.props.get("--clock-min").value / 60) + (this.props.get("--clock-sec").value / (60 * 60))) / 6,
				m: Math.PI * (this.props.get("--clock-min").value + (this.props.get("--clock-sec").value / 60)) / 30,
				s: Math.PI * this.props.get("--clock-sec").value / 30
			}
		}
		drawOuterCircle() {
			this.ctx.beginPath();
			this.ctx.lineWidth = 5;
			this.ctx.arc(this.center.x, this.center.y, this.rad.outer, 0, Math.PI * 2, false);
			this.ctx.stroke();
			this.ctx.closePath();
		}
		drawInnerCircle() {
			this.ctx.beginPath();
			this.ctx.translate(this.center.x, this.center.y);
			this.ctx.scale(1, -1);
			this.ctx.lineWidth = 2;
			// draw mins and seconds line
			for (var i=0; i < 60; i++) {
				this.ctx.moveTo(0, this.rad.inner);
				if (i % 5 == 0) {
					// draws min lines after every 30 deg
					this.ctx.lineTo(0, this.rad.inner - 16);
				} else {
					this.ctx.lineTo(0, this.rad.inner - 5);
				}
				this.ctx.rotate(-1 * Math.PI / 30);
			}
			this.ctx.stroke();
			this.ctx.closePath();
		}
		drawHands() {
			this.ctx.beginPath();
			this.ctx.translate(this.center.x, this.center.y);
			this.ctx.scale(1, -1);
			this.ctx.arc(0, 0, 4, 0, Math.PI * 2, false);
			this.ctx.fill();
			// draw hour hand
			this.ctx.save();
			this.ctx.rotate(-1 * this.rot.h);
			this.ctx.moveTo(0, -10);
			this.ctx.lineTo(0, 45);
			this.ctx.restore();
			// draw minute hand
			this.ctx.save();
			this.ctx.rotate(-1 * this.rot.m);
			this.ctx.moveTo(0, -15);
			this.ctx.lineTo(0, 65);
			this.ctx.restore();
			// draw seconds hand
			this.ctx.save();
			this.ctx.rotate(-1 * this.rot.s);
			this.ctx.moveTo(0, -21);
			this.ctx.lineTo(0, 80);
			this.ctx.restore();

			this.ctx.stroke();
			this.ctx.closePath();
		}
		paint(ctx, size, props) {
			this.ctx = ctx;
			this.props = props;
			this.center = {x: size.width / 2, y: size.height / 2};
			ctx.save();
			this.calculateRotations();
			/* draw hands */
			this.drawHands();
			ctx.restore();
			ctx.save();
			this.drawOuterCircle();
			this.drawInnerCircle();
			ctx.restore();
		}
	}
	registerPaint('clock', clock);
}


/* register the worklet */
var fn = clockWorker.toString();
// get javascript content from function content
var blob_part = fn.slice(fn.indexOf("{") + 1, fn.lastIndexOf("}"));
var blob = new Blob([blob_part], {type: 'application/javascript'});
var blob_url = URL.createObjectURL(blob);

CSS.paintWorklet.addModule(blob_url).finally(function() {
	URL.revokeObjectURL(blob_url);
});
