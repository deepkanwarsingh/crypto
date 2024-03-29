import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'


function App() {
  const [search, setSearch] = useState("")
  const [currency,setCurrency]=useState([])

  useEffect(()=>{
    axios.get('https://openapiv1.coinstats.app/coins',{
      headers: {
       'X-API-KEY': 'UqHkJSE3NYoYJgheI/j7T3hfTyWs46KbPnYMt806jbY='
      }
    }).then(res=>setCurrency(res.data.result))
    .catch(err=>console.log(err))
  },[])

  return (
   <div className='App'>
    <h2>Crypto</h2>
    <input type="text" placeholder='search' onChange={(e)=> setSearch(e.target.value)} />
       <table>
      <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>symbol</th>
            <th>market value</th>
            <th>price</th>
            <th>supply</th>
            <th>volume</th>
          </tr>
          </thead>

          <tbody>
            {currency.filter((val)=>{
              return val.name.includes(search)
            }).map((val)=>{
              return <tr>
                <td className='rank'>{val.rank}</td>
                <td className='logo'>
                  <a href={val.websiteUrl}>
                    <img src={val.icon} alt="" />
                  </a>
                  <p>{val.name}</p>
                </td>
                <td className='symbol'>{val.symbol}</td>
                <td>${val.marketCap}</td>
                <td>$ { val.price.toFixed(2)}</td>
                <td>{val.availableSupply}</td>
                <td>{val.volume}</td>
              </tr>
            })}
          </tbody>
      </table>
   </div>
  )
}

export default App
