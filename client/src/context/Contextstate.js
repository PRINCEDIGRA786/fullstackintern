import React, { useState } from 'react'
import context from './Context';

export default function Contextstate(props) {
    const host = "http://localhost:5000/api"

    const getData = async (query, parameter) => {

        const response = await fetch(`${host}/data/`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query, parameter })
        });
        let json = await response.json()

        if (json.success) {
            return json.result;
        }
        else {
            alert("Some error occured");
            console.log(json.result)
        }
    }
    const getDatas = async (query, parameter) => {

        const response = await fetch(`${host}/data/s`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query, parameter })
        });
        let json = await response.json()

        if (json.success) {
            return json.result;
        }
        else {
            alert("Some error occured");
            console.log(json.result)
        }
    }
    return (
        <>
            <context.Provider value={{ getData, getDatas }}>
                {props.children}
            </context.Provider>
        </>
    )
}