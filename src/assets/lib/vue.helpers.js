
// requires moment.js
Vue.filter('date', function(value, format, option) {
  var date = format == 'ago'
    ? moment(value).fromNow(option)
    : moment(value).format(format || 'DD MMMM YYYY')

  if(date == 'il y a quelques secondes')
    date = "à l'instant"

  return date
})

// replace @nick with given pattern
Vue.filter('nickmize', function (value, format) {
  return value && value.replace(/(@[a-z0-9]*)/g, format || '<strong>$1</strong>')
})

// fomat credit card number
Vue.filter('cardize', function (value, format) {
  return value
    ? value.substr(0, 4) + ' **** **** ' + value.substr(12, 4)
    : ''
})

// add http protocol if missing
Vue.filter('url', function (url) {
  return /^(http:\/\/|https:\/\/)/.test(url)
    ? url
    : 'http://'+url
})

Vue.filter('urlencode', function (str) {
  return encodeURIComponent(str)
})

Vue.filter('pad', function (str, max){
  var pad = function(str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
  }
  return pad(str, max)
})

Vue.filter('limit', function (arr, n) {
  return arr.slice(0, n)
})

Vue.filter('round', function (value) {
  return Math.round(value * 100) / 100
})

Vue.filter('money', function (value, appendDecimal) {
  value = ''+(value || 0)
  if(value == '0') return '0.00'
  if(/\./.test(''+value)){
    var v = value.split('.')
      , e = v[0]
      , d = v[1]
    if(d.length == 1) d += '0'
    if(d.length > 2) d = d.substr(0,2)
    value = e + '.' + d
  }
  return value + (appendDecimal && !/\./.test(value) ? '.00' : '')
})

Vue.filter('phone', function(value, format) {
  return moment(value).format(format || 'DD MMMM YYYY')
})

Vue.filter('nl2br', function(value) {
  var nl2br = function nl2br(str, unique) {   
    var breakTag = '<br>';    
    str = (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
    if(unique) str.replace(/(<br\s*\/?>\s*){2,}/g, breakTag);
    return str;
  }
  
  return nl2br(value)
})