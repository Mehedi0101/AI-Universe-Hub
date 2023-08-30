const cardContainer = document.getElementById('card-container');

const displayContent = async(isDefault) => {
        const response = await fetch('https://openapi.programming-hero.com/api/ai/tools');
        let data = await response.json();
        data =  isDefault ? data.data.tools.slice(0,6) : data.data.tools.slice(6);
        if(isDefault){
            data[5].image='./assets/images/jasper.jpg';
        }
        data.forEach(item => {
            const div = document.createElement('div');
            div.classList = `card bg-base-100 shadow-xl`;

            div.innerHTML = `
            <figure class="rounded-lg h-auto md:h-48 lg:h-60"><img class="rounded-lg" src="${item?.image}" alt="" /></figure>
                <div class="card-body">
                    <h3 class="text-lg md:text-xl font-semibold">Features</h2>
                        <ol class="text-[#585858] list-decimal ml-5">
                            <li>${item.features[0]}</li>
                            <li>${item.features[1]}</li>
                            <li>${item.features[2]}</li>
                        </ol>
                        <hr class="my-4">
                        <div class="flex justify-between items-center">
                            <div>
                                <h2 class="card-title">${item.name}</h2>
                                <div class="flex gap-2 text-[#585858]">
                                    <img src="assets/icons/date.svg" alt="">
                                    <p>${item.published_in}</p>
                                </div>
                            </div>
                            <button class="active:scale-90" onclick="showDescription.showModal()"><img src="assets/icons/button-icon.svg" alt=""></button>
                        </div>
                </div>
            `;

            cardContainer.appendChild(div);
        });
}

displayContent(true);