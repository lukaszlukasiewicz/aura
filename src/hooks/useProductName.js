
const materialLabels = {
  'metal' : "drewniano/metalowa",
  'wood' : "drweniana",
  'composite' : "kompozytowa"
}

const typeLabels = {
  'standard' : "",
  'double' : "podwójna",
  'tall' : "wysoka"
}

const cornersLabels = {
  'sharp' : 'proste',
  'round' : 'zaokrąglone'
}

const getProductName = product => {
  return `Donica ${materialLabels[product.material]} ${typeLabels[product.type]}`;
}

const getProductDescription = product => {

  if(product.material == 'metal') {
    const {woodType,woodColor,corners,cornerColor,insert} = product;
    return `drewno: ${woodType}, kolor: ${woodColor}, narożniki: ${cornersLabels[corners]}, kolor narożników: ${cornerColor} ${insert ? `, wkład: ${insert}` : ''}`
  } 
  if(product.material == 'wood') {
    const {woodType,woodColor,corners,insert} = product;
    return `drewno: ${woodType}, kolor: ${woodColor}, narożniki: ${cornersLabels[corners]} ${insert ? `, wkład: ${insert}` : ''}`
  } 
  if(product.material == 'composite') {
    const {color,insert} = product;
    return `kolor: ${color} ${insert ? `, wkład: ${insert}` : ''}`
  } 
  return "";
}

export const useProductName = product => {

  return [getProductName(product),getProductDescription(product)]
} 