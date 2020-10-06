import React from 'react';

export function CategoryWidgetUI(props) {
  const {selectedCategories = []} = props

  const categoryClicked = (category) => {
    let categories;

    if (selectedCategories.indexOf(category) < 0) {
      categories = [...selectedCategories, category]
    } else {
      categories = selectedCategories.filter(c => c !== category)
    }

    if (props.onSelectedCategoriesChange) {
      props.onSelectedCategoriesChange(categories)
    }
  }

  return (
    <div>
      {props.data.map((d,i) => {
        return <div onClick={() => categoryClicked(d.name)} key={i}>{d.name}---->{d.value}</div>
      })}
    </div>
  )
}
