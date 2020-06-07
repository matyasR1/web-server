
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', e => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'LOADING...'
    messageTwo.textContent = ''

    fetch(`/weather?adress=${location}`).then(response => {
        response.json().then(data => {
            if(data.error){
                return messageOne.textContent = data.error
            }
            messageOne.textContent = data.place
            messageTwo.textContent = data.forecastData
        })
    })
})

