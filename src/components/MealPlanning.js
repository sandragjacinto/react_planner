import React from 'react';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

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

    //Callback for DateRangePicker. TODO: can called also once component is loaded, getting start/end date from backend, if already setted
    onStartEndDateChange = (props) =>{
        var startDate = props.startDate != null ? props.startDate : this.state.startDate;
        var endDate = props.endDate != null ? props.endDate : this.state.endDate;
        console.log(`startDate:${startDate} endDate:${startDate}`);
        
        this.setState({ 
            startDate : startDate, 
            endDate : endDate
        });

        if(startDate == null || endDate == null)
        {
            return;
        }

        //Looping between dates
        var mealPlan = new Map();
        for(var d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1))
        {
            console.log(`Looping d:${d}, d string:${d.toDateString()}`);
            mealPlan[d] = {dateString:d.toDateString()};
        }

        this.setState({
            mealPlan : mealPlan 
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

        </div>)
    }
}

export default MealPlanning;