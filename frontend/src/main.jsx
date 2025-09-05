import { createRoot } from 'react-dom/client'
import './index.css'
import Main from './Context/Main'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'

import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <GoogleOAuthProvider clientId="685305050676-e0e7t582ol42mv7rdth98ejbrklq7tgt.apps.googleusercontent.com">
      <Main>
        <App />
      </Main>
    </GoogleOAuthProvider>
  </Provider >,
)
