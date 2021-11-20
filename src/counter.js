const counterMeal = (data, mealCategory, menuTarget) => {
  if (data.length && mealCategory) {
    menuTarget.textContent = `${mealCategory} (${data.length})`;
    return true;
  }
  return false;
};

const counterComment = (comments) => (comments.length ? comments.length : 0);

export { counterMeal, counterComment };