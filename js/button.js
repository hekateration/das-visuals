const buttons = view.buttons;
let buttonId = 0;
for (let i = 0; i < buttons.length; ++i)
{
  buttons[i].addEventListener('mouseenter', () =>
  {
    let description = '';
    if (buttonDetails[i].description.includes('X'))
    {
      description = buttonDetails[i].description.replace('X', `${state.x}`);
    }

    view.info.classList.remove('hidden');
    view.time.innerHTML = buttonDetails[i].time;
    view.description.innerHTML = description || buttonDetails[i].description;
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
  });
}

function removeButtonClick(id)
{
  document.getElementById(`${id}`).remove();
}
