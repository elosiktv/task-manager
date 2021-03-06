import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { Auth0Provider } from "@auth0/auth0-react";
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme/theme';
import GlobalStyles from './theme/GlobalStyles';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import ApolloProviderWithAuth0 from './utils/ApolloProviderWithAuth0';
import SocketContextProvider from './utils/SocketContextProvider';

ReactDOM.render(
	<React.StrictMode>
		<Auth0Provider
			domain={process.env.REACT_APP_DOMAIN!}
			clientId={process.env.REACT_APP_CLIENT_ID!}
			redirectUri={window.location.origin}
			audience={process.env.REACT_APP_AUDIENCE}
			useRefreshTokens
			cacheLocation="localstorage"
		>
			<SocketContextProvider>
				<ApolloProviderWithAuth0>
					<Provider store={store}>
						<ThemeProvider theme={theme}>
							<GlobalStyles />
							<HashRouter>
								<DndProvider backend={HTML5Backend}>
									<App />
								</DndProvider>
							</HashRouter>
						</ThemeProvider>
					</Provider>
				</ApolloProviderWithAuth0>
			</SocketContextProvider>
		</Auth0Provider>
  	</React.StrictMode>,
  	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
