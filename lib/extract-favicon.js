module.exports = function ($) {
	const $linkTags = $('link')
	var extracted = {}

	$linkTags.each(function (index, el) {
		if ($(this).attr('rel') == 'icon') {
			var key = `icon-` + ($(this).attr('sizes') || 'default')
			extracted[key] = $(this).attr('href')
		}

		if ($(this).attr('rel') == 'shortcut icon') {
			var key = `icon-` + ($(this).attr('sizes') || 'default')
			extracted[key] = $(this).attr('href')
		}

		if ($(this).attr('rel') == 'apple-touch-icon') {
			var key = `apple-icon-` + ($(this).attr('sizes') || 'default')
			extracted[key] = $(this).attr('href')
		}

	})

	return extracted
}

