import React,{Component} from 'react'
import Aux from '../Aux'
import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler=(WrappedComponent,axios)=>{
    return class extends Component{
        constructor(){
            super();
            this.state={
                error:null
            }
            this.reqInterceptor=axios.interceptors.request.use(req=>{
                this.setState({error:null});
                return req;
            });
            this.resInterceptor= axios.interceptors.response.use(res=>res,error=>{
                this.setState({error:error});
            })
        }
       
        //In the future this react component life cycle mathod will be deprecate
        // componentWillMount(){
        //     this.reqInterceptor=axios.interceptors.request.use(req=>{
        //         this.setState({error:null});
        //         return req;
        //     });
        //      this.resInterceptor=axios.interceptors.response.use(res=>res,error=>{
        //         this.setState({error:error});
        //     })
        // }

        componentWillUnmount(){
            console.log('With Error Handler WillUnMount called',this.reqInterceptor,this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfiredhandler=()=>{
            this.setState({error:null})
        }

        render(){
            return (
                <Aux>
                    <Modal show={this.state.error} modalClicked={this.errorConfiredhandler}>
                        {this.state.error?this.state.error.message:null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            )
        }
    }
   
}

export default withErrorHandler;