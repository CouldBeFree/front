import Vue from 'vue';

function isDocumentDefined () {
  return typeof document !== 'undefined';
}


function fireEvent (element, event) {
  if (isDocumentDefined() && document.createEventObject) {
    // for ie
    var evt = document.createEventObject();
    return element.fireEvent('on' + event, evt)
  } else if (isDocumentDefined()) {
    var evt = document.createEvent('HTMLEvents');
    evt.initEvent(event, true, true);
    return !element.dispatchEvent(evt);
  }
};

function fragment (html, name, properties) {
  var slice = [].slice,
    singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
    table = document.createElement('table'),
    fragmentRE = /^\s*<(\w+|!)[^>]*>/,
    tableRow = document.createElement('tr'),
    containers = {
      'tr': document.createElement('tbody'),
      'tbody': table,
      'thead': table,
      'tfoot': table,
      'td': tableRow,
      'th': tableRow,
      '*': document.createElement('div')
    };

  var dom, container
  // A special case optimization for a single tag
  if (singleTagRE.test(html)) dom = document.createElement(RegExp.$1)

  if (!dom) {
    if (html.replace) html = html.replace(tagExpanderRE, "<$1></$2>")
    if (name === undefined) name = fragmentRE.test(html) && RegExp.$1
    if (!(name in containers)) name = '*'

    container = containers[name]
    container.innerHTML = '' + html
    dom = slice.call(container.childNodes).map(function (child) {
      return container.removeChild(child)
    })
  }

  return dom
}

function traverseNode (node, fun) {
  fun(node);
  for (var key in node.childNodes) {
    traverseNode(node.childNodes[key], fun)
  }
}

function downloadFile(url) {
  return new Promise((resolve, reject) => {
    var http = new XMLHttpRequest();
    http.open('GET', url, true);
    http.onreadystatechange = function () {
      if (http.readyState === 4) {
        // Makes sure the document is ready to parse.
        if (http.status === 200) {
          resolve(http.responseText);
        }
      }
    };
    http.send(null);
  });
}

function isScriptNode(el) {
  return el.nodeName != null && el.nodeName.toUpperCase() === 'SCRIPT' && (!el.type || el.type === 'text/javascript');
}

async function append (nodes, target) {
  // download all scripts
  const promises = nodes.map(async (el) => {
    if (isScriptNode(el) && el.src) {
      el.innerHTML = await downloadFile(`https://cors-anywhere.herokuapp.com/${el.src}`);
    }
    return el;
  });
  nodes = await Promise.all(promises);

  const run = [];
  for (let _node of nodes) {
    const node = _node.cloneNode(true);
    if (document.documentElement !== target && document.documentElement.contains(target)) {
      traverseNode(target.insertBefore(node, null), (el) => {
        if (isScriptNode(el)) {
          const target = el.ownerDocument ? el.ownerDocument.defaultView : window;
          run.push(() => {
            target['eval'].call(target, el.innerHTML);
          });
        }
      })
    }
  }
  setTimeout(() => {
    for (let r of run) {
      r();
    }
  }, 0);
}

function exec (el, val) {
  if (!val) {
    return;
  }
  if (process.server) {
    el.innerHTML = val;
    return;
  }

  try {
    el.innerHTML = '';
    append(fragment(val), el).then(() => {
      fireEvent(el, 'appended');
    });
  } catch (e) {
    fireEvent(el, 'appenderr');
    console.error(e);
  }
}

Vue.use({
  install(Vue) {
    Vue.directive('append', {
      inserted: function (el, data) {
        exec(el, data.value);
      },
      componentUpdated: function (el, data) {
        if (data.value !== data.oldValue) {
          exec(el, data.value);
        }
      }
    });
  }
});
