// Function to format date

function formatDate(x, y) {
  let z = {
    M: x.getMonth() + 1,
    d: x.getDate(),
    h: x.getHours(),
    m: x.getMinutes(),
    s: x.getSeconds()
  }
  y = y.replace(/(M+|d+|h+|m+|s+)/g, (v) => ((v.length > 1 ? '0' : '') + z[v.slice(-1)]).slice(-2))

  return y.replace(/(y+)/g, v => x.getFullYear().toString().slice(-v.length))
}

module.exports = formatDate