import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios-order'
import Spinner from '../../../components/UI/Modal/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
class contactData extends Component{
    state={
        orderForm:{
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your name'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            zipCode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'ZIP Code'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:5,
                    maxLength:5
                },
                valid:false,
                touched:false
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Country'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your Mail'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                  options:[
                    {value:'fastest',displayValue:'Fastest'},
                    {value:'cheapest',displayValue:'Cheapest'}
                  ]
                },
                validation:{},
                value:'fastest',
                touched:false,
                valid:true
            }
        },
        formIsvalid:false,
        loading:false
    }

    orderHandler=(event)=>{
        event.preventDefault();
        this.setState({loading:true});
        const formData={};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier]=this.state.orderForm[formElementIdentifier].value
        }
        const order={
            ingredients:this.props.ingredients,
            price: this.props.price,
            orderData:formData
        }
        axios.post("/orders.json",order)
            .then(response=>{
                console.log(response)
                this.setState({loading:false});
                this.props.history.push('/')
            })
            .catch(err=>{
                this.setState({error:true,loading:false});
            })
    }

    checkvalidity(value,rules){
        let isValid=true;
        if (!rules) {
            return true
        }
        if (rules.required) {
            isValid=value.trim()!=='' && isValid
        }
        if (rules.minLength) {
            isValid=value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid=value.length <=rules.maxLength && isValid;
        }
        return isValid;
    }

    inputChnagedHandler=(event,inputIdentifier)=>{
       
        //Here we are using couple of const variables for 
        //copying and changing the value of state because
        //spread(...) operator or Object.assign() can only make
        // shallow copies of objects. This means that the deeply 
        //nested values inside the copied object are put there 
        //just as a reference to the source object.
        // If we modify a deeply nested value of the copied object, 
        //we will therefore end up modifying the value in the source object.
        const updatedOrderForm={
            ...this.state.orderForm
        };
        const updatedFormElement={
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value=event.target.value;
        updatedFormElement.valid=this.checkvalidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched=true;
        updatedOrderForm[inputIdentifier]=updatedFormElement;
        let formIsvalid=true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsvalid=updatedOrderForm[inputIdentifier].valid && formIsvalid; 
        }
        this.setState({orderForm:updatedOrderForm,formIsvalid:formIsvalid});
    }

    render(){
        const formElementArray=[];
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }
        let form=(
            <form onSubmit={this.orderHandler}>
                {formElementArray.map(formElement=>(
                    <Input key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event)=>this.inputChnagedHandler(event,formElement.id)}
                    />
                ))}
            <Button btnType="Success" disabled={!this.state.formIsvalid}>ORDER</Button>
        </form>
        );
        if (this.state.loading) {
            form=<Spinner/>
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default contactData;