var arr = [1, 2, 3];
console.log(typeof(arr));
console.log(Object.keys(arr));
var o = {};
var a = [];

console.log(o instanceof Object);
console.log(a instanceof Array);
console.log(parseInt(1000, 8));

var print = function x() {
	console.log(typeof x);
};
console.log(print());

var v = 1;

function f() {
	var v = 2;
	console.log(v);
}

f();
console.log(v)

function createIncrementor(start) {
	return function() {
		return ++start;
	}; 
}

var inc = createIncrementor(5);

console.log(inc());
console.log(inc());


(function print(){
	console.log(123)
}());

(function printa(){
	console.log(45678954545)
})()


Object.print = function (){
	console.log(1234567)
}



var obj = {
	p1:123,
	p2:890
}

//判断类型
var type = function(o){
	var s= Object.prototype.toString.call(o);
	return s.match(/\[object (.*?)\]/)[1].toLowerCase();
}
console.log(type({}));
console.log(type([]));
console.log(type(1));
console.log(type("123456"));
console.log(type(new Date));

var obj1={
	$n:5,
	get next(){
		return this.$n
	},
	set next(n){
		if(n>this.$n){
			this.$n = n;
		}else throw new Error("输入的值必须大于当前的值")
	}
}

var arr1=[];
console.log(arr1.length)
arr1.push("2",345);
console.log(arr1);
arr1.pop();
console.log(arr1);


var a=["sdfgg","dfdfdf","sdsds","dfsdsds"];
b=a.shift();
console.log(b);
console.log(a);

var list = [1, 2, 3, 4];
var item;

while (item = list.shift()) {
  console.log(item);
}

console.log(Date()-0800)

var arr=["12365478778","233223113132132"]
console.log(arr.toString(),12345678)

var targ={a:1,b:4,c:5}
var sour = {a:2,d:7}

var targs1 = Object.assign({},targ,sour);
console.log(targ,888)
console.log(targs1,999999)

//工厂模式
function createPerson(name,age,job){
	var o = new Object();
	o.name = name;
	o.age = age;
	o.job = job;
	o.sayName = function(){
		
	}
	return o;
}
var person1 = createPerson('渣渣',19,'攻城狮');
console.log(person1.sayName(),123456)

//构造函数模式
function Person(name,age,job){
	this.name = name;
	this.age = age;
	this.job=job;
	this.sayName = function(){
		
	}
}
var m=0;
for(i=0;i<10;i++){
   m=i+3;
}
console.log(m,12345999)


function createFunc(){
	var result = [];
	for(i=0;i<10;i++){
		result[i] = function(num){
			return num
		}(i);
	}
	return result;
	
}

console.log(createFunc(),888)


function Shape(){
	this.x= 0;
	this.y=0;
}
Shape.prototype.move = function(x,y){
	this.x += x;
	this.y += y;
	console.info('shap moved');
	return "x="+this.x;
}

function Rectangle(){
	Shape.call(this)
}

Rectangle.prototype = Object.create(Shape.prototype); //原型指向Shape
Rectangle.prototype.constructor = Rectangle;          //原型指向自己

var rect= new Rectangle();
rect.move(4,5);

function timeOut(ms){
	return new Promise((resolve,reject)=>{
		setTimeout(resolve,ms,'done')
	})
}
timeOut(100)

var el = document.getElementById("div1").firstChild;
console.log(el);
while(el !== null){
	console.log(el.nodeName);
	el = el.nextSibling;
}
var elDiv =  document.getElementById("div1");
var h2 = document.createElement("h2");
h2.textContent="nihao"
elDiv.appendChild(h2);

window.name = 'hello world';
console.log(window.name,456)

console.log(window.innerWidth,888)
console.log(window.outerWidth,8881)
console.log(window.innerHeight,999)
console.log(window.outerHeight,9991)
console.log(window.location,1000)
window.moveTo(100, 200)

console.log(navigator.userAgent,200)
console.log(document.cookie,300)
console.log(location.origin,123)

console.log(decodeURI(encodeURI(location.href)),999)    

console.log(encodeURIComponent(location.href).toString(),789)
var files = document.getElementById("files").files[0];
console.log(files,100)


var img = document.getElementById("imgs");
img = new Image(100,200);


console.log(l,85);
var l = 100;



var x=10;
switch (x){
	case 1:
	    console.log('x 等于 1');
	    break;
	case 2:
	    console.log('x 等于 2');
	    break;
	default:
		console.log('x 等于 其他');
};


var n=7;
var mesg = '数字'+'n'+'是'+(n%2==0 ? '偶数':'奇数');
console.log(mesg,400);
var i=0
while (i<10){
	console.log('i当前为：'+i);
	i=i+1;
}

for(var m=0;m<10;m++){
	i=m+3;
	console.log(i,100)
}

var x=1;
var y=3
do{
	console.log(x,789);
	x++
}while(x<y);
 
var str = btoa('hello')

console.log(str)

var obj = {
	"a":123,
	"b":"hello world"
}
var keys = Object.keys(obj);
console.log(keys)
 if("b" in obj){
 	
 	console.log(obj.hasOwnProperty("toString"))
 }else{
 	
 }
for(key in obj){
	if(obj.hasOwnProperty(key)){
		console.log(key)
	}
}



var person={};
person.name="Rose"; 
person.age=19;
person.sex='女';
person.sayName=function(){
	console.log(this.name)
}

console.log(Object.keys(person),12345)
console.log(person.hasOwnProperty('toString') in person,222)

var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    return i
  };
}

console.log(a)
