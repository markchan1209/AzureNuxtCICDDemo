const modulesFiles = require.context('./apilist', true, /\.js$/)
const modeles = modulesFiles.keys().reduce((modules, path) => {
  const moduleName = path.replace(/^\.\/(.*)\.j\w+$/, '$1')
  const value = modulesFiles(path)
  modules[moduleName] = value.default || value
  return modules
}, {})

export default modeles
