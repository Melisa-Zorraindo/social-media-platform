import { getPageData } from "example/api/data/get.js"
import { renderPageData } from "example/template/data/item.js"
import { setListeners } from "example/listeners/index.js"

async function setupExamplePage() {
  const data = getPageData(123);
  renderPageData(data)
  setListeners();
  return "Example page is ready";
}

setupExamplePage().then(console.log)