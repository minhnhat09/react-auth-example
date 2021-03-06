import React from "react";
import * as serviceWorker from "./serviceWorker";
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './_helpers';
import { App } from './App';
import "tabler-react/dist/Tabler.css";

// setup fake backend
import { configureFakeBackend } from './_helpers';

configureFakeBackend();

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();