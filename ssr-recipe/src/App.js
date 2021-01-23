import React from 'react';
import { Route } from 'react-router-dom';
import Menu from './components/Menu';
import RedPage from './components/Red';
import BluePage from './components/Blue';

const App = () => {
    return (
        <div>
            <Menu />
            <hr />
            <Route path="/red" component={RedPage} />
            <Route path="/blue" component={BluePage} />
        </div>
    );
};

export default App;
