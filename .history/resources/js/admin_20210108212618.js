import axios from 'axios'
function adminInit(){
    const orderTableBody = document.querySelector('#orderTableBody')
    let orders=[];
    let markup

    axios.get('/admin/orders',{
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then(res=>{
        orders = res.data
        markup=generateMarkup(orders)
        orderTableBody.innerHTML = markup
    }).catch(err=>{
        console.log(err)
    })
}
module.exports=adminInit