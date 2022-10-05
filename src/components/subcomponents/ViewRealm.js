import React, {useState, useContext, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import AuthContext from '../../store/authContext'
import  '../styling/ViewRealm.css'
import { setAddRegionTrue } from '../../store/slices/addRegionSlice'
import { setAddTownTrue } from '../../store/slices/addTownSlice'
import { setAddNpcTrue } from '../../store/slices/addNpcSlice'
import { setLoadingFalse, setLoadingTrue } from '../../store/slices/loadingSlice'
import axios from 'axios'

const ViewRealm = () => {
    const authCtx = useContext(AuthContext)
    const userId = authCtx.userId
    const dispatch = useDispatch()
    const realmId = localStorage.getItem('realmId')

    let [regionData, setRegionData] = useState([])
    let [regionValue, setRegionValue] = useState()
    let [townData, setTownData] = useState([])
    let [townValue, setTownValue] = useState()
    let [npcData, setNpcData] = useState([])
    let [isDisplayed, setIsDisplayed] = useState(false)
    let [displayedNpc, setDisplayedNpc] = useState({})

    const addRegionHandler = () => {
        dispatch(setAddRegionTrue())
    }

    const addTownHandler = () => {
        dispatch(setAddTownTrue())
    }

    const getRegionsHandler = () => {
        dispatch(setLoadingTrue())
        const url = `http://localhost:5000/user`
        axios.get(`${url}/regions/${realmId}/retrieve`)
        .then((res) => {
            setRegionData(res.data)
            
            dispatch(setLoadingFalse())
        })
        .catch(err => {
            console.log(err)
            dispatch(setLoadingFalse())
        })
      
    }


    const getTownHandler = (regionId) => {
        dispatch(setLoadingTrue())
        regionId = localStorage.getItem('regionId')


        const url = `http://localhost:5000/user`
        axios.get(`${url}/towns/${regionId}/retrieve`)
        .then((res) => {
            console.log(res.data)
            setTownData(res.data)
            dispatch(setLoadingFalse())
        })
        .catch(err => {
            console.log(err)
            dispatch(setLoadingFalse())
        })
      
    }

    const getNpcHandler = async (realmId) => {
        dispatch(setLoadingTrue())
        setRegionValue('default')
        setTownValue('default')
        realmId = localStorage.getItem('realmId')
        const url = `http://localhost:5000/user`
        await axios.get(`${url}/realm/npcs/${realmId}/retrieve`)
        .then((res) => {
            console.log(res.data)
            setNpcData(res.data)
            dispatch(setLoadingFalse())
        })
        .catch(err => {
            console.log(err)
            dispatch(setLoadingFalse())
        })
      }



    
    useEffect(() => {
        getRegionsHandler()
        getTownHandler()
        getNpcHandler()

    }, [])


    // const addNpcButton = document.querySelector('.add-npc-btn')

    // if( regionValue === 'default' || townValue === 'default') {
    //     addNpcButton.setAttribute('disabled', 'disabled')
    // } else {
    //     addNpcButton.removeAttribute('disabled')
    // }

    
    

  return (
    <div className='viewRealm-bg'>
      <div className='selection-box'>
        <div className='selection-title'>
          <select className='select-region-btn' onChange={(e) => {
            e.preventDefault()
            setTownValue('default')
            setRegionValue(e.target.value)
            localStorage.setItem('regionId', e.target.value)
            getTownHandler(regionValue)
            if(e.target.value === 'add-region') {
              addRegionHandler()
            } else if (e.target.value === 'default') {
                localStorage.removeItem('regionId')
                localStorage.removeItem('townId')
                
            }
          }}>
            <option value='default' default>--Select Region--</option>
            {regionData.map((region) => {
              
                return (<option value={region.id}>{region.name}</option>)
            })}
          <option value='add-region'>+</option>
            
          </select>
          <select className='select-town-btn' onChange={(e) => {
            e.preventDefault()
            localStorage.setItem('townId', e.target.value)
            setTownValue(e.target.value)
            if(e.target.value === 'add-town') {
              addTownHandler()
            } else if (e.target.value === 'default') {
              localStorage.removeItem('townId')
            
          }
          }} >
            <option value='default' default>--Select Town--</option>
            {regionValue !== 'default' && townData.map((town) => {
                return (<option key={town.id} value={town.id}>{town.name}</option>)
            })}
            



            <option value='add-town'>+</option>
          </select>
        </div>

        <div className='selection-content'>
          
          {npcData.filter((npc) => {
            if(townValue === null && regionValue === null) {
              return npc
            }
            if(townValue === 'default' && regionValue === 'default') {
              return npc  
            }
            if(townValue !== 'default') {
              return npc.townId === +townValue
            }
            return npc.regionId === +regionValue
          }).map((npc) => {
            return (
              <div key={npc.id} className='npc-card'>
                
                <div className='npc-card-title'>
                <h3>{npc.firstName} {npc.lastName}</h3>
                </div>
                <button value={npc} className='view-npc-btn'
                onClick={(e) => {
                  e.preventDefault()
                  localStorage.setItem('npcId', npc.id)
                  setIsDisplayed(true)
                    setDisplayedNpc(npc)
                    console.log(displayedNpc)

                }}
                  
                
                >View</button>
                <div className='npc-bio'>
                <h4>{npc.gender} {npc.race} - {npc.occupation}</h4>
                </div>
              </div>
              
            )
          })}

          
          

          <button className='add-npc-btn' onClick={() =>
            dispatch(setAddNpcTrue())
          }>+</button>
        </div>
      </div>
    


      
      <div className='npc-box'>
        <div className='npc-title'>
          <button className='npc-stats-btn'>Stats</button>
          <button className='npc-description-btn'>Description</button>
          <button className='npc-notes-btn'>Notes</button>
        </div>
        <div className='npc-content'>
          {isDisplayed ?
                (<div className='bio-box'>
            <div className='bio-title'>
              <button className='npc-options-btn'>•••</button>
              <h1>{displayedNpc.firstName} {displayedNpc.lastName}</h1>
              <div className='bio-title-bio'>
                <h3>{displayedNpc.gender} {displayedNpc.race} - {displayedNpc.occupation}</h3>
              </div>
              </div> 
          </div>) : null}


        </div>
        </div>
    </div>
  )
}

export default ViewRealm