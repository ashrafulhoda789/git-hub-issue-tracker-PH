const createElement = (arr) =>{
    const htmlElement = arr.map((el) => `<span class="btn">${el}</span>`);
    return htmlElement.join(" ");
}

const loadAllIssues = async() =>{
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    // console.log(data.data);
    displayIssues(data.data);
}

const displayIssues = (issues) =>{
    const cardContainer = document.getElementById("cardContainer");
    cardContainer.innerHTML = "";

    issues.forEach(issue =>{
        console.log(issue);
        const card = document.createElement("div");
        card.innerHTML = `
            <div class="bg-white space-y-4 rounded-2xl p-5">
                <div class="flex justify-between items-center">
                    <img src="assets/Open-Status.png" alt="">
                    <p>${issue.priority.toUpperCase()}</p>
                </div>
                <div class="space-y-2">
                    <h2 class="text-xl font-semibold dark-blue">${issue.title}</h2>
                    <p class="line-clamp-2 font-medium text-[#64748B]">${issue.description}</p>
                </div>
                <div>
                    ${createElement(issue.labels)}
                </div>
                <hr class="border-gray-200">
                <div>
                    <p class="text-[#64748B]">#1 by ${issue.author}</p>
                    <p class="text-[#64748B]">${issue.updatedAt}</p>
                </div>
            </div>
        `;
        cardContainer.appendChild(card);
    })
};

loadAllIssues();