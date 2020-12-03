import { createStream } from 'rotating-file-stream'
import Rollbar from "rollbar"

const rollbar = new Rollbar({
	accessToken: '7d33204e7ee247579fb0163e54f6531c',
	captureUncaught: true,
	captureUnhandledRejections: true
})

export const accessLogStream = createStream(generator.bind({ filename: 'accessLogStream.log' }), { size: '10M', interval: '1M' })
export const errorBackendLogStream = createStream(generator.bind({ filename: 'errorBackendLogStream.log' }), { size: '10M', interval: '1M' })

function generator(this: { filename: string }, time: number | Date): string {
	if (!time) return 'logs/' + this.filename
	const date = new Date(time).toLocaleDateString()
	const log = `logs/${date}/${date}-${this.filename}`;
	rollbar.log(log);
	return log;
};
