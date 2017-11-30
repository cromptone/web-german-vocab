import React from 'react';
import PropTypes from 'prop-types';

export default function BoxedWords(props) {
  const isWithoutPromptsDrill = props.drillType === 'withoutPrompts';
  const boxedWordArrayOfRemaingVocab =  isWithoutPromptsDrill && props.wordsToComplete.map(wordPair => <BoxedWord key={wordPair} word={wordPair[1]} backgroundColor="#a2a2a2" opacity=".4" />);
  const boxedWordArrayofCompletedVocab = props.wordsAlreadyCompleted.map(wordPair => <BoxedWord backgroundColor={props.incorrectWords.includes(wordPair) ? '#ffa2a2' : '#a2a2a2'} key={wordPair} word={`${wordPair[0]} → ${wordPair[1]}`} opacity=".8" />);
  
  return(
  	<div>
      {props.wordsAlreadyCompleted && props.wordsAlreadyCompleted.length < 2 &&
        <div style={{ margin: 'auto', width: '100%', float: 'left' }}>
          <BoxedWord word="Enter the singular and plural, separated by a comma → das Beispiel, die Beispiele" backgroundColor="yellow" opacity=".6" />
        </div>
      }
      {isWithoutPromptsDrill &&
        <BoxedWordContainer style={{ float: 'left', width: '35%' }} boxedWordArray={boxedWordArrayOfRemaingVocab} />
	  }
        <BoxedWordContainer style={{ width: '100%', marginRight: '5%' }} boxedWordArray={boxedWordArrayofCompletedVocab} />
    </div>
  );
};


const BoxedWordContainer = ({ boxedWordArray }) => <div style={{ float: 'left', width: '40%' }} >{boxedWordArray}</div>;
const BoxedWord = ({ word, opacity, backgroundColor }) => (<div style={{
  backgroundColor, color: '#121224', opacity, margin: 3, float: 'left', borderRadius: 5, padding: '5px',}}>{word}</div>);

BoxedWords.propTypes = {
	drillType: PropTypes.string.isRequired,
	wordsAlreadyCompleted: PropTypes.array,
	wordsToComplete: PropTypes.array,
	incorrectWords: PropTypes.array

}