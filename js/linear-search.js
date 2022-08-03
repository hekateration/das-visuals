state.elements = [];
state.maxElements = 19;
state.nSearches = randomInt(1, 10);
state.index = -1;

state.length = 0;
view.length = document.getElementById('state-length');
view.noYes = document.getElementById('no-yes');

view.coverbar = document.getElementById('coverbar');
view.covers = document.getElementsByClassName('square cover');
view.elements = document.getElementsByClassName('square element');

const buttonDetails =
[
  {
    time: 'Best O(1); Average O(n/2); Worst O(n)',
    description: 'Search for X within the list.',
    descriptionTemplate: 'Search for X within the list.',
    operation: linearSearch,
    progressTitle: 'Searching for X',
    progressTitleTemplate: 'Searching for X'
  },
  {
    time: 'O(1)',
    description: 'Make a new list with random elements.',
    operation: newList,
    progressTitle: 'Making a new list'
  }
];

async function linearSearch()
{
  cleanupSearch();
  await wait(240);

  showNoYes();
  moveElements(0);
  await wait(state.index * 240 + 480);

  --state.nSearches;
  generateX();
  await wait(360);
}
async function newList()
{
  cleanupSearch('newList')

  state.nElements = randomInt(5, 19);
  view.length.innerHTML = state.nElements;

  dropCovers(0);
  await wait(state.nElements * 50 + 240);
  moveCoverbar();
  toggleElements();
  replaceNumbers();
  await wait(360);
  removeCovers();
  generateX();
  await wait(120);
}

function dropCovers(id)
{
  if (id < state.nElements)
  {
    view.covers[id].classList.add('move-cover');

    setTimeout(dropCovers, 50, id + 1);
  }
}
function moveCoverbar()
{
  view.coverbar.style.left = `${state.nElements * 50 - state.nElements + 1}px`;
}
function toggleElements()
{
  for (let i = 0; i < state.nElements; ++i)
  {
    view.elements[i].classList.remove('hidden');
  }
  for (let i = state.nElements; i < state.maxElements; ++i)
  {
    view.elements[i].classList.add('hidden');
  }
}
function replaceNumbers()
{
  state.elements = [];
  state.elements[0] = randomInt(1, 10);
  for (let i = 1; i < state.nElements; ++i)
  {
    state.elements[i] = randomInt(state.elements[i-1] + 1, state.elements[i-1] + 10);
  }

  for (let i = 0; i < state.nElements; ++i)
  {
    view.elements[i].innerHTML = state.elements[i];
  }
}
function removeCovers()
{
  for (let i = 0; i < state.nElements; ++i)
  {
    view.covers[i].classList.remove('move-cover');
  }
}

function generateX()
{
  if (state.nSearches !== 0)
  {
    let index = randomInt(0, state.nElements-1);
    if (state.x === state.elements[index])
    {
      index = (index + 1) % state.elements.length;
    }
    state.x = state.elements[index];
  }
  else
  {
    state.nSearches = randomInt(1, 10);
    let isIncluded = true;
    while (isIncluded)
    {
      state.x = randomInt(1, 100);
      isIncluded = state.elements.includes(state.x);
    }
  }
  state.index = state.elements.findIndex((el) => el === state.x);
  if (state.index === -1)
  {
    state.index = state.nElements - 1;
  }
}

function showNoYes()
{
  view.noYes.classList.remove('hidden');
}
function hideNoYes()
{
  view.noYes.classList.add('hidden');
}

function moveElements(id)
{
  if (id <= state.index)
  {
    if (state.x === state.elements[id])
    {
      view.elements[id].classList.add('move-el-down');
    }
    else
    {
      view.elements[id].classList.add('move-el-up');
    }

    setTimeout(moveElements, 240, id + 1);
  }
}

function cleanupSearch(callFrom)
{
  if (callFrom === 'newList')
  {
    hideNoYes();
  }
  for (const el of view.elements)
  {
    el.classList.remove('move-el-down');
    el.classList.remove('move-el-up');
  }
}

// Init
state.inProgress = true;
newList({ id: 1 });
state.inProgress = false;
