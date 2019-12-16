module.exports = {
	"Operation": "com.amazon.atv.discovery.content#GetContentForStrategyPage",
	"Service": "com.amazon.atv.discovery.content#ATVDiscoveryRemoteContentProviderService",
	"Input": {

		"__type": "com.amazon.atv.discovery.content#GetContentForStrategyPageRequestV1",
		"version": "1",
		"requestId": "641a5a3f-8ea4-11e9-a09e-f57590798a72",
		"sessionId": "000-0000208-3497731",
		"locationContext": {
			"marketplaceId": "ATVPDKIKX0DER",
			"currentCountry": "US",
			"homeCountry": "US",
			"locale": "en_US",
			"travelStatus": "AtHome",
			"geoToken": "EAEZioytaMl7KG8gASADUgJVU1oCR0FiAlVTagJOQXoGLTA1OjAwggECVVOIAQCSAQJVU6IBBTMwMzI0qAGMBLgB2ZwBygINQVRWUERLSUtYMERFUg==",
			"customerIPAddress": "<**-redacted-**>",
			"localePriorities": [{
				"localeValue": "en_US",
				"localeType": "marketplaceLocale"
			}, {
				"localeValue": "en_US",
				"localeType": "baseLocale"
			}]
		},
		"customerContext": {
			"identityContext": null,
			"customerId": "A2U3TRZMR2CSUB",
			"activeBenefits": ["Prime", "noggin", "FREE_TRIDENT_VOD"],
			"aivRatingsFilter": null
		},
		"deviceContext": {
			"deviceTypeId": "A43PXU4ZN2AL1",
			"deviceId": "<**-redacted-**>",
			"deviceFamily": "fire_2014",
			"deviceGroup": "kindle",
			"deviceAppGroup": "android",
			"variant": "default",
			"uhdSupported": false,
			"deviceCapabilities": {
				"dynamicAdsLiveSupported": true,
				"liveV2": true,
				"liveV2_DAI": true,
				"hdrSupported": false,
				"uhdSupported": false
			}
		},
		"debug": null,
		"testRequest": false,
		"priorityType": "UNSPECIFIED",
		"strategyRequest": {
			"strategyContext": {
				"strategy": {
					"strategyName": "AVSearchService",
					"strategyType": "AVSearchService",
					"strategyInstanceId": "7f6c4f12-e570-4f1a-a0de-233f470d4115"
				},
				"pageType": "search",
				"pageId": "default",
				"seed": null,
				"itemHints": {},
				"strategyParameters": {
					"rankingStrategy": "DEFAULT",
					"A9_OfferAvailability": "false",
					"query": "keywords=pay+for+prime+video&search-alias=instant-video",
					"additionalEntities": "ALL",
					"queryType": "STRUCTURED",
					"ifsAvailabilityFilter": "false"
				}
			},
			"paginationContext": {
				"startIndex": 40,
				"itemCount": 20
			},
			"maxItemsToGenerate": 100,
			"selectedFilters": [],
			"selectedSort": null,
			"stateKey": "{\"query\":\"keywords=pay+for+prime+video&search-alias=instant-video\",\"queryType\":\"STRUCTURED\",\"rankingStrategy\":\"DEFAULT\"}"
		},
		"timeoutMillis": 2000
	}
}