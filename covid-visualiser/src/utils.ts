export function NumberFormat(num:any, digits:number) {
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "G" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" }
    ];
    const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
    const item = lookup.slice().reverse().find((item:any) => num >= item.value);
    return item ? (num / item.value).toFixed(digits).replace(regexp, "").concat(item.symbol) : "0";
  }


  export function toDate(dateString:string) {
    if (typeof dateString !== 'string') {
      throw new TypeError('Input must be a string');
    }
  
    const year = parseInt(dateString.substring(0, 4), 10);
    const month = parseInt(dateString.substring(4, 6), 10) - 1; 
    const day = parseInt(dateString.substring(6, 8), 10);
  
    return new Date(year, month, day);
  }

  export function camelCaseToTitleCase(text:string) {
    return text.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
      return str.toUpperCase();
    });
  }

  export function titleCaseToCamelCase(text:string){
    return text.replace(/\s(.)/g, function($1) { return $1.toUpperCase(); }).replace(/\s/g, '').replace(/^(.)/, function($1) { return $1.toLowerCase(); });
  }