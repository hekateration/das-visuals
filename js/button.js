const buttons = view.buttons;
let buttonId = 0;
for (let i = 0; i < buttons.length; ++i)
{
  buttons[i].addEventListener('mouseenter', () =>
  {
    updateTemplates();
    updateInfo();
    document.getElementById('info-inner-' + i).classList.remove('removed');
    view.info.classList.remove('hidden');
  });

  buttons[i].addEventListener('mouseleave', () =>
  {
    view.info.classList.add('hidden');
    document.getElementById('info-inner-' + i).classList.add('removed');
  });

  buttons[i].addEventListener('click', async () =>
  {
    ++buttonId;
    if (state.inProgress || atLimitLength(i))
    {
      buttons[i].insertAdjacentHTML('beforeend',
        `<div id="${buttonId}" class="btn-hit cant"></div>`);
      setTimeout(removeButtonClick, 1200, buttonId);
      return;
    }

    buttons[i].insertAdjacentHTML('beforeend',
      `<div id="${buttonId}" class="btn-hit"></div>`);
    setTimeout(removeButtonClick, 1200, buttonId);


    toggleProgress(i);
    await buttonDetails[i].operation({ id: i });
    toggleProgress(i);
    updateTemplates();
    updateInfo();
  });
}

function removeButtonClick(id)
{
  document.getElementById(`${id}`).remove();
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
    state.inProgress = true;
    view.progressTitle.innerHTML =  buttonDetails[id].progressTitle;
    view.progress.classList.remove('hidden');
  }
}

function updateTemplates()
{
  for (const bd of buttonDetails)
  {
    if (Object.hasOwn(bd, 'descriptionTemplate'))
    {
      bd.description = bd.descriptionTemplate.replace('X', `${state.x}`);

    }
    if (Object.hasOwn(bd, 'progressTitleTemplate'))
    {
      bd.progressTitle = bd.progressTitleTemplate.replace('X', `${state.x}`);
    }
  }
}

function updateInfo()
{
  for (let i = 0, bd = buttonDetails; i < bd.length; ++i)
  {
    const d = document.getElementById('description-' + i);
    d.innerHTML = bd[i].description;
  }
}

function atLimitLength(id)
{
  return state.length === state.maxElements && Object.hasOwn(buttonDetails[id], 'isAdder') || state.length === state.minElements && Object.hasOwn(buttonDetails[id], 'isRemover');
}

function initInfo()
{
  for (let i = 0, bd = buttonDetails; i < bd.length; ++i)
  {
    view.info.insertAdjacentHTML('beforeend',
      `<div id="info-inner-${i}" class="removed"><span class="color-tt">Time:</span> ${bd[i].time} <br>
          <span class="color-tt">Description:</span> <span id="description-${i}">${bd[i].description}</span></div>`);
  }
}
initInfo();
