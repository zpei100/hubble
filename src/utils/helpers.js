const wait = async duration => {
    return new Promise(function(resolve, reject) {
      setTimeout(() => {
        resolve();
      }, duration)
    })
}

module.exports = {wait}