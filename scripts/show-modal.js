const modalContainer = document.getElementById('modal-container');
const modalTitle = document.getElementById('modal-title');
const price1 = document.getElementById('price1');
const price2 = document.getElementById('price2');
const price3 = document.getElementById('price3');
const plan1 = document.getElementById('plan1');
const plan2 = document.getElementById('plan2');
const plan3 = document.getElementById('plan3');
const modalFeatures = document.getElementById('modal-features');
const modalIntegrations = document.getElementById('modal-integrations');
const modalImage = document.getElementById('modal-image');
const accuracyContainer = document.getElementById('accuracy-container');
const accuracyAmount = document.getElementById('accuracy');
const inputSample = document.getElementById('input-sample');
const outputSample = document.getElementById('output-sample');


const modalLists = (section, obj, outerKey, innerKey) => {
    section.innerHTML = '';
    const list = Object.values(obj[outerKey] || {});
    if (list.length === 0) {
        const na = document.createElement('li');
        na.innerText = 'N/A'
        na.classList.add('list-none');
        section.appendChild(na);
    }
    else{
        list.forEach(item => {
            const li = document.createElement('li');
            if(typeof item === 'object'){
                li.innerText = item[innerKey];
            }
            else{
                li.innerText = item;
            }
            section.appendChild(li);
        })
    }
}

const modalContent = async (id) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
    let data = await response.json();
    data = data.data;

    // title
    modalTitle.innerText = data?.description;

    // pricing
    price1.innerText = data?.pricing?.[0]?.price || '';
    price2.innerText = data?.pricing?.[1]?.price || 'N/A';
    price3.innerText = data?.pricing?.[2]?.price || '';
    plan1.innerText = data?.pricing?.[0]?.plan || '';
    plan2.innerText = data?.pricing?.[1]?.plan || 'Pricing';
    plan3.innerText = data?.pricing?.[2]?.plan || '';

    // features
    modalLists(modalFeatures, data,'features','feature_name');

    // integrations
    modalLists(modalIntegrations, data, 'integrations');

    // image
    if(data.tool_name === 'Jasper Chat'){
        modalImage.setAttribute('src',`assets/images/jasper.jpg`)
    }
    else{
        modalImage.setAttribute('src',`${data.image_link[0]}`)
    }

    // accuracy
    if(!data?.accuracy?.score){
        accuracyContainer.classList.add('hidden');
    }
    else{
        accuracyContainer.classList.remove('hidden');
        accuracyAmount.innerText = (data?.accuracy?.score)*100;
    }
    
    // input-output sample
    inputSample.innerText = data.input_output_examples?.[0]?.input || '';
    outputSample.innerText = data.input_output_examples?.[0]?.output || '';
    
}