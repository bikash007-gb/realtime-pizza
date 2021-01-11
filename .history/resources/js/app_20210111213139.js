import axios from 'axios'
import Noty from 'noty' 
import moment from 'moment'
import  initAdmin  from './admin'
let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter=document.querySelector('#cartCounter')

function updateCart(pizza){
    axios.post('/update-cart',pizza).then(res =>{
        
        cartCounter.innerText = res.data.totalQty
        new Noty({
            type:'success',
            timeout: 1000,
            text:'item added to cart',
            progressBar:false
        }).show()
    }).catch(err =>{
        new Noty({
            type:'error',
            timeout: 1000,
            text:'something went wrong',
            progressBar:false
        }).show()
    })
}

addToCart.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        let pizza=JSON.parse(btn.dataset.pizza)
        updateCart(pizza)
    })
})
const alertmsg=document.querySelector('#success-alert')
if(alertmsg){
    setTimeout(()=>{
        alertmsg.remove()
    },2000)
    
}
initAdmin()

let statuses=document.querySelectorAll('.status_line')
let hiddenInput=document.querySelector('#hiddenInput')
let order=hiddenInput ? hiddenInput.value :null
order=JSON.parse(order)
let time = document.createElement('small')
function updateStatus(order){
    statuses.forEach((status) => {
        status.classList.remove('step-completed')
        status.classList.remove('current')
    })
    statuses.forEach((status) => {
        status.classList.remove('step-completed')
        status.classList.remove('current')
    })
    let stepCompleted = true;
    statuses.forEach((status) => {
       let dataProp = status.dataset.status
       if(stepCompleted) {
            status.classList.add('step-completed')
       }
       if(dataProp === order.status) {
            stepCompleted = false
            time.innerText = moment(order.updatedAt).format('hh:mm A')
            status.appendChild(time)
           if(status.nextElementSibling) {
            status.nextElementSibling.classList.add('current')
           }
       }
    })
}
updateStatus(order)
let socket=io()
if(order){
    socket.emit('join', `order_${order._id}`)
}

let adminArea=window.location.pathname
if (adminArea.includes('admin')){
    socket.emit('join','adminRoom')
}

socket.on('orderUpdated', (data) => {
    const updatedOrder = { ...order }
    updatedOrder.updatedAt = moment().format()
    updatedOrder.status = data.status
    
    updateStatus(updatedOrder)
    new Noty({
        type: 'success',
        timeout: 1000,
        text: 'Order updated',
        progressBar: false,
    }).show();
})