import React from 'react';
import Input from './Input';
import Button from './Button';
import Subheading from './Subheading';
import PropTypes from 'prop-types';

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


    } else {
      this.updateStateAfterAnswer(answerIndex, true);
    }
  }

  updateStateAfterAnswer(answerIndex, isAnswerCorrect) {
    const newState = ({});
    const updatedWordsToComplete = this.state.wordsToComplete.filter((wordPair, index) => index !== answerIndex);
    const completedWords = this.state.wordsAlreadyCompleted.slice();
    if (isAnswerCorrect) {
      const answer = this.state.wordsToComplete.slice(answerIndex, answerIndex + 1);
      completedWords.unshift(answer[0]);
    } else { // We know this is always a "withProps" drill
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
    const boxedWordArrayOfRemaingVocab = this.state.wordsToComplete.map(wordPair => <BoxedWord key={wordPair} word={wordPair[1]} backgroundColor="#a2a2a2" opacity=".4" />);
    const boxedWordArrayofCompletedVocab = this.state.wordsAlreadyCompleted.map(wordPair => <BoxedWord backgroundColor={this.state.incorrectWords.includes(wordPair) ? '#ffa2a2' : '#a2a2a2'} key={wordPair} word={`${wordPair[0]} → ${wordPair[1]}`} opacity=".8" />);

    return (
      <div>
        <div style={{ clear: 'both' }}>
          <div style={{ marginRight: '12.5%', clear: 'both', float: 'right', padding: 10 }}>
            {this.state.wordsToComplete.length > 0 &&
              <Button id="showAnswers" clickHandler={this.handleSeeAllAnswers} text="See all answers" />
						}
            <Button id="return" clickHandler={this.handleReturnToMenu} text="Return to menu" />
            <Button id="restart" clickHandler={this.handleRestart} text="Restart" />

          </div>
          <div style={{ marginLeft: '12.5%' }} >
            <Subheading prompt={this.state.prompt} />
          </div>
          {this.state.wordsToComplete.length > 0 &&
            <Input onSubmit={this.handleVocabSubmission} />
          }
        </div>
        <div style={{ paddingLeft: '15%' }}>
          {this.state.wordsAlreadyCompleted && this.state.wordsAlreadyCompleted.length < 2 &&
            <div style={{ margin: 'auto', width: '100%', float: 'left' }}>
              <BoxedWord word="Enter the singular and plural, separated by a comma → das Beispiel, die Beispiele" backgroundColor="yellow" opacity=".6" />
            </div>
					}
          {this.props.drillType === 'withoutPrompts' &&
            <BoxedWordContainer style={{ float: 'left', width: '35%' }} boxedWordArray={boxedWordArrayOfRemaingVocab} />
					}
          <BoxedWordContainer style={{ width: '100%', marginRight: '5%' }} boxedWordArray={boxedWordArrayofCompletedVocab} />
        </div>
      </div>
    );
  }
}

const BoxedWord = ({ word, opacity, backgroundColor }) => (<div style={{
  backgroundColor, color: '#121224', opacity, margin: 3, float: 'left', borderRadius: 5, padding: '5px',}}>{word}</div>);
const BoxedWordContainer = ({ boxedWordArray }) => <div style={{ float: 'left', width: '40%' }} >{boxedWordArray}</div>;

DrillContainer.propTypes = {
  vocabList: PropTypes.array.isRequired,
  drillType: PropTypes.oneOf(['withPrompts', 'withoutPrompts']).isRequired,
  handleReturnToMenu: PropTypes.func.isRequired
}
