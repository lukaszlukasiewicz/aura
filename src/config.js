const woodTypes = ["okume","olcha"];
const woodColors = ["natural","ash-gray","tvt-5060","tvt-5056","5073","5077"]


const typeLabels = {
  stadard : "Standardowa",
  double : "Podwójna",
  tall : "Wysoka"
}

const wood = {
  material : {
    value:"wood",
  },
  type : {
    values:['standard','double','tall'],
    default : "standard",
    labels : typeLabels,
  },
  corners :  {
    expression: /^(round|sharp)$/,
    default: "round",
  },
  insert : {
    values : ["Lechuza"],
    empty : true,
    default: false,
  },
  woodType: {
    expression: new RegExp(`^(${woodTypes.join("|")})$`),
    default: 'okume',
  },
  woodColor : {
    expression:  new RegExp(`^(${woodColors.join("|")})$`),
    default: 'natural',
  },
};

const metal = {
  ... wood, // extends wood type
  material : {
    value:"metal",
  }, // overwrite material prop
  cornerColor : {
    expression : /^(silver|graphite|RAL\s(?:\d{4}))$/,
    default: "silver",
  }
};

const composite = {
  material : {
    value: "composite",
  },
  type : {
    values:['standard','double'],
    default : "standard",
    labels : typeLabels,
  },
  color: {
    expression: /^RAL\s(?:\d{4})$/,
    default: "RAL 4010"
  },
  insert : {
    values : ["Lamela"],
    empty : true,
    default: false,
  },
}

export default {wood,metal,composite};