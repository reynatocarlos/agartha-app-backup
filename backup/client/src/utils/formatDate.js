// Function to format date

export default function formatDate(date) {
  var month = date.toLocaleString('default', { month: 'long' })
  var time = null
  var hours = date.getHours()
  var minutes = date.getMinutes()
  var period = hours >= 12 ? 'PM' : 'AM'

  hours = hours % 12
  hours = hours ? hours : 12
  minutes = minutes < 10 ? '0' + minutes : minutes
  time = hours + ':' + minutes + ' ' + period

  return month + ' ' + date.getDate() + ', ' + date.getFullYear() + ' at ' + time
}