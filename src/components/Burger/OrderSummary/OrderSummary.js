import React,{Component} from "react"
import Aux from "../../../hoc/Aux"
import Button from "../../UI/Button/Button"
class OrderSummary extends Component{
    //This must be functional component. This is class based component because I want to debuge things.
    //I also added functional based component code after export.
    componentWillUpdate(){
        console.log("Order Summery will update bc!");
    }
    render(){
        const ingredientSummary=Object.keys(this.props.ingredients)
            .map(igKey=>{
                return (
                <li key={igKey}>
                    <span style={{textTransform:'capitalize'}}>
                        {igKey}:{this.props.ingredients[igKey]}
                    </span> 
                </li>)
            });
        return(
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burder with following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price:{this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout? </p>
                <Button clicked={this.props.purchaseCancelled} btnType="Danger">CANCEL</Button>
                <Button clicked={this.props.puchaseContinued} btnType="Success">CONTINUE</Button>
            </Aux>
        )
    }
}


export default OrderSummary;



// import React from "react"
// import Aux from "../../../hoc/Aux"
// import Button from "../../UI/Button/Button"
// const orderSummary=(props)=>{
//     const ingredientSummary=Object.keys(props.ingredients)
//         .map(igKey=>{
//             return (
//             <li key={igKey}>
//                 <span style={{textTransform:'capitalize'}}>
//                     {igKey}:{props.ingredients[igKey]}
//                 </span> 
//             </li>)
//         });
//     return(
//         <Aux>
//             <h3>Your Order</h3>
//             <p>A delicious burder with following ingredients:</p>
//             <ul>
//                 {ingredientSummary}
//             </ul>
//             <p><strong>Total Price:{props.price.toFixed(2)}</strong></p>
//             <p>Continue to Checkout? </p>
//             <Button clicked={props.purchaseCancelled} btnType="Danger">CANCEL</Button>
//             <Button clicked={props.puchaseContinued} btnType="Success">CONTINUE</Button>
//         </Aux>
//     )
// }

// export default orderSummary;