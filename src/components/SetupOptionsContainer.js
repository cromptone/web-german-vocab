import React from "react";
import SetupOptions from "./SetupOptions";
import Button from "./Button";
import PropTypes from "prop-types";

export default class SetupOptionsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenListId: "",
      chosenDrillId: ""
    };
    this.handleListChoice = this.handleListChoice.bind(this);
    this.handleDrillChoice = this.handleDrillChoice.bind(this);
    this.handleExerciseStart = this.handleExerciseStart.bind(this);
  }

  handleListChoice(e) {
    this.setState({ chosenListId: e.target.id });
  }

  handleDrillChoice(e) {
    this.setState({ chosenDrillId: e.target.id });
  }

  handleExerciseStart() {
    this.props.onOptionsSelected(
      this.state.chosenListId,
      this.state.chosenDrillId
    );
  }

  componentDidMount() {
    window.scroll(0, 0);
  }

  render() {
    return (
      <div style={{ padding: "0 10%" }}>
        <SetupOptions
          chosenId={this.state.chosenListId}
          onChoiceClicked={this.handleListChoice}
          optionPrompt="Choose a vocabulary list:"
          options={this.props.vocabListOptions}
        />
        <SetupOptions
          chosenId={this.state.chosenDrillId}
          onChoiceClicked={this.handleDrillChoice}
          optionPrompt="Choose a drill:"
          options={this.props.drillTypeOptions}
        />
        {this.state.chosenDrillId &&
          this.state.chosenListId && (
            <div style={{ margin: "100 40%", float: "right" }}>
              <Button
                id="startExercise"
                clickHandler={this.handleExerciseStart}
                sizeClass="big"
                text="Let's go!"
                focus={true}
              />
            </div>
          )}
      </div>
    );
  }
}

SetupOptionsContainer.propTypes = {
  drillTypeOptions: PropTypes.array.isRequired,
  vocabListOptions: PropTypes.array.isRequired,
  onOptionsSelected: PropTypes.func.isRequired
};

