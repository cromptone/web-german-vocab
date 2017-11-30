import React from 'react';
import Button from './Button';
import PropTypes from 'prop-types';
import BoxedWords from './BoxedWords';
import InputContainer from './InputContainer';

export default class DrillContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleVocabSubmission = this.handleVocabSubmission.bind(this);
    this.handleReturnToMenu = this.handleReturnToMenu.bind(this);
    this.handleSeeAllAnswers = this.handleSeeAllAnswers.bind(this);
    this.handleRestart = this.handleRestart.bind(this);

    const wordsToComplete = this.shuffleCopyOfArray(this.props.vocabList);
    const prompt = (this.props.drillType === 'withPrompts') ? wordsToComplete[0][1] : 'Enter German word:';
    this.state = {
      wordsToComplete,
      wordsAlreadyCompleted: [],
      incorrectWords: [],
      prompt,
    };
    window.scroll(0,0);
  }

  handleVocabSubmission(response) {
    response = response.trim();
    const answerIndex = this.state.wordsToComplete.map(wordPair => wordPair[0]).indexOf(response);
    if (this.props.drillType === 'withPrompts') {
      this.handleVocabSubmissionWithPrompts(response, answerIndex);
    } else if (this.props.drillType === 'withoutPrompts') {
      this.handleVocabSubmissionWithoutPrompts(response, answerIndex);
    }
  }

  handleVocabSubmissionWithPrompts(response, answerIndex) {
    const isAnswerCorrect = !((answerIndex === -1) || ((this.props.drillType === 'withPrompts') && (this.state.wordsToComplete[answerIndex][0] !== response)));
    this.updateStateAfterAnswer(answerIndex, isAnswerCorrect);
  }

  handleVocabSubmissionWithoutPrompts(response, answerIndex) {
    if (answerIndex === -1) { // Wrong answer!
      return;
    } else {
      this.updateStateAfterAnswer(answerIndex, true);
    }
  }

  updateStateAfterAnswer(answerIndex, isAnswerCorrect) {
    const newState = {};
    const updatedWordsToComplete = this.state.wordsToComplete.filter((wordPair, index) => index !== answerIndex);
    const completedWords = this.state.wordsAlreadyCompleted.slice();
    if (isAnswerCorrect) {
      const answer = this.state.wordsToComplete.slice(answerIndex, answerIndex + 1);
      completedWords.unshift(answer[0]);
    } else { // We know this is always a "withPrompts" drill
      updatedWordsToComplete.shift();
      const incorrectWords = this.state.incorrectWords.slice();
      incorrectWords.unshift(this.state.wordsToComplete[0]);
      completedWords.unshift(this.state.wordsToComplete[0]);
      Object.assign(newState, { incorrectWords });
    }

    if (this.props.drillType === 'withPrompts') {
      let nextPrompt = ' ';
      if (this.state.wordsToComplete.length > 1) {
        nextPrompt = this.state.wordsToComplete[1][1];
      }
      Object.assign(newState, { prompt: nextPrompt });
    } else {
      if (this.state.wordsToComplete.length === 1) {
        Object.assign(newState, { prompt: ' ' })
      }
    }


    Object.assign(newState, {
      wordsToComplete: updatedWordsToComplete,
      wordsAlreadyCompleted: completedWords,
    });
    this.setState(newState);
  }


  handleRestart() {
    const unshuffledWordList = this.state.wordsToComplete.concat(this.state.wordsAlreadyCompleted);
    const wordList = this.shuffleCopyOfArray(unshuffledWordList);
    const newState = {
      wordsToComplete: wordList,
      wordsAlreadyCompleted: [],
      incorrectWords: [],
    };
    if (this.props.drillType === 'withPrompts') {
      const nextPrompt = wordList[0][1];
      Object.assign(newState, { prompt: nextPrompt });
    } else {
      Object.assign(newState, { prompt: 'Enter German word:' });
    }
    this.setState(newState);
  }

  handleSeeAllAnswers() {
    const missedWords = this.state.wordsToComplete.slice();
    const incorrectWords = missedWords.concat(this.state.incorrectWords);
    const wordsAlreadyCompleted = missedWords.concat(this.state.wordsAlreadyCompleted);
    this.setState({
      wordsToComplete: [],
      incorrectWords: incorrectWords,
      wordsAlreadyCompleted: wordsAlreadyCompleted,
      prompt: ' ',
    });
  }

  handleReturnToMenu() {
    this.setState({
      wordsToComplete: [],
      wordsAlreadyCompleted: [],
      incorrectWords: [],
    });
    this.props.handleReturnToMenu();
  }

  shuffleCopyOfArray(originalArray) {
    const array = originalArray.slice();
    for (let indexOne = array.length - 1; indexOne > 0; indexOne--) {
      const indexTwo = Math.floor(Math.random() * (indexOne + 1));
      [array[indexOne], array[indexTwo]] = [array[indexTwo], array[indexOne]];
    }
    return array;
  }

  render() {
    return (
      <div>
        <div style={{ clear: 'both' }}>
          <div style={{ marginRight: '12.5%', clear: 'both', float: 'right', padding: 10 }}>
            {this.state.wordsToComplete.length > 0 &&
              <Button id="showAnswers" clickHandler={this.handleSeeAllAnswers} text="See all answers" />
						}
            <Button id="return" clickHandler={this.handleReturnToMenu} text="Return to menu" />
            <Button id="restart" clickHandler={this.handleRestart} text="Restart" autoRevertColorChange={true} />

          </div>
        <InputContainer 
          showInputBar={this.state.wordsToComplete.length > 0} 
          handleVocabSubmission={this.handleVocabSubmission} 
          prompt={this.state.prompt} 
        />
        </div>
        <div style={{ paddingLeft: '15%' }}>
          <BoxedWords 
            drillType={this.props.drillType} 
            wordsAlreadyCompleted={this.state.wordsAlreadyCompleted} 
            incorrectWords={this.state.incorrectWords}
            wordsToComplete={this.state.wordsToComplete}
          />
        </div>
      </div>
    );
  }
}

DrillContainer.propTypes = {
  vocabList: PropTypes.array.isRequired,
  drillType: PropTypes.oneOf(['withPrompts', 'withoutPrompts']).isRequired,
  handleReturnToMenu: PropTypes.func.isRequired
}
