import React from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';
import hp1 from './../icons/hp1.jpg';
import hp2 from './../icons/hp2.jpg';
import hp3 from './../icons/hp3.jpg';
import hp4 from './../icons/hp4.jpg';




class HomePage extends React.Component  {
   

    render()
    {
        return  (
            <div>
    
                <Login />
  
                <div className='row' style={{height:'40%'}}>
                    <br></br><br></br>
                    <div className='col-md-5 col-md-offset-1 col-xs-10 col-xs-offset-2 menuImgLeft'>
                        <Link to={'/choosemymeal'}  className='homepageButton homepageButton1' style={{textAlign:'center'}}>
                            <br></br>
                        <img className='img-circle hp' alt='hp1' src={hp1} style={{height:'200',width:"200"}}/>
                        </Link>
                    </div>
                    <div className='col-md-3 col-md-offset-1 col-xs-10 col-xs-offset-2 menuImgRight'>
                        <Link to={'/grocerylist'} className='homepageButton homepageButton2' >
                             <br></br>
                        <img className='img-circle hp' alt='hp1' src={hp2} style={{height:'200',width:"200"}}/>

                        </Link>
                    </div>
                </div>
                <div className='row' style={{height:'40%'}}>
                    <div className='col-md-5 col-md-offset-1 col-xs-10 col-xs-offset-2 menuImgLeft'>
                        <Link to={'/mealplanning'} className='homepageButton homepageButton3' >
                             <br></br>
                        <img className='img-circle hp' alt='hp1' src={hp3} style={{height:'200',width:"200"}}/>

                        </Link>
                    </div>
                    <div className='col-md-3 col-md-offset-1 col-xs-10 col-xs-offset-2 menuImgRight'>
                         <Link to={'/cookmymeal'} className='homepageButton homepageButton4' >
                              <br></br>
                        <img className='img-circle hp' alt='hp1' src={hp4} style={{height:'200',width:"200"}}/>

                        </Link>
                    </div>
                </div>
            </div>   

                
        )
    }
} 

export default HomePage;