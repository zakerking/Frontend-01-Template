#学号: G20200447010663
#姓名: 金叙辰
#班级: 3班
#小组: 8组
#作业&总结链接:

## 写一个正则表达式, 匹配所有 Number 直接量

`Number` 直接量有
- 十进制
  - 我们正常使用的进制
- 二进制
  - 0b开始
- 八进制
  - 数字前面加0代表八进制
- 十六进制
  - 数字前面加0x代表十六进制
- 浮点数
- NaN
- 科学计数法
  - E代表底数10, 后面跟E的指数, 可以是正负值

```JS
/^((\d+(\.\d+)?[Ee]-?\d+)|(-?\d+(\.\d+)?)|(NaN)|(-?0b[10]+)|(-?0o?\d+)|(-?0x\d+)|(Number\.MAX_SAFE_INTEGER|Number\.Min_SAFE_INTEGER))$|/g
```


## 写一个 UTF-8 Encoding 的函数

`UTF-8` 是针对 Unicode 可变长度的编码, 所以要先整理 UTF-8 的转码规则;
`ACSII` 编码的字符都是单字节的, `UTF-8` 是为了解决多字节的字符占用空间问题;

```JS
function utf8_encoding (str) {
  if (typeof str !== 'string') return str;
  const unicodeMap = [
    {
      min: 0,
      max: 127,
      n: 1
    },
    {
      min: 128,
      max: 2047,
      n: 2
    },
    {
      min: 2048,
      max: 65535,
      n: 3
    },
    {
      min: 65536,
      max: 1050623,
      n: 4
    }
  ];
  const unicode = str.codePointAt(0);
  let scope = unicodeMap.find(item => {
    return unicode >= item.min && unicode <= item.max
  });
  if (!scope) return str;
  const n = scope.n;
  let binary = unicode.toString(2);
  let utf8 = '';
  if (n === 1) {
    utf8 = binary.padStart(8, '0');
  } else {
    binary = binary.padStart((Math.ceil(binary.length / 8) * 8)
      , '0').split('');
    Array(n).fill(0).map((item, inx) => {
      if (inx === 0) {
        utf8 += `${Array(n).fill(0).map(item => '1').join('')}0${binary.splice(0, (8 - (n + 1))).join('')}`
      } else {
        utf8 += `10${binary.splice(0, 6).join('')}`.padStart(8, '0')
      }
    })
  }
  return utf8;
}
```


## 字符串
