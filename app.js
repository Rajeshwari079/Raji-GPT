// do not uplaod in github

const API_KEY ='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'
const apiURL = 'https://api.openai.com/v1/chat/completions'
const subBtn = document.querySelector('#submit')
const otpElem = document.querySelector('#output')
const iptElem = document.querySelector('input')
const histElem = document.querySelector('.history')
 const btnElem= document.querySelector('button')

 function changeInput(value){
  const iptElem= document.querySelector('input')
  iptElem.value=value
 }

async function getmsg(){
    console.log('clicked')
    const options = {
        method: 'POST',
        headers: {
            'Authorization' : `Bearer ${API_KEY}`,
            'Content-type' : 'application/json'
        },
        body :JSON.stringify ( {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: iptElem.value } ],
            max_tokens:100
             })
    }
    
    try{
        const response = await fetch (apiURL, options);
       const data = await (response).json();
       otpElem.textContent = data.choices[0].message.content;
       if (data.choices[0].message.content && iptElem.value) {
        const pElem = document.createElement('p')
        pElem.textContent=iptElem.value
        pElem.addEventListener('click', () =>changeInput(pElem.textContent) )
        histElem.append(pElem)
       }
    } catch (error) {
        console.error(error);
    }
}

function clearInput() {
    iptElem.value=''
}

subBtn.addEventListener('click',getmsg)
btnElem.addEventListener('click',clearInput)