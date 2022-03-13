import './App.css';
import {useEffect, useState} from "react";
import {v4 as uuidv4} from 'uuid';
import {randomColor} from 'randomcolor'
import Draggable from "react-draggable";


function App() {
    const [item, setItem] = useState('')
    const [storageItems, setStorageItems] = useState(JSON.parse(localStorage.getItem('storageItems')) || [])

    useEffect(() => {
        localStorage.setItem('storageItems', JSON.stringify(storageItems))
    }, [storageItems]);

    const newItem = () => {
        if (item.trim() !== '') {
            const newItem = {
                id: uuidv4(),
                item,
                color: randomColor({
                    luminosity: 'light'
                }),
                defaultPosition: {
                    x: 500,
                    y: -500
                }
            }
            setStorageItems((storageItems) => [...storageItems, newItem])
            setItem('')
        } else {
            alert("Enter something...")
            setItem('')
        }
    }

    const deleteNode = (id)  => {
      setStorageItems(storageItems.filter((item) => item.id !== id))
    }

    const updatePos = (data, index) => {
        let objects = [...storageItems]
        objects[index].defaultPosition ={x: data.x, y: data.y}
        setStorageItems(objects)
    }

    const keyPress = (e) => {
        const code = e.which || e.keyCode
        if (code === 13) {
            newItem()
        }
    }

    return (
        <div className="App">
            <div className="wrapper">
                <input value={item}
                       onChange={(e) => setItem(e.target.value)}
                       onKeyPress={(e) => keyPress(e)}
                       type='text'
                       placeholder='enter something...'

                />
                <button className='enter' onClick={() => newItem()}>ENTER</button>
            </div>

            {storageItems.map((item, index) => {
                return (
                    <Draggable
                        key={index} defaultPosition={item.defaultPosition}
                        onStop={(_,data) => {
                    updatePos(data, index)
                }
                        }>
                        <div className='card' style={{backgroundColor: item.color}}>
                            {`${item.item}`}
                            <button className='delete' onClick={() => deleteNode(item.id)}> x</button>
                        </div>
                    </Draggable>
                )
            })}
        </div>
    );
}

export default App;
