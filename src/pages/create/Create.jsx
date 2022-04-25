import './create.css'
import Image from '../../assets/Image.png'
import axios from 'axios';
import React,{ useState, useEffect} from 'react'


const Create = () => {

  const itemNameRef = React.useRef();
  const itemDesciptionRef = React.useRef();
  const itemPriceRef = React.useRef();
  const itemAvaibleRef = React.useRef();


  const create_item = async () => {
    const data = {
      address:'0:c19b003394bef654680b0304b632728f264a85bba9a85b84f8090e1cd39df021',
      name:itemNameRef.current.value,
      description:itemDesciptionRef.current.value,
      image:'',
      data:'',
      collection:'Art',
      tags:'Epic',
      price:itemPriceRef.current.value,
    };
    try{
      const response = await axios.post('http://45.137.64.34:4002/items/create_item',data);
      console.log(response);
    } catch (error){
      console.log(error)
    }
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(itemNameRef.current.value);
    console.log(itemDesciptionRef.current.value);
    console.log(itemPriceRef.current.value);
    console.log(itemAvaibleRef.current.value);

  }

  return (
    <div className='create section__padding'>
    <div className="create-container">
    <h1>Create new Item</h1>
    <p className='upload-file'>Upload File</p>
    <div className="upload-img-show">
    <h3>JPG, PNG, GIF, SVG, WEBM, MP3, MP4. Max 100mb.</h3>
    <img src={Image} alt="banner" />
    <p>Drag and Drop File</p>
    </div>
    <form className='writeForm' autoComplete='off'>

    <div className="formGroup">
    <label>Upload</label>
    <input type="file" className='custom-file-input'
    />
    </div>
    <div className="formGroup">
    <label>Name</label>
    <input type="text" placeholder='Item Name' name="itemName" ref={itemNameRef} autoFocus={true} />
    </div>
    <div className="formGroup">
    <label>Description</label>
    <textarea type="text" rows={4}
    placeholder='Decription of your item'
    ref={itemDesciptionRef}
    ></textarea>
    </div>
    <div className="formGroup">
    <label>Price</label>
    <div className="twoForm">
    <input type="text" placeholder='Price'  ref={itemPriceRef}/>
    <select>
    <option value="ETH">EVER</option>
    </select>
    </div>
    </div>
    <div className="formGroup">
    <label>Category</label>
    <select >
    <option>Art</option>
    <option>Photography</option>
    <option>Sports</option>
    <option>Collectibles</option>
    <option>Trading Cards</option>
    <option>Utility</option>
    </select>
    </div>
    <div className="formGroup">
    <label>Available Items</label>
    <input type="text" placeholder='No of Items' ref={itemAvaibleRef}/>
    </div>
    <button className='writeButton' onClick={handleSubmit}>Create Item</button>
    </form>
    </div>
    </div>

  )
};

export default Create;
