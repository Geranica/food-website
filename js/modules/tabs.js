function tabs(
  tabsSelector,
  tabsContentSelector,
  tabsParentSelector,
  showSelector,
  hideSelector,
  animationSelector,
  activityClass
) {
  //tabs

  const tabs = document.querySelectorAll(tabsSelector);
  const tabsContent = document.querySelectorAll(tabsContentSelector);
  const tabsParent = document.querySelector(tabsParentSelector);

  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add(hideSelector);
      item.classList.remove(showSelector, animationSelector);
    });

    tabs.forEach((item) => {
      item.classList.remove(activityClass);
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add(showSelector, animationSelector);
    tabsContent[i].classList.remove(hideSelector);
    tabs[i].classList.add(activityClass);
  }

  tabsParent.addEventListener("click", (event) => {
    const target = event.target;
    if (target && target.matches(tabsSelector)) {
      hideTabContent();
      showTabContent(Array.from(tabs).indexOf(target));
    }
  });
  hideTabContent();
  showTabContent();
}

export default tabs;
