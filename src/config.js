const woodTypes = ["okume","olcha"];
const woodColors = ["natural","ash-gray","tvt-5060","tvt-5056","5073","5077"]


const basic = {

}

const wood = {
  type : {
    expression : /^(standard|wide|tall)$/,
    value : "standard",
  },
  corners :  {
    expression: /^(round|sharp)$/,
    value: "round",
  },
  insert : {
    expression: /^lamela$/,
    value: 'lamela',
    empty : true,
  },
  woodType: {
    expression: new RegExp(`^(${woodTypes.join("|")})$`),
    value: 'okume',
  },
  woodColor : {
    expression:  new RegExp(`^(${woodColors.join("|")})$`),
    value: 'okume',
  },
};

const metal = {
  ... wood, // extends wood type
  cornerColor : {
    expression : /^(silver|graphite|RAL\s(?:\d{4}))$/,
    value: "silver",
  }
};

const composite = {
  type : {
    expression : /^(standard|wide)$/,
    value : "standard",
  },
  color: {
    expresion: /^RAL\s(?:\d{4})$/,
    value: "RAL 4010"
  },
  insert : {
    expression: /^lamela$/,
    value: 'lamela',
    empty : true,
  },
}

export default [wood,metal,composite];