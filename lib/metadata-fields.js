const _ = require('underscore')
const clean = require('./clean')

module.exports = MetadataFields

/**
	* @ctor MetadataFields (chainable)
	* Returns basic metadata fields whose values will be filled in by the parser
	* after url request response. Most of these are Open Graph Protocol (og:) so
	* far: http://ogp.me/
	*
	* TODO: protocols `sailthru`, `parseley`, `twitter`, `dcterms`
	*/

function MetadataFields(options) {
	this.options = options || {}
	this.fields = {
		'url': '',
		'canonical': '',
		'title': '',
		'image': '',
		'author': '',
		'description': '',
		'keywords': '',
		'source': '',
		'og:url': '',
		'og:locale': '',
		'og:locale:alternate': '',
		'og:title': '',
		'og:type': '',
		'og:description': '',
		'og:determiner': '',
		'og:image': '',
		'og:image:secure_url': '',
		'og:image:type': '',
		'og:image:width': '',
		'og:image:height': '',
		'price': '',
		'priceCurrency': '',
		'availability': '',
		'og:site_name': '',
		'twitter:app:name:googleplay': '',
		'al:ios:app_name':'',
		'al:android:app_name':'',
		'al:iphone:app_name':'',
		'al:ipad:app_name':'',
		'twitter:app:name:ipad':'',
		'twitter:app:name:iphone':'',
		'apple-mobile-web-app-title': '',
		'application-name':'',
		'site':'',
		'icon-default': '',
		'icon-128x128': '',
		'icon-152x152': '',
		'icon-167x167': '',
		'icon-180x180': '',
		'icon-192x192': '',
		'icon-196x196': '',
		'apple-icon-default': '',
		'apple-icon-128x128': '',
		'apple-icon-152x152': '',
		'apple-icon-167x167': '',
		'apple-icon-180x180': '',
		'apple-icon-192x192': '',
		'apple-icon-196x196': '',
		'favicon': ''
	}

	return this
}

/**
	* @method `configureType` (chainable)
	* @param {string} `type`
	* Returns properties belonging to global types that are grouped into
	* verticals and generally agreed upon. In the following example, "music.song"
	* would be the type passed as an argument into this method. This method
	* currently only supports type `article`, however.
	* <meta property="og:type" content="music.song" />
	*
	* TODO: music, audio, video
	*/
MetadataFields.prototype.configureType = function (type) {
	if (!type || (typeof type !== 'string')) return this
	var fieldsByType = {
		'article': {
			'article:published_time': '',
			'article:modified_time': '',
			'article:expiration_time': '',
			'article:author': '',
			'article:section': '',
			'article:tag': '',
			'og:article:published_time': '',
			'og:article:modified_time': '',
			'og:article:expiration_time': '',
			'og:article:author': '',
			'og:article:section': '',
			'og:article:tag': '',
		}
	}
	if (fieldsByType[type]) _.extend(this.fields, fieldsByType[type])
	return this
}

/**
	* @method `lockKeys` (chainable)
	* Freeze metadata keys via Object.seal
	*/
MetadataFields.prototype.lockKeys = function () {
	Object.seal(this.fields)
	return this
}

/**
	* @method `set` (chainable)
	* @param obj must be in the form of {key: value}
	*/
MetadataFields.prototype.set = function (obj) {
	if (obj) _.extend(this.fields, obj)
	return this
}

/**
* @method `get`
* @param key {string}
*/
MetadataFields.prototype.get = function (key) {
	return this.fields[key]
}

/**
	* @method `clean` (chainable)
	*/
MetadataFields.prototype.clean = function () {
	var self = this
	Object.keys(this.fields).forEach(function (key) {
		self.fields[key] = clean(key, self.fields[key], self.options)
	})
	return this
}

/**
	* @method `finalize`
	* optionally encode and then return all fields
	*/
MetadataFields.prototype.finalize = function () {
	var self = this
	if (this.options.encode && typeof this.options.encode === 'function') {
		Object.keys(this.fields).forEach(function (key) {
			self.fields[key] = self.options.encode(self.fields[key])
		})
	}
	return this.fields
}
