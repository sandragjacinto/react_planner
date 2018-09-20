import React from 'react';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import PlanOneDayClass from './PlanOneDay.js';
import { getFromDatabase, writeDB } from './Database';
import DialogMessage from './DialogMessage';

//Flow:
//a.componentDidMount loads "mealPlan" and "recipesSelected" from db into state
//b.If nothing on "mealPlan", DateRangePicker is displayed
//c.ButtonsDays updated according to info of state.mealPlan
//d.If user clicks a date button, onClickDayButton will set state.modalPlanOneDayIsShown , which controls popup visibility

const ButtonsDays = ({ mealPlan, onClickDayButton }) => {
    var mealPlanDates = Object.keys(mealPlan);
    // var today = new Date();
    // var isOldSchedule = today > mealPlanDates[mealPlanDates.length - 1];
    // if( mealPlanDates.length > 0 && isOldSchedule)
    // {
    //TODO - reset schedule if it's already passed
    // }

    return (
        <div>
            {mealPlanDates.map(function (date) {
                var mealPlanSingleDay = mealPlan[date];
                var isSomethingScheduled = "recipes" in mealPlanSingleDay && mealPlanSingleDay["recipes"].length > 0;
                var colorStyle = isSomethingScheduled ? "btn btn-warning planning-btn" : "btn btn-primary planning-btn";
                var classN = `${colorStyle}`
                return (
                    <div className='col-md-2 no-padding'>
                    <button
                        className={classN}
                        key={date}
                        id={date}
                        onClick={
                            () => { onClickDayButton(date); }
                        }>
                        {mealPlanSingleDay.dateString}
                    </button>
                    </div>
                );
            })}
        </div>
    );
}

class MealPlanning extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showDatePicker: false,
            startDate: null,
            endDate: null,
            focusedInput: null,
            mealPlan: {},
            modalPlanOneDayIsShown: false,
            currentDateToPlan: null,
            messagePopupIsShown: false,
            messagePopupContent: "",
            messagePopupStyle: {},
            contentCanBeDisplayed: false
        };
    }

    componentWillMount() {
        this.setState(
            { modalPlanOneDayIsShown: false }
        );
    }

    componentDidMount() {
        //TODO: this can be done in one call!!!
        {
            let dbPath = ["recipesInfo", "recipesSelected"];
            getFromDatabase(dbPath, (response) => {
                if (response) {
                    this.recipesAvailableForSchedule = response;
                    this.messagePopupIsShown = false;
                    this.messagePopupContent = "";
                    this.contentCanBeDisplayed = true;
                }
                else {
                    this.messagePopupIsShown = true;
                    this.messagePopupContent = "First select favorite recipes";
                    this.contentCanBeDisplayed = false;
                }
            });
        }

        {
            let dbPath = ["mealPlan"];
            getFromDatabase(dbPath, (response) => {
                if (response !== undefined && Object.keys(response).length > 0) {
                    this.setState({ mealPlan: response });
                }
                else {
                    this.setState({ showDatePicker: true });
                }

            });
        }

    }

    //Callback for DateRangePicker component. Will loop between start/end date. Will fill a map with dates as key, and content will be recipes for the day
    onStartEndDateChange = (props) => {
        var startDate = props.startDate !== null ? props.startDate : this.state.startDate;
        var endDate = props.endDate !== null ? props.endDate : this.state.endDate;

        this.setState({
            startDate: startDate,
            endDate: endDate
        });

        if (startDate == null || endDate == null) {
            return;
        }

        var mealPlan = new Map();
        for (var d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
            mealPlan[Number(d)] = {
                dateString: d.toDateString(),
                recipes: []
            };
        }

        this.setState({
            mealPlan: mealPlan
        });

        var dbPath = ["mealPlan"];
        writeDB(dbPath, mealPlan);
    }

    onClickDayButton = (date) => {
        this.setState({
            modalPlanOneDayIsShown: true,
            currentDateToPlan: date
        });
    }

    onModalPlanOneDayClose = () => {
        this.setState({
            modalPlanOneDayIsShown: false
        });
    }

    render() {
        return (
            <div className='firstElement backgroundTest'>
                <div className='row'>
                <div className='col-md-10 col-md-offset-1 col-xs-10 col-xs-offset-1 whiteBackground'>
                <h1 className='titleH1'>MEAL PLANNING</h1>
                <div className='row boddyText'>
                    {
                        this.state.showDatePicker ?
                            <DateRangePicker
                                startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                                endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                                onDatesChange={this.onStartEndDateChange} // PropTypes.func.isRequired,
                                focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                                onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                            />
                            :
                            null
                    }

                    <ButtonsDays
                        mealPlan={this.state.mealPlan}
                        onClickDayButton={this.onClickDayButton}
                    />

                    <PlanOneDayClass
                        isShown={this.state.modalPlanOneDayIsShown}
                        onClose={this.onModalPlanOneDayClose}
                        dateToPlan={this.state.currentDateToPlan}
                        recipesAvailableForSchedule={this.recipesAvailableForSchedule}
                        mealPlanSingleDay={this.state.mealPlan[this.state.currentDateToPlan]}
                    />

                    <DialogMessage
                        isShown={this.state.messagePopupIsShown}
                        content={this.state.messagePopupContent}
                        style={this.state.messagePopupStyle}
                    />
                </div>
                </div>
                </div>
                
            </div>)
    }
}

export default MealPlanning;