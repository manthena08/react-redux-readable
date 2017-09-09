import React from 'react'
import { Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const VoteScore = (props) => {
  return (
    <div className="section-vote-score">
      <Icon size="large" color="green" name='thumbs outline up' onClick={() => props.handleVoteScore(props.controlId, 'upVote')} />
      <span>{props.score}</span>
      <Icon size="large" color="red" name='thumbs outline down' onClick={() => props.handleVoteScore(props.controlId, 'downVote')} />
    </div>
  )
}

VoteScore.propTypes = {
  score: PropTypes.number.isRequired,
  handleVoteScore: PropTypes.func.isRequired
}

export default VoteScore