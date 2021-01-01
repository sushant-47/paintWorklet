
CSS.registerProperty({
	name: '--pst-pattern',
	syntax: '<image>',  // no support as of writing
	inherits: false,
	initialValue: 'image'
})
/* define the worklet */
/* draws repeating image as a fill or stroke style of an element */
function patternWorker() {
	class imagePattern {
		static get inputProperties() {
			return ['--pst-pattern'];
		}
		paint(ctx, size, props) {
			console.log(props.get("--pst-pattern"));
		}
	}

	registerPaint('imagePattern', imagePattern);
}

/* register the worklet */
var fn = patternWorker.toString();
// get javascript content from function content
var blob_part = fn.slice(fn.indexOf("{") + 1, fn.lastIndexOf("}"));
var blob = new Blob([blob_part], {type: 'application/javascript'});
var blob_url = URL.createObjectURL(blob);

CSS.paintWorklet.addModule(blob_url).finally(function() {
	URL.revokeObjectURL(blob_url);
});
