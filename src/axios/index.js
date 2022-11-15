import React, { useState, useEffect } from 'react'
import axios from "axios";
//import { useStateValue } from './StateProvider'



//const [{ user, appSession, searchValue, ModalContent, modalClassName }, dispatch] = useStateValue();
let axiosConfig = {
    baseURL: 'https://reactapi.bestdivision.com/api/',
    headers: {
        'server-key': '1312a113c58715637a94446389326a49',
        'api-version': '1.0',
        'bd-app-locale': 'en',
        'bd-app-name': 'main',
        'bd-auth-v1': '23232222;widjksu8shsdkfshnnfsjkiowowo',
        // 'token':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJVU0VSMTIzNDU2In0.tPD9rT5GWhsTKpUxTXC0NG_0obiTxvrR5W-TbsvvNoU',
        // 'Content-Type': 'application/x-www-form-urlencoded',
        // 'Content-Type': 'application/html',
        // 'Access-Control-Allow-Origin':'*',
        // 'Authorization': 'Basic YWRtaW46MTIzNA==',
        // 'Access-Control-Allow-Methods':'GET, PUT, POST, DELETE, HEAD, OPTIONS',
        // 'Accept': '*/*',
        // 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        // 'HOST':'localhost'
        // 'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
        'Content-Type': 'application/json'
    }
    // mode:'no-cors',
    // withCredentials: true,
    // credentials: 'same-origin',
    // crossdomain: true
}
if (typeof window !== 'undefined') {
    if (sessionStorage.getItem('token')) {
        axiosConfig.headers.authorization = 'Bearer ' + sessionStorage.getItem('token')
        // axiosConfig.headers.authorization = sessionStorage.getItem('token')
    } else if (localStorage.getItem('token')) {
        // axiosConfig.headers.authorization = sessionStorage.getItem('token')
        axiosConfig.headers.authorization = 'Bearer ' + localStorage.getItem('token')
    }
}
const instance = axios.create(axiosConfig);
instance.cancelToken = axios.CancelToken
instance.isCancel = axios.isCancel

export const fetchToken = axios.create({
    baseURL: 'https://reactapi.bestdivision.com/api/',
    headers: {
        'server-key': '1312a113c58715637a94446389326a49',
        'api-version': '1.0',
        'bd-app-locale': 'en',
        'bd-app-name': 'main',
        'bd-auth-v1': '23232222;widjksu8shsdkfshnnfsjkiowowo',
        // 'Content-Type': 'application/x-www-form-urlencoded',
        // 'Content-Type': 'application/html',
        // 'Access-Control-Allow-Origin':'*',
        // 'Authorization': 'Basic YWRtaW46MTIzNA==',
        // 'Access-Control-Allow-Methods':'GET, PUT, POST, DELETE, HEAD, OPTIONS',
        // 'Accept': '*/*',
        // 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        // 'HOST':'localhost'
        // 'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
        'Content-Type': 'application/json'
    }
});
export const axiosAjax = axios.create({
    // baseURL: 'https://account.api.here.com/',
    // baseURL: 'https://batch.geocoder.ls.hereapi.com/6.2/jobs/puwWrv32YOU24y8MNoUr793chFAI36aC/result?apiKey=4ktcggzHuwfBfNFYoPK6mFxF68lfSub7cktqK-6uSos',
    // baseURL: 'https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?apikey=cJoHr8yQfPGW9HbK7he6VSazT9JOr3IXqygMzZ4yjOU&country=AUS&maxresults=5&pos=10.2,20.5',
    headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        // 'Authorization': 'OAuth',
        // 'oauth_consumer_key': "6YFcu4b5BgJvGK9xwnxe",
        // 'oauth_nonce':"helllo",
        // 'oauth_signature': signature,
        // 'oauth_signature_method':"HMAC-SHA256",
        // 'oauth_timestamp': "60",
        // 'oauth_version': "1.0",
        // 'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Methods':'GET, PUT, POST, DELETE, HEAD, OPTIONS',
        // 'Accept': '*/*',
        // 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        // 'HOST':'localhost'
        // 'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    }
});

export default instance;