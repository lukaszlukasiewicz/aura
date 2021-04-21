export const useSVG = imageData => {
  const icon = atob(imageData.replace(/data:image\/svg\+xml;base64,/, ''))
  return <div dangerouslySetInnerHTML={{
    __html: icon
  }} />
}
