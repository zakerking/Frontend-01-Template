// 将字符串转为utf-8格式
// 对于单字节字符, 字节第一位为0, 后面为unicode码
// 对于 n 字节的符号, 字节的前 n 位都是1, n + 1 设为0,后面字节前两位设为10, 剩下的是 unicode 码
// 字节长度 n 根据Unicode符号范围规范确定, 不是二进制的字节长度
// 这个函数只处理单字符
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