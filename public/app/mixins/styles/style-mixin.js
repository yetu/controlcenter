'use strict';

var StyleMixin = {
	componentWillMount: function () {
		this.style.use();
	},

	componentWillUnmount: function () {
		this.style.unuse();
	}
};

module.exports = StyleMixin;