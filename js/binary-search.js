state.elements = [];
state.maxElements = 32;

state.length = 0;
view.length = document.getElementById('state-length');
state.nSearches = 0;
view.stateSearches = document.getElementById('state-searches');

view.arrays = document.querySelectorAll('.domain-arrays > .array');
view.searches = document.querySelectorAll('.domain-searches > div');
let nSearches = 0;

const buttonDetails =
[
  {
    time: 'Best O(1); Average O(log n); Worst O(log n)',
    description: 'Search for X within the array.',
    descriptionTemplate: 'Search for X within the array.',
    operation: binarySearch,
    progressTitle: 'Searching for X',
    progressTitleTemplate: 'Searching for X'
  },
  {
    time: 'O(1)',
    description: 'Make a new array with random elements.',
    operation: newArray,
    progressTitle: 'Making a new array'
  }
];

async function binarySearch()
{
  // todo binarySearch()
}

async function newArray()
{
  // Cleanup from the last search
  // todo Cleanup

  // Randomize quantity of elements
  let length = randomInt(10, state.maxElements);
  while (length === state.length)
  {
    length = randomInt(10, state.maxElements);
  }
  // Update state - length
  view.length.innerHTML = length;
  // Show/hide first layer's elements based on new length
  const vElements = view.arrays[0].children;
  if (length > state.length) // New length is larger then old
  {
    for (let i = state.length; i < length; ++i)
    {
      vElements[i].classList.remove('hidden');
    }
  }
  else
  {
    for (let i = state.length - 1; i >= length; --i)
    {
      vElements[i].classList.add('hidden');
    }
  }
  state.length = length;
  // Generate temporary array of new elements
  const newNumbers = generateIncrementingNumbers(length);
  // Animation - slowly match old numbers to new numbers
  await matchNumbersToNew(newNumbers, state.elements, vElements);
  // Generate X - the new search number
  // todo Generate X
}

function generateIncrementingNumbers(length)
{
  const max = Math.floor( 999 / length );
  const arr = [ randomInt(1, max) ];
  for (let i = 1; i < length; ++i)
  {
    arr.push( randomInt(1, max) + arr[i-1] );
  }
  return arr;
}

function matchNumbersToNew(newNumbers, oldNumbers, view)
{
  return new Promise((resolve) =>
  {
    promiseMatchNumbersToNew(newNumbers, oldNumbers, view, resolve);
  });
}

function promiseMatchNumbersToNew(newNumbers, oldNumbers, view, reslove)
{
  let hasChanged = false;
  for (let i = 0; i < oldNumbers.length; ++i)
  {
    if (newNumbers[i] > oldNumbers[i])
    {
      ++oldNumbers[i];
      hasChanged = true;
    }
    else if (newNumbers[i] < oldNumbers[i])
    {
      --oldNumbers[i];
      hasChanged = true;
    }

    if (hasChanged)
    {
      view[i].innerHTML = oldNumbers[i];
    }
  }

  if (hasChanged)
  {
    setTimeout(promiseMatchNumbersToNew, 5, newNumbers, oldNumbers, view, reslove);
  }
  else
  {
    reslove();
  }
}

async function init()
{
  state.inProgress = true;
  const array = view.arrays[0];
  for (let i = 0; i < state.maxElements; ++i)
  {
    state.elements.push(i + 1);
    array.insertAdjacentHTML('beforeend', `<div class="element hidden">${i + 1}</div>`);
  }

  await newArray();
  state.inProgress = false;
  updateTemplates();
  updateInfo();
}
init();
