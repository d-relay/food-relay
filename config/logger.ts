import { createStream } from 'rotating-file-stream'
export const accessLogStream = createStream(generator.bind({ filename: 'accessLogStream.log' }), { size: '10M', interval: '1M' })
export const errorBackendLogStream = createStream(generator.bind({ filename: 'errorBackendLogStream.log' }), { size: '10M', interval: '1M' })

function generator (this: { filename: string }, time: number | Date): string {
	if (!time) return 'logs/' + this.filename
	const date = new Date(time).toLocaleDateString()
	return `logs/${date}/${date}-${this.filename}`
};
