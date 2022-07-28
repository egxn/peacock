const highlightCDN = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/highlight.min.js';
const highlightScript = document.createElement('script');
highlightScript.setAttribute('src', highlightCDN);

const highlightLink = document.createElement('link');
highlightLink.rel = 'stylesheet';
highlightLink.type = 'text/css';
highlightLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/dark.min.css';
highlightLink.media = 'all';

document.head.appendChild(highlightLink);
document.head.appendChild(highlightScript);

const preNodes = document.getElementsByTagName('pre');
for (let i = 0; i < preNodes.length; i++) {
  const preNode = preNodes[i];
  const codeNode = document.createElement('code');
  const newPreNode = document.createElement('pre');
  codeNode.innerHTML = preNode.innerText;
  console.log(preNode.innerText);
  newPreNode.appendChild(codeNode);
  preNode.parentNode.replaceChild(newPreNode, preNode);
}

hljs.highlightAll();
