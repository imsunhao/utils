import minimist from 'minimist'

const args = minimist(process.argv.slice(2))

console.log('[dev]', args)
