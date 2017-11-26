import React from 'react';
import SetupOptionsContainer from './SetupOptionsContainer';
import DrillContainer from './DrillContainer';
import { animals } from '../assets/germanAnimals';
import { domestic } from '../assets/germanDomesticItems';
import { food } from '../assets/germanFood';
import { geography } from '../assets/germanGeography';
import { music } from '../assets/germanMusic';
import { plants } from '../assets/germanPlants';
import { body } from '../assets/germanBodyParts'
import { health } from '../assets/germanHealth';
import { abstract } from '../assets/germanAbstractions';
import { errands } from '../assets/germanErrands';
import { beach } from '../assets/germanBeach';
import { natural } from '../assets/germanNaturalScience';
import { people } from '../assets/germanPeople';
import { hiking } from '../assets/germanHiking';
import { outside } from '../assets/germanOutside';
import { transportation } from '../assets/germanTransportation';
import { toolbox } from '../assets/germanToolbox';
import { clothing } from '../assets/germanClothing';
import { astronomy } from '../assets/germanAstronomy';
import { bathroom } from '../assets/germanBathroom';
import { literature } from '../assets/germanLiterature';
import { mathScience } from '../assets/germanMathScience';
import { school } from '../assets/germanSchool';
import { time } from '../assets/germanTime';
import { sport } from '../assets/germanSport';
import { farmIndustry } from '../assets/germanIndustry';
import { color } from '../assets/germanColor';
import { grabbag } from '../assets/germanGrabbag';


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

  componentWillMount() {

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
    var rawVocabList=rawVocabListById[vocabListId];
    return rawVocabList.split('\n').map(word => word.split('\t'));
  } 
} 

const vocabListOptions = [
  {  text: 'Animal names', id: 'germanAnimals' },
  {  text: 'Domestic items', id: 'germanDomesticItems' },
  {  text: 'Food and cooking', id: 'germanFood' },
  {  text: 'Geography terms', id: 'germanGeography' },
  {  text: 'Music and instruments', id: 'germanMusic' },
  {  text: 'Plants and farming', id: 'germanPlants' },
  {  text: 'The human body', id: 'germanBodyParts' },
  {  text: 'Health', id: 'germanHealth' },
  {  text: 'Various abstractions', id: 'germanAbstractions' },
  {  text: 'Running errands', id: 'germanErrands' },
  {  text: 'At the beach', id: 'germanBeach' },
  {  text: 'Natural science', id: 'germanNaturalScience' },
  {  text: 'People and family', id: 'germanPeople' },
  {  text: 'Hiking trip', id: 'germanHiking' },
  {  text: 'Around town', id: 'germanOutside' },
  {  text: 'Transportation', id: 'germanTransportation' },
  {  text: 'In the toolbox', id: 'germanToolbox' },
  {  text: 'Clothing', id: 'germanClothing'},
  {  text: 'Astronomy', id: 'germanAstronomy'},
  {  text: 'Bathroom items', id: 'germanBathroom'},
  {  text: 'Language and literature', id: 'germanLiterature'},
  {  text: 'Math and science', id: 'germanMathScience'},
  {  text: 'Back to school', id: 'germanSchool'},
  {  text: 'Date and time', id: 'germanTime'},
  {  text: 'Sport and sports', id: 'germanSport'},
  {  text: 'Farming and industry', id: 'germanIndustry'},
  {  text: 'Colors', id: 'germanColor'},
  {  text: 'Grab-bag!', id: 'germanGrabbag' },
 ];

const rawVocabListById = {
  'germanAnimals':  animals,
  'germanDomesticItems': domestic,
  'germanFood': food,
  'germanGeography' : geography,
  'germanMusic' : music,
  'germanPlants' : plants,
  'germanBodyParts' : body,
  'germanHealth' : health,
  'germanAbstractions' : abstract,
  'germanErrands' : errands,
  'germanBeach' : beach,
  'germanNaturalScience': natural,
  'germanPeople' : people,
  'germanHiking' : hiking,
  'germanOutside' : outside,
  'germanTransportation' : transportation,
  'germanToolbox' : toolbox, 
  'germanClothing': clothing,
  'germanAstronomy': astronomy,
  'germanBathroom': bathroom,
  'germanLiterature': literature,
  'germanMathScience': mathScience,
  'germanSchool': school,
  'germanTime': time,
  'germanSport': sport,
  'germanIndustry': farmIndustry,
  'germanColor': color,
  'germanGrabbag': grabbag,
 }

const drillTypeOptions = [
  { listKey: 'withoutPrompt', text: 'With word cloud', id: 'withoutPrompts' },
  { listKey: 'withPrompts', text: 'With prompts', id: 'withPrompts' },
];
