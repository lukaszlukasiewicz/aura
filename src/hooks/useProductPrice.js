const getProductPrice = product => {
  const {material,type} = product;
  if(!material || !type) {
    throw "Error: unable to calculate item price. Product type or material is missing";
  }
  if(material == "wood") {
    if(type == "standard") return 149900;
    return 199900;
  }
  if(material == "metal") {
    if(type == "standard") return 199900;
    return 249900;
  }
  if(material == "composite") {
    if(type == "standard") return 129900;
    return 179900;
  }
}

const taxRate = .23;
const currency = "PLN";

var formatter = new Intl.NumberFormat('pl-PL', {
  style: 'currency',
  currency,
});

export const formatPrice = price => {
 return formatter.format(price/100);
}

export const net = price => Math.round(price / (1+taxRate));

export const useProductPrice = (product, amount = 1) => {
  const price = getProductPrice(product);
  const total = price * amount;
  return {
    unit : {
      gross :  {
        value : price,
        text: formatPrice(price),
      },
      net : {
        value:net(price),
        text:  formatPrice(net(price))
      },
    },
    total : {
      gross : {
        value: total,
        text: formatPrice(total),
      },
      net : {
        value: net(total),
        text: formatPrice(net(total)),
      },
    }
  }
}