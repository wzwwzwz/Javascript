console.log('--------------- 以下为一.对象的扩展---------------');

/**************************************************************************************************************************
 * 1.属性的简介表示法
 *   允许在大括号里面直接写变量；
 *   注意：简写的对象方法不能用作构造函数，会报错
 **************************************************************************************************************************/
{
  let name = 'obj';
  let obj = {
    // 变量简写( 若对象的key值和valus值名称相同，则可省略一个。 )
    name,
    // 方法简写
    setName() { },
  };
  console.log(obj); //{name:obj,setName: ƒ setName()}

  // 原始写法
  var objO = {
    name: 'obj',
    setName: function name() { },
  };
  console.log(objO); //{name:obj,setName: ƒ name()}
}

/**************************************************************************************************************************
 * 2.属性名表达式
 * 2.1 es6允许使用字面量方式定义对象时，用表达式作为对象的属性名;表达式还可以用于定义方法名。
 * 注意：属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串[object Object]
 **************************************************************************************************************************/
{
  //  原始写法，字面量定义对象时，只能使用标识符作为属性名，
  var objDefined = {
    name: 'zico',
  };

  // 原始写法定义对象的属性
  objDefined['ad' + 'bc'] = 123;

  let propKey = 'foo';
  // 字面量方式定义时，用表达式作为对象的属性名
  let obj = {
    [propKey]: true,
    ['a' + 'bc']: 123,
  };

  console.log(obj); //{foo: true, abc: 123}
}

/**************************************************************************************************************************
 * 3.方法的name属性
 *   特殊情况：
 *   (1)bind方法创造的函数，name属性返回bound加上原函数的名字；
 *   (2)Function构造函数创造的函数，name属性返回anonymous
 *
 **************************************************************************************************************************/
{
  const person = {
    sayName() {
      console.log('hello!');
    },
  };
  console.log(person.sayName.name); // "sayName"

  // 情况1
  let aa = new Function().name;
  console.log(aa); // "anonymous"

  // 情况2
  var doSomething = function () { };
  console.log(doSomething.bind().name); // "bound doSomething"
}

/**************************************************************************************************************************
 * 4.属性的可枚举性和遍历
 *   对象的每个属性都有一个描述对象，用来控制该属性的行为。
 *   Object.getOwnPropertyDescriptor(obj,Attributes) 获得该属性的描述对象。
 *   返回值中 enumerable 表示可枚举性。 === true || false （某些操作就会忽略对象检查的属性值）
 *   某些操作： for...in ; Object.keys(); JSON.stringify() ; Obect.assign()
 **************************************************************************************************************************/
{
  let obj = {
    name: 'zico',
  };

  let rv = Object.getOwnPropertyDescriptor(obj, 'name');
  console.log(rv); // {value: "zico", writable: true, enumerable: true, configurable: true}
  // enumerable 表示可枚举性。
}

/**************************************************************************************************************************
 * 5.super关键字
 * super指向当前对象的原型对象。
 * super关键字表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错
 **************************************************************************************************************************/
{
  const proto = {
    foo: 'hello',
  };

  const obj = {
    foo: 'world',
    find() {
      return super.foo;
    },
  };

  Object.setPrototypeOf(obj, proto);   //设置原型对象;
  let rv = obj.find(); // "hello"
}

/**************************************************************************************************************************
 * 6. 对象的扩展运算符
 * 6.1 结构赋值
 **************************************************************************************************************************/
{
  // 并且res必须是最后一个值
  let { x, y, ...res } = {
    x: 1,
    y: 2,
    a: 3,
    b: 4,
    c: 5,
  };
  console.log(x, y, res); // 1 2 {a: 3, b: 4, c: 5}

  var foo = { ...['a', 'b', 'c'] }; //  {0: "a",1: "b",2: "c"}

  // 重写 || 添加新的属性的时候使用特别方便
  let previousVersion = { age: 12, name: 'V' };
  let newVersion = {
    ...previousVersion,
    name: 'New Name', // Override the name property
  };
  console.log(newVersion); // {age: 12, name: "New Name"}
}

