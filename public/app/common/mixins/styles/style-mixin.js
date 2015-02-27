'use strict';

var StyleMixin = {
	componentWillMount: function() {
		this.style.use();
	}
};

module.exports = StyleMixin;