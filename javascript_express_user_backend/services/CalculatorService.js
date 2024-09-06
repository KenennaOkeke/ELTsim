const {readFileSync} = require("fs");
const service = {}
const {sendSqsMessage} = require('../operations/SqsOperation')

service.getConfig = async () => {
	let success = false
	const errors = []
	let data = JSON.parse(readFileSync(__dirname + '/../data/CalculatorConfig.json')) //TODO: Cache/Async for scaling
	success = true
	return {
		success: success,
		data: data,
		errors: errors
	}
}

service.calculate = async (
	video_streaming_4k,
	video_streaming_hd,
	video_streaming_sd,
	music_streaming,
	gaming,
	social_media,
	username
) => {
	let success = false
	const data = {}
	const errors = []

	// TODO: Offload to a microservice, like python /w flask
	//If 8 hours per day -> monthly usage
	let video_streaming_4kRange = [1920, 1400, 1330, 1560]
	let video_streaming_hdRange = [480, 600, 532, 672]
	let video_streaming_sdRange = [120, 133, 224]
	let music_streamingRange = [13, 27, 162]
	let gamingRange = [48, 3, 24]
	let social_mediaRange = [23, 22, 59]

	const output = {
		success: true,
		data: {
			"outputData": {
				"min_bandwidth": [(
					video_streaming_4k * Math.min(...video_streaming_4kRange) / 8 +
					video_streaming_hd * Math.min(...video_streaming_hdRange) / 8 +
					video_streaming_sd * Math.min(...video_streaming_sdRange) / 8 +
					music_streaming * Math.min(...music_streamingRange) / 8 +
					gaming * Math.min(...gamingRange) / 8 +
					social_media * Math.min(...social_mediaRange) / 8
				)],
				"average_bandwidth": [(
					video_streaming_4k * getAverage(video_streaming_4kRange) / 8 +
					video_streaming_hd * getAverage(video_streaming_hdRange) / 8 +
					video_streaming_sd * getAverage(video_streaming_sdRange) / 8 +
					music_streaming * getAverage(music_streamingRange) / 8 +
					gaming * getAverage(gamingRange) / 8 +
					social_media * getAverage(social_mediaRange) / 8
				)],
				"max_bandwidth": [(
					video_streaming_4k * Math.max(...video_streaming_4kRange) / 8 +
					video_streaming_hd * Math.max(...video_streaming_hdRange) / 8 +
					video_streaming_sd * Math.max(...video_streaming_sdRange) / 8 +
					music_streaming * Math.max(...music_streamingRange) / 8 +
					gaming * Math.max(...gamingRange) / 8 +
					social_media * Math.max(...social_mediaRange) / 8
				)]
			}
		},
		errors: errors
	}
	await sendSqsMessage(username, output.data["outputData"])
	return output
}
const getAverage = (array) => // TODO: Move to other functions file
 array.reduce((sum, currentValue) => sum + currentValue, 0) / array.length;

module.exports = service