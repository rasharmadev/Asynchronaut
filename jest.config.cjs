// Not export default here, because Jest itself is running in CommonJS mode, even if the project is using ESM.
module.exports = {
    transform: {
        "^.+\\.js$": "babel-jest"
      }
}