try {
  require('./src/server')
} catch (err) {
  console.error({ err }, 'Something went wrong!')
}
