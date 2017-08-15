import React from 'react';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import {PlanOneDay} from './PlanOneDay.js';
import {getFromDatabase, writeDB} from './Database';

//Flow:
//a.User selects start date
//b.A button will be generated for each day, from start date, covering 2 weeks
//c.Button is green if recipes are already selected for that day. Also will show how many of them are for that day
//d.Clicking on a day button will open a popup, containing favorite recipes, and controls to add or delete recipes for taht day

const ButtonsDays = ({mealPlan, onClickDayButton})=>
{
    console.log("ButtonsDays mealPlan:" + mealPlan + " mealPlan keys:" + Object.keys(mealPlan));
    return(
        <div>
            {Object.keys(mealPlan).map(function(mapKey){
                var day = mealPlan[mapKey];
                console.log(`dateString:${day.dateString}`);
                return (
                    <button 
                        key={day.dateString} 
                        id={day.dateString} 
                        onClick={
                            () => {onClickDayButton(day.dateString);}
                        }>
                        {day.dateString}
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
                    console.log("mealPlan response:" + response);
                    this.setState({mealPlan : response});
                }
                else
                {
                    console.log("mealPlan response: undefined or empty:" + response);
                    this.setState({showDatePicker : true}); 
                }

            });
        }

    }

    //Callback for DateRangePicker component. Will loop between start/end date. Will fill a map with dates as key, and content will be recipes for the day
    //TODO: can called also once component is loaded, getting start/end date from backend, if already setted
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

            <PlanOneDay 
                isShown = {this.state.modalPlanOneDayIsShown}
                onClose = {this.onModalPlanOneDayClose}
                dateToPlan = {this.state.currentDateToPlan}
                recipesAvailableForSchedule = {this.recipesAvailableForSchedule}
            />

        </div>)
    }
}

export default MealPlanning;