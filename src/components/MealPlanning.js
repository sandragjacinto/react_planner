import React from 'react';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

//Flow when selecting a day:
//a.map mealplan into buttons
//b.id of buttons will be key of map
//c.onClick of dropdown options will then access mapPlan and fill daily-recipe-list
const DropDownDays = (props) =>
{
    return(
    <div className="dropdown">
      <select onChange={props.onDropDownChange} name="severity" id="dropdownMenuButton" className="form-control">
            {Object.keys(props.mealPlan).map(function(mapKey){
                var day = props.mealPlan[mapKey];
                console.log(`dateString:${day.dateString} key:${day.id}`);
                return (
                    <option value={day.dateString} key={day.id}>{day.dateString}</option>
                );
            })}
      </select>

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
            mealPlan : {}
        };
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
            console.log(`Looping d:${d}, d string:${d.toDateString()}}`);
            mealPlan[d] = {dateString:d.toDateString(),
                            id: new Date(d)
                        };
        }

        this.setState({
            mealPlan : mealPlan 
        });
    }

    onDropDownChange = (e) => {

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

            <DropDownDays
                mealPlan = {this.state.mealPlan}
                onDropDownChange = {this.onDropDownChange}
            />       

        </div>)
    }
}

export default MealPlanning;