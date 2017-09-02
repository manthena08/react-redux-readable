import React, { Component } from 'react'

import { Button, Icon } from 'semantic-ui-react'
class VoteScore extends Component {

  changeVoteScore = (status) => {
    const id = this.props.postId ? this.props.postId : this.props.commentId
    this.props.handleVoteScore(id, status)
  }

  render() {
    return (
      <div>
        <Icon color="green" name='thumbs outline up' onClick={() => this.changeVoteScore('upVote')}/>
        <span>{this.props.score}</span>
        <Icon color="red" name='thumbs outline down' onClick={() => this.changeVoteScore('downVote')}/>
      </div>
    )
  }
}

export default VoteScore