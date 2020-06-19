module.exports = function ($) {
	const $linkTags = $('link')
	var extracted = {}

	$linkTags.each(function (index, el) {
		if ($(this).attr('rel') == 'icon') {
			const key = `icon-` + ($(this).attr('sizes') || 'default')
			extracted[key] = $(this).attr('href')
		}

		if ($(this).attr('rel') == 'shortcut icon') {
			const key = `icon-` + ($(this).attr('sizes') || 'default')
			extracted[key] = $(this).attr('href')
		}

		if ($(this).attr('rel') == 'apple-touch-icon') {
			const key = `apple-icon-` + ($(this).attr('sizes') || 'default')
			extracted[key] = $(this).attr('href')
		}

	})

	return extracted
}

