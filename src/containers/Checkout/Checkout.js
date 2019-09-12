import React,{Component} from 'react'
import {Route} from 'react-router-dom'
import ContactData from './ContactData/ContactData'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
class Checkout extends Component{
    constructor(props){
        super(props)
    }
    state={
        ingredients:null,
        totalPrice:0
    }

    componentWillMount(){
        const query=new URLSearchParams(this.props.history.location.search);
        const ingredients={};
        let price =0;
        for (let param of query.entries()) {
            //query.entries() will give result in {['salad','1'],['bacon','2']}
            if (param[0]!=='price') {
                ingredients[param[0]]= +param[1]; //Adding pluse meaning converting into number
            }
            else{
                price=param[1];
            }
            
        }
        this.setState({ingredients:ingredients,totalPrice:price})
    }

    checkoutCancelledHandler=()=>{
        this.props.history.goBack();

    }
    checkoutContinuedHandler=()=>{
      this.props.history.replace('checkout/contact-data')
    }
    
    render(){
        return(
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
                {/* <Route 
                    path={this.props.match.url+'/contact-data'} 
                    component={ContactData}/> */}
                    {/* 
                        There is two way to get routing related props in ContactData From.
                        1. used withRouter HOC of react-router-dom 
                        2. pass the props in render of Route. Here props will be routes prop like history location etc 
                           and pass that props to the ContactData Component using spread operator
                    */}
                      <Route 
                        path={this.props.match.url+'/contact-data'} 
                        render={(props)=><ContactData 
                                ingredients={this.state.ingredients} 
                                price={this.state.totalPrice} {...props}/>}
                        />
            </div>
        )
    }
}

export default Checkout;