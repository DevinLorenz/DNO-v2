import React, {useState, useContext, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import AuthContext from '../../store/authContext'
import  '../styling/ViewRealm.css'
import { setAddRegionTrue } from '../../store/slices/addRegionSlice'
import { setAddTownTrue } from '../../store/slices/addTownSlice'
import { setAddNpcTrue } from '../../store/slices/addNpcSlice'
import { setLoadingFalse, setLoadingTrue } from '../../store/slices/loadingSlice'
import axios from 'axios'
import '../../assets/greenpfp.png'

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
    let [displayedStats, setDisplayedStats] = useState(false)
    let [displayedDescription, setDisplayedDescription] = useState(false)
    let [displayedNotes, setDisplayedNotes] = useState(false)

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


    const addNpcButton = document.querySelector('.add-npc-btn')

    // if( regionValue === 'default' || townValue === 'default') {
    //     addNpcButton.setAttribute('disabled', 'disabled')
    // } else if(regionValue && townValue === null) {
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
                  setDisplayedStats(true)
                  setDisplayedDescription(false)
                  setDisplayedNotes(false)
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
          <button className='npc-stats-btn' onClick={() => {
            setDisplayedStats(true)
            setDisplayedDescription(false)
            setDisplayedNotes(false)
            }}>Stats</button>
          <button className='npc-description-btn'onClick={() => {
            setDisplayedStats(false)
            setDisplayedDescription(true)
            setDisplayedNotes(false)
            }}>Description</button>
          <button className='npc-notes-btn'onClick={() => {
            setDisplayedStats(false)
            setDisplayedDescription(false)
            setDisplayedNotes(true)
            }}>Notes</button>
        </div>
        <div className='npc-content'>
          {isDisplayed && (displayedStats || displayedDescription) ?
                (<div className='bio-box'>
            <div className='bio-title'>
                  <img src={require('../../assets/greenpfp.png')}></img>
                  <div className='bio-container'>
              <h1>{displayedNpc.firstName} {displayedNpc.lastName}</h1>
                <h3>{displayedNpc.gender} {displayedNpc.race} - {displayedNpc.occupation}</h3>
            </div>
              <button className='npc-options-btn'>•••</button>
              </div> 
          </div>) : null}
          {isDisplayed && displayedStats ? (
            <div className='stats-box'>
              <div className='stats-list'>
                <div className='stat-block'>
                  <div className='stat-block-title'>
                    <h3>Strength</h3>
                  </div>
                  <div className='stat-block-content'>
                    <h1>{displayedNpc.strength}</h1>
                  </div>
                </div>
                <div className='stat-block'>
                  <div className='stat-block-title'>
                    <h3>Dexterity</h3>
                  </div>
                  <div className='stat-block-content'>
                    <h1>{displayedNpc.dexterity}</h1>
                  </div>
                </div>
                <div className='stat-block'>
                  <div className='stat-block-title'>
                    <h3>Constitution</h3>
                  </div>
                  <div className='stat-block-content'>
                    <h1>{displayedNpc.constitution}</h1>
                  </div>
                </div>
                <div className='stat-block'>
                  <div className='stat-block-title'>
                    <h3>Intelligence</h3>
                  </div>
                  <div className='stat-block-content'>
                    <h1>{displayedNpc.intelligence}</h1>
                  </div>
                </div>
                <div className='stat-block'>
                  <div className='stat-block-title'>
                    <h3>Wisdom</h3>
                  </div>
                  <div className='stat-block-content'>
                    <h1>{displayedNpc.wisdom}</h1>
                  </div>
                </div>
                <div className='stat-block'>
                  <div className='stat-block-title'>
                    <h3>Charisma</h3>
                  </div>
                  <div className='stat-block-content'>
                    <h1>{displayedNpc.charisma}</h1>
                  </div>
                </div>
                
              </div>
              <div className='lower-box'>
                <div className='lang-and-profs-box'>
                  <div className='lang-and-profs-title'>
                    <h3>Languages and Proficiencies</h3>
                  </div>
                  <div className='lang-and-profs-content'>
                    <h4>{displayedNpc.langAndProfs}</h4>
                </div>
                <div>

                </div>

              </div>

              <div className='hpInitAc-box'>
                <div className='hitpoints-box'>
                  <div className='hitpoints-title'>
                    <h3>Hit Points</h3>
                  </div>
                  <div className='hitpoints-content'>
                    <h1>{displayedNpc.hitPoints}</h1>
                    </div>
                </div>

              <div className='armorclass-box'>
                <div className='armorclass-title'>
                  <h3>Armor Class</h3>
                </div>
                <div className='armorclass-content'>
                  <h1>{displayedNpc.armorClass}</h1>
                </div>
              </div>

              <div className='initiative-box'>
                <div className='initiative-title'>
                  <h3>Initiative</h3>
                </div>
                <div className='initiative-content'>
                  <h1>{displayedNpc.initiative}</h1>
                </div>
              </div>
              </div>
            </div>
          </div>
          ) : null
          }

          {isDisplayed && displayedDescription ? (
            <div className='description-box'>
              <div className='description-box-title'>
              </div>
              <div className='description-box-content'>
                <div className='row-one'>
                  <h2>
                    Hair: {displayedNpc.hair}
                  </h2>

                  <h2>
                    Skin: {displayedNpc.skin}
                  </h2>

                  <h2>
                    Eyes: {displayedNpc.eyes}
                  </h2>
                </div>
                <div className='row-two'>
                  <h2>
                    Height: {displayedNpc.height}
                  </h2>

                  <h2>
                    Weight: {displayedNpc.weight}
                  </h2>

                  <h2>
                    Age: {displayedNpc.age}
                  </h2>
                </div>
                <div className='row-three'>
                  <h2>
                    Accent: {displayedNpc.accent}
                  </h2>

                  <h2>
                    Faith: {displayedNpc.faith}
                  </h2>
                </div>
              </div>
            </div>
          ) : null
          }

          {isDisplayed && displayedNotes ? (
            <div className='notes-box'>
              <div className='notes-box-title'>
                
                <button className='notes-options-btn'>•••</button>
              </div>
              <div className='notes-box-content'>
              
                <h3>{displayedNpc.notes}</h3>
              </div>
            </div>
          ) : null}
          
          


        </div>
        </div>
    </div>
  )
}

export default ViewRealm