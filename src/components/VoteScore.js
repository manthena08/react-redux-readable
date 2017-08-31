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
        <Button onClick={() => this.changeVoteScore('upVote')}><Icon name='thumbs outline up' /></Button>
        <span>{this.props.score}</span>
        <Button onClick={() => this.changeVoteScore('downVote')}><Icon name='thumbs outline down' /></Button>
      </div>
    )
  }
}

export default VoteScore