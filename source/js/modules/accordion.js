export default () => {
  const accordion = document.querySelector('.accordion');
  if (!accordion) {
    return;
  }

  const keyCodeEnter = 13;
  let currentOpenedTab;
  let currentOpenedTabContent;

  function onTitleClick(evt) {
    const tab = evt.target.closest('.accordion__tab');
    if (!tab) {
      return;
    }
    const tabContent = tab.querySelector('.accordion__tab-content');
    if (!tabContent) {
      return;
    }

    const tabContentHeight = tabContent.scrollHeight + 'px';

    if (!tab.classList.contains('accordion__tab--opened')) {
      if (currentOpenedTab) {
        currentOpenedTab.classList.remove('accordion__tab--opened');
        currentOpenedTabContent.style.height = 0;
      }
      currentOpenedTab = tab;
      currentOpenedTabContent = tabContent;
      currentOpenedTab.classList.add('accordion__tab--opened');
      evt.target.setAttribute('aria-label', 'Скрыть ответ');
    } else {
      currentOpenedTab.classList.remove('accordion__tab--opened');
      evt.target.setAttribute('aria-label', 'Показать ответ');
      currentOpenedTab = null;
      currentOpenedTabContent = null;
      document.activeElement.blur();
    }

    tabContent.style.height = (tabContent.offsetHeight === 0) ? tabContentHeight : 0;


  }

  function onDocumentKeyDown(evt) {
    if (evt.keyCode === keyCodeEnter && evt.target.classList.contains('accordion__tab-title')) {
      evt.preventDefault();
      onTitleClick(evt);
    }
  }

  function initializeAccordion() {
    const toggleList = accordion.querySelectorAll('.accordion__tab-toggle');
    if (!toggleList.length) {
      return;
    }

    toggleList.forEach((toggle) => {
      toggle.addEventListener('click', onTitleClick);
    });
  }

  initializeAccordion();
  document.addEventListener('keydown', onDocumentKeyDown);
};
