import React from 'react'
import { Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const CategoryCard = ({ category }) => {
  return (
    <Card className={category.name} as={Link} to={`/category/${category.name}`} >
      <Card.Content>
        <Card.Header>
          <span className="category-card-name">
            {(category.name).toUpperCase()}
          </span>
        </Card.Header>
      </Card.Content>
    </Card>
  )
}

CategoryCard.propTypes = {
  category: PropTypes.object.isRequired
}

export default CategoryCard