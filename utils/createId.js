const createId = (length) => {
    let res = "";
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charsLen = chars.length;
    let counter = 0;
    while (counter < length) {
      res += chars.charAt(Math.floor(Math.random() * charsLen));
      counter += 1;
    }
  
    return res;
  };
  

module.exports = createId