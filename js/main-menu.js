const viewMainMenuItems = document.querySelectorAll('.main-menu > .main-menu-item');
for (const vmmi of viewMainMenuItems)
{
  vmmi.addEventListener('mouseenter', () =>
  {
    vmmi.classList.add('hover');
  });
  vmmi.addEventListener('mouseleave', () =>
  {
    vmmi.classList.remove('hover');
  });
}
