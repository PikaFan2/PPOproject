var onmootools = null;
var isD = false, isD2 = true;
var apiFile = "";
var apiSizeFile = "getsize_1.html";
var apiHostSlow = "https://apigo.fri-gate.biz";
var apiHost = "https://api3.fri-gate.eu:80";
var apiSizeHost = apiHost;
var apiPath = "/";
var urlForGetUrls = apiHost + apiPath + apiFile;
var urlForGetSize = apiSizeHost + apiPath + apiSizeFile;
var apiHo = ["api3.fri-gate", "api3.friproxy"], apiTl = ["biz", "eu", "org"], apiIn = ["", "0"], apiAdd = ["https://188.165.30.217/"], apiall, apicount = 0, apioffset = 0, apistarttime, apiloadattempts = 0;
var runtimeOrExtension = chrome.runtime && chrome.runtime.sendMessage ? "runtime" : "extension";
var noadv;
var sovetnik;
var pav = {};
var globalTimeout = 12E3;
var tld = {"onion":true, "coin":true, "emc":true, "lib":true, "bazar":true};
var $empty = function() {
};
function getTld() {
  var newTld = ls.get("tld");
  if (typeof newTld !== "object" || !newTld) {
    setTld(tld);
    return;
  }
  for (var key in tld) {
    if (tld.hasOwnProperty(key) && newTld.hasOwnProperty(key)) {
      tld[key] = newTld[key];
    }
  }
}
function setTld(tldsave) {
  ls.set("tld", tldsave);
}
function zeroPad(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}
var d = function(preText, mess) {
  if (isD) {
    var now = new Date;
    var formated_date = zeroPad(now.getHours(), 2) + ":" + zeroPad(now.getMinutes(), 2) + ":" + zeroPad(now.getSeconds(), 2) + "." + zeroPad(now.getMilliseconds(), 3);
    if (typeof mess != "number" && typeof mess != "string") {
      mess = JSON.stringify(mess);
    }
    console.log(formated_date + " - " + preText + " == " + mess);
  }
};
var d2 = function(mess) {
  if (isD2) {
    var now = new Date;
    var formated_date = zeroPad(now.getHours(), 2) + ":" + zeroPad(now.getMinutes(), 2) + ":" + zeroPad(now.getSeconds(), 2) + "." + zeroPad(now.getMilliseconds(), 3);
    console.log(formated_date + " - " + mess);
  }
};
function l(mess) {
  return chrome.i18n.getMessage(mess);
}
function emptyObject(obj) {
  for (var i in obj) {
    return false;
  }
  return true;
}
function getClHost(host) {
  if (host.indexOf("*") == 0) {
    return host.substring(2);
  } else {
    return host;
  }
}
function getprip(str) {
  var splstr = str.split(/\s+/g);
  splstr = splstr[1].split(/:/);
  return splstr[0];
}
function generatePW(c) {
  var i, s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", pw = "";
  if (!c) {
    c = 16;
  }
  for (i = 0; i < c; i++) {
    pw += s.charAt(Math.random() * 61);
  }
  return pw;
}
function checkN(a, b, x) {
  var dop;
  if (a > b) {
    dop = b * x / 100;
    if (a - b <= dop) {
      return true;
    }
  } else {
    dop = a * x / 100;
    if (b - a <= dop) {
      return true;
    }
  }
  return false;
}
function compareH(arr1, arr2) {
  var sumh = 0;
  arr1length = arr1.length;
  for (var i = 0; i < arr1length; i++) {
    if (arr1[i] != arr2[i]) {
      sumh = sumh + Math.abs(arr1[i] - arr2[i]) / (arr1[i] + arr2[i]);
    }
  }
  return sumh / 36;
}
Array.prototype.pad = function(size, value) {
  var len = Math.abs(size) - this.length;
  var a = [].concat(this);
  if (len <= 0) {
    return a;
  }
  for (var i = 0; i < len; i++) {
    size < 0 ? a.unshift(value) : a.push(value);
  }
  return a;
};
function h($t) {
  var arSim = {0:33, 1:24, 2:25, 3:26, 4:27, 5:28, 6:29, 7:30, 8:31, 9:32, "a":0, "b":1, "c":2, "d":3, "e":4, "f":5, "g":6, "h":7, "i":8, "j":9, "k":10, "l":11, "m":12, "n":13, "o":14, "p":15, "r":16, "s":17, "t":18, "u":19, "v":20, "x":21, "y":22, "z":23, "_":34, "-":35};
  var replacer = function(a) {
    return trans[a] || a;
  };
  $t = $t.replace(/[^a-z0-9-_]/ig, "");
  $t = $t.toLowerCase();
  ret = [].pad(36, 0);
  tlength = $t.length;
  for (var i = 0; i < tlength; i++) {
    if (typeof arSim[$t[i]] !== "undefined") {
      ret[arSim[$t[i]]]++;
    }
  }
  return {h:ret, s:tlength};
}
function genRandFile(sheme, host) {
  return sheme + host + "/frigate_404_check_" + generatePW(16) + Date.now() + ".png";
}
function getUrl(url, metod, dat, onfail, onsuc) {
  var R = (new Request.JSON({url:url + "?" + Date.now(), method:metod, noCache:true, timeout:globalTimeout, onFailure:onfail, onTimeout:function() {
    R.cancel();
    onfail();
  }, onError:onfail, onSuccess:onsuc})).send(dat);
}
function getUrl3(url, metod, headerss, dat, onfail, onsuc) {
  var R = (new Request({url:url + "?" + Date.now(), method:metod, noCache:true, timeout:globalTimeout, onFailure:onfail, headers:headerss, onTimeout:function() {
    R.cancel();
    onfail("onTimeout");
  }, onSuccess:onsuc})).send(dat);
}
var Req = function(url, timeout, onSuccess, onError, onTimeout, type, data, headersend) {
  if (!type) {
    type = "GET";
  }
  if (!data) {
    data = null;
  } else {
    if (type == "GET") {
      url = url + "?" + data;
    }
  }
  var xhr = new XMLHttpRequest;
  xhr.onabort = function() {
    onError("abort");
  };
  xhr.ontimeout = function() {
    onTimeout(xhr.status + " - " + xhr.statusText);
  };
  xhr.onerror = function() {
    onError(xhr.status + " " + xhr.statusText);
  };
  xhr.onload = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        onSuccess(xhr.response, xhr.getAllResponseHeaders());
      } else {
        onError(xhr.status);
      }
    }
  };
  try {
    xhr.open(type, url, true);
  } catch (e) {
    return;
  }
  if (type == "POST") {
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  } else {
    data = null;
  }
  if (typeof headersend === "object") {
    for (var key in headersend) {
      xhr.setRequestHeader(key, '"' + headersend[key] + '"');
    }
  }
  xhr.timeout = timeout;
  try {
    xhr.send(data);
  } catch (e$0) {
    onError(null);
    return;
  }
};
function setContentLengthCounterStart() {
  var t = new Date;
  ContentLengthCounterStart = Math.round(t.getTime() / 1000);
  ls.set("ContentLengthCounterStart", ContentLengthCounterStart);
}
function genapi() {
  apiloadattempts = apiloadattempts + 1;
  apiall = {};
  var apiallarr = [];
  apiHo.forEach(function(ho) {
    apiTl.forEach(function(tl) {
      apiIn.forEach(function(ind) {
        apiallarr.push("https://" + ho + ind + "." + tl + ":80/");
      });
    });
  });
  apiallarr.shuffle();
  apistarttime = new Date;
  apiallarr.forEach(function(dom) {
    apiall[dom] = -1;
    var start = new Date;
    Req(dom, 12E3, function() {
      apiall[dom] = new Date - start;
    }, function() {
      apiall[dom] = -1;
    }, function() {
      apiall[dom] = -1;
    }, "GET");
  });
}
function getapiurl(offset) {
  function compareTime(hostA, hostB) {
    return hostA.val - hostB.val;
  }
  if (!offset) {
    offset = 0;
  }
  var tmparray = [];
  for (var key in apiall) {
    if (apiall.hasOwnProperty(key)) {
      if (apiall[key] > -1) {
        var val = apiall[key];
        tmparray.push({val:val, host:key});
      }
    }
  }
  if (apiAdd.length > 0) {
    apiAdd.forEach(function(ho) {
      tmparray.push({val:40000, host:ho});
    });
  }
  apicount = tmparray.length;
  if (apicount > 0) {
    tmparray.sort(compareTime);
    return tmparray[offset].host;
  } else {
    return false;
  }
}
function arrayUnique(array) {
  var a = array.concat();
  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j]) {
        a.splice(j--, 1);
      }
    }
  }
  return a;
}
Array.prototype.contains = function(item, from) {
  return this.indexOf(item, from) != -1;
};
Array.prototype.include = function(item) {
  if (!this.contains(item)) {
    this.push(item);
  }
  return this;
};
Array.prototype.shuffle = function(b) {
  var i = this.length, j, t;
  while (i) {
    j = Math.floor(i-- * Math.random());
    t = b && typeof this[i].shuffle !== "undefined" ? this[i].shuffle() : this[i];
    this[i] = this[j];
    this[j] = t;
  }
  return this;
};

