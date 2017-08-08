import React from 'react';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import {PlanOneDay} from './PlanOneDay.js';
import {getFromDatabase} from './Database';

//Flow:
//a.User selects start date
//b.A button will be generated for each day, from start date, covering 2 weeks
//c.Button is green if recipes are already selected for that day. Also will show how many of them are for that day
//d.Clicking on a day button will open a popup, containing favorite recipes, and controls to add or delete recipes for taht day

const ButtonsDays = ({mealPlan, onClickDayButton})=>
{
    return(
        <div>
            {Object.keys(mealPlan).map(function(mapKey){
                var day = mealPlan[mapKey];
                console.log(`dateString:${day.dateString} key:${day.id}`);
                return (
                    <button 
                        key={day.id} 
                        id={day.id} 
                        onClick={
                            () => {onClickDayButton(day.id, 4);}
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
            startDate : null,
            endDate : null,
            focusedInput : null,
            mealPlan : {},
            modalPlanOneDayIsShown : false
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
        getFromDatabase("recipesInfo", "recipesSelected", (response) => {
            this.recipesSelected = response;
            console.log(`MealPlanning database response: ${response}`);
        });
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
            mealPlan[d] = {dateString:d.toDateString(),
                            id: new Date(d)
                        };
        }

        this.setState({
            mealPlan : mealPlan 
        });
    }

    onClickDayButton = (id, test) => {
        //console.log(`onClickDayButton: ${id}, ${test}`);
        this.setState({
            modalPlanOneDayIsShown : true
        });
    }

    onModalPlanOneDayClose = () => {
        //console.log("onModalPlanOneDayClose");
        this.setState({
            modalPlanOneDayIsShown : false
        });
    }

    render()
    {
        return(<div>
            <h2>Meal Planning</h2>

            <DateRangePicker
                startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                onDatesChange={this.onStartEndDateChange} // PropTypes.func.isRequired,
                focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
            />

            <ButtonsDays
                mealPlan = {this.state.mealPlan}
                onClickDayButton = {this.onClickDayButton}
            />

            <PlanOneDay 
                isShown = {this.state.modalPlanOneDayIsShown}
                onClose = {this.onModalPlanOneDayClose}
            />

        </div>)
    }
}

export default MealPlanning;