String.prototype.startWith = function(str) {
  return (this.match("^" + RegExp.escape(str)) == str);
}

String.prototype.trim = function() {
  return (this.replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, ""))
}

String.prototype.startsWith = function(str) {
  return this.startWith(str);
}

String.prototype.endsWith = function(str) {
  return (this.match(str + "$") == str)
}

String.prototype.escapeRegExp = function() {
  // From MooTools core 1.2.4
  return this.replace(/([-.*+?^${}()|[\]\/\\])/g, '\\$1');
}

String.prototype.trimFirst = function( /* String || Array */ str) {
  if (typeof str == 'string') {
    return this.replace(new RegExp("^" + RegExp.escape(str)), "").trim();
  } else {
    var result = this;
    for (var i = 0; i < str.length; i++) {
      result = result.replace(new RegExp("^" + RegExp.escape(str[i])), "").trim();
    }
    return result;
  }
}

String.prototype.reverse = function() {
  return this.split('').reverse().join('')
}

// This could be replaced by  Regex
// extracts a string betwen two blocks of text
// include = true : will include the string in the block + return every block as an array
String.prototype.extractStringBetweenBlocks = function(begin, end, include) {
  var res = null

  if (include) {

    res = [];
    var start = this.indexOf(begin, 0);
    while (start != -1) {
      var str = this.substring(start, this.indexOf(end, start));
      str += end;
      res.push(str);

      start = this.indexOf(begin, start + 1);
    }
  } else {
    res = '';

    _.each(this.extractStringBetweenBlocks(begin, end, true), function(v) {
      res += v.substring(v.indexOf(begin) + begin.length, v.indexOf(end));
    })
  }

  return res;
}

String.prototype.isUpperCase = function() {
  return (this == this.toUpperCase());
}

String.prototype.isLowerCase = function() {
  return (this == this.toLowerCase());
}

RegExp.escape = function(text) {
  if (!arguments.callee.sRE) {
    var specials = ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'];
    arguments.callee.sRE = new RegExp('(\\' + specials.join('|\\') + ')', 'g');
  }
  return text.replace(arguments.callee.sRE, '\\$1');
}


Element.prototype.realAddEventListener = Element.prototype.addEventListener;
Element.prototype.addEventListener = function(a, b, c) {
  this.realAddEventListener(a, b, c);

  try {
    if (this.listEventListeners === undefined) {
      this.listEventListeners = {}
    }
    this.listEventListeners[b.toString()] = b.toString();
  } catch (e) {
    console.log(e)
  }
};


Element.prototype.realRemoveEventListener = Element.prototype.removeEventListener
Element.prototype.removeEventListener = function(a, b, c) {
  this.realRemoveEventListener(a, b, c);

  try {
    if (this.listEventListeners === undefined) {
      this.listEventListeners = {}
    }

    if (this.listEventListeners[b.toString()]) {
      delete this.listEventListeners[b.toString()];
    }
  } catch (e) {
    console.log(e)
  }
}
