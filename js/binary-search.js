state.elements = [];
state.maxElements = 34;

view.length = document.getElementById('state-length');
state.searches = 0;
view.searches = document.getElementById('state-searches');

view.arrays = document.querySelectorAll('.domain-arrays > .array');
view.middles = document.querySelector('.domain-middles');

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
  ++nSearches;
  cleanup();
  await wait(400);

  let left = 0;
  let right = state.nElements - 1;
  let isFound = false;
  let direction = '';
  while (left <= right && !isFound)
  {
    ++state.searches;
    view.searches.innerHTML = state.searches;

    let mid = Math.floor((left + right) / 2);
    if (state.x === state.elements[mid])
    {
      isFound = true;
      direction = '';
    }
    else if (state.x > state.elements[mid])
    {
      direction = 'right';
      opacitizeElements(mid - left, direction);

      left = mid + 1;
    }
    else if (state.x < state.elements[mid])
    {
      direction = 'left';
      opacitizeElements(right - mid, direction);

      right = mid - 1;
    }

    view.middles.insertAdjacentHTML('beforeend', htmlizeMiddle(mid, isFound, direction));
    await wait(1000);

    if (!isFound)
    {
      generateArrayElements(left, right);
      await wait(1800);
    }
  }

  generateX();
}

function htmlizeMiddle(index, isFound, direction)
{
  const text = isFound ? 'Yes' : 'No';
  const toLeft = direction === 'left' ? '' : 'wrong-way';
  const toRight = direction === 'right' ? '' : 'wrong-way';
  const top = (state.searches - 1) * 90;
  const left = index * 29;
  const padding = isFound ? 'padding-right: 3px;' : '';

  return `<div class="middle" style="top: ${top}px; left: ${left}px;">
          <div class="text" style="${padding}">${text}</div>
          <div class="bar left ${toLeft}"></div>
          <div class="bar right ${toRight}"></div>
        </div>`;
}

function opacitizeElements(amount, direction)
{
  const elements = view.arrays[ state.searches - 1 ].children;
  const length = state.searches - 1 === 0 ? state.nElements : elements.length;

  let from = 0;
  if (direction === 'left')
  {
    from = Math.floor(length / 2) + length % 2;
  }

  for ( ; amount; --amount, ++from)
  {
    elements[from].classList.add('opacitize');
  }
}

function generateArrayElements(left, right)
{
  const array = view.arrays[ state.searches ];
  for ( ; left <= right; ++left)
  {
    array.insertAdjacentHTML('beforeend', `<div class="element animated" style="left: ${ left * 29 }px;">${ state.elements[left] }</div>`);
  }
}

async function newArray()
{
  // Cleanup from the last search
  cleanup();

  // Randomize quantity of elements
  let length = randomInt(10, state.maxElements);
  while (length === state.nElements) // New length should be different from the old one
  {
    length = randomInt(10, state.maxElements);
  }
  // Update state - length
  view.length.innerHTML = length;
  // Show/hide first layer's elements based on new length
  const vElements = view.arrays[0].children;
  if (length > state.nElements) // New length is larger then old
  {
    for (let i = state.nElements; i < length; ++i)
    {
      vElements[i].classList.remove('hidden');
    }
  }
  else
  {
    for (let i = state.nElements - 1; i >= length; --i)
    {
      vElements[i].classList.add('hidden');
    }
  }
  state.nElements = length;
  // Generate temporary array of new elements
  const newNumbers = generateIncrementingNumbers(length);
  // Animation - slowly match old numbers to new numbers
  await matchNumbersToNew(newNumbers, state.elements, vElements);
  // Generate X - the new search number
  generateX();
}

function cleanup()
{
  state.searches = 0;
  view.searches.innerHTML = '0';
  view.middles.innerHTML = '';

  for (let i = 1; i < view.arrays.length; ++i)
  {
    view.arrays[i].innerHTML = '';
  }

  const elements = view.arrays[0].children;
  for (let i = 0; i < elements.length; ++i)
  {
    elements[i].classList.remove('opacitize');
  }
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

function generateX()
{
  if (nSearches % 4 === 0)
  {
    state.x = state.elements[ randomInt(0, state.nElements - 1) ];
  }
  else if (nSearches % 4 === 1)
  {
    state.x = state.elements[0] - 1;
  }
  else if (nSearches % 4 === 2)
  {
    state.x = state.elements[ randomInt(0, state.nElements - 1) ] + randomInt(-10, 10);
  }
  else
  {
    state.x = state.elements[ state.nElements - 1 ] + 1;
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
