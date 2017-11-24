import React from 'react';
import SetupOptionsContainer from './SetupOptionsContainer';
import DrillContainer from './DrillContainer';
import { animals } from '../assets/germanAnimals';
import { domestic } from '../assets/germanDomesticItems';
import { food } from '../assets/germanFood';
import { geography } from '../assets/germanGeography';
import { music } from '../assets/germanMusic';
import { plants } from '../assets/germanPlants';

export default class DrillAndOptionsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showOptions: true,
      showDrills: false,
      vocabListArray: [],
      chosenDrill: '',
    };
    this.handleReturnToMenu = this.handleReturnToMenu.bind(this);
    this.handleOptionsSelected = this.handleOptionsSelected.bind(this);
  }

  handleOptionsSelected(chosenDrillId, chosenVocabListId) {
    const chosenVocabList = this.getVocabListById(chosenVocabListId);
    console.log();
    this.setState({
      showOptions: false,
      showDrills: true,
      vocabListArray: chosenVocabList,
      chosenDrill: chosenDrillId,
    });
  }

  handleReturnToMenu() {
    this.setState({
      showOptions: true,
      showDrills: false,
    });
  }

  render() {
    return (
      <div>
        {this.state.showOptions && (
        <SetupOptionsContainer
          vocabListOptions={vocabListOptions}
          drillTypeOptions={drillTypeOptions}
          onOptionsSelected={this.handleOptionsSelected}
        />
				)}
        {this.state.showDrills && (
        <DrillContainer
          handleReturnToMenu={this.handleReturnToMenu}
          vocabList={this.state.vocabListArray}
          drillType={this.state.chosenDrill}
        />
				)}
      </div>
    );
  }

  getVocabListById(vocabListId) {
    var vocabList=[];
    switch (vocabListId) {
      case 'germanAnimals':
        vocabList = animals;
        break;
      case 'germanDomesticItems':
        vocabList = domestic;
        break;   
      case 'germanGeography':
        vocabList = geography;
        break;   
      case 'germanFood':
        vocabList = food;
        break;      
      case 'germanMusic':
        vocabList = music;
        break;      
      case 'germanPlants':
        vocabList = plants;
        break;
    }
    return vocabList.split('\n').map(word => word.split('\t'));
  }
}

const vocabListOptions = [
  { listKey: 'germanAnimals', text: 'Animal names', id: 'germanAnimals' },
  { listKey: 'germanDomesticItems', text: 'Domestic items', id: 'germanDomesticItems' },
  { listKey: 'germanFood', text: 'Food and cooking', id: 'germanFood' },
  { listKey: 'germanGeography', text: 'Geography terms', id: 'germanGeography' },
  { listKey: 'germanMusic', text: 'Music and instruments', id: 'germanMusic' },
  { listKey: 'germanPlants', text: 'Plants and farming', id: 'germanPlants' },
];

const drillTypeOptions = [
  { listKey: 'withoutPrompt', text: 'With word cloud', id: 'withoutPrompts' },
  { listKey: 'withPrompts', text: 'With prompts', id: 'withPrompts' },
];