/**************************************************************************************************************************
 * 7.链式判断运算符 " ?. "
 * 三种用法：
 *   obj?.prop --- 对象属性
 *   obj?.[expr] --- 同上 ( 中括号内的属性值必须是定义的，看例子 )
 *   funcName?.(...args) --- 函数或对象方法的调用
 * 注意点：
 *   (1)短路机制：只要不满足情况就不会往下执行
 **************************************************************************************************************************/
{
  let obj = {
    name: 'zico',
    age: '28',
    log() {
      return 'obj.log()';
    },
    fn2() { return "yes"; }
  };

  let getName = obj?.name; // "zico"
  let getSex = obj?.sex; // undefined
  let getHome = obj?.['home']; // undefined
  let getAge = obj?.['age']; // 28
  let getLog = obj.log?.(); // "obj.log()"
  let getFun = obj.fun?.(); // undefined
  let res = obj?.fn?.();

  let a = 1;
  let b = 2;
  a?.[++b];
  console.log(b); //3

  let c;
  let rv = c?.[++a];
  console.log(a); // 1
}

/**************************************************************************************************************************
 * 8.Null 判断运算符 " ?? "
 * 运用场景：若某个对象值只有为null || undefined 才返回右侧的指定默认值
 * 行为与 || 类似
 **************************************************************************************************************************/
{
  let a;
  let b = 0;
  let c = b || 'V';
  console.log(c); // "V"

  let d = a || 'v';
  console.log(d); // "v"

  let e = a ?? 'D';
  console.log(e); // "D"

  let f = b ?? 'popo';
  console.log(f); // 0
}

console.log('--------------- 以上为一.对象的扩展---------------');

console.log('--------------- 以下为二. 对象的新增方法---------------');

/**************************************************************************************************************************
 * 二.对象的新增方法
 * 1.Object.is() --- 比较两个值是否严格相等，与"==="运算符行为一致
 * 2.Object.assign(target,source1,source2) --- 合并对象(将源对象(source)的所有枚举属性赋值到目标对象(target))
 *                                             若只有一个参数，则会返回该参数；
 *                                             若参数不为对象，则先转化为对象。
 *                                             null || undefined 不可转化为对象，则报错。
 *                                             若为拷贝，实现的是浅拷贝
 **************************************************************************************************************************/
{
  {
    let a = {};
    let b = {};
    if (a === b) {
      console.log('两个空对象是不相等的');
    }
    +0 === -0; //true
    NaN === NaN; // false

    Object.is(+0, -0); // false
    Object.is(NaN, NaN); // true
  }

  {
    let obj1 = { a: 1, d: "d" };
    let obj2 = { b: 3 };
    let obj3 = { a: 2, c: 'c' };
    let obj = Object.assign({}, obj1, obj2, obj3); // {a:2,b:3}  后面的值会覆盖前面的
    let objNew = Object.assign(obj1, obj2, obj3); // {a:2,b:3}  后面的值会覆盖前面的
    console.log('结束');

  }

  {
    let a = Object.assign(1); //
    typeof Object.assign(1); // "object"
  }

  {
    // 常用
    // 1.为对象添加属性
    class Point {
      constructor(x, y) {
        this.name = 'zico';
        // 为当前this对象合并 {x,y}对象。因此this内就包含了x,y
        Object.assign(this, { x, y });
      }
    }

    let a = new Point();

    // 2. 为对象添加方法(可多个,参数2必须为对象，因此要用大括号包裹)
    Object.assign(Point.prototype, {
      setName(str) { },
      getAge() {
        return 'fuck u';
      },
    });

    console.log('结束');
  }
}
console.log('--------------- 以上为二. 对象的新增方法---------------');
