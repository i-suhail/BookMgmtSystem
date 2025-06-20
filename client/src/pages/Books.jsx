import App from "../App";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from 'axios'

const Books = ()=> {
    const [books,setBooks]= useState([])

    useEffect(()=>{
        const fetchAllBooks = async ()=>{
            try {
                const res = await axios.get("http://localhost:8800/books")
                setBooks(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchAllBooks()
    },[])
    
    const handleDelete = async (id)=> {
        try {
            await axios.delete("http://localhost:8800/books/"+id)
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }

    return(
        <div>
            <div className="nav">
                <div className="logo">Shaikh's Book Shop</div>
            </div>
            {/* <center><h1>Suhail Book Shop</h1></center> */}
            <div className="books">
                {books.map((book)=>(
                    <div className="book" key={book.id}>
                        <div className="cvrimg">
                            {book.cover && <img src={book.cover} alt="" />}
                        </div>
                        <h2>{book.title}</h2>
                        <p>{book.desc}</p>
                        <span>₹ {book.price}</span>
                        <button className="delete" onClick={()=> handleDelete(book.id)}>Delete</button>
                        <button className="update"><Link to={`/update/${book.id}`}>Update</Link></button>
                    </div>
                ))}
            </div>
            <button className="adbtn">
                <Link to="/add">Add new Book</Link>
            </button>
        </div>
    );
};

export default Books