const state =
{
  inProgress: false,
  x: 0,
  nElements: 0,
  minElements: 0,
  maxElements: 0, // Should be overwritten in DAS' script
};

const view =
{
  buttons: document.getElementsByTagName('button'),
  info: document.getElementById('info'),
  time: document.getElementById('time'),
  description: document.getElementById('description'),
  progress: document.getElementById('progress'),
  progressTitle: document.getElementById('progress-title'),
  progressInner: document.getElementById('progress-inner'),
};

const testView = () =>
{
  for (const v in view)
  {
    if (!view[v])
    {
      console.warn(`Warning: Can't find view-${v} in the HTML.`);
    }
  }
};
testView();
