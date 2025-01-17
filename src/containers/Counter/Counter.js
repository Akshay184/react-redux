import React, { Component } from 'react';
import { connect } from "react-redux";

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import * as actionCreators from '../../store/actions/actions';

class Counter extends Component {
    state = {
        counter: 0
    }

    counterChangedHandler = ( action, value ) => {
        switch ( action ) {
            case 'inc':
                this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
                break;
            case 'dec':
                this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
                break;
            case 'add':
                this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
                break;
            case 'sub':
                this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
                break;
        }
    }

    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 5" clicked={this.props.onAddCounter}  />
                <CounterControl label="Subtract 5" clicked={this.props.onSubstractCounter}  />
                <hr />
                <button onClick = {this.props.onStoreResult}>Store Result</button>
                <ul>
                    {
                        this.props.storedResults.map((strResult) => (
                            <li key = {strResult.id} onClick = {() => this.props.onDeleteResult(strResult.id)}>{strResult.value}</li>
                        ))
                    }
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ctr: state.counter,
        storedResults: state.results
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIncrementCounter: () => {
            return (
                dispatch(actionCreators.increment())
            )
        },
        onDecrementCounter: () => {
            return (
                dispatch(actionCreators.decrement())
            )
        },
        onAddCounter: () => {
            return (
                dispatch(actionCreators.add(5))
            )
        },
        onSubstractCounter: () => {
            return (
                dispatch(actionCreators.substract(5))
            )
        },
        onStoreResult: () => {
            return (
                dispatch(actionCreators.storeResult())
            )
        },
        onDeleteResult: (id) => dispatch(actionCreators.deleteResult(id))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);