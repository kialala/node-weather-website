console.log('client file js file loaded')



const weatherForm = document.querySelector('form')
const search = document.querySelector("input[name='location']")
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = search.value
    
    messageOne.textContent = 'loading...'
    messageTwo.textContent= ''
    fetch(`http://192.168.126.51:3000/weather?address=${location}`)
    .then(response=> response.json())
    .then(data=>{
        messageOne.textContent=''
        if (data.error) {
            messageOne.textContent=data.error
        } else {
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecastData
        }
    })
})