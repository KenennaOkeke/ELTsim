const {getConfig, calculate} = require('../services/CalculatorService')

const controller = {}

controller.config = async (req, res, next) => {
	try {
		res.send(await getConfig())
	} catch (err) {
		next(err)
	}
}

controller.calculate = async (req, res, next) => {
	const {
		video_streaming_4k,
		video_streaming_hd,
		video_streaming_sd,
		music_streaming,
		gaming,
		social_media,
		username
	} = req.body
	try {
		if (video_streaming_4k !== undefined) {
			const response = await calculate(
				video_streaming_4k,
				video_streaming_hd,
				video_streaming_sd,
				music_streaming,
				gaming,
				social_media,
				username
			)
			res.send(response)
		} else {
			res.status(400).send()
		}
	} catch (err) {
		next(err)
	}
}

module.exports = controller