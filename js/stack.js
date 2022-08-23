state.maxElements = 50;

state.length = 0;
view.length = document.getElementById('state-length');
view.top = document.getElementById('state-top');
view.isEmpty = document.getElementById('state-is-empty');

view.stack = document.getElementById('stack');

const buttonDetails =
[
  {
    time: 'O(1)',
    description: 'Add X to the top of the stack.',
    descriptionTemplate: 'Add X to the top of the stack.',
    operation: push,
    progressTitle: 'Adding X',
    progressTitleTemplate: 'Adding X',
    isAdder: true
  },
  {
    time: 'O(1)',
    description: 'Delete the top element from the stack.',
    operation: pop,
    progressTitle: 'Deleting top element',
    isRemover: true
  },
  {
    time: 'O(n/2)',
    description: 'Reverse the order of elements in the stack.',
    operation: reverse,
    progressTitle: 'Reversing the stack'
  }
];

async function push()
{
  addElement();
  await wait(500);

  generateX();
}

async function pop()
{
  removeElement();
  await wait(500);
}

async function reverse()
{
  if (state.length >= 2)
  {
    reverseElements(0);
    await wait(1200);
    view.top.innerHTML = state.length === 0 ? 'null' : view.stack.lastChild.innerHTML;
    await wait(Math.floor((state.length-1) / 2) * 1200);
  }
}

function addElement()
{
  ++state.length;
  let maxLabel = '';
  if (state.length === state.maxElements)
  {
    maxLabel = '<span class="label max">max</span>';
  }
  view.length.innerHTML = state.length + maxLabel;

  view.top.innerHTML = state.x;
  view.isEmpty.innerHTML = (state.length < 0) + '';

  moveStack();
  let style = '';
  if (state.length > 1)
  {
    style = calcStyle();
  }
  let html = `<div style="${style}" class="element">${state.x}</div>`;
  view.stack.insertAdjacentHTML('beforeend', html);
}

function removeElement()
{
  --state.length;
  view.length.innerHTML = state.length;

  view.isEmpty.innerHTML = (state.length === 0) + '';

  view.stack.removeChild(view.stack.lastChild);
  view.top.innerHTML = state.length === 0 ? 'null' : view.stack.lastChild.innerHTML;

  moveStack();
  calcStyle('pop');
}

function reverseElements(index)
{
  const bot = view.stack.children[index];
  const top = view.stack.children[state.length - 1 - index];

  bot.style.transform = `translate3d(${-bot.clientWidth}px,0,0)`;
  if (index)
  {
    const lastChild = view.stack.lastChild;
    const leftOffset = Number.parseFloat(lastChild.style.left) - Number.parseFloat(top.style.left) + lastChild.clientWidth;
    top.style.transform = `translate3d(${leftOffset}px,0,0)`;
  }

  setTimeout(() =>
  {
    const temp = bot.innerHTML;
    bot.innerHTML = top.innerHTML;
    top.innerHTML = temp;
  }, 420);

  setTimeout(() =>
  {
    bot.style.transform = `translate3d(0,0,0)`;
    top.style.transform = `translate3d(0,0,0)`;
  }, 1000);

  if (index + 1 < Math.floor(state.length / 2))
  {
    setTimeout(reverseElements, 1200, index + 1);
  }
}

let nDirection = 0;
let left = 0;
const step = 3;
let multiplier = 1;
function calcStyle(operation)
{
  if (operation === 'pop')
  {
    if (nDirection % 10 === 0)
    {
      multiplier = Math.floor(nDirection / 10) / 2 + 1;
    }
    left -= step * multiplier;
    --nDirection;

    if (nDirection < 0)
    {
      nDirection = 0;
      left = 0;
    }
  }
  else
  {
    const length = state.length - 1;
    const width = `${90 + length * step}px`;
    const height = `${120 + length * step}px`;
    const fontSize = `${1 + length / 10}rem`;
    const top = `${length * step}px`;
    let boxShadow = '0 0 2px rgba(0,0,0,.25)';
    const lineHeight = `${120 + length * step - 2}px`;

    ++nDirection;
    if (nDirection % 10 === 0)
    {
      multiplier = Math.floor(nDirection / 10) / 2 + 1;
    }
    left += step * multiplier;

    const leftString = `${left}px`;
    return `width: ${width}; height: ${height}; font-size: ${fontSize}; top: ${top}; left: ${leftString}; box-shadow: ${boxShadow}; line-height: ${lineHeight};`;
  }
}

function moveStack()
{
  view.stack.style.top = `${- state.length * (6/2)}px`;
  view.stack.style.left = `${- state.length * 6}px`;
}

function generateX()
{
  state.x = randomInt(1, 1000);
}

function init()
{
  generateX();
}
init();
