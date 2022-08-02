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
    operation: push,
    progressTitle: 'Adding X'
  },
  {
    time: 'O(1)',
    description: 'Delete the top element from the stack.',
    operation: pop,
    progressTitle: 'Deleting top element'
  },
  {
    time: 'O(n/2)',
    description: 'Reverse the order of elements in the stack.',
    operation: reverse,
    progressTitle: 'Reversing the stack'
  }
];

async function push(options)
{
  if (state.inProgress || state.length >= state.maxElements) { return; }
  toggleProgress(options.id);

  addElement();

  generateX();
  toggleProgress(options.id);
}

async function pop(options)
{
  if (state.inProgress) { return; }
  toggleProgress(options.id);

  // todo pop
}

async function reverse(options)
{
  if (state.inProgress) { return; }
  toggleProgress(options.id);

  // todo reverse
}

function toggleProgress(id)
{
  if (state.inProgress)
  {
    view.progress.classList.add('hidden');
    state.inProgress = false;
  }
  else
  {
    let progress = '';
    if (buttonDetails[id].progressTitle.includes('X'))
    {
      progress = buttonDetails[id].progressTitle.replace('X', `${state.x}`);
    }

    state.inProgress = true;
    view.progressTitle.innerHTML = progress || buttonDetails[id].progressTitle;
    view.progress.classList.remove('hidden');
  }
}

function addElement()
{
  ++state.length;
  view.length.innerHTML = state.length;

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

let nDirection = 0;
let left = 0;
const step = 6;
let multiplier = 1;
function calcStyle()
{
  const length = state.length - 1;
  const width = `${90 + length * 6}px`;
  const height = `${120 + length * 6}px`;
  const fontSize = `${1 + length / 10}rem`;
  const top = `${length * 6}px`;
  let boxShadow = '0 0 2px rgba(0,0,0,.25)';
  const lineHeight = `${120 + length * 6 - 2}px`;

  ++nDirection;
  if (nDirection % 10 === 0)
  {
    multiplier = Math.floor(nDirection / 10) / 2 + 1;
  }
  left += step * multiplier;



  const leftString = `${left}px`;
  return `width: ${width}; height: ${height}; font-size: ${fontSize}; top: ${top}; left: ${leftString}; box-shadow: ${boxShadow}; line-height: ${lineHeight};`;
}

function moveStack()
{
  view.stack.style.top = `${150 - state.length * (step/2)}px`;
  view.stack.style.left = `${300 - state.length * step}px`;
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
