const buttons = view.buttons;
let buttonId = 0;
for (let i = 0; i < buttons.length; ++i)
{
  buttons[i].addEventListener('mouseenter', () =>
  {
    view.info.classList.remove('hidden');
    view.time.innerHTML = buttonDetails[i].time;
    updateDescription(i);
  });

  buttons[i].addEventListener('mouseleave', () =>
  {
    view.info.classList.add('hidden');
  });

  buttons[i].addEventListener('click', () =>
  {
    let cant = '';
    if (state.inProgress) { cant = 'cant'; }

    buttons[i].insertAdjacentHTML('beforeend',
      `<div id="${buttonId}" class="btn-hit ${cant}"></div>`);
    setTimeout(removeButtonClick, 1200, buttonId);
    ++buttonId;

    buttonDetails[i].operation({ id: i });
    updateDescription(i);
  });
}

function removeButtonClick(id)
{
  document.getElementById(`${id}`).remove();
}

function updateDescription(id)
{
  let description = '';
  if (buttonDetails[id].description.includes('X'))
  {
    description = buttonDetails[id].description.replace('X', `${state.x}`);
  }

  view.description.innerHTML = description || buttonDetails[id].description;
}
