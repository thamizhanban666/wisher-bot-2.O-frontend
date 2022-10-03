import { renderToStaticMarkup, renderToString } from 'react-dom/server'

function componentToString(component) {
  return renderToStaticMarkup(component)
}

export default componentToString;
