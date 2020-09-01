window.dom = {
  create(string) {
    const container = document.createElement("template");
    container.innerHTML = string.trim(); //trim可以去掉字符前后的空格
    return container.content.firstChild;
  }, //可以创造出标签中包含的标签td标签等，比const div=document createElement("div"),更完善
  after(node, node2) {
    node.parentNode.insertBefore(node2, node.nextSibling); //的意思是把node2 插入到node的下一个的前面
  }, //把node2 插入到node的后面
  before(node, node2) {
    node.parentNode.insertBefore(node2, node);
  }, //把node2,插在node的前面
  append(parent, node) {
    parent.appendChild(node);
  }, // parent添加node
  wrap(node, parent) {
    dom.before(node, parent);
    dom.append(parent, node);
  }, //添加一个爸爸
  remove(node) {
    node.parentNode.removeChild(node);
    return node;
  }, //删除节点
  empty(node) {
    const { childNodes } = node;
    const array = [];
    let x = node.firstChild;
    while (x) {
      array.push(dom.remove(node.firstChild));
      x = node.firstChild;
    }
    return array;
  }, //删除后代
  attr(node, name, value) {
    //重载
    if (arguments.length === 3) {
      node.setAttribute(name, value);
    } else if (arguments.length === 2) {
      return node.getAttribute(name);
    }
  }, //用于读写属性
  text(node, string) {
    //适配
    if (arguments.length === 2) {
      if ("innerText" in node) {
        node.innerText = string; //适应于ie   仅有部分浏览器只支持此种方式
      } else {
        node.textContent = string; //适应于firebox和chrome
      }
    } else if (arguments.length === 1) {
      if ("innerText" in node) {
        return node.innerText;
      } else {
        return node.textContent;
      }
    }
  }, //用于读写文本的内容
  html(node, string) {
    if (arguments.length === 2) {
      node.innerHTML = string;
    } else if (arguments.length === 1) {
      return node.innerHTML;
    }
  }, //用于读写HTML的内容
  style(node, name, value) {
    if (arguments.length === 3) {
      // dom.style(div,'color','red')
      node.style[name] = value;
    } else if (arguments.length === 2) {
      if (typeof name === "string") {
        //dom.style(div,'color')
        return node.style[name];
      } else if (name instanceof Object) {
        //dom.style(div,{color:'red'})
        const object = name;
        for (let key in object) {
          node.style[key] = object[key];
        }
      }
    }
  }, //用于修改style属性
  class: {
    add(node, className) {
      node.classList.add(className);
    },
    remove(node, classList) {
      node.classList.remove(className);
    },
    has(node, className) {
      return node.classList.contains(className);
    },
  }, //用于添加、删除、查看是否包含属性
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn);
  }, //用于添加事件的监听
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn);
  }, //用于删除事件的监听
  find(selector, scope) {
    return (scope || document).querySelectorAll(selector);
  }, //用于获取标签或者标签们   在scope，中找selector
  parent(node) {
    return node.parentNode;
  }, //获取父元素
  children(node) {
    return node.children;
  }, //获取子元素
  siblings(node) {
    return array.from(node.parentNode.children).filter((n) => n !== node);
  }, //获取兄弟姐妹元素，但是得去除自己的。 children是伪数组，得先变成数组
  next(node) {
    let x = node.nextSibling;
    while (x && x.nodeType === 3) {
      x = x.next.sibling;
    }
    return x;
  }, //用于获取下一个元素
  previous(node) {
    let x = node.previousSibling;
    while (x && x.nodeType === 3) {
      x = x.previousSibling;
    }
    return x;
  }, //用于获取前一个元素
  each(nodeList, fn) {
    for (let i = 0; i < List.length; i++) {
      fn.call(null, nodeLost[i]);
    }
  }, //遍历所有的节点
  index(node) {
    const list = dom.children(node.parentNode);
    let i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === node) {
        break;
      }
    }
    return i;
  }, //获取排行老几
};
