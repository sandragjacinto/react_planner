import React from 'react';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import PlanOneDayClass from './PlanOneDay.js';
import {getFromDatabase, writeDB} from './Database';

//Flow:
//a.componentDidMount loads "mealPlan" and "recipesSelected" from db into state
//b.If nothing on "mealPlan", DateRangePicker is displayed
//c.ButtonsDays updated according to info of state.mealPlan
//d.If user clicks a date button, onClickDayButton will set state.modalPlanOneDayIsShown , which controls popup visibility

const ButtonsDays = ({mealPlan, onClickDayButton})=>
{
    //console.log("ButtonsDays mealPlan:" + mealPlan + " mealPlan keys:" + Object.keys(mealPlan));
    return(
        <div>
            {Object.keys(mealPlan).map(function(mapKey){
                var mealPlanSingleDay = mealPlan[mapKey];
                var isSomethingScheduled = "recipes" in mealPlanSingleDay && mealPlanSingleDay["recipes"].length > 0;
                var colorStyle = isSomethingScheduled ? "blue" : "white";
                var btnStyle = { backgroundColor : `${colorStyle}` };
                return (
                    <button
                        style={btnStyle} 
                        key={mealPlanSingleDay.dateString} 
                        id={mealPlanSingleDay.dateString} 
                        onClick={
                            () => {onClickDayButton(mealPlanSingleDay.dateString);}
                        }>
                        {mealPlanSingleDay.dateString}
                    </button>
                );
            })}
        </div>
    );
}

class MealPlanning extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            showDatePicker : false,
            startDate : null,
            endDate : null,
            focusedInput : null,
            mealPlan : {},
            modalPlanOneDayIsShown : false,
            currentDateToPlan : null
        };
    }

    componentWillMount()
    {
        this.setState (
            {modalPlanOneDayIsShown : false}
        );
    }

    componentDidMount()
    {
        //TODO: this can be done in one call!!!

        console.log("componentDidMount mealplan");
        {
            let dbPath = ["recipesInfo", "recipesSelected"];
            getFromDatabase(dbPath, (response) => {
                this.recipesAvailableForSchedule = response;
            });
        }

        {
            let dbPath = ["mealPlan"];
            getFromDatabase(dbPath, (response) => {
                if(response != undefined && Object.keys(response).length > 0) 
                {
                    this.setState({mealPlan : response});
                }
                else
                {
                    this.setState({showDatePicker : true}); 
                }

            });
        }

    }

    //Callback for DateRangePicker component. Will loop between start/end date. Will fill a map with dates as key, and content will be recipes for the day
    onStartEndDateChange = (props) =>{
        var startDate = props.startDate != null ? props.startDate : this.state.startDate;
        var endDate = props.endDate != null ? props.endDate : this.state.endDate;
        
        this.setState({ 
            startDate : startDate, 
            endDate : endDate
        });

        if(startDate == null || endDate == null)
        {
            return;
        }

        var mealPlan = new Map();
        for(var d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1))
        {
            //console.log(`Looping d:${d}, d string:${d.toDateString()}}`);
            mealPlan[d.toDateString()] = {dateString:d.toDateString(),
                            recipes: []
                        };
        }

        this.setState({
            mealPlan : mealPlan 
        });

        var dbPath = ["mealPlan"];
        writeDB(dbPath, mealPlan);
    }

    onClickDayButton = (date) => {
        this.setState({
            modalPlanOneDayIsShown : true,
            currentDateToPlan : date
        });
    }

    onModalPlanOneDayClose = () => {
            this.setState({
                modalPlanOneDayIsShown : false
            });
    }

    render()
    {
        return(<div>
            <h2>Meal Planning</h2>

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
                mealPlan = {this.state.mealPlan}
                onClickDayButton = {this.onClickDayButton}
            />

            <PlanOneDayClass 
                isShown = {this.state.modalPlanOneDayIsShown}
                onClose = {this.onModalPlanOneDayClose}
                dateToPlan = {this.state.currentDateToPlan}
                recipesAvailableForSchedule = {this.recipesAvailableForSchedule}
                mealPlanSingleDay = {this.state.mealPlan[this.state.currentDateToPlan]}
            />

        </div>)
    }
}

export default MealPlanning;