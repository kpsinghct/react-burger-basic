import React, {Component} from "react";
import Aux from "../../hoc/Aux"
import Burger from "../../components/Burger/Burger"
import BurgerControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"
import axios from '../../axios-order'
import Spinner from '../../components/UI/Modal/Spinner/Spinner'
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'

const INGREDIENTS_PRICE={
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
}
class BurgerBuilder extends Component{
    state={
        ingredients:null,
        totalPrice:4,
        purchasable:false,
        purchasing:false,
        loading:false,
        error:false
    }
    // state.ingredients={
    //     salad:0,
    //     bacon:0,
    //     cheese:0,
    //     meat:0
    // }
    componentDidMount(){
        console.log(this.props);
        axios.get('/ingredients.json').then(response=>{
            this.setState({ingredients:response && response.data?response.data:null});
        }).catch(error=>{
            this.setState({error:true});
        })
    }

    updatePurchasable(ingredients){
        const sum= Object.keys(ingredients)
            .map(igKey=>{
                return ingredients[igKey]
            })
            .reduce((sum,ele)=>{
                console.log('reduce ele',ele);
                return sum + ele;
            },0);
            console.log('sum',sum);
          this.setState({purchasable:sum>0})
    }

    updateCounts=(type,status)=>{
        const oldCount=this.state.ingredients[type];
        let updatedCount=0;
        let newPrice=0;
        const oldPrice=this.state.totalPrice
        if (status=="Add") {
            updatedCount=oldCount + 1;
            newPrice=oldPrice+INGREDIENTS_PRICE[type]
            
        } else {
            if (oldCount <= 0) {
              return;
            }
            updatedCount=oldCount-1;
            newPrice=oldPrice-INGREDIENTS_PRICE[type];
        }
        const updatedIngredients={...this.state.ingredients};
        updatedIngredients[type]=updatedCount;
        this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
        this.updatePurchasable(updatedIngredients);
    }
    addIngredientHandler=(type)=>{
        this.updateCounts(type,"Add")
    }
    removeIngredientHandler=(type)=>{
        this.updateCounts(type,"Subtract")
    }
    puchaseHandler=()=>{
        this.setState({purchasing:true})
    }
    purchaseCancelHandler=()=>{
        this.setState({purchasing:false})
    }
    purchaseContinueHandler=()=>{
        //alert("You continue!")
        const queryParams=[];
        for (const i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price='+this.state.totalPrice);
        const queryString =queryParams.join('&');
        this.props.history.push({
            pathname:'/checkout',
            search:'?'+ queryString
        });
    }
    render(){
        const disabledInfo={...this.state.ingredients};
        Object.keys(disabledInfo).map(key=>{
            disabledInfo[key]=disabledInfo[key]<= 0;
        });
        let orderSummary= null
        if (this.state.loading) {
            orderSummary=<Spinner/>
        }
        let burger=this.state.error?<p>ingredients can't be loaded!</p>:<Spinner/>
        if(this.state.ingredients){
            burger=(
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BurgerControls 
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disbaled={disabledInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.puchaseHandler}
                        price={this.state.totalPrice}
                    /> 
                </Aux>
            );
            orderSummary=<OrderSummary 
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                puchaseContinued={this.purchaseContinueHandler}
            />
        }
        
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClicked={this.purchaseCancelHandler}>
                   {orderSummary}
                </Modal>
                {burger}
      
            </Aux>
        
        )
    }
}

export default WithErrorHandler(BurgerBuilder,axios);