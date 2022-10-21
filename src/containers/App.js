import React, {Component} from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

import { requestRobots, setSearchField } from '../actions';

const mapStateToProps = state => {
    // console.log(state);
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error,
    };
}

const mapDispatchToProps = (dispatch) => {
    // console.log(dispatch);
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        // onRequestRobots: () => requestRobots(dispatch), // it's the same as () => dispatch(requestRobots());
        onRequestRobots: () => dispatch(requestRobots()),
    };
}

class App extends Component {
// not needed anymore, because all the 'state' is in reducers.js file now
/*     constructor() {
        super();
        this.state = {
            robots: [],
            searchfield: '',
        }
    }
 */
    componentDidMount() {
        this.props.onRequestRobots();
    }

// not needed anymore
/*     componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({ robots: users }));
    }
 */

// not needed anymore
/*     onSearchChange = (event) => {
        this.setState({searchfield: event.target.value})
    }
 */

    render() {
        // const { robots, searchfield } = this.state; // not needed anymore
        const { searchField, onSearchChange, robots, isPending } = this.props;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        });
        // return !robots.length ? // not needed anymore
        return isPending ?
            <h1 className="tc">Loading</h1> :
            (
                <div className="tc">
                    <h1 className="f1">RoboFriends</h1>
                    <SearchBox searchChange={onSearchChange} />
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={filteredRobots} />
                        </ErrorBoundry>
                    </Scroll>
                </div>
            );
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
// console.log(connect)
