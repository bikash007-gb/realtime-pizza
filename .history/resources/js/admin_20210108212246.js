import axios from 'axios'
function adminInit(){
    const orderTableBody = document.querySelector('#orderTableBody')
    let orders=[];
    let markup

    axios.get('/admin/orders',{
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    })
}
module.exports=adminInit