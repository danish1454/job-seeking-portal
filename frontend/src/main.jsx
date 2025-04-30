import { createContext, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

export const Context = createContext({ isAuthorised: false})

const AppWrapper = ()=>{
  const [isAuthorised, setIsAuthorised] = useState(false)
  const [user, setuser] = useState({})

  return (
     <Context.Provider value={{isAuthorised, setIsAuthorised, user, setuser}}>
      <App />
     </Context.Provider>
  )

}

ReactDOM.createRoot(document.getElementById('root')).render(
  <AppWrapper />
)
