const div = dom.create("<div>新的</div>");
dom.after(test, div);
console.log(div);
dom.attr(test, "title", "大家好啊");
const title = dom.attr(test, "title");
console.log(`title:${title}`);
dom.text(kk, "快速机动i机构接送");
dom.html(hh, "看见送低位进攻i");
dom.style(kk, { border: "1px red solid" });
console.log(dom.style(kk, "border"));
dom.style(kk, "color", "red");
dom.on(test, "click", () => {
  console.lof("点击");
});
const testDiv = dom.find("#test")[0];
