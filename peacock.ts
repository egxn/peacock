import hljs from "highlight.js";

const HIGHLIGHT_CSS = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/base16/monokai.min.css';

function addHighlightCSS() {
  return new Promise<void>((resolve, reject) => {
    const highlightLink = document.createElement('link');
    highlightLink.href = HIGHLIGHT_CSS;
    highlightLink.rel = 'stylesheet';
    highlightLink.type = 'text/css';
    highlightLink.onload = () => resolve();
    highlightLink.onerror = () => reject();
    document.head.appendChild(highlightLink)
  });
}

function createPeacockButton(): HTMLButtonElement {
  const button = document.createElement('button');
  button.innerText = '🦚';
  button.style.alignItems = 'center';
  button.style.backgroundColor = '#000';
  button.style.borderBottomRightRadius = '35%';
  button.style.borderTopRightRadius = '35%';
  button.style.display = 'flex';
  button.style.height = '30px';
  button.style.justifyContent = 'center';
  button.style.position = 'absolute';
  button.style.right = '-30px';
  button.style.top = '10px';
  button.style.width = '30px';
  button.style.fontSize = '22px';
  button.style.border = 'none';
  button.ariaLabel = 'Higlight code';

  return button;
}


function trimStartNumbers(str: string): string {
  const regex = /^\d+/;
  const match = regex.exec(str);
  if (match) {
    return str.substring(match[0].length);
  }

  return str;
}

function removeStartNumbers(str: string): string {
  const lines = str.split('\n').map(line => line.trimStart());
  const trimmedLines = lines.map(line => trimStartNumbers(line));
  return trimmedLines.join('\n');
}

function addClickEvent(button: HTMLButtonElement, pre: HTMLPreElement) {
  button.addEventListener('click', () => {
    const hasCodeTag = pre.innerText.includes('<code>');
    const newPreNode = document.createElement('pre');
    if (!hasCodeTag) {
      const codeNode = document.createElement('code');
      const code = pre.innerText;
      // Remove numbers at the start and end of each line  
      // removeStartNumbers(pre.innerText).replace(/[^\x00-\x7F]/g, "");
      codeNode.innerHTML = hljs.highlightAuto(code).value;
      newPreNode.appendChild(codeNode);
    } else {
      newPreNode.innerHTML = pre.innerHTML;
    }

    pre?.parentNode?.replaceChild(newPreNode, pre);
  });
}

function wrapCodeNodes() {
  const preNodes = document.getElementsByTagName('pre');
  for (let i = 0; i < preNodes.length; i++) {
    const preNode = preNodes[i];

    const divNode: HTMLDivElement = document.createElement('div');
    divNode.style.position = 'relative';

    const newPreNode: HTMLPreElement = document.createElement('pre');
    const buttonNode: HTMLButtonElement = createPeacockButton();

    newPreNode.innerHTML = preNode.innerHTML;

    divNode.appendChild(buttonNode);
    divNode.appendChild(newPreNode);
    if (divNode.firstChild && divNode.lastChild) {
      addClickEvent(
        divNode.firstChild as HTMLButtonElement,
        divNode.lastChild as HTMLPreElement);
    }

    preNode?.parentNode?.replaceChild(divNode, preNode);
  }
}


function start() {
  addHighlightCSS()
    .then(() => console.log('highlight.js loaded'))
    .then(() => wrapCodeNodes())
    .catch(err => console.error(err));
}

start();