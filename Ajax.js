window._ = {
	"get": function(url, config, callback, gainEle) {

		var xhr;

		if (window.XMLHttpRequest) {
			xhr = new XMLHttpRequest;
		} else if (window.ActiveXObject) {
			xhr = new ActiveXObject("Micresoft.XMLHTTP");
		}

		xhr.onreadystatechange = function() {
			if (xhr.readyState == 1){
				var waitImg = document.createElement("img");
				waitImg.className = "wait";
				waitImg.src = "./img/wait.gif";
				document.body.appendChild(waitImg);
			}
			if (xhr.readyState == 4) {
				if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
					callback(JSON.parse(xhr.responseText), null, document.querySelectorAll(".wait"));

					// 通过回调函数获取li
					if (gainEle) {
						gainEle(document.querySelectorAll(".data-li"));
					}
				} else {
					callback(null, new Error("请求错误"));
				}
			} else if (xhr.readyState == 3){
				console.log("正在请求中");
				// if (!waitImg) {

				// }
			}
		}
		xhr.open("get", url + "?" + _.objToStr(config), true);

		xhr.send(null);
	},
	"post": function(url, config, callback) {
		var xhr;

		if (window.XMLHttpRequest) {
			xhr = new XMLHttpRequest;
		} else if (window.ActiveXObject) {
			xhr = new ActiveXObject("Micresoft.XMLHTTP");
		}

		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
					callback(JSON.parse(xhr.responseText)), null;
				} else {
					callback(null, new Error("请求错误"));
				}
			}
		}
		xhr.open("post", url, true);

		xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

		xhr.send(_.objToStr(config));
	},
	"jsonp": function(url, config, callbackName, callback) {
		var oScript = document.createElement("script");
		oScript.type = "text/javascript";
		oScript.src = url + "?" + _.objToStr(config) + "&callback=" + callbackName;
		window[callbackName] = callback;
		document.body.appendChild(oScript);
		// document.body.removeChild(oScript);
	},

	"objToStr": function(obj) {
		var arr = [];
		for (var k in obj) {
			arr.push(encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]));
		}
		return arr.join("&");
	},
	"formToObj": function(formObj) {
		// 准备把数据放到空对象中
		var obj = {};

		var elem = formObj.elements;

		for (var i = 0; i < elem.length; i++) {
			// 表单中的每一项
			var item = elem[i];
			// 表单进行筛选
			switch (elem[i].type) {
				case undefined:
				case "button":
				case "file":
				case "reset":
				case "submit":
					break;
					// 凡是没有选中都单选,多选都踢出去
				case "checkbox":
				case "radio":
					if (!elem[i].checked) {
						break;
					}
					// 
				default:
					// 如果说obj里面有过一样的键名,就说明是多选
					if (obj[elem[i].name]) {

						obj[elem[i].name] = obj[elem[i].name] + "," + elem[i].value;
						// 如果说没有键名重复
					} else {
						obj[elem[i].name] = elem[i].value;
					}
					break;
			}
		}
		return obj;
	},
	"formToObjAdd": function(formObj) {
		// 准备把数据放到空对象中
		var obj = {};

		var elem = formObj.elements;

		for (var i = 0; i < elem.length; i++) {
			// 表单中的每一项
			var item = elem[i];
			// 表单进行筛选
			switch (elem[i].type) {
				case undefined:
				case "button":
				case "file":
				case "reset":
				case "submit":
					break;
					// 凡是没有选中都单选,多选都踢出去
				case "checkbox":
				case "radio":
					if (!elem[i].checked) {
						break;
					}
					// 
				default:
					// 如果说obj里面有过一样的键名,就说明是多选
					if (obj[elem[i].name]) {

						obj[elem[i].name] = obj[elem[i].name] + "," + elem[i].value;
						// 如果说没有键名重复
					} else {
						obj[elem[i].name] = elem[i].value;
					}
					break;
			}
		}
		obj["app_id"] = "rijijliehnlcoktm";
		obj["app_secret"] = "UXlHeEF2dkhOVU9nL1lVKzh5YVlVQT09";
		return obj;
	}
}

// function(d){
// 	console.log(d);
// }


// callback(JSON.parse(xhr.responseText), null);


// function(d){
// 	console.log(d);
// }(JSON.parse(xhr.responseText), null)