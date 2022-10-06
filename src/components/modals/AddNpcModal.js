import React, { useState, useEffect } from 'react'
import './AddNpcModal.css'
import { useDispatch } from 'react-redux'
import { setAddNpcFalse, setAddNpcTrue } from '../../store/slices/addNpcSlice'
import { setLoadingFalse, setLoadingTrue } from '../../store/slices/loadingSlice'
import axios from 'axios'
import AuthContext from '../../store/authContext'
import { useContext } from 'react'



const AddNpcModal = () => {
    const authCtx = useContext(AuthContext)
    let dispatch = useDispatch()
    let [npcFirstName, setNpcFirstName] = React.useState('')
    let [npcLastName, setNpcLastName] = React.useState('')
    let [npcOccupation, setNpcOccupation] = React.useState('')
    let [npcNotes, setNpcNotes] = React.useState('')
    let [npcGender , setNpcGender] = React.useState('')
    let [npcRace, setNpcRace] = React.useState('')
    let [npcHair, setNpcHair] = React.useState('')
    let [npcEyes, setNpcEyes] = React.useState('')
    let [npcSkin, setNpcSkin] = React.useState('')
    let [npcHeight, setNpcHeight] = React.useState('')
    let [npcWeight, setNpcWeight] = React.useState('')
    let [npcAge, setNpcAge] = React.useState('')
    let [npcFaith, setNpcFaith] = React.useState('')
    let [npcAccent, setNpcAccent] = React.useState('')
    let [npcLangAndProfs, setNpcLangAndProfs] = React.useState('')
    let [npcStrength, setNpcStrength] = React.useState()
    let [npcDexterity, setNpcDexterity] = React.useState()
    let [npcConstitution, setNpcConstitution] = React.useState()
    let [npcIntelligence, setNpcIntelligence] = React.useState()
    let [npcWisdom, setNpcWisdom] = React.useState()
    let [npcCharisma, setNpcCharisma] = React.useState()
    let [npcArmorClass, setNpcArmorClass] = React.useState()
    let [npcHitPoints, setNpcHitPoints] = React.useState()
    let [npcInitiative, setNpcInitiative] = React.useState()




    let userId = authCtx.userId
    let realmId = localStorage.getItem('realmId')
    let regionId = localStorage.getItem('regionId')
    let townId = localStorage.getItem('townId')


    
    const submitHandler = e => {
        e.preventDefault()
        
        const body = {
            firstName: npcFirstName,
            lastName: npcLastName,
            gender: npcGender,
            race: npcRace,
            hair: npcHair,
            skin: npcSkin,
            eyes: npcEyes,
            height: npcHeight,
            weight: npcWeight,
            age: npcAge,
            faith: npcFaith,
            occupation: npcOccupation,
            accent: npcAccent,
            langAndProfs: npcLangAndProfs,
            strength: npcStrength,
            dexterity: npcDexterity,
            constitution: npcConstitution,
            intelligence: npcIntelligence,
            wisdom: npcWisdom,
            charisma: npcCharisma,
            armorClass: npcArmorClass,
            initiative: npcInitiative,
            hitPoints: npcHitPoints,

            notes: npcNotes,
            userId: userId,
            realmId: realmId,
            regionId: regionId,
            townId: townId,
        }
        
        
    
        const url = `http://localhost:5000/user`
    
        axios.post(`${url}/${realmId}/${regionId}/${townId}/npcs/create`, body)
        .then(dispatch(setLoadingTrue()))
        .then((res) => {
            dispatch(setAddNpcFalse())
            console.log('AFTER ADD Npc', res.data.body)
            window.location.reload()
            localStorage.removeItem('regionId')
            localStorage.removeItem('townId')
            dispatch(setLoadingFalse())
        })
        .catch(err => {
            dispatch(setLoadingFalse())
            console.log(body)
            
            console.log(err)
            setNpcFirstName('')
            setNpcLastName('')
            setNpcNotes('')
            console.log(`hey im breaking here boss`)
        })

    }
    
    

  return (
    <div className='add-npc-modal'>
        <div className='add-npc-bg' >
                <div className='add-npc-content'>
                    <div className='add-npc-title'>
                        <button className='add-npc-close-btn' onClick={() => dispatch(setAddNpcFalse())}>X</button>
                    </div>

                    <form className='add-npc-input' onSubmit={submitHandler}>
                        <div className='add-npc-form'>
                        <div className='npc-name-container'>
                        <input 
                            type='text' 
                            placeholder='Firstname' 
                            value={npcFirstName} 
                            onChange={(e) => setNpcFirstName(e.target.value)} 
                            required
                            id='npc-name'
                        />

                        <input
                            type='text'
                            placeholder='Lastname'
                            value={npcLastName}
                            onChange={(e) => setNpcLastName(e.target.value)}
                            required
                            id='npc-name'
                        />
                        </div>
                        <div className='npc-desc-container'>
                        <div className='npc-desc'>       
                            <select className='npcGender'
                                value={npcGender}
                                onChange={(e) => setNpcGender(e.target.value)}
                                required
                            >
                                <option value='default' default >--Gender--</option>
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                                <option value='Nonbinary'>Nonbinary</option>
                                
                            </select>

                            <select className='npcRace'
                                value={npcRace}
                                onChange={(e) => setNpcRace(e.target.value)}
                                required
                            >
                                <option value='default' default >--Race--</option>
                                <option value='Human'>Human</option>
                                <option value='Elf'>Elf</option>
                                <option value='Dwarf'>Dwarf</option>
                                <option value='Halfling'>Halfling</option>
                                <option value='Gnome'>Gnome</option>
                                <option value='Half-elf'>Half-Elf</option>
                                <option value='Half-orc'>Half-Orc</option>
                                <option value='Tiefling'>Tiefling</option>                              <option value='Orc'>Orc</option>
                            </select>
                                

                            <select className='npcOccupation'
                                value={npcOccupation}
                                onChange={(e) => setNpcOccupation(e.target.value)}
                                required
                            >
                                <option value='default' default >--Occupation--</option>
                                <option value='Farmer'>Farmer</option>
                                <option value='Blacksmith'>Blacksmith</option>
                                <option value='Merchant'>Merchant</option>
                                <option value='Guard'>Guard</option>
                                <option value='Priest'>Priest</option>
                                <option value='Mage'>Mage</option>
                                <option value='Thief'>Thief</option>
                                <option value='Bard'>Bard</option>
                            </select>
                        </div>
                        </div>
                        <div className='npc-middle-box'>
                            <div className='npc-characteristics'>
                                <input
                                    type='text'
                                    placeholder='Hair (optional)'
                                    value={npcHair}
                                    onChange={(e) => setNpcHair(e.target.value)}
                                    id='npc-hair'
                                />
                                <input
                                    type='text'
                                    placeholder='Skin (optional)'
                                    value={npcSkin}
                                    onChange={(e) => setNpcSkin(e.target.value)}
                                    id='npc-skin'
                                />
                                <input
                                    type='text'
                                    placeholder='Eyes (optional)'
                                    value={npcEyes}
                                    onChange={(e) => setNpcEyes(e.target.value)}
                                    id='npc-eyes'
                                />
                                <input
                                    type='text'
                                    placeholder='Height (optional)'
                                    value={npcHeight}
                                    onChange={(e) => setNpcHeight(e.target.value)}
                                    id='npc-height'
                                />
                                <input
                                    type='text'
                                    placeholder='Weight (optional)'
                                    value={npcWeight}
                                    onChange={(e) => setNpcWeight(e.target.value)}
                                    id='npc-weight'
                                />
                                <input
                                    type='text'
                                    placeholder='Age (optional)'
                                    value={npcAge}
                                    onChange={(e) => setNpcAge(e.target.value)}
                                    id='npc-age'
                                />
                                <input
                                    type='text'
                                    placeholder='Faith (optional)'
                                    value={npcFaith}
                                    onChange={(e) => setNpcFaith(e.target.value)}
                                    id='npc-faith'
                                />
                                <input
                                    type='text'
                                    placeholder='Accent/Dialect (optional)'
                                    value={npcAccent}
                                    onChange={(e) => setNpcAccent(e.target.value)}
                                    id='npc-accent'
                                />

                            </div>
                                
                            
                            
                        
                        <div className='npc-stats-container'>
                            <select className='npc-stats'
                                value={npcStrength}
                                onChange={(e) => setNpcStrength(e.target.value)}
                                required
                            >
                                <option value={null} default>--Strength--</option>
                                <option value={20}>20</option>
                                <option value={19}>19</option>
                                <option value={18}>18</option>
                                <option value={17}>17</option>
                                <option value={16}>16</option>
                                <option value={15}>15</option>
                                <option value={14}>14</option>
                                <option value={13}>13</option>
                                <option value={12}>12</option>
                                <option value={11}>11</option>
                                <option value={10}>10</option>
                                <option value={9}>9</option>
                                <option value={8}>8</option>
                                <option value={7}>7</option>
                                <option value={6}>6</option>
                                <option value={5}>5</option>
                                <option value={4}>4</option>
                                <option value={3}>3</option>
                                <option value={2}>2</option>
                                <option value={1}>1</option>
                            </select>

                            <select className='npc-stats'
                                value={npcDexterity}
                                onChange={(e) => setNpcDexterity(e.target.value)}
                                required
                            >
                                <option value={null} default>--Dexterity--</option>
                                <option value={20}>20</option>
                                <option value={19}>19</option>
                                <option value={18}>18</option>
                                <option value={17}>17</option>
                                <option value={16}>16</option>
                                <option value={15}>15</option>
                                <option value={14}>14</option>
                                <option value={13}>13</option>
                                <option value={12}>12</option>
                                <option value={11}>11</option>
                                <option value={10}>10</option>
                                <option value={9}>9</option>
                                <option value={8}>8</option>
                                <option value={7}>7</option>
                                <option value={6}>6</option>
                                <option value={5}>5</option>
                                <option value={4}>4</option>
                                <option value={3}>3</option>
                                <option value={2}>2</option>
                                <option value={1}>1</option>
                            </select>

                            <select className='npc-stats'
                                value={npcConstitution}
                                onChange={(e) => setNpcConstitution(e.target.value)}
                                required
                            >
                                <option value={null} default>--Constitution--</option>
                                <option value={20}>20</option>
                                <option value={19}>19</option>
                                <option value={18}>18</option>
                                <option value={17}>17</option>
                                <option value={16}>16</option>
                                <option value={15}>15</option>
                                <option value={14}>14</option>
                                <option value={13}>13</option>
                                <option value={12}>12</option>
                                <option value={11}>11</option>
                                <option value={10}>10</option>
                                <option value={9}>9</option>
                                <option value={8}>8</option>
                                <option value={7}>7</option>
                                <option value={6}>6</option>
                                <option value={5}>5</option>
                                <option value={4}>4</option>
                                <option value={3}>3</option>
                                <option value={2}>2</option>
                                <option value={1}>1</option>
                            </select>

                            <select className='npc-stats'
                                value={npcIntelligence}
                                onChange={(e) => setNpcIntelligence(e.target.value)}
                                required
                            >
                                <option value={null}default>--Intelligence--</option>
                                <option value={20}>20</option>
                                <option value={19}>19</option>
                                <option value={18}>18</option>
                                <option value={17}>17</option>
                                <option value={16}>16</option>
                                <option value={15}>15</option>
                                <option value={14}>14</option>
                                <option value={13}>13</option>
                                <option value={12}>12</option>
                                <option value={11}>11</option>
                                <option value={10}>10</option>
                                <option value={9}>9</option>
                                <option value={8}>8</option>
                                <option value={7}>7</option>
                                <option value={6}>6</option>
                                <option value={5}>5</option>
                                <option value={4}>4</option>
                                <option value={3}>3</option>
                                <option value={2}>2</option>
                                <option value={1}>1</option>
                            </select>

                            <select className='npc-stats'
                                value={npcWisdom}
                                onChange={(e) => setNpcWisdom(e.target.value)}
                                required
                            >
                                <option value={null}default>--Wisdom--</option>
                                <option value={20}>20</option>
                                <option value={19}>19</option>
                                <option value={18}>18</option>
                                <option value={17}>17</option>
                                <option value={16}>16</option>
                                <option value={15}>15</option>
                                <option value={14}>14</option>
                                <option value={13}>13</option>
                                <option value={12}>12</option>
                                <option value={11}>11</option>
                                <option value={10}>10</option>
                                <option value={9}>9</option>
                                <option value={8}>8</option>
                                <option value={7}>7</option>
                                <option value={6}>6</option>
                                <option value={5}>5</option>
                                <option value={4}>4</option>
                                <option value={3}>3</option>
                                <option value={2}>2</option>
                                <option value={1}>1</option>
                            </select>

                            <select className='npc-stats'
                                value={npcCharisma}
                                onChange={(e) => setNpcCharisma(e.target.value)}
                                required
                            >
                                <option value={null} default>--Charisma--</option>
                                <option value={20}>20</option>
                                <option value={19}>19</option>
                                <option value={18}>18</option>
                                <option value={17}>17</option>
                                <option value={16}>16</option>
                                <option value={15}>15</option>
                                <option value={14}>14</option>
                                <option value={13}>13</option>
                                <option value={12}>12</option>
                                <option value={11}>11</option>
                                <option value={10}>10</option>
                                <option value={9}>9</option>
                                <option value={8}>8</option>
                                <option value={7}>7</option>
                                <option value={6}>6</option>
                                <option value={5}>5</option>
                                <option value={4}>4</option>
                                <option value={3}>3</option>
                                <option value={2}>2</option>
                                <option value={1}>1</option>
                                
                            </select>
                        <div className='other-stats'>
                            <input className='npc-hitPoints'
                                type='number'
                                placeholder='HP'
                                value={npcHitPoints}
                                onChange={(e) => setNpcHitPoints(e.target.value)}
                            />
                            <input className='npc-ac'
                                type='number'
                                placeholder='AC'
                                value={npcArmorClass}
                                onChange={(e) => setNpcArmorClass(e.target.value)}
                            />
                                <input className='npc-initiative'
                                    type='number'
                                    placeholder='Init'
                                    value={npcInitiative}
                                    onChange={(e) => setNpcInitiative(e.target.value)}
                                />
                            </div>
                        </div>
                        </div>

                            <input id='lang-and-profs'
                                type='text'
                                placeholder='Languages and Proficiencies'
                                value={npcLangAndProfs}
                                onChange={(e) => setNpcLangAndProfs(e.target.value)}
                            />


                        <div className='npc-notes-container'>
                        <textarea 
                            
                            placeholder='Npc Notes (optional)' 
                            value={npcNotes}
                            onChange={(e) => setNpcNotes(e.target.value)} 
                            id='npc-notes'
                        />
                        </div>
                        
                        <button type='submit' className='add-new-npcbtn'>Add</button>
                    </div>
                    </form>


                </div>
            </div>
        </div>
   
  )
}

export default AddNpcModal
