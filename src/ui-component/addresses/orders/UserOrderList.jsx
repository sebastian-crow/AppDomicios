import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { push } from "redux-first-history";


// Reducers
import {
    getAllOrderAction,
    deleteOrderAction,
    getFromUserPositionAction
} from "../../../store/storeAddresses/store/reducer";


// api
import { api } from "../../../store/storeAddresses/store/middleware/api";


// Reverse counter: Time remaining
export function ReverseCounter() {
    const [counter, setCounter] = React.useState(180000);


    React.useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter]);

    return (

        <div>{counter}</div>
    );
}



// User Order List component
const UserOrderList = () => {

    const [orders, setOrders] = React.useState([])

   
    const dispatch = useDispatch();
    const ordenes = useSelector((state) => state.ui.orders);
    console.log(orders)
    const user = useSelector((state) => state.login.usuario.user)

    const userOrders = ordenes.map((order) => order.domiciliario.id === user._id ? order : '')

    React.useEffect(() => {
        setOrders(orders, userOrders)
    }, [orders])
    console.log(userOrders)

    const id = user.id
    // Fetch the user id and compare with products for to kwnow if this user are properaty of these products

    // Update list
    React.useEffect(() => {
        dispatch(getAllOrderAction());
    }, [dispatch]);



    const viewMap = (id) => {
        dispatch(getFromUserPositionAction(id));
        dispatch(push(`/mapuser/${id}`));
    }

    const handleDelete = (event) => {
        event.preventDefault()
        const data = {}
        dispatch(deleteOrderAction(data))
        dispatch(push("/orderlist"))
    }




    return (
        <>
            <div className="orderContent">
                {user.rol === 'cliente' && (
                    <>
                        
                        
                                <div className="contentMap">

                                </div>
                                <div className="contentMapInfo">


                                </div>
                                <div className="orderInfo">
                                    <div className="headerOrderInfo">
                                        <h1 className="nameOrderHeader">sds</h1>
                                        <h1 className="timestamp">Pedido hace: 10 min</h1>
                                        <h1 className="timer">00:30:00 hrs</h1>
                                        {/* <h1>Orden Date</h1>
                                            <h1>Counter</h1>
                                            */}
                                    </div>
                                    <ReverseCounter />
                                </div>
                        
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                        <br /><br /><br /><br /><br /><br />
                    </>
                )}

            </div>
            <style jsx>{`

            @import url('https://fonts.googleapis.com/css2?family=Ruluko&display=swap');

                .contentMap {
                    position: absolute;
                    width: 429px;
                    height: 428px;
                    left: 16rem;
                    top: 8rem;

                    border: 2px solid #000000;
                    box-sizing: border-box;
                    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
                    border-radius: 12px;
                }

                .contentMapInfo {
                    position: absolute;
                    width: 429px;
                    height: 350px;
                    top: 36rem;
                    left: 16rem;
                
                    border-radius: 12px;
                    border: 2px solid black;

                }

                .orderInfo {
                    position: relative;
                    width: 750px;
                    height: 140px;
                    left: 55rem;
                    top: 5rem;

                    background: #F6F9FA;
                    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                    border-radius: 10px;
                }
                
                .headerOrderInfo {                
                    position: relative;
                    width: 750px;
                    height: 45px;
                    left: 0rem;
                    top: 0.1rem;

                    background: #F6F9FA;
                    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                    border-radius: 8px;
                }

                .nameOrderHeader {
                    position: absolute;
                    width: 175px;
                    height: 20px;
                    left: 1rem;
                    top: 0.5rem;

                    font-family: 'Ruluko', sans-serif;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 24px;
                    line-height: 28px;

                    color: #5E5252;
                }

                .timestamp {
                    position: absolute;
                    width: 588px;
                    height: 23px;
                    left: 36rem;
                    top: 0.5rem;

                    font-family: Ruluko;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 20px;
                    line-height: 23px;
                    
                    color: #616161;
                }

                .timer {
                    position: absolute;
                    width: 426px;
                    height: 42px;
                    left: 14rem;
                    top: 4.5rem;

                    font-family: Ruluko;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 38px;
                    line-height: 42px;


                    letter-spacing: 0.295em;

                    color: #616161;
                }
            `}</style>
        </>
    )
}



export default UserOrderList