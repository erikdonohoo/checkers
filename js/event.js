window.EventManager = (function () {

	var eventMap = {};

	var on = function (eventName, cb) {
		eventMap[eventName] = eventMap[eventName] || [];
		eventMap[eventName].push(cb);
	};

	var trigger = function (eventName) {
		var args = [].slice.call(arguments).slice(1);
		eventMap[eventName].forEach(function (fn) {
			fn.call(args);
		});
	};

	return {
		on: on,
		trigger: trigger
	};
})();
